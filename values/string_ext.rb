class String
  def to_symbol_hash
    JSON.parse(self).deep_symbolize_keys
  end

  def slug
    self.parameterize.gsub('_', '-')
  end

  def color(code)
    "\e[38;5;#{code}m#{self}\e[0m"
  end

  def orange
    self.color(208)
  end

  def green
    self.color(10)
  end

  def red
    self.color(1)
  end

  def yellow
    self.color(220)
  end
end
