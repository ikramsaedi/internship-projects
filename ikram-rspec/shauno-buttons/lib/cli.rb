require 'optimist'
require 'mysql2'
require 'pp'

database_name = "shauno_buttons"
if ENV["DB_NAME"]
    # puts "we r in the env if statement"
    database_name = ENV["DB_NAME"]
    # puts database_name
end
$client = Mysql2::Client.new(:host => "intern-party-2.cpj2kqopsdsq.ap-southeast-2.rds.amazonaws.com", :username => "admin", :password => ENV["DB_PASSWORD"], :database => database_name, :flags => Mysql2::Client::MULTI_STATEMENTS)

def list_buttons()
    return $client.query(
        "SELECT developer_pairings.button_id, reason, name FROM reason_pairings 
        JOIN developer_pairings ON reason_pairings.button_id=developer_pairings.button_id 
        JOIN reasons ON reason_pairings.reason_id=reasons.id 
        JOIN developers ON developer_pairings.developer_id=developers.id;")
end

def add_event(button_id, timestamp, developer, reason) 
    query_text = "INSERT INTO events (button_id, timestamp, developers_id, reason_id) VALUES (?, ?, ?, ?);"
    statement = $client.prepare(query_text)
    statement.execute(button_id, timestamp, developer, reason)
end

SUB_COMMANDS = %w(list_buttons, add_event) #%w makes these things into a list

main_opts = Optimist::options do
    opt :hello, "Says hello to the given thing", :default => "world"
    stop_on SUB_COMMANDS
end

cmd = ARGV.shift

cmd_opts = case cmd
    when "list_buttons"
        Optimist::options do
            banner "This subcommand does not have any options"
        end
    when "add_event"
        Optimist::options do
            opt :button_id, "The ID of the button in the event", :type => :int, :required => true
            opt :timestamp, "The timestamp of the event", :type => :string, :required => true
            opt :reason, "The reason ID of the event", :type => :int, :required => true
            opt :developer, "The developer ID who triggered the event", :type => :int, :required => true

        end

    else 
        # puts "we dieeeee"
        Optimist::die "Unknown subcommand #{cmd.inspect}" if cmd # if no subcommand is given, we don't want it to die, just move on
    end

cmd_opts[:cmd] = cmd if cmd # similarly, if there is no subcommand given, there is no command to store

# p main_opts
# p cmd_opts

if main_opts[:hello_given]
    puts "Hello #{main_opts[:hello]}!"
end

if cmd_opts 
    case cmd_opts[:cmd] 
        when "list_buttons"
            puts "list buttons subcommand called"

            results = list_buttons

            results.each do |row|
                p row
            end
        when "add_event"
            add_event(cmd_opts[:button_id], cmd_opts[:timestamp], cmd_opts[:developer], cmd_opts[:reason])
        else # nothing?
    end
end

