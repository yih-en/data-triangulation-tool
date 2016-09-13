class ErrorLogger
  attr_accessor :messages

  def initialize
    @messages = []
  end

  def call(error)
    {
      error: {
        message: error.message.to_s,
        backtrace: print_backtrace(error.backtrace)
      }
    }
  end

  private

  def print_backtrace(backtrace)
    (0..1).each do |num|
      messages << [
        backtrace[num],
        backtrace[num].split(":")[0]
      ]
    end
    messages
  end
end
