require "yaml"

class Configuration
  attr_accessor :config

  def initialize(file_id = :config)
    @file_id = file_id
  end

  def retrieve(key = nil)
    @config = read_file unless @config
    key ? @config[key.to_sym] : @config
  end

  private

  def read_file
    config_file = File.expand_path("../../#{@file_id}.yml", __FILE__)
    YAML.load_file(config_file).deep_symbolize_keys
  end
end
