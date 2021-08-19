require 'sinatra'
require "sinatra/reloader" if development?

require 'mysql2'

require 'uri'

enable :sessions

database_name = "shauno_buttons"
if ENV["DB_NAME"]
    # puts "we r in the env if statement"
    database_name = ENV["DB_NAME"]
    # puts database_name
end

$client = Mysql2::Client.new(:host => "intern-party-2.cpj2kqopsdsq.ap-southeast-2.rds.amazonaws.com", :username => "admin", :password => ENV["DB_PASSWORD"], :database => database_name, :flags => Mysql2::Client::MULTI_STATEMENTS)

get '/frank-says' do
    "Put this in your pipe & smoke it!"
end

get '/buttons' do
    result = $client.query(
            "SELECT developer_pairings.button_id, reason, name FROM reason_pairings 
            JOIN developer_pairings ON reason_pairings.button_id=developer_pairings.button_id 
            JOIN reasons ON reason_pairings.reason_id=reasons.id 
            JOIN developers ON developer_pairings.developer_id=developers.id;").to_a
            #how to turn this into json, json.generate
            #how to do error handling in sinatra
    return JSON.generate(result)
end

get '/buttons/:id' do #404 status code if button doesnt exist
    statement = $client.prepare("SELECT * FROM buttons WHERE button_id=?")
    result = statement.execute(params[:id]).first
    if !result.nil?
        JSON.generate(result)
    else result
        [404, ["Error 404! The thing you are looking for does not exist\n"]]
    end
end

get '/add_event/:button_id/:timestamp/:developers_id/:reason_id' do
    begin 
        Integer(params[:button_id])
    rescue
        return [400, ["Error 400: Button ID is not an integer!\n"]]
    end

    begin 
        Integer(params[:developers_id])
    rescue ArgumentError
        return [400, ["Error 400: Developer ID is not an integer!\n"]]
    end

    begin
        Integer(params[:reason_id])
    rescue
        return [400, ["Error 400: Reason ID is not an integer!\n"]]
    end

    begin
        DateTime.strptime(params[:timestamp], "%Y-%m-%d %H:%M:%S")
    rescue => e
        return [400, ["Error 400: Timestamp is not valid!\n"]]
    end

    statement = $client.prepare("INSERT INTO events (button_id, timestamp, developers_id, reason_id) VALUES (?, ?, ?, ?);")
    statement.execute(params[:button_id], params[:timestamp], params[:developers_id], params[:reason_id])
end

get '/is_admin/:developer_id' do
    statement = $client.prepare("SELECT is_admin FROM developers WHERE id=?")
    result = statement.execute(params["developer_id"]).first

    if result && result["is_admin"] == 1 #check if result exists and if the dev is an admin
        session[:is_admin] = "true"
        redirect params["previous"]
    else
        [403, ["Please check your permissions and try again."]]
    end
end

get '/invalidate_event/:developer_id/:button_id/:timestamp' do
    if session[:is_admin] == "true"
        session[:is_admin] = nil
        statement = $client.prepare("UPDATE events SET to_ignore = 1 WHERE button_id=? AND timestamp=?;")
        statement.execute(params["button_id"], params["timestamp"])
        "it works!"
    else
        redirect to("/is_admin/#{params['developer_id']}?previous=#{URI.encode(request.url)}")
    end
end

get '/add_button/:uuid/:reason_id/:developer_id' do
    begin
        statement = $client.prepare("INSERT INTO buttons (uuid) VALUES (?);")
        statement.execute(params[:uuid])
    rescue => e
        return [409, ["This button already exists in the database!"]]
    end

    statement = $client.prepare("SELECT button_id FROM buttons WHERE uuid=?;")
    result = statement.execute(params[:uuid])
    id = result.first["button_id"]

    statement = $client.prepare("INSERT INTO reason_pairings (button_id, reason_id) VALUES (?, ?);")
    statement.execute(id, params[:reason_id])

    statement = $client.prepare("INSERT INTO developer_pairings (button_id, developer_id) VALUES (?, ?);")
    statement.execute(id, params[:developer_id])
end

get '/invalidate_button/:developer_id/:button_id' do
    
    if session["is_admin"] == "true"
        if params[:button_id]
            statement = $client.prepare("UPDATE buttons SET is_active=0 WHERE button_id=?;")
            statement.execute(params[:button_id])

            statement = $client.prepare("UPDATE reason_pairings SET CURRENT=0 WHERE button_id=?;")
            statement.execute(params[:button_id])

            statement = $client.prepare("UPDATE developer_pairings SET CURRENT=0 WHERE button_id=?;")
            statement.execute(params[:button_id])
        else
            raise InvalidDataError
        end
    else
        redirect to("/is_admin/#{params["developer_id"]}?previous=#{URI.encode(request.url)}") #test not following the redirect
    end
end

get "/reassign_button/:button_id" do
    # check if at least one of the things to update has been given, and throw an error if not
    if !params[:reason_id] && !params[:developer_id]
        return [400, "Error 400: You are missing data in your request"]
    end

    #check that the button provided has not been deactivated
    statement = $client.prepare("SELECT is_active FROM buttons WHERE button_id=?;")
    result = statement.execute(params[:button_id]).first

    if result["is_active"] == 0
        return [404, ["The button you asked for cannot be found"]]
    end

    if params[:reason_id] # if a new reason is given

        # invalidate any existing reasons
        statement = $client.prepare("UPDATE reason_pairings SET CURRENT=0 WHERE button_id=?;")
        statement.execute(params[:button_id])

        # add the new reason
        statement = $client.prepare("INSERT INTO reason_pairings (button_id, reason_id) VALUES (?, ?);")
        statement.execute(params[:button_id], params[:reason_id])
    end

    if params[:developer_id] # do the same if a new developer was given

        # invalidate any existing developers
        statement = $client.prepare("UPDATE developer_pairings SET CURRENT=0 WHERE button_id=?;")
        statement.execute(params[:button_id])

        # add the new developer
        statement = $client.prepare("INSERT INTO developer_pairings (button_id, developer_id) VALUES (?, ?);")
        statement.execute(params[:button_id], params[:developer_id])
    end
end

#### http://localhost:4567/add_event/