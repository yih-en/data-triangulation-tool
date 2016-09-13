class Array
  def pluck(key)
    self.map do |h|
      h[key.to_sym]
    end
  end

  def quote_it
    self.map { |s| "'#{s}'"}
  end
end
