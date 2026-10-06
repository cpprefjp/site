# cstdalign
* cstdalign[meta header]
* cpp11[meta cpp]
* cpp17deprecated[meta cpp]
* cpp20removed[meta cpp]

`<cstdalign>`ヘッダは、C言語の`<stdalign.h>`に対応するヘッダである。内容はC言語の`<stdalign.h>`と同じであるが、`alignas`という名前のマクロは定義しない。C++では[`alignas`](/lang/cpp11/alignas.md)がキーワードであるため、マクロとして定義できない。


## マクロ

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `__alignas_is_defined` | [`alignas`](/lang/cpp11/alignas.md)が使用できることを表すマクロ。`1`に展開される | C++11 |


## 非推奨・削除の詳細
- C11互換のためにC++11で追加されたが、C++では[`alignas`](/lang/cpp11/alignas.md)がキーワードであり、このヘッダをインクルードする意味がないため、C++17で非推奨となり、C++20で削除された
    - [`alignas`](/lang/cpp11/alignas.md)はヘッダのインクルードなしで使用できる


## バージョン
### 言語
- C++11


## 関連項目
- [`alignas`](/lang/cpp11/alignas.md)
- [`<cstdbool>`](/reference/cstdbool.md) : 同じ経緯で非推奨・削除されたヘッダ


## 参照
- [P0063R3 C++17 should refer to C11 instead of C99](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0063r3.html)
    - C++17で、本ヘッダが非推奨となった
- [P0619R4 Reviewing Deprecated Facilities of C++17 for C++20](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0619r4.html)
    - C++20で、本ヘッダが削除された
