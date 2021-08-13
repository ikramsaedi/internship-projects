module Subcommands 
    class NoPermissionError < StandardError
        def message
            "Please check your permissions and try again."
        end
    end

    class InvalidDataError < StandardError
        def message
            "Please provide all required data to run this command."
        end
    end

    class InactiveButtonError < StandardError
        def message
            "You cannot reassign a button that is inactive."
        end
    end

    def self.list_buttons()
        return $client.query(
            "SELECT developer_pairings.button_id, reason, name FROM reason_pairings 
            JOIN developer_pairings ON reason_pairings.button_id=developer_pairings.button_id 
            JOIN reasons ON reason_pairings.reason_id=reasons.id 
            JOIN developers ON developer_pairings.developer_id=developers.id;")
    end

    def self.add_event(button_id, timestamp, developer, reason) 
        statement = $client.prepare("INSERT INTO events (button_id, timestamp, developers_id, reason_id) VALUES (?, ?, ?, ?);")
        statement.execute(button_id, timestamp, developer, reason)
    end

    def self.is_admin!(developer_id)
        statement = $client.prepare("SELECT is_admin FROM developers WHERE id=?")
        result = statement.execute(developer_id).first

        if result && result["is_admin"] == 1 #check if result exists and if the dev is an admin
            return true
        else
            raise NoPermissionError
            # return false
        end
    end

    def self.invalidate_event(developer_id, button_id, timestamp)
        if is_admin!(developer_id)
            statement = $client.prepare("UPDATE events SET to_ignore = 1 WHERE button_id=? AND timestamp=?;")
            statement.execute(button_id, timestamp)
        end
    end

    def self.add_button(uuid, reason_id, developer_id)
        statement = $client.prepare("INSERT INTO buttons (uuid) VALUES (?);")
        statement.execute(uuid)

        statement = $client.prepare("SELECT button_id FROM buttons WHERE uuid=?;")
        result = statement.execute(uuid)
        id = result.first["button_id"]

        statement = $client.prepare("INSERT INTO reason_pairings (button_id, reason_id) VALUES (?, ?);")
        statement.execute(id, reason_id)

        statement = $client.prepare("INSERT INTO developer_pairings (button_id, developer_id) VALUES (?, ?);")
        statement.execute(id, developer_id)
    end

    def self.invalidate_button(developer_id, button_id)
        if is_admin!(developer_id)
            if button_id
                statement = $client.prepare("UPDATE buttons SET is_active=0 WHERE button_id=?;")
                statement.execute(button_id)

                statement = $client.prepare("UPDATE reason_pairings SET CURRENT=0 WHERE button_id=?;")
                statement.execute(button_id)

                statement = $client.prepare("UPDATE developer_pairings SET CURRENT=0 WHERE button_id=?;")
                statement.execute(button_id)
            else
                raise InvalidDataError
            end
        end
    end

    def self.reassign_button(button_id, reason_id, developer_id)
        # check if at least one of the things to update has been given, and throw an error if not
        if !reason_id && !developer_id
            raise InvalidDataError
        end

        #check that the button provided has not been deactivated
        statement = $client.prepare("SELECT is_active FROM buttons WHERE button_id=?;")
        result = statement.execute(button_id).first

        if result["is_active"] == 0
            raise InactiveButtonError
        end

        if reason_id # if a new reason is given

            # invalidate any existing reasons
            statement = $client.prepare("UPDATE reason_pairings SET CURRENT=0 WHERE button_id=?;")
            statement.execute(button_id)

            # add the new reason
            statement = $client.prepare("INSERT INTO reason_pairings (button_id, reason_id) VALUES (?, ?);")
            statement.execute(button_id, reason_id)
        end

        if developer_id # do the same if a new developer was given

            # invalidate any existing developers
            statement = $client.prepare("UPDATE developer_pairings SET CURRENT=0 WHERE button_id=?;")
            statement.execute(button_id)

            # add the new developer
            statement = $client.prepare("INSERT INTO developer_pairings (button_id, developer_id) VALUES (?, ?);")
            statement.execute(button_id, developer_id)
        end
    end

    def self.list_timeblocks()
        query_text = "
            SELECT
                timeblocks.timeblock_id,
                developers.name AS developer,
                reasons.reason,
                DATE_FORMAT(min(timeblock_mapping.TIMESTAMP), '%Y-%c-%e %H:%i:%s') AS start,
                DATE_FORMAT(max(timeblock_mapping.TIMESTAMP), '%Y-%c-%e %H:%i:%s') AS end
            FROM
                timeblocks
                JOIN timeblock_mapping ON timeblocks.timeblock_id = timeblock_mapping.timeblock_id
                JOIN developers ON timeblocks.developer_id = developers.id
                JOIN reasons ON timeblocks.reason_id = reasons.id
            GROUP BY
                timeblocks.timeblock_id
            ORDER BY
                timeblocks.timeblock_id; "
        
        return $client.query(query_text)
    end

    def self.list_timeblock_events(timeblock_id)
        statement = $client.prepare("select button_id, DATE_FORMAT(timestamp, '%Y-%c-%e %H:%i:%s') AS timestamp from timeblock_mapping WHERE timeblock_id = ?;")
        result = statement.execute(timeblock_id)

        if result.first
            return result
        else 
            raise InvalidDataError
        end
    end

    def self.reassign_event(button_id, timestamp, timeblock_id=nil)
        statement = $client.prepare("SELECT developers_id, reason_id FROM events WHERE button_id=? AND timestamp=?")
        event = statement.execute(button_id, timestamp).first

        if !event
            raise InvalidDataError
        end
        
        if timeblock_id
            statement = $client.prepare("SELECT developer_id, reason_id FROM timeblocks WHERE timeblock_id=?")
            timeblock = statement.execute(timeblock_id).first
          
            if timeblock 
                if timeblock["developer_id"] == event["developers_id"] && timeblock["reason_id"] == event["reason_id"]
                    statement = $client.prepare("UPDATE timeblock_mapping SET timeblock_id=? WHERE button_id=? AND timestamp=?")
                    statement.execute(timeblock_id, button_id, timestamp)
                else
                    raise InvalidDataError
                end
            else 
                raise InvalidDataError
            end
        else

            statement = $client.prepare("INSERT INTO timeblocks (developer_id, reason_id) VALUES (?, ?)")
            statement.execute(event["developers_id"], event["reason_id"])

            statement = $client.prepare("SELECT timeblock_id FROM timeblocks WHERE developer_id=? AND reason_id=? ORDER BY timeblock_id DESC LIMIT 1;")
            timeblock_new = statement.execute(event["developers_id"], event["reason_id"]).first

            statement = $client.prepare("UPDATE timeblock_mapping SET timeblock_id=? WHERE button_id=? AND timestamp=?")
            statement.execute(timeblock_new["timeblock_id"], button_id, timestamp)
            
        end
    end
end
