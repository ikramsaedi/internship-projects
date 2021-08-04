module Subcommands 
    class NoPermissionError < StandardError
        def initialize(msg="Please check your permissions and try again")
            super
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
        query_text = "INSERT INTO events (button_id, timestamp, developers_id, reason_id) VALUES (?, ?, ?, ?);"
        statement = $client.prepare(query_text)
        statement.execute(button_id, timestamp, developer, reason)
    end
end