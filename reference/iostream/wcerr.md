# wcerr
* iostream[meta header]
* std[meta namespace]
* variable[meta id-type]

```cpp
namespace std {
  extern wostream wcerr;
}
```
* wostream[link ../ostream/basic_ostream.md]

## 概要
`wcerr`は、標準エラー出力に対するワイド文字用の出力ストリームオブジェクトである。

すなわち、[`std::basic_streambuf`](../streambuf/basic_streambuf.md)から派生していて`<cstdio>`の`stderr`オブジェクトに結びつけられているストリームバッファに出力する。

本オブジェクトは、初期化が完了すると [`tie`](../ios/basic_ios/tie.md)`()` が `&`[`wcout`](wcout.md) を返すようになる。

[`wclog`](wclog.md)と異なる点は、[`unitbuf`](/reference/ios/unitbuf.md)フラグが指定されていることである。そのため、出力操作のたびにバッファの吐き出しが行われる。

その他の状態は、[`basic_ios`](../ios/basic_ios.md)`::`[`init`](../ios/basic_ios/init.md) の事後条件と同様である。

`wcerr`は`wide character error (stream)`を意味する。<sup><a id="cite_ref-1" href="#cite-1">[1]</a></sup>

## 例
```cpp example
#include <iostream>
#include <vector>

int main()
{
  try {
    std::vector<int> v;
    v.at(42) = 1;
  }
  catch (const std::exception& e) {
    std::wcerr << L"error: " << e.what() << std::endl;
  }
}
```
* std::wcerr[color ff0000]
* v.at[link /reference/vector/vector/at.md]
* std::exception[link /reference/exception/exception.md]

### 出力例 (標準エラー出力)
```
error: vector::_M_range_check: __n (which is 42) >= this->size() (which is 0)
```

例外オブジェクトが保持するメッセージの内容は、処理系によって異なる。

## バージョン
### 言語
- C++98

### 備考
- ワイド文字の出力が期待どおりに表示されない場合がある。ロケールや端末の設定については[`wcout`](wcout.md)の備考を参照

## 出典

1. **<a id="cite-1" href="#cite_ref-1">^</a>** <cite>[Stroustrup: C++ Style and Technique FAQ](http://www.stroustrup.com/bs_faq2.html#cout)</cite>(2018-08-21 17:01 JST 閲覧)

## 関連項目

- [`cerr`](cerr.md)
- [`wclog`](wclog.md)
- [`wcout`](wcout.md)
