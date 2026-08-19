# span
* span[meta header]
* cpp20[meta cpp]

`<span>`ヘッダでは、所有権を持たず任意のシーケンスの部分シーケンスを参照する機能を定義する。


## フリースタンディング
このヘッダのほとんどの機能は、フリースタンディング処理系でも使用できる。ただし、例外を送出する一部の機能などは、フリースタンディング処理系では提供されない、または削除される。詳細は各機能のページを参照。

## 機能一覧

| 名前 | 説明 | 対応バージョン |
|------------------------------------------|--------------------------|-------|
| [`dynamic_extent`](span/dynamic_extent.md) | 動的な要素数を表す値 (variable) | C++20 |
| [`span`](span/span.md) | 所有権を持たず部分シーケンスを参照する (class template) | C++20 |


## バージョン
### 言語
- C++20


## 関連項目
- C++11 [`<string_view>`](string_view.md)
- C++23 [`<mdspan>`](mdspan.md)


## 参照
- [P2833R2 Freestanding Library: inout expected `span`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2833r2.html)
    - C++26で、`<span>`が（例外を送出する`at()`など一部を除いて）フリースタンディング処理系に対応した
