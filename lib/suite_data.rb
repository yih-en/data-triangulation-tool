require "json"

class SuiteData
  def self.allIds
    Dir["#{myself}/../data/*.json"].map do |file|
      file.split("/").last.split(".").first
    end
  end

  def self.create(data)
    data[:id] = id = data[:name].slug
    File.open(filename(id), 'w') { |file| file.write(JSON.pretty_generate(data)) }
    data
  end

  def self.find(id)
    File.read(filename(id)).to_symbol_hash
  end

  private

  def self.filename(id)
    "#{myself}/../data/#{id}.json"
  end

  def self.myself
    File.dirname(__FILE__)
  end
end
