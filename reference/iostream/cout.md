# cout
* iostream[meta header]
* std[meta namespace]
* variable[meta id-type]

```cpp
namespace std {
  extern ostream cout;
  extern wostream wcout;
}
```

## 概要
`cout`も`wcout`も、標準出力に対する出力ストリームオブジェクトである。

すなわち、[`std::basic_streambuf`](../streambuf/basic_streambuf.md)から派生していて`<cstdio>`の`stdout`オブジェクトに結びつけられているストリームバッファに出力する。

## 例
```cpp example
#include <iostream>

int main()
{
  std::cout << "Hello world" << std::endl;
}
```
* std::cout[color ff0000]

### 出力
```
Hello world
```

## 名前の由来

`cout`は`character output`を意味する。また`wcout`は`wide character output`を意味する。<sup><a id="cite_ref-1" href="#cite-1">[1]</a></sup>

## バージョン
### 言語
- C++98

## 出典

1. **<a id="cite-1" href="#cite_ref-1">^</a>** <cite>[Stroustrup: C++ Style and Technique FAQ](http://www.stroustrup.com/bs_faq2.html#cout)</cite>(2018-08-21 17:01 JST 閲覧)

## 参照
- [`wcout`](wcout.md.nolink)
