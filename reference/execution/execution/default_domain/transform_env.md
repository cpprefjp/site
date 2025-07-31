# transform_env
* execution[meta header]
* function template[meta id-type]
* std::execution[meta namespace]
* default_domain[meta class]
* cpp26[meta cpp]

```cpp
template<sender Sndr, queryable Env>
  constexpr queryable decltype(auto) transform_env(Sndr&& sndr, Env&& env) noexcept;
```
* sender[link ../sender.md]
* queryable[link ../../queryable.md]

## 概要
環境変換のデフォルト動作。
[`execution::transform_env`](../transform_env.md)に対するスタマイゼーションポイントとして機能する。

- 定義されていれば、[Senderアルゴリズムタグ型](../tag_of_t.md)の`transform_env`メンバ関数に変換動作を委譲する。
- そうでなければ、無変換。


## 適格要件
後述する式`e`に対して、`noexcept(e) == true`


## 効果
説明用の式`e`を次の通りとしたとき、`e`を返す。

- 適格であるならば、式[`tag_of_t`](../tag_of_t.md)`<Sndr>().transform_env(`[`std::forward`](/reference/utility/forward.md)`<Sndr>(sndr),` [`std::forward`](/reference/utility/forward.md)`<Env>(env))`
- そうでなければ、[`FWD-ENV`](../../forwarding_query.md)`(`[`std::forward`](/reference/utility/forward.md)`<Env>(env))`


## 例外
投げない


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`execution::transform_env`](../transform_env.md)


## 参照
- [P2999R3 Sender Algorithm Customization](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2999r3.html)
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
- [LWG 4209. `default_domain::transform_env` should be returning `FWD-ENV(env)`](https://cplusplus.github.io/LWG/issue4209)
