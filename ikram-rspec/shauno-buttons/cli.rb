require 'optparse'
require 'mysql2'

client = Mysql2::Client.new(:host => "intern-party-2.cpj2kqopsdsq.ap-southeast-2.rds.amazonaws.com", :username => "admin", :password => ENV["DB_PASSWORD"], :database => "shauno_buttons")

subtext = <<HELP
Common subcommands include: 
    list_buttons [options]

Use SUBCOMMAND --help for more information
HELP

main = OptionParser.new do |opts|
    opts.banner = "Usage: cli.rb [options] [subcommand [options]]"

    opts.on("-h", "--hello [PLANET]", "This says hello to the PLANET provided (defaults to world)") { |planet|
        puts "hello #{planet ? planet : "world"}!"
    }

    opts.separator ""
    opts.separator subtext 
end

subcommands = {
    'list_buttons' => OptionParser.new do |opts|
        opts.on() {
            results = client.query(
            "SELECT developer_pairings.button_id, reason, name FROM reason_pairings 
            JOIN developer_pairings ON reason_pairings.button_id=developer_pairings.button_id 
            JOIN reasons ON reason_pairings.reason_id=reasons.id 
            JOIN developers ON developer_pairings.developer_id=developers.id"
            )

            results.each do |row|
                p row
            end
        }

        opts.on("-t", "--test", "This is a test options") { puts "testing?" }
    end,


    # this one is currently commented out as it requires further work

    # 'add_event' => OptionParser.new do |opts|
    #     opts.on() {
    #         results = client.query(
    #         "INSERT INTO events (button_id, timestamp, developers_id, reason_id) VALUES (#{input[0]}, '#{input[1]}', #{input[2]}, #{input[3]});"
    #         )
    #     }
    # end
}

main.order!(ARGV)

command = ARGV.shift

unless command == nil # why can't i just use nil as falsy??
    subcommands[command].order!
end