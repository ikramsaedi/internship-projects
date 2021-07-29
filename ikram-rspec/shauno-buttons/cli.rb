require 'optparse'
require 'mysql2'

client = Mysql2::Client.new(:host => "intern-party-2.cpj2kqopsdsq.ap-southeast-2.rds.amazonaws.com", :username => "admin", :password => ENV["DB_PASSWORD"], :database => "shauno_buttons")
#puts client
results = client.query("SELECT * FROM reason_pairings GROUP BY reason_id")

results.each do |row|
    p row
end

headers = results.fields
puts types

class Parser
    def self.parse(args)
        options = {}
        opts = OptionParser.new do |opts|
            opts.on("-h", "--hello [PLANET]", "This says hello to the user") { |planet|
                options[:planet] = planet
                puts "hello #{planet ? planet : "world"}!"
            }
        end
        opts.parse(args)
        options
    end
end

options = Parser.parse(ARGV)

