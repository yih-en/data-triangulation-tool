require "sinatra"
require "sinatra/reloader"

require "./initializer"
require "sinatra/cross_origin"
require "pry"

class App < Sinatra::Base

  configure :development do
    register Sinatra::Reloader
    register Sinatra::CrossOrigin

    enable :cross_origin
    also_reload './lib/*'
    also_reload './logic/*'
  end

  get '/' do
    @suiteIds = SuiteData.allIds
  end

  get '/queries_links' do
    SuiteData.allIds.to_json
  end

  get '/connection_info' do
    info = [
      :first_database,
      :second_database,
      :third_database
    ].inject([]) do |result, db|
      result << [ db.to_s, DatabaseInfo.new(db: db).database ]
    end

    { connectionInfo: info }.to_json
  end

  get '/query' do
    print_error_if_exist do
      if params[:id]
        @suite = SuiteData.find(params[:id])
      else
        @suite = { logics: [] }
      end
      @suite.to_json
    end
  end

  post '/save' do
    data = req_data
    suite_data = SuiteData.create(data)

    { status: "success", data: SuiteData.find(suite_data[:id]) }.to_json
  end

  post '/run' do
    print_error_if_exist do
      data = req_data

      initial_data = data[:initial_data].presence || "{}"
      LogicsRunner.new.call(data[:logics], JSON.parse(initial_data).symbolize_keys).to_json
    end
  end

  private

  def req_data
    req = request.env['rack.input'].read
    JSON.parse(req).deep_symbolize_keys
  end

  def print_error_if_exist
    begin
      yield
    rescue Exception => error
      ErrorLogger.new().(error).to_json
    end
  end
end
