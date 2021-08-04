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
        it "returns the correct number of buttons" do
            # so how do we test it?
            # counting will be easiest I guess
            expected_num = 6

            result = list_buttons

            expect(result.size).to eq(expected_num)
        end

        it "lists the correct reason with the buttons" do
            result = list_buttons

            correct_reason = "CI is broken"

            expect(result.first["reason"]).to eq(correct_reason)
        end

        it "lists the correct developer with the buttons" do
            result = list_buttons
            correct_name = "Ikram Saedi"

            expect(result.first["name"]).to eq(correct_name)
        end
    end

        
    end
end