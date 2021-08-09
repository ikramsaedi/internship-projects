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
        let(:button_id) { 2 }
        let(:timestamp) { "2021-3-2 06:24:49" }
        let(:developer_id) { 1 }
        let(:reason_id) { 3 }

        it "successfully adds event when given valid information" do
            Subcommands::add_event(button_id, timestamp, developer_id, reason_id)

            result = $client.query("SELECT button_id, DATE_FORMAT(timestamp, '%Y-%c-%e %H:%i:%s') AS timestamp, developers_id, reason_id, to_ignore FROM events WHERE button_id=#{button_id} AND timestamp='#{timestamp}';")

            result = result.first

            expected = {"button_id" => button_id, "timestamp" => timestamp, "developers_id" => developer_id, "reason_id" => reason_id, "to_ignore" => 0}

            expect(result).to eq(expected)
        end

        it "does not insert event into table when timestamp is missing" do
            timestamp = nil

            expect {Subcommands::add_event(button_id, timestamp, developer_id, reason_id)}.to raise_error(Mysql2::Error)
        end

        it "does not insert event into table when button is missing" do
            button_id = nil

            expect {Subcommands::add_event(button_id, timestamp, developer_id, reason_id)}.to raise_error(Mysql2::Error)
        end

        it "does not insert event into table when developer_id is missing" do
            developer_id = nil

            expect {Subcommands::add_event(button_id, timestamp, developer_id, reason_id)}.to raise_error(Mysql2::Error)
        end

        it "does not insert event into table when reason_id is missing" do
            reason_id = nil

            expect {Subcommands::add_event(button_id, timestamp, developer_id, reason_id)}.to raise_error(Mysql2::Error)
        end
    end
    
    context "checking if a developer is an admin" do
        it "succeeds if the developer is an admin" do
            expect(Subcommands::is_admin!(3)).to be true
        end

        it "errors if the developer is not an admin" do
            expect {Subcommands::is_admin!(2)}.to raise_error(Subcommands::NoPermissionError)
        end

        it "errors if the developer_id does not exist in the table" do
            expect {Subcommands::is_admin!(6)}.to raise_error(Subcommands::NoPermissionError)
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

    context "add button" do
        it "adds button successfully" do
            uuid = "fa22866c-f8af-11eb-9a03-0242ac130003"
            Subcommands::add_button(uuid)

            query_text = "SELECT uuid FROM buttons WHERE uuid=?"
            statement = $client.prepare(query_text)
            result = statement.execute(uuid)

            expect(result.first["uuid"]).to eq(uuid)
        end

        it "throws an error if the uuid is already in the table" do #this requires adding a constraint
            uuid = "467fa190-d806-4d45-9eda-08e322d6fccf"

            expect {Subcommands::add_button(uuid)}.to raise_error(Mysql2::Error)
        end

        it "does not insert into table when uuid is missing" do
            uuid = nil

            expect {Subcommands::add_button(uuid)}.to raise_error(Mysql2::Error)
        end
    end

    
end