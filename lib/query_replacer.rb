# query will be: select * from bla where id in ([ids|join:,])
# parameters will be: {ids: [1,2,3,4,5]}
# final_query will be: select * from bla where id in (1,2,3,4,5)

class QueryReplacer
  def call(query, data = {})
    query.to_s.gsub(/\[.+?\]/) do |dsl|
      ReplacementDsl.new(data).(dsl[1..-2])
    end
  end
end

  # def query_result
  #   connection = @connection_pool.retrieve(connection_name)
  #   connection.query(final_query)
  # end
  #
  # def final_query
  #   result_query = query
  #
  #   if @suite.placeholder
  #     result_query = result_query.gsub(@suite.placeholder_tag, @suite.placeholder_value)
  #   end
  #
  #   result_query
  # end
