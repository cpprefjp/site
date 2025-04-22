# gather-signatures
* execution[meta header]
* std::execution[meta namespace]
* type-alias[meta id-type]
* cpp26[meta cpp]

```cpp
template<class Tag,
         valid-completion-signatures Completions,
         template<class...> class Tuple,
         template<class...> class Variant>
using gather-signatures = /*see below*/
```
* valid-completion-signatures[link completion_signatures.md]
* see below[italic]

## 概要
`gather-signatures`は、[完了シグネチャ集合](completion_signatures.md)`Completions`のうち完了タグ`Tag`に適合する引数型リスト集合に対して型情報の変換操作を適用し、新たな型を取得する説明専用のエイリアステンプレートである。

完了タグ`Tag`には下記いずれかの型を指定する。

- [`execution::set_value_t`](set_value.md)
- [`execution::set_error_t`](set_error.md)
- [`execution::set_stopped_t`](set_stopped.md)

完了シグネチャに適合する引数型リスト集合を`{Ts0..., Ts1..., ... TsN...}`としたとき、2段階の型変換操作をテンプレートパラメータ`Tuple`, `Variant`で指定する。

- `Tuple` : それぞれの引数型リスト`Ts...`に適用する型変換操作。
- `Variant` : 上記変換後に、引数型リスト集合に適用する型変換操作。


## バージョン
### 言語
- C++26


## 関連項目
- [`execution::value_types_of_t`](value_types_of_t.md)
- [`execution::error_types_of_t`](error_types_of_t.md)
- [`execution::sends_stopped`](sends_stopped.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
