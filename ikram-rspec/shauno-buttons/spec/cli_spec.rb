require 'optimist'
require 'mysql2'
require 'pp'

require 'cli'

p $client

describe 'running query functions' do
    #before hook
    before(:all) do

        result = $client.query(File.read("./data/buttons.sql"))

        while $client.next_result #this checks if theres another result left to handle
            # puts result
            result = $client.store_result
        end
    end

    #after hook
    after(:all) do

        result = $client.query(File.read("./data/truncate.sql"))
        while $client.next_result
            result = $client.store_result
        end

    end
    
    context 'list_buttons' do
        it "lists the correct buttons" do
            
        end
    end
end