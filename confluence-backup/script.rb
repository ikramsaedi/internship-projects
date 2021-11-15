puts "how does the api work :("

require 'dotenv'
require 'httparty'
require "base64"

Dotenv.load

auth_raw = "ikram.saedi@stileeducation.com:" + ENV["API_KEY"]
# puts "raw: " + auth_raw
# puts "encoded: " + Base64.urlsafe_encode64(auth_raw)

headers = { 
  "Content-Type" => "application/json",
  "Authorization" => "Basic " + Base64.urlsafe_encode64(auth_raw) # we need to create an encoded string to put here
}

spaces = HTTParty.get(
  "https://stileeducation.atlassian.net/wiki/rest/api/space", 
  :headers => headers
)

pp spaces