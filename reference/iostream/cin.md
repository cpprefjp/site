# cin
* iostream[meta header]
* std[meta namespace]
* variable[meta id-type]

```cpp
namespace std {
  extern istream cin;
  extern wistream wcin;
}
```
* istream[link ../istream/basic_istream.md]
* wistream[link ../istream/basic_istream.md]

## 概要
`cin` は、標準入力に対する入力ストリームオブジェクトである。

すなわち、[`std::basic_streambuf`](../streambuf/basic_streambuf.md)から派生していて`<cstdio>`の`stdin`オブジェクトに結びつけられているストリームバッファから入力を受ける。

本オブジェクトは、初期化が完了すると [`tie`](../ios/basic_ios/tie.md)`()` が `&`[`cout`](cout.md) を返すようになる。  
その他の状態は、[`basic_ios`](../ios/basic_ios.md)`::`[`init`](../ios/basic_ios/init.md) の事後条件と同様である。

`cin`は`character input`を意味する。また`wcin`は`wide character input`を意味する。<sup><a id="cite_ref-1" href="#cite-1">[1]</a></sup>

## 例
```cpp example
#include <iostream>
#include <string>

int main()
{
  std::cout << "名前を入力してください: ";

  std::string s;     // std::cin.tie() == &std::cout であるため、
  std::cin >> s;     // std::cout を明示的に flush しなくても
                     // 上記の出力が flush されることが保証されている

  std::cout << "あなたの名前は「" << s << "」です�。" << std::endl;
}
```
* std::cin[color ff0000]

## バージョン
### 言語
- C++98

## 出典

1. **<a id="cite-1" href="#cite_ref-1">^</a>** <cite>[Stroustrup: C++ Style and Technique FAQ](http://www.stroustrup.com/bs_faq2.html#cout)</cite>(2018-08-21 17:01 JST 閲覧)
