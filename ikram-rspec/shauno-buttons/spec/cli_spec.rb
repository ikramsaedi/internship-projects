require 'optimist'
require 'mysql2'
require 'pp'

require 'cli'
require 'subcommands'

describe Subcommands do
    before(:all) do

        result = $client.query(File.read("./data/setup.sql"))

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

            result = Subcommands::list_buttons

            expect(result.size).to eq(expected_num)
        end

        it "lists the correct reason with the buttons" do
            result = Subcommands::list_buttons

            correct_reason = "CI is broken"

            expect(result.first["reason"]).to eq(correct_reason)
        end

        it "lists the correct developer with the buttons" do
            result = Subcommands::list_buttons
            correct_name = "Ikram Saedi"

            expect(result.first["name"]).to eq(correct_name)
        end
    end

    context "add_event" do
        it "successfully adds event when given valid information" do
            button_id = 2
            timestamp = "2021-3-2 06:24:49"
            developer_id = 1
            reason_id = 3

            Subcommands::add_event(button_id, timestamp, developer_id, reason_id)

            result = $client.query("SELECT button_id, DATE_FORMAT(timestamp, '%Y-%c-%e %H:%i:%s') AS timestamp, developers_id, reason_id, to_ignore FROM events WHERE button_id=#{button_id} AND timestamp='#{timestamp}';")

            result = result.first

            expected = {"button_id" => button_id, "timestamp" => timestamp, "developers_id" => developer_id, "reason_id" => reason_id, "to_ignore" => 0}

            expect(result).to eq(expected)
        end

        it "does not insert event into table when timestamp is missing" do
            timestamp = nil
            button_id = 4
            developer_id = 3
            reason_id = 1

            expect {Subcommands::add_event(button_id, timestamp, developer_id, reason_id)}.to raise_error(Mysql2::Error)
        end

        it "does not insert event into table when button is missing" do
            timestamp = "2020-07-08 12:04:01"
            button_id = nil
            developer_id = 3
            reason_id = 1

            expect {Subcommands::add_event(button_id, timestamp, developer_id, reason_id)}.to raise_error(Mysql2::Error)
        end

        it "does not insert event into table when developer_id is missing" do
            timestamp = "2020-07-08 12:04:01"
            button_id = 4
            developer_id = nil
            reason_id = 1

            expect {Subcommands::add_event(button_id, timestamp, developer_id, reason_id)}.to raise_error(Mysql2::Error)
        end

        it "does not insert event into table when reason_id is missing" do
            timestamp = "2020-07-08 12:04:01"
            button_id = 4
            developer_id = 3
            reason_id = nil

            expect {Subcommands::add_event(button_id, timestamp, developer_id, reason_id)}.to raise_error(Mysql2::Error)
        end
    end
    #functions we haven't written yet
    
    context "checking if a developer is an admin" do
        it "succeeds if the developer is an admin" do
            expect(Subcommands::is_admin(3)).to be true
        end

        it "errors if the developer is not an admin" do
            expect {Subcommands::is_admin(2)}.to raise_error(Subcommands::NoPermissionError)
        end
    end

    context "invalidate event" do
        it "succeeds when supplied with an admin user" do
            button_id = 6
            timestamp = '2021-08-03 05:39:47'
            developer_id = 3

            Subcommands::invalidate_event(developer_id, button_id, timestamp)

            result = $client.query("SELECT to_ignore FROM events WHERE button_id=#{button_id} AND timestamp='#{timestamp}'")

            expect(result.first).to eq({"to_ignore" => 1})
        end
        
        it "raises a custom error when the user is not a admin" do
            button_id = 4
            timestamp = "2021-6-12 03:22:43"
            developer_id = 2

            expect {Subcommands::invalidate_event(developer_id, button_id, timestamp)}.to raise_error(Subcommands::NoPermissionError)
        end
    end
end