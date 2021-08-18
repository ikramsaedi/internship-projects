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

def hi
    puts "hi"
end

get '/buttons' do
    result = $client.query(
            "SELECT developer_pairings.button_id, reason, name FROM reason_pairings 
            JOIN developer_pairings ON reason_pairings.button_id=developer_pairings.button_id 
            JOIN reasons ON reason_pairings.reason_id=reasons.id 
            JOIN developers ON developer_pairings.developer_id=developers.id;").to_a
            #how to turn this into json, json.generate
            #how to do error handling in sinatra
    erb :index, :locals => {:buttons => result} #locals = variables we pass to template
end

get '/buttons/:id' do #404 status code if button doesnt exist
    statement = $client.prepare("SELECT * FROM buttons WHERE button_id=?")
    result = statement.execute(params[:id]).first
    if !result.nil?
        JSON.generate(result)
    else result
        [403, ["Error 403: You can't see that ;-;\n"]]
    end
end

post '/add_event' do
    statement = $client.prepare("INSERT INTO events (button_id, timestamp, developers_id, reason_id) VALUES (?, ?, ?, ?);")
    statement.execute(button_id, timestamp, developer, reason)
end

get '/is_admin/:developer_id' do
    puts "call is_admin"
    statement = $client.prepare("SELECT is_admin FROM developers WHERE id=?")
    result = statement.execute(params["developer_id"]).first

    if result && result["is_admin"] == 1 #check if result exists and if the dev is an admin
        pp session
        session[:is_admin] = "true"
        pp session
        redirect params["previous"]
    else
        [403, ["Please check your permissions and try again."]]
    end
end

get '/invalidate_event/:developer_id/:button_id/:timestamp' do
    pp session

    if session[:is_admin] == "true"
        statement = $client.prepare("UPDATE events SET to_ignore = 1 WHERE button_id=? AND timestamp=?;")
        statement.execute(params["button_id"], params["timestamp"])
        "it works!"
    else
        redirect to("/is_admin/#{params['developer_id']}?previous=#{URI.encode(request.url)}")
    end
end

get '/' do
    erb :home
end


#### http://localhost:4567/invalidate_event/3/2/23131