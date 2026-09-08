# wclog
* iostream[meta header]
* std[meta namespace]
* variable[meta id-type]

```cpp
namespace std {
  extern wostream wclog;
}
```
* wostream[link ../ostream/basic_ostream.md]

## 概要
`wclog`は、標準エラー出力に対するワイド文字用の出力ストリームオブジェクトである。

すなわち、[`std::basic_streambuf`](../streambuf/basic_streambuf.md)から派生していて`<cstdio>`の`stderr`オブジェクトに結びつけられているストリームバッファに出力する。

[`wcerr`](wcerr.md)と異なり、[`unitbuf`](/reference/ios/unitbuf.md)フラグは指定されていない。そのため、出力操作のたびにバッファの吐き出しは行われず、ログ出力のように出力量が多い用途に適している。

`wclog`は`wide character log`を意味する。<sup><a id="cite_ref-1" href="#cite-1">[1]</a></sup>

## 例
```cpp example
#include <iostream>

int main()
{
  std::wclog << L"start" << std::endl;

  // ...

  std::wclog << L"end" << std::endl;
}
```
* std::wclog[color ff0000]

### 出力 (標準エラー出力)
```
start
end
```

## バージョン
### 言語
- C++98

### 備考
- ワイド文字の出力が期待どおりに表示されない場合がある。ロケールや端末の設定については[`wcout`](wcout.md)の備考を参照

## 出典

1. **<a id="cite-1" href="#cite_ref-1">^</a>** <cite>[Stroustrup: C++ Style and Technique FAQ](http://www.stroustrup.com/bs_faq2.html#cout)</cite>(2018-08-21 17:01 JST 閲覧)

## 関連項目

- [`clog`](clog.md)
- [`wcerr`](wcerr.md)
- [`wcout`](wcout.md)
