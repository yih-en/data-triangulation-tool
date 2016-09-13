class ConsoleReporter
  def plain(message)
    uputs message
  end

  def success(message)
    uputs message.to_s.green
  end

  def title(message)
    uputs "[#{message}]".green
  end

  def box(message)
    uputs "==================".green
    uputs message
    uputs "==================".green
  end

  def output_row(row)
    stringify = row.map do |k,v|
      [k, v.to_s]
    end

    uputs Hash[stringify].to_s
  end

  private

  def uputs(message)
    puts message
    STDOUT.flush
  end
end
