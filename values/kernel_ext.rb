module Kernel
  def drawline(char: 80, colorcode: 175)
    puts ("=" * char).color(colorcode)
  end

  def safe_divide(numerator, denominator)
    return 0 if !denominator || !numerator || denominator.zero?
    numerator / denominator
  end

  def dp(content, title = "unknown title")
    mycolor = 186 + Random.rand(20)

    drawline(colorcode: mycolor)
    puts title.color(mycolor)
    drawline(colorcode: mycolor)

    if content.respond_to?(:to_ary)
      puts JSON.pretty_generate(deep_show_as_sym(content.to_ary)).color(mycolor)
    elsif content.respond_to?(:to_hash)
      puts JSON.pretty_generate(deep_show_as_sym(content.to_hash)).color(mycolor)
    elsif content.respond_to?(:to_h)
      puts JSON.pretty_generate(deep_show_as_sym(content.to_h)).color(mycolor)
    else
      puts content.to_s.color(mycolor)
    end
  end

  def deep_show_as_sym(content)
    if content.respond_to?(:to_hash)
      content.map do |k,v|
        v = deep_show_as_sym(v) if v.respond_to?(:to_h)
        k = ":#{k}" if k.is_a?(Symbol)

        [k, v]
      end.to_h
    elsif content.respond_to?(:to_ary)
      content.map { |v| deep_show_as_sym(v) }
    else
      content
    end
  end
end
