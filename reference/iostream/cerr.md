# cerr
* iostream[meta header]
* std[meta namespace]
* variable[meta id-type]

```cpp
namespace std {
  extern ostream cerr;
  extern wostream wcerr;
}
```
* ostream[link ../ostream/basic_ostream.md]
* wostream[link ../ostream/basic_ostream.md]

## 概要
`cerr`も`wcerr`も、標準エラー出力に対する出力ストリームオブジェクトである。

すなわち、[`std::basic_streambuf`](../streambuf/basic_streambuf.md)から派生していて`<cstdio>`の`stderr`オブジェクトに結びつけられているストリームバッファに出力する。

本オブジェクトは、初期化が完了すると [`tie`](../ios/basic_ios/tie.md)`()` が `&`[`cout`](cout.md) を返すようになる。

[`clog`](clog.md)と異なる点は、[`unitbuf`](/reference/ios/unitbuf.md)フラグが指定されていることである。そのため、出力操作のたびにバッファの吐き出しが行われる。

その他の状態は、[`basic_ios`](../ios/basic_ios.md)`::`[`init`](../ios/basic_ios/init.md) の事後条件と同様である。

`cerr`は`character error (stream)`を意味する。また`wcerr`は`wide character error (stream)`を意味する。<sup><a id="cite_ref-1" href="#cite-1">[1]</a></sup>

## 例
```cpp example
#include <iostream>
#include <vector>

int main()
{
  try
  {
    std::vector<int> v;
    v.at(42) = 1;
  }
  catch(const std::exception& e)
  {
    std::cerr << "問題発生: " << e.what() << std::endl;
  }
}
```
* std::cerr[color ff0000]
* v.at[link /reference/vector/vector/at.md]
* std::exception[link /reference/exception/exception.md]

### 出力例
```
問題発生: invalid vector<T> subscript
```

出力内容は環境により異なる。

## バージョン
### 言語
- C++98

## 出典

1. **<a id="cite-1" href="#cite_ref-1">^</a>** <cite>[Stroustrup: C++ Style and Technique FAQ](http://www.stroustrup.com/bs_faq2.html#cout)</cite>(2018-08-21 17:01 JST 閲覧)

## 参照
- [`clog`](clog.md)
- [`cout`](cout.md)
