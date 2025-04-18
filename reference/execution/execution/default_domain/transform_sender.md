# transform_sender
* execution[meta header]
* function template[meta id-type]
* std::execution[meta namespace]
* default_domain[meta class]
* cpp26[meta cpp]

```cpp
template<sender Sndr, queryable... Env>
  requires (sizeof...(Env) <= 1)
constexpr sender decltype(auto) transform_sender(Sndr&& sndr, const Env&... env)
  noexcept(see below);
```
* sender[link ../sender.md]
* queryable[link ../../queryable.md]
* see below[italic]

## 概要
Sender変換のデフォルト動作。
[`execution::transform_sender`](../transform_sender.md)に対するスタマイゼーションポイントとして機能する。

- 定義されていれば、[Senderタグ型](../tag_of_t.md.nolink)の`transform_sender`メンバ関数に変換動作を委譲する。
- そうでなければ、無変換。


## 効果
説明用の式`e`を次の通りとしたとき、`e`を返す。

- 適格であるならば、式[`tag_of_t`](tag_of_t.md.nolink)`<Sndr>().transform_sender(`[`std::forward`](/reference/utility/forward.md)`<Sndr>(sndr), env...)`
- そうでなければ、[`std::forward`](/reference/utility/forward.md)`<Sndr>(sndr)`


## 例外
`noexcept(e) == true`ならば、例外を投げない。
そうでなければ、式`e`から送出される例外。


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`execution::transform_sender`](../transform_sender.md)


## 参照
- [P2999R3 Sender Algorithm Customization](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2999r3.html)
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
