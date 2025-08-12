# spanstream
* spanstream[meta header]
* cpp23[meta cpp]

`<spanstream>`ヘッダでは、[`std::span`](/reference/span/span.md) を出力先・入力元として使用するストリームクラスを定義する。

固定長バッファを使うことができるストリームとして、古くから `std::strstream` があるが、`std::strstream` は非推奨のライブラリであった。
C++20 で [`std::span`](/reference/span/span.md) が導入されたことに伴い、[`std::span`](/reference/span/span.md) を使用した固定長バッファストリームクラスが新たに追加された。
（これにより、`<strstream>` ライブラリはC++26で削除された。）


## ストリームバッファ

| 名前                  | 説明                                           | 対応バージョン |
|-----------------------|------------------------------------------------|----------------|
| [`basic_spanbuf`](spanstream/basic_spanbuf.md) | 固定長ストリームバッファ(class template)       | C++23 |
| [`spanbuf`](spanstream/basic_spanbuf.md)       | `char`版の固定長ストリームバッファ(type-alias)    | C++23 |
| [`wspanbuf`](spanstream/basic_spanbuf.md)      | `wchar_t`版の固定長ストリームバッファ(type-alias) | C++23 |

## 入力ストリーム

| 名前                  | 説明                                           | 対応バージョン |
|-----------------------|------------------------------------------------|----------------|
| [`basic_ispanstream`](spanstream/basic_ispanstream.md) | 固定長バッファ入力ストリーム(class template)           | C++23 |
| [`ispanstream`](spanstream/basic_ispanstream.md)       | `char`版の固定長バッファ入力ストリーム(type-alias)        | C++23 |
| [`wispanstream`](spanstream/basic_ispanstream.md)      | `wchar_t`版の固定長バッファ入力ストリーム(type-alias)     | C++23 |

## 出力ストリーム

| 名前                  | 説明                                           | 対応バージョン |
|-----------------------|------------------------------------------------|----------------|
| [`basic_ospanstream`](spanstream/basic_ospanstream.md) | 固定長バッファ出力ストリーム(class template)           | C++23 |
| [`ospanstream`](spanstream/basic_ospanstream.md)       | `char`版の固定長バッファ出力ストリーム(type-alias)        | C++23 |
| [`wospanstream`](spanstream/basic_ospanstream.md)      | `wchar_t`版の固定長バッファ出力ストリーム(type-alias)     | C++23 |

## 入出力ストリーム

| 名前                  | 説明                                           | 対応バージョン |
|-----------------------|------------------------------------------------|----------------|
| [`basic_spanstream`](spanstream/basic_spanstream.md) | 固定長バッファ入出力ストリーム(class template)         | C++23 |
| [`spanstream`](spanstream/basic_spanstream.md)       | `char`版の固定長バッファ入出力ストリーム(type-alias)      | C++23 |
| [`wspanstream`](spanstream/basic_spanstream.md)      | `wchar_t`版の固定長バッファ入出力ストリーム(type-alias)   | C++23 |


## バージョン
### 言語
- C++23


## 参照
- [P0448R4 A strstream replacement using span&lt;charT&gt; as buffer](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p0448r4.pdf)
