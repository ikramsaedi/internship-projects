=begin
 -> read file with youtube links
 -> iterate through items in array
    -> for each, isolate the address and make a http request
    -> depending on response, save info abt vid + response
 -> return summary of responses
=end

require 'bundler/setup'

require "json"
require "csv"

videos_json = JSON.parse(File.read("/Users/devonmckenzie/Downloads/videos.json"))

videos_csv = CSV.parse(File.read("/Users/devonmckenzie/Downloads/Digital resource licenses - Videos.csv"), headers: true)


platform_videos = []

videos_json.each do |k, v| 
    # v is an array of video hashes
    v.each do |video|
        if video["video_descriptor"]["type"] == 2

            temp = {
                location: video["location"],
                id: video["video_descriptor"]["foreign_id"]
            }

            platform_videos.push temp
        end
    end
end


def isolate_id(link)
    if link.include? "www.youtube.com/watch?time_continue="
        # so how do we separate out this one??
        return link[link.index("v=") + 2, 11]
    end

    if link.include? "www.youtube.com/watch?v="
        # variable = string[index to start at, number of letters to get]
        return link["https://www.youtube.com/watch?v=".length, 11]
    end

    if link.include? "youtu.be/"
        return link["https://youtu.be/".length, 11]
    end

end

spreadsheet_videos =[] #videos that r youtube videos from licensing spreadsheet

videos_csv.each do |e|
    # puts e["YouTube link"]
    if !e["YouTube link"].nil? && (e["YouTube link"].include?("youtube") || e["YouTube link"].include?("youtu.be"))

        temp = {status: e["STATUS"], link: e["YouTube link"], id: isolate_id(e["YouTube link"])}
        spreadsheet_videos.push(temp)
        # puts "Valid link!"
    else
        # puts "no"
    end
    # puts "___________"
end

platform_videos.each do |el|
    spreadsheet_videos.each do |el2|
        #puts "el: #{el[:id]}, el2 #{el2[:id]}"
        if el2[:id] == el[:id]
            puts "#{el[:id]}: #{el2[:status]}"
        else
            # puts "no id to be found"
        end
    end
end



# puts "****************"

# puts spreadsheet_videos
# puts "****************"
# puts platform_videos



# license_videos.each do |elem|
#     elem.each do |k,v|
#         puts "#{k}: #{v}"
#     end
#     puts "____________"
# end 

# license_videos.each do |e|
#     if e["YouTube link"].include?("youtu.be")
#         puts e["YouTube link"]
#     end
# end