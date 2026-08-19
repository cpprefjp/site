# string_view
* string_view[meta header]
* cpp17[meta cpp]

`<string_view>`ヘッダでは、所有権を持たず文字列を参照する文字列クラスを定義する。

このヘッダでは、以下の標準ヘッダをインクルードする：

- [`<compare>`](compare.md) (C++20)


## フリースタンディング
このヘッダのほとんどの機能は、フリースタンディング処理系でも使用できる。ただし、例外を送出する一部の機能などは、フリースタンディング処理系では提供されない、または削除される。詳細は各機能のページを参照。

## 機能一覧

| 名前 | 説明 | 対応バージョン |
|------------------------------------------|--------------------------|-------|
| [`basic_string_view`](string_view/basic_string_view.md) | 所有権を持たない文字列クラス (class template) | C++17 |


## バージョン
### 言語
- C++17


## 関連項目
- [`<span>`](span.md)


## 参照
- [P2051R0 C++ Standard Library Issues to be moved in Prague](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p2051r0.html)
- [P2407R5 Freestanding Library: Partial Classes](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2407r5.html)
    - C++26で、このヘッダのクラスが（例外を送出するメンバなど一部を除いて）フリースタンディング処理系に対応した
