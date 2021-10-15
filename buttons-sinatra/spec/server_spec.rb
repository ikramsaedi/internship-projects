require 'mysql2'
require 'rack/test'
require 'irb'

require 'server'

require 'uri'

describe "Sinatra App" do
    include Rack::Test::Methods

    def app
        Sinatra::Application
    end

    before(:all) do

        result = $client.query(File.read("./data/truncate.sql"))
        while $client.next_result
            result = $client.store_result
        end

        result = $client.query(File.read("./data/setup.sql"))

        while $client.next_result #this checks if theres another result left to handle
            result = $client.store_result
        end
    end

    context "/buttons" do
        it "returns buttons" do
            get "/buttons"
            result = JSON.parse last_response.body
            expect(result.size).to eq(6)
        end

        it "lists the correct reason with the buttons" do
            get "/buttons"
            result = JSON.parse last_response.body
            correct_reason = "CI is broken"
            expect(result.first["reason"]).to eq(correct_reason)
        end

        it "lists the correct developer with the buttons" do
            get "/buttons"
            result = JSON.parse last_response.body
            correct_name = "Ikram Saedi"

            expect(result.first["name"]).to eq(correct_name)
        end
    end

    context "/buttons/:id" do
        it "returns the correct button uuid and is_active value" do
            get "/buttons/1"
            result = JSON.parse last_response.body

            correct_uuid = "d167cd3a-2314-47d7-8d0a-e55bc69608df"
            expect(result["uuid"]).to eq(correct_uuid)
            expect(result["is_active"]).to eq(1)
        end

        it "throws a 404 error when button_id passed in does not exist" do
            get "buttons/500"

            expect(last_response.status).to eq(404)
        end
    end

    context "add_event" do
        let(:button_id) { 2 }
        let(:timestamp) { "2021-3-2 06:24:49" }
        let(:developer_id) { 1 }
        let(:reason_id) { 3 }

        it "successfully adds event when given valid information" do
            # Subcommands::add_event(button_id, timestamp, developer_id, reason_id)
            get "/add_event/#{button_id}/#{URI.encode(timestamp)}/#{developer_id}/#{reason_id}"
            # pp last_response.body
            expect(last_response.status).to eq(200)

            result = $client.query("SELECT button_id, DATE_FORMAT(timestamp, '%Y-%c-%e %H:%i:%s') AS timestamp, developers_id, reason_id, to_ignore FROM events WHERE button_id=#{button_id} AND timestamp='#{timestamp}';")

            result = result.first

            expected = {"button_id" => button_id, "timestamp" => timestamp, "developers_id" => developer_id, "reason_id" => reason_id, "to_ignore" => 0}

            expect(result).to eq(expected)
        end

        it "does not insert event into table when timestamp is missing" do
            timestamp = "" # this causes an error in URI.encode. how can we get around that without making it a weird test case (like skipping the encode)
            get "/add_event/#{button_id}/#{URI.encode(timestamp)}/#{developer_id}/#{reason_id}"

            expect(last_response.status).to eq(404)
        end

        it "does not insert event into table when button is missing" do
            button_id = nil

            get "/add_event/#{button_id}/#{URI.encode(timestamp)}/#{developer_id}/#{reason_id}"

            expect(last_response.status).to eq(404)
        end

        it "does not insert event into table when developer_id is missing" do
            developer_id = nil

            get "/add_event/#{button_id}/#{URI.encode(timestamp)}/#{developer_id}/#{reason_id}"

            expect(last_response.status).to eq(404)
        end

        it "does not insert event into table when reason_id is missing" do
            reason_id = nil

            get "/add_event/#{button_id}/#{URI.encode(timestamp)}/#{developer_id}/#{reason_id}"

            expect(last_response.status).to eq(404)
        end

        it "does not insert event into table when timestamp is invalid" do
            timestamp = "gobblydegook"
            get "/add_event/#{button_id}/#{URI.encode(timestamp)}/#{developer_id}/#{reason_id}"

            expect(last_response.status).to eq(400)
        end

        it "does not insert event into table when button is invalid" do
            button_id = "gobblydegook"
            get "/add_event/#{button_id}/#{URI.encode(timestamp)}/#{developer_id}/#{reason_id}"

            expect(last_response.status).to eq(400)
        end

        it "does not insert event into table when developer_id is invalid" do
            developer_id = "gobblydegook"
            get "/add_event/#{button_id}/#{URI.encode(timestamp)}/#{developer_id}/#{reason_id}"

            expect(last_response.status).to eq(400) 
        end

        it "does not insert event into table when reason_id is invalid" do
            reason_id = "gobblydegook"
            get "/add_event/#{button_id}/#{URI.encode(timestamp)}/#{developer_id}/#{reason_id}"

            expect(last_response.status).to eq(400)
        end
    end

    context "add button" do
        let(:uuid) { "fa22866c-f8af-11eb-9a03-0242ac130003" }
        let(:reason_id) { 3 }
        let(:developer_id) { 1 }

        it "adds button successfully" do
            get "/add_button/#{uuid}/#{reason_id}/#{developer_id}"
            expect(last_response.status).to eq(200)

            statement = $client.prepare("SELECT button_id, uuid FROM buttons WHERE uuid=?")
            result = statement.execute(uuid)
            result = result.first

            expect(result["uuid"]).to eq(uuid)

            db_button_id = result["button_id"]

            statement = $client.prepare("SELECT button_id, reason_id FROM reason_pairings WHERE button_id=?")
            result = statement.execute(db_button_id)
            result = result.first

            expect(result["button_id"]).to eq(db_button_id)
            expect(result["reason_id"]).to eq(reason_id)

            statement = $client.prepare("SELECT button_id, developer_id FROM developer_pairings WHERE button_id=?")
            result = statement.execute(db_button_id)
            result = result.first

            expect(result["button_id"]).to eq(db_button_id)
            expect(result["developer_id"]).to eq(developer_id)
            
        end

        it "throws an error if the uuid is already in the table" do #this requires adding a constraint
            uuid = "467fa190-d806-4d45-9eda-08e322d6fccf"
            get "/add_button/#{uuid}/#{reason_id}/#{developer_id}"
            expect(last_response.status).to eq(409)
        end

        it "does not insert into table when uuid is missing" do
            uuid = nil
            get "/add_button/#{uuid}/#{reason_id}/#{developer_id}"
            expect(last_response.status).to eq(404)
        end

        it "does not insert into table when reason_id is missing" do
            reason_id = nil
            get "/add_button/#{uuid}/#{reason_id}/#{developer_id}"
            expect(last_response.status).to eq(404)
        end

        it "does not insert into table when developer_id is missing" do
            developer_id = nil
            get "/add_button/#{uuid}/#{reason_id}/#{developer_id}"
            expect(last_response.status).to eq(404)
        end
    end

    context "invalidate button" do
        let(:button_id) { 1 }
        let(:developer_id) { 3 }

        it "invalidates button successfully" do
            get "/invalidate_button/#{developer_id}/#{button_id}"
            follow_redirect!
            follow_redirect!
            expect(last_response.status).to eq(200)

            statement = $client.prepare("SELECT is_active FROM buttons WHERE button_id=?;")
            result = statement.execute(button_id)
            result = result.first

            expect(result["is_active"]).to eq(0) 

            statement = $client.prepare("SELECT CURRENT FROM reason_pairings WHERE button_id=?;")
            result = statement.execute(button_id)
            result = result.first

            expect(result["CURRENT"]).to eq(0)

            statement = $client.prepare("SELECT CURRENT FROM developer_pairings WHERE button_id=?;")
            result = statement.execute(button_id)
            result = result.first

            expect(result["CURRENT"]).to eq(0)
        end

        it "errors when the developer is not an admin" do
            developer_id = 2
            get "/invalidate_button/#{developer_id}/#{button_id}"
            follow_redirect!

            expect(last_response.status).to eq(403)
        end
    
        it "errors when button id is missing" do
            button_id = nil
            get "/invalidate_button/#{developer_id}/#{button_id}"

            expect(last_response.status).to eq(404)
        end

        it "errors when developer id is missing" do
            developer_id = nil
            get "/invalidate_button/#{developer_id}/#{button_id}"
            expect(last_response.status).to eq(404)
        end
    end
    
    context "reassign button" do
        let(:button_id) { 2 }
        let(:new_reason_id) { 2 }
        let(:new_developer_id) {2}

        it "successfully assigns a new reason" do
            new_developer_id = nil

            get "/reassign_button/#{button_id}?reason_id=#{new_reason_id}"

            expect(last_response.status).to eq(200)

            statement = $client.prepare("SELECT button_id, reason_id FROM reason_pairings WHERE button_id=? AND reason_id=?;")
            result = statement.execute(button_id, new_reason_id).first

            expect(result["button_id"]).to eq(button_id)
            expect(result["reason_id"]).to eq(new_reason_id)
        end
        
        it "successfully assigns a new developer" do
            new_reason_id = nil

            get "/reassign_button/#{button_id}?developer_id=#{new_developer_id}"

            expect(last_response.status).to eq(200)

            statement = $client.prepare("SELECT button_id, developer_id FROM developer_pairings WHERE button_id=? AND developer_id=?;")
            result = statement.execute(button_id, new_developer_id).first

            expect(result["button_id"]).to eq(button_id)
            expect(result["developer_id"]).to eq (new_developer_id)

        end
        
        it "successfully assigns both a new developer and reason" do
            get "/reassign_button/#{button_id}?reason_id=#{new_reason_id}&developer_id=#{new_developer_id}"

            expect(last_response.status).to eq(200)

            statement = $client.prepare("SELECT button_id, reason_id FROM reason_pairings WHERE button_id=? AND reason_id=?;")
            result = statement.execute(button_id, new_reason_id).first

            expect(result["button_id"]).to eq(button_id)
            expect(result["reason_id"]).to eq(new_reason_id)

            statement = $client.prepare("SELECT button_id, developer_id FROM developer_pairings WHERE button_id=? AND developer_id=?;")
            result = statement.execute(button_id, new_developer_id).first

            expect(result["developer_id"]).to eq (new_developer_id)
        end

        it "throws errors when button provided is inactive" do
            button_id = 1 #inactive button
            get "/reassign_button/#{button_id}?reason_id=#{new_reason_id}&developer_id=#{new_developer_id}"
            
            expect(last_response.status).to eq(404)
        end

        it "throws error when neither reason id or developer id is given" do
            new_developer_id = nil
            new_reason_id = nil

            get "/reassign_button/#{button_id}"

            expect(last_response.status).to eq(400)
        end
    end
end