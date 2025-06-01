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
呼び出し式`get_domain(env)`は下記と等価。

- 引数`env`がconst修飾された`cenv`を用いて、式`cenv.query(get_domain)`


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


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
