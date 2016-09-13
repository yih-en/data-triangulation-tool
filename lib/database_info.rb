class DatabaseInfo
  attr_reader :database, :name

  def initialize(db:, env: ENV["etl_env"])
    @env = env.to_sym
    @configuration = Configuration.new(:connection).retrieve(db)[@env]
  end

  def self.define_criteria(name)
    define_method(name) do
      @configuration[name]
    end
  end

  define_criteria :database
  define_criteria :host
end
