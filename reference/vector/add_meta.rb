def enumerateRecursiveDir(path)
  Dir::foreach(path) {|f|
    next if f == '.' or  f == '..'
    if path =~ /\/$/
      f = path + f
    else
      f = path + '/' + f
    end
    if FileTest::directory?(f)
      enumerateRecursiveDir(f) {|nested_file|
        yield nested_file
      }
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

  dirs = File.dirname(File.absolute_path(filename)).split('/')
  back_dir = dirs[dirs.size() - 1]
  data[3, 0] = "* #{back_dir}[meta class]\n"

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
