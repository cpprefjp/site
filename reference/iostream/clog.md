# clog
* iostream[meta header]
* std[meta namespace]
* variable[meta id-type]

```cpp
namespace std {
  ostream clog;
}
```

## 概要
`clog`は、標準エラー出力に対するマルチバイト出力ストリームオブジェクトである。
すなわち、`<cstdio>`の`stderr`オブジェクトに結びつけられたストリームオブジェクトである。

## 例
```cpp example
#include <iostream>
#include <fstream>

int main(int argc, char** argv)
{
  char const* filename = argv[1];
  if (filename != nullptr)
  {
    std::clog << "ファイル名: " << filename << std::endl;
    std::fstream f(filename);
    std::cout << f.rdbuf() << std::endl;
  }
  else
  {
    std::clog << "ファイル名を指定してください" << std::endl;
    return 1;
  }
}
```
* std::clog[color ff0000]
* std::fstream[link /reference/fstream/basic_fstream.md]
* rdbuf()[link /reference/ios/basic_ios/rdbuf.md]

### 出力
（コマンドラインを_program_ foo.txtとしてプログラムを起動した場合）
```
ファイル名: foo.txt
（foo.txtの内容）
```

（コマンドラインを_program_ foo.txt > /dev/null (Unix系OS), _program_ foo.txt > NUL (Win32, DOS), _program_ foo.txt > $null (Win32 PowerShell)などとしてプログラムを起動した場合）
```
ファイル名: foo.txt
```

## バージョン
### 言語
- C++98

## 参照

- [`wclog`](wclog.md.nolink)
- [`cerr`](cerr.md)
- [`wcerr`](wcerr.md.nolink)

