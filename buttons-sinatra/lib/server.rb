require 'sinatra'
require "sinatra/reloader" if development?

require 'mysql2'

database_name = "shauno_buttons"
if ENV["DB_NAME"]
    # puts "we r in the env if statement"
    database_name = ENV["DB_NAME"]
    # puts database_name
end

$client = Mysql2::Client.new(:host => "intern-party-2.cpj2kqopsdsq.ap-southeast-2.rds.amazonaws.com", :username => "admin", :password => ENV["DB_PASSWORD"], :database => database_name, :flags => Mysql2::Client::MULTI_STATEMENTS)

post '/frank-says' do
    request.body.rewind  # in case someone already read it
    data = JSON.parse request.body.read
    "Put this in your pipe & smoke it! #{data['name']}"
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
        # halt 404
        raise Sinatra::NotFound
    end
end

post '/add_event' do
    statement = $client.prepare("INSERT INTO events (button_id, timestamp, developers_id, reason_id) VALUES (?, ?, ?, ?);")
    statement.execute(button_id, timestamp, developer, reason)
end

get '/is_admin/:developer_id' do
    params["developer_id"]
end

not_found do #calling the method and passing it block
    "Error 404: We couldn't find that ;-;\n"
end