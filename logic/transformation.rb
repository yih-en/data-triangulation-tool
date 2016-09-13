module Logic
  class Transformation
    def initialize(data, logic)
      @data = data
      @logic = logic
    end

    def call
      ReplacementDsl.new(@data).(@logic[:transform])
    end
  end
end
