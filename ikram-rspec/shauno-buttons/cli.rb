require 'optparse'
require 'mysql2'

class Parser
    @@client = Mysql2::Client.new(:host => "intern-party-2.cpj2kqopsdsq.ap-southeast-2.rds.amazonaws.com", :username => "admin", :password => ENV["DB_PASSWORD"], :database => "shauno_buttons")

    def self.parse(args)
        options = {}
        opts = OptionParser.new do |opts|
            opts.on("-h", "--hello [PLANET]", "This says hello to the PLANET provided (defaults to world)") { |planet|
                options[:planet] = planet
                puts "hello #{planet ? planet : "world"}!"
            }
            opts.on("-b", "--list-buttons", "This will return all the buttons, along with assigned reason and developer") {
                results = @@client.query(
                    "SELECT developer_pairings.button_id, reason, name FROM reason_pairings 
                    JOIN developer_pairings ON reason_pairings.button_id=developer_pairings.button_id 
                    JOIN reasons ON reason_pairings.reason_id=reasons.id 
                    JOIN developers ON developer_pairings.developer_id=developers.id"
                    )

                results.each do |row|
                    p row
                end
            }
            
        end
        opts.parse(args)
        options
    end
end

options = Parser.parse(ARGV)

