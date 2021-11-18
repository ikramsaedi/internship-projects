puts "how does the api work :("

require 'dotenv'
require 'httparty'
require 'base64'
require 'json'

Dotenv.load

auth_raw = ENV['EMAIL'] + ':' + ENV["API_KEY"] # has to be EMAIL and not USER, otherwise dotenv automatically trims it at the @, breaking the authentication
# puts "raw: " + auth_raw
# puts "encoded: " + Base64.urlsafe_encode64(auth_raw)

headers = { 
  "Content-Type" => "application/json",
  "Authorization" => "Basic " + Base64.urlsafe_encode64(auth_raw) # we need to create an encoded string to put here
}

result = HTTParty.get(
   "https://stileeducation.atlassian.net/wiki/rest/api/space", 
   :headers => headers
)

# pp result

json_result = JSON.generate(result)

file = File.open("result.json", "w")

file.write()

file.close

# puts result["results"][1]["id"]

for space in result["results"] do
  puts space["name"] + " : " + space["id"].to_s
end
