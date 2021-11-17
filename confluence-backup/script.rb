puts "how does the api work :("

require 'dotenv'
require 'httparty'
require "base64"
require 'json'

Dotenv.load

auth_raw = "ikram.saedi@stileeducation.com:" + ENV["API_KEY"]
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
