class Fixnum
  def to_human_time
    ChronicDuration.output(
      self,
      keep_zero: true,
      limit_to_hours: true,
      format: :long
    )
  end

  def date_key_add(n)
    my_date = Date.strptime(self.to_s, "%Y%m%d")
    my_date += n
    my_date.strftime("%Y%m%d").to_i
  end

  def to_date
    year = self.to_s[0..3]
    month = self.to_s[4..5]
    day = self.to_s[6..7]
    "#{year}-#{month}-#{day}"
  end
end
