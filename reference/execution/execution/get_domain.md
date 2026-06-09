# get_domain
* execution[meta header]
* cpo[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  struct get_domain_t { unspecified };
  inline constexpr get_domain_t get_domain{};
}
```
* unspecified[italic]

## 概要
`get_domain`は、[クエリ可能オブジェクト](../queryable.md)から[実行ドメイン](default_domain.md)のタグ型を取得する[クエリオブジェクト](../queryable.md)である。

コア定数式[`forwarding_query`](../forwarding_query.md)`(get_domain)`は`true`値を返す。


## 効果
部分式`env`に対して、型`D`を下記のうち最初に適格な式の型としたとき、呼び出し式`get_domain(env)`は[`MANDATE-NOTHROW`](MANDATE-NOTHROW.md)`(D())`と等価。

- `auto(`[`AS-CONST`](AS-CONST.md)`(env).query(get_domain))`
- [`get_completion_domain`](get_completion_domain.md)`<`[`set_value_t`](set_value.md)`>(`[`get_scheduler`](get_scheduler.md)`(env),` [`HIDE-SCHED`](../queryable.md)`(env))`
- `env`が評価されることを除いて、[`default_domain()`](default_domain.md)


## 例外
投げない


## カスタマイゼーションポイント
const修飾[クエリ可能オブジェクト](../queryable.md)`cenv`に対して式`cenv.query(get_domain)`が呼び出される。
このとき、`noexcept(cenv.query(get_domain)) == true`であること。


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`execution::default_domain`](default_domain.md)
- [`execution::get_completion_domain`](get_completion_domain.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
- [P3826R5 Fix Sender Algorithm Customization](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3826r5.html)
