module Subcommands 
    class NoPermissionError < StandardError
        def initialize(msg="Please check your permissions and try again")
            super
        end
    end
end