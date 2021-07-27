class StringCalculator

    def self.add(input)
        if input.empty?
            return 0
        else
            nums_arr = input.split(",")

            if nums_arr.length < 2
                return nums_arr[0].to_i
            else 
                total = 0
                nums_arr.each { |num| total += num.to_i }
                return total
            end
        end
    end
end