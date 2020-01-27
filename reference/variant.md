# variant
* variant[meta header]
* cpp17[meta cpp]

`<variant>`ヘッダでは、候補の型を切り替えながら保持できる記憶域型を定義する。

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`variant`](variant/variant.md) | 候補の型を切り替えながら保持できる記憶域型 (class template) | C++17 |
| [`variant_size`](variant/variant_size.md) | 候補型の数を取得する (class template) | C++17 |
| [`variant_alternative`](variant/variant_alternative.md) | 候補型のi番目の型を取得する (class template) | C++17 |
| [`variant_npos`](variant/variant_npos.md) | 候補型の無効なインデックス値 (variable) | C++17 |
| [`holds_alternative`](variant/holds_alternative.md) | `variant`オブジェクトが指定の候補型を現在保持しているかを判定する (function template) | C++17 |
| [`visit`](variant/visit.md) | `variant`オブジェクトが現在保持している型に対応する関数を呼び出す (function template) | C++17 |
| [`monostate`](variant/monostate.md) | 空の状態を持つ型 (class) | C++17 |
| [`bad_variant_access`](variant/bad_variant_access.md) | `variant`オブジェクトが現在保持していない候補型に不�アクセスした際に発生する例外型 (class) | C++17 |

## バージョン
### 言語
- C++17


## 参照
- [P0220R1 Adopt Library Fundamentals V1 TS Components for C++17 (R1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0220r1.html)
