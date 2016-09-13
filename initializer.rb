require 'rubygems'
require 'bundler/setup'

require 'active_support/all'
require 'active_record'
require 'date'
require 'json'
require 'mysql2'
require 'chronic_duration'

Dir[File.dirname(__FILE__) + "/values/*.rb"].each do |file|
  require_relative file
end

Dir[File.dirname(__FILE__) + "/lib/*.rb"].each do |file|
  require_relative file
end

Dir[File.dirname(__FILE__) + "/logic/*.rb"].each do |file|
  require_relative file
end
