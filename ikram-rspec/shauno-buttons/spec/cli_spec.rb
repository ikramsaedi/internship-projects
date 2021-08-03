require 'optimist'
require 'mysql2'
require 'pp'

require 'cli'

describe 'running query functions' do
    before(:all) do

        result = $client.query(File.read("./data/buttons.sql"))

        while $client.next_result #this checks if theres another result left to handle
            result = $client.store_result
        end
    end

    after(:all) do

        result = $client.query(File.read("./data/truncate.sql"))
        while $client.next_result
            result = $client.store_result
        end

    end
    
    context 'list_buttons' do
        it "lists the correct buttons" do
            # so how do we test it?
            # counting will be easiest I guess
            expected_num = 6

            result = list_buttons
            puts "this is class #{result.class}"
            

            puts "i can use length: #{result.respond_to?(:length)}"

            puts "the size is #{result.size}"

 
            expect(result.size).to eq(expected_num)
        end

        
    end
end