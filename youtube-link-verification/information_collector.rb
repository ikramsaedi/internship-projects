require 'bundler/setup'

require "json"
require "csv"

require "httparty"

require "pp"

videos_json = JSON.parse(File.read("/Users/devonmckenzie/Downloads/videos.json"))
videos_csv = CSV.parse(File.read("/Users/devonmckenzie/Downloads/Digital resource licenses - Videos.csv"), headers: true)

video_types = {"1" => "Upload", "2" => "YouTube", "3" => "Vimeo", "5" => "BTN"} # types taken from the video.proto file in the monorepo

CSV.open("./output.csv", "wb") do |csv|
    csv << ["Location in Stile", "Type of video", "Location of video"]
    videos_json["videos"].each do |elem|
        puts "Location in Stile: #{elem["location"]}"
        puts "Type of video: #{video_types[elem["video_descriptor"]["type"].to_s]}"
        puts "Link to video: #{"https://youtube.com/watch?v=" + elem["video_descriptor"]["foreign_id"]}" if elem["video_descriptor"]["type"] == 2
        puts "Link to video: #{"https://vimeo.com/" + elem["video_descriptor"]["foreign_id"]}" if elem["video_descriptor"]["type"] == 3

        if elem["video_descriptor"]["type"] == 1
            response = HTTParty.post("https://stileapp.com/api/au/v3/uploads/batch/get", body:JSON.generate({uploadIds: [elem["video_descriptor"]["foreign_id"]]}), headers:{'Content-Type' => 'application/json', "x-stile-session" => "SESSION_TOKEN"})
            if response.code == 200
            upload = response.parsed_response["getResponses"][0]["upload"]
            original_file_id = upload["originalFileId"]
            upload_files = upload["uploadFiles"]

            upload_files.each do |el|
                if el["id"] == original_file_id
                    puts el["absoluteAttachmentOrDownloadUrl"]
                end
            end
        else 
            puts "Cannot find video upload"
        end
        end

        puts "__________________"

        video_link = ""
        video_link = "https://youtube.com/watch?v=" + elem["video_descriptor"]["foreign_id"] if elem["video_descriptor"]["type"] == 2
        video_link = "https://vimeo.com/" + elem["video_descriptor"]["foreign_id"] if elem["video_descriptor"]["type"] == 3

        if elem["video_descriptor"]["type"] == 1
            response = HTTParty.post("https://stileapp.com/api/au/v3/uploads/batch/get", body:JSON.generate({uploadIds: [elem["video_descriptor"]["foreign_id"]]}), headers:{'Content-Type' => 'application/json', "x-stile-session" => "WPwtzkXrPO3jVe6NfIIYDgUh6vthVEyMVJw5La_nF3k"})
            if response.code == 200
            upload = response.parsed_response["getResponses"][0]["upload"]
            original_file_id = upload["originalFileId"]
            upload_files = upload["uploadFiles"]

            upload_files.each do |el|
                if el["id"] == original_file_id
                    video_link = el["absoluteAttachmentOrDownloadUrl"]
                end
            end
        else 
            puts "Cannot find video upload"
        end
        end

        csv << [elem["location"], video_types[elem["video_descriptor"]["type"].to_s], video_link]
    end
end
