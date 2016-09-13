class ReplacementDsl
  # data shape: {ids: [1,2,3,4,5]}
  def initialize(data)
    @data = data
  end

  # dsl shape: "$ids|join:,|upcase"
  def call(dsl)
    parts = dsl.split("|")

    parts.inject(nil) do |carry, part|
      if part[0] == '$'
        get_value(part)
      else
        command_parts = part.split(":")
        command_name = command_parts.first.to_sym
        command_arguments = command_parts.to_a[1..-1].to_a.map do |a|
          (a[0] == '$') ? get_value(a) : a
        end
        carry.send(command_name, *command_arguments)
      end
    end
  end

  def get_value(raw_key)
    key = raw_key.gsub("$", "").to_sym #$order_id
    @data[key]
  end
end
