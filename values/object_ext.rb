class Object
  def deep_clone
    Marshal.load(Marshal.dump(self))
  end

  def lookup_class(names)
    found_klass = nil

    Array(names).each do |c|
      next if !Object.const_defined?(c)
      found_klass = c.constantize
      break
    end

    found_klass
  end

  def my_namespace
    self.class.to_s.split("::")[0..-2].join("::").constantize
  end
end
