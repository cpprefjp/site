# wcin
* iostream[meta header]
* std[meta namespace]
* variable[meta id-type]

```cpp
namespace std {
  extern wistream wcin;
}
```
* wistream[link ../istream/basic_istream.md]

## 概要
`wcin` は、標準入力に対するワイド文字用の入力ストリームオブジェクトである。

すなわち、[`std::basic_streambuf`](../streambuf/basic_streambuf.md)から派生していて`<cstdio>`の`stdin`オブジェクトに結びつけられているストリームバッファから入力を受ける。

本オブジェクトは、初期化が完了すると [`tie`](../ios/basic_ios/tie.md)`()` が `&`[`wcout`](wcout.md) を返すようになる。  
その他の状態は、[`basic_ios`](../ios/basic_ios.md)`::`[`init`](../ios/basic_ios/init.md) の事後条件と同様である。

`wcin`は`wide character input`を意味する。<sup><a id="cite_ref-1" href="#cite-1">[1]</a></sup>

## 例
```cpp example
#include <iostream>
#include <string>

int main()
{
  std::wcout << L"名前を入力してください: ";

  std::wstring s;    // std::wcin.tie() == &std::wcout であるため、
  std::wcin >> s;    // std::wcout を明示的に flush しなくても
                     // 上記の出力が flush されることが保証されている

  std::wcout << L"あなたの名前は「" << s << L"」ですね。" << std::endl;
}
```
* std::wcin[color ff0000]

### 出力例
```
名前を入力してください:たろう
あなたの名前は「たろう」ですね
```

## バージョン
### 言語
- C++98

## 出典

1. **<a id="cite-1" href="#cite_ref-1">^</a>** <cite>[Stroustrup: C++ Style and Technique FAQ](http://www.stroustrup.com/bs_faq2.html#cout)</cite>(2018-08-21 17:01 JST 閲覧)

## 関連項目

- [`cin`](cin.md)
- [`wcout`](wcout.md)
