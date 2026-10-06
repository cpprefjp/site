# cstdbool
* cstdbool[meta header]
* cpp11[meta cpp]
* cpp17deprecated[meta cpp]
* cpp20removed[meta cpp]

`<cstdbool>`ヘッダは、C言語の`<stdbool.h>`に対応するヘッダである。内容はC言語の`<stdbool.h>`と同じであるが、`bool`・`true`・`false`という名前のマクロは定義しない。C++ではこれらがキーワードであるため、マクロとして定義できない。


## マクロ

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `__bool_true_false_are_defined` | `bool`・`true`・`false`が使用できることを表すマクロ。`1`に展開される | C++11 |


## 非推奨・削除の詳細
- C99互換のためにC++11で追加されたが、C++では`bool`・`true`・`false`がキーワードであり、このヘッダをインクルードする意味がないため、C++17で非推奨となり、C++20で削除された
    - `bool`・`true`・`false`はヘッダのインクルードなしで使用できる


## バージョン
### 言語
- C++11


## 関連項目
- [`<cstdalign>`](/reference/cstdalign.md) : 同じ経緯で非推奨・削除されたヘッダ


## 参照
- [P0063R3 C++17 should refer to C11 instead of C99](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0063r3.html)
    - C++17で、本ヘッダが非推奨となった
- [P0619R4 Reviewing Deprecated Facilities of C++17 for C++20](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0619r4.html)
    - C++20で、本ヘッダが削除された
