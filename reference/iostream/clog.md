# clog
* iostream[meta header]
* std[meta namespace]
* variable[meta id-type]

```cpp
namespace std {
  extern ostream clog;
  extern wostream wclog;
}
```
* ostream[link ../ostream/basic_ostream.md]
* wostream[link ../ostream/basic_ostream.md]

## 概要
`clog`も`wclog`も、標準エラー出力に対する出力ストリームオブジェクトである。

すなわち、[`std::basic_streambuf`](../streambuf/basic_streambuf.md)から派生していて`<cstdio>`の`stderr`オブジェクトに結びつけられているストリームバッファに出力する。

`clog`は`character log`を意味する。また`wclog`は`wide character log`を意味する。<sup><a id="cite_ref-1" href="#cite-1">[1]</a></sup>

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
（コマンドラインを`_program_ foo.txt`としてプ�グラムを起動した場合）

```
ファイル名: foo.txt
（foo.txtの内容）
```

（コマンドラインを`_program_ foo.txt > /dev/null` (Unix系OS), `_program_ foo.txt > NUL` (Win32, DOS), `_program_ foo.txt > $null` (Win32 PowerShell)などとしてプ�グラムを起動した場合）

```
ファイル名: foo.txt
```

## バージョン
### 言語
- C++98

## 出典

1. **<a id="cite-1" href="#cite_ref-1">^</a>** <cite>[Stroustrup: C++ Style and Technique FAQ](http://www.stroustrup.com/bs_faq2.html#cout)</cite>(2018-08-21 17:01 JST 閲覧)

## 参照

- [`cerr`](cerr.md)
