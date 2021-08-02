require 'optimist'
require 'mysql2'
require 'pp'

require 'cli'

p $client

describe 'running query functions' do
    #before hook
    before(:all) do
        #test setup ->inserting into tables 
        # p "this is file! #{"./data/buttons.sql".readlines.map(&:chomp)}"
        # $client.query("./data/buttons.sql".readlines.map(&:chomp))

        File.foreach("./data/buttons.sql") do |line|
            $client.query(line)
        end
    end

    #after hook
    after(:all) do
        #deleting test data
    end
    
    context 'list_buttons' do
        it "lists the correct buttons" do
            #somethig
        end
    end
end