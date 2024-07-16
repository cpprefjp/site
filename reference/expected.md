# expected
* expected[meta header]
* cpp23[meta cpp]

`<expected>`ヘッダでは、任意の正常値または任意のエラー値のどちらかを持たせられるオブジェクトの型を定義する。


| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|-------|
| [`expected`](expected/expected.md) | 正常値かエラー値を保持するオブジェクト (class template) | C++23 |
| [`unexpected`](expected/unexpected.md) | エラー値の代入補助クラス (class template) | C++23 |
| [`unexpect_t`](expected/unexpect_t.md) | エラー値の直接構築を指示するタグ型 (class) | C++23 |
| [`bad_expected_access`](expected/bad_expected_access.md) | エラー値保持時に正常値へアクセスした場合に発生する例外 (class template) | C++23 |


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): 16.0 [mark verified]
- [GCC](/implementation.md#gcc): 12.1 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`optional`](optional.md)


## 参照
- [P0323R12 std::expected](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p0323r12.html)
- [P2549R1 `std::unexpected<E>` should have `error()` as member accessor](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2549r1.html)
- [P2505R5 Monadic Functions for `std::expected`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2505r5.html)
