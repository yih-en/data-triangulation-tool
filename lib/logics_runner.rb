class LogicsRunner
  def call(logics, initial_data)
    logics.inject(initial_data.merge(stack: [])) do |data, logic|
      type = logic[:logic_type]
      name = logic[:name]

      logic_instance = "Logic::#{type.camelize}".constantize.new(data, logic)
      data[name.to_sym] = logic_instance.()
      data[:stack] << [type, data[name.to_sym]]
      data
    end
  end
end
