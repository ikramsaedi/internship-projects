require 'optparse'
require 'optimist'
require 'mysql2'

client = Mysql2::Client.new(:host => "intern-party-2.cpj2kqopsdsq.ap-southeast-2.rds.amazonaws.com", :username => "admin", :password => ENV["DB_PASSWORD"], :database => "shauno_buttons")

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
        Optimist::die "Unknown subcommand #{cmd.inspect}" if cmd # if no subcommand is given, we don't want it to die, just move on
    end

cmd_opts[cmd.to_sym] = true if cmd # similarly, if there is no subcommand given, there is no command to store

p main_opts
p cmd_opts

if main_opts[:hello_given]
    puts "Hello #{main_opts[:hello]}!"
end
