def enumerateRecursiveDir(path)
  Dir::foreach(path) {|f|
    next if f == '.' or  f == '..'
    if path =~ /\/$/
      f = path + f
    else
      f = path + '/' + f
    end
    if FileTest::directory?(f)
#      enumerateRecursiveDir(f) {|nested_file|
#        yield nested_file
#      }
    else
      yield f
    end
  }
end

def add_meta(filename)
  data = Array.new
  File.open(filename) {|f|
    f.each_line {|line|
      data << line
    }
  }

  i = data[2].index("[meta") == nil ? 2 :
	  data[3].index("[meta") == nil ? 3 :
	  data[4].index("[meta") == nil ? 4 : 5

#  if data[0][1] == data[0][1].upcase && data[0][1].match(/^[[:alpha:]]+$/)
#    data[i, 0] = "* macro[meta id-type]\n"
#  else
    data[i, 0] = "* class template[meta id-type]\n"
#  end

  output = data.join("")

  File.open(filename, 'w') {|f|
    f.write(output)
  }
end

enumerateRecursiveDir('.') {|md_path|
  if File.extname(md_path) != ".md"
    next
  end
  add_meta(md_path)
}
