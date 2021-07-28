require 'optparse'

class Parser
    def self.parse(args)
        options = {}
        opts = OptionParser.new do |opts|
            opts.on("-h", "--hello", "This says hello to the user") {
                puts "hello world!"
            }
        end
        opts.parse(args)
        options
    end
end

options = Parser.parse(ARGV)