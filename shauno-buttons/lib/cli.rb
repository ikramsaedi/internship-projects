require 'optimist'
require 'mysql2'
require 'pp'

require_relative 'subcommands'

database_name = "shauno_buttons"
if ENV["DB_NAME"]
    # puts "we r in the env if statement"
    database_name = ENV["DB_NAME"]
    # puts database_name
end
$client = Mysql2::Client.new(:host => "intern-party-2.cpj2kqopsdsq.ap-southeast-2.rds.amazonaws.com", :username => "admin", :password => ENV["DB_PASSWORD"], :database => database_name, :flags => Mysql2::Client::MULTI_STATEMENTS)


SUB_COMMANDS = %w(list_buttons, add_event, invalidate_event, add_button, invalidate_button, reassign_button) #%w makes these things into a list

commands_info = "
Subcommands include:
    list_buttons        return a list of all buttons, along with their associated reason and developer
    add_event           adds a new event to the events table
    invalidate_event    sets an event to be ignored by statistics
    add_button          adds a button to the table and associates it with the given reason and ID
    invalidate_button   marks the given button as inactive and removes its associations
    reassign_button     removes the given buttons old association and adds a new one. one or both out of the reason and developer must be given"

main_opts = Optimist::options do
    opt :hello, "Says hello to the given thing", :default => "world"
    opt :help, "Show this message"
    stop_on SUB_COMMANDS
    banner commands_info
    banner "Use 'ruby <file path> SUBCOMMAND --help' for more information"
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
    when "invalidate_event"
        Optimist::options do
            opt :developer_id, "The developer who is performing the action", :type => :int, :required => :true
            opt :button_id, "The button ID used in the event", :type => :int, :required => :true
            opt :timestamp, "The timestamp of the event", :type => :string, :required => :true
        end
    when "add_button"
        Optimist::options do
            opt :uuid, "The uuid of the physical button", :type => :string, :required => :true
            opt :reason_id, "The reason ID the button should be assigned to", :type => :int, :required => :true
            opt :developer_id, "The developer ID the button should be assigned to", :type => :int, :required => :true
        end
    when "invalidate_button"
        Optimist::options do 
            opt :developer_id, "The ID of the developer who wants to invalidate the event", :type => :int, :required => :true
            opt :button_id, "The ID of the button to be invalidated", :type => :int, :required => :true
        end
    when "reassign_button"
        Optimist::options do
            opt :button_id, "The ID of the button to be reassigned", :type => :int, :required => :true
            opt :reason_id, "The new reason ID the button should be assigned to", :type => :int
            opt :developer_id, "The new developer ID the button should be assigned to", :type => :int
        end
    else 
        Optimist::die "Unknown subcommand #{cmd.inspect}" if cmd # if no subcommand is given, we don't want it to die, just move on
    end

cmd_opts[:cmd] = cmd if cmd # similarly, if there is no subcommand given, there is no command to store

if main_opts[:hello_given]
    puts "Hello #{main_opts[:hello]}!"
end

if cmd_opts 
    case cmd_opts[:cmd] 
        when "list_buttons"
            puts "list buttons subcommand called"

            results = Subcommands::list_buttons

            results.each do |row|
                p row
            end
        when "add_event"
            Subcommands::add_event(cmd_opts[:button_id], cmd_opts[:timestamp], cmd_opts[:developer], cmd_opts[:reason])
        when "invalidate_event"
            Subcommands::invalidate_event(cmd_opts[:developer_id], cmd_opts[:button_id], cmd_opts[:timestamp])
        else # nothing?
    end
end

