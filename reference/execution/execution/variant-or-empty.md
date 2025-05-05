# variant-or-empty
* execution[meta header]
* std::execution[meta namespace]
* type-alias[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  template<class... Ts>
  using variant-or-empty = see below;  // exposition only
}
```
* see below[italic]

## 概要
`variant-or-empty`は、型パラメータパック`Ts`から[decay](/reference/type_traits/decay.md)結果を要素型とする[`variant`](/reference/variant/variant.md)型を作成する説明専用のエイリアステンプレートである。

型`variant-or-empty<Ts...>`は下記の通り定義される。

- `sizeof...(Ts) > 0`ならば、説明用のパック`Us`を[`decay_t`](/reference/type_traits/decay.md)`<Ts>...`から重複削除したものとしたとき、`variant-or-empty<Ts...>`は[`variant`](/reference/variant/variant.md)[`<Us...>`]型となる。
- そうでなければ、`variant-or-empty<Ts...>`は下記の説明専用クラス型となる。

    ```cpp
    namespace std::execution {
      struct empty-variant { // exposition only
        empty-variant() = delete;
      };
    }
    ```


## バージョン
### 言語
- C++26


## 関連項目
- [`execution::value_types_of_t`](value_types_of_t.md)
- [`execution::error_types_of_t`](error_types_of_t.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
