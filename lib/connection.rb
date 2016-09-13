class Connection
  attr_reader :native_connection,
              :yaml_config,
              :client_class,
              :loaded_config

  attr_accessor :environment,
                :connection_name

  def initialize(connection_name, config = {})
    @config = config.to_hash.symbolize_keys
    @connection_name = connection_name.to_sym
    @environment = @config[:etl_env].try(:to_sym)

    @client_class = @config[:client_class] || Mysql2::Client
  end

  def query(sql, options = {})
    instantiate_native_connection unless @native_connection
    if @config[:debug]
      puts "Host: [#{@loaded_config[:host].to_s.green}]  Database: [#{@loaded_config[:database].to_s.green}]"
      drawline
      puts sql.green
      drawline
      puts "\n\n"
    end

    native_connection.query(sql, options)
  rescue StandardError => e
    puts sql.red
    puts e.message
    raise e
  end

  def close
    @native_connection.close if @native_connection
  end

  def host
    @loaded_config[:host]
  end

  def database
    @loaded_config[:database]
  end

  private

  def instantiate_native_connection
    @yaml_config = read_file

    if @yaml_config[@connection_name].nil? || @yaml_config[@connection_name][@environment].nil?
      raise "Could not find Connection of name:[#{@connection_name.inspect}] for environment:[#{@environment.inspect}], we got config:[#{@yaml_config}]"
    end

    config = @yaml_config[@connection_name][@environment]

    @loaded_config = config
    @native_connection = @client_class.new(config.merge(
      read_timeout: 120,
      symbolize_keys: true
    ))
  end

  def read_file
    Configuration.new(:connection).retrieve
  end
end
