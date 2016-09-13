module Logic
  class Sql
    def initialize(data, logic)
      @data = data
      @logic = logic
      @connection = Connection.new(@logic[:connection_name].to_sym, Environment.retrieve)
    end

    def call
      final_query = QueryReplacer.new.(@logic[:query], @data)
      @connection.query(final_query).map {|rows| rows}
    end
  end
end
