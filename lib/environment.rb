class Environment
  def self.retrieve
    ENV.to_hash.symbolize_keys
  end
end
