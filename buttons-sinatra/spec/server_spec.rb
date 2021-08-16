require 'mysql2'
require 'rack/test'
require 'irb'

require 'server'

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
            data = JSON.parse last_response.body
            pp data # pp = puts but calls .inspect
            binding.irb
            expect(data.size).to eq(6)
        end
    end
end