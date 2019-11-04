# vformat

* format[meta header]
* function[meta id-type]
* std[meta namespace]
* cpp20[meta cpp]

```cpp
namespace std {
  string vformat(string_view fmt, format_args args); // (1)

  wstring vformat(wstring_view fmt, wformat_args args); // (2)
}
```

## 概要

書式文字列`fmt`に従ったフォーマットで`args`の文字列表現を文字列オブジェクトで返す。

* (1): マルチバイト文字列版
* (2): ワイド文字列版

[`format`](format.md)のフォーマット引数を型消去したバージョンであり、内部的に使用される。文字列をフォーマットする目的で直接利用する必要はない。
ただし、`format`のような関数を自作する場合は、`vformat`を使って実装すると便利である。

## 戻り値

`args`の文字列表現を保持する文字列

## 例外

書式文字列が正しくなかったり、フォーマット実行時に失敗したりした場合、[`format_error`](format_error.md)を投げる。

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

## 参照

* [P0645R10 Text Formatting](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0645r10.html)
