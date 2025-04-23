# get_delegation_scheduler
* execution[meta header]
* cpo[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  struct get_delegation_scheduler_t { unspecified };
  constexpr get_delegation_scheduler_t get_delegation_scheduler{};
}
```
* unspecified[italic]

## 概要
`get_delegation_scheduler`は、[クエリ可能オブジェクト](../queryable.md)から委任[Scheduler](scheduler.md)を取得する[クエリオブジェクト](../queryable.md)である。

コア定数式[`forwarding_query`](forwarding_query.md.nolink)`(get_delegation_scheduler)`は`true`値を返す。


## 効果
呼び出し式`get_delegation_scheduler(env)`は下記と等価であり、適格であれば[`scheduler`](scheduler.md)を満たす型の値となる。

- 引数`env`がconst修飾された`cenv`を用いて、式`cenv.query(get_delegation_scheduler)`


## 例外
投げない


## カスタマイゼーションポイント
const修飾[クエリ可能オブジェクト](../queryable.md)`cenv`に対して式`cenv.query(get_delegation_scheduler)`が呼び出される。
このとき、`noexcept(cenv.query(get_delegation_scheduler)) == true`であること。


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`scheduler`](scheduler.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
- [NVIDIA/stdexec, Pull Request#354, with_delegee_scheduler](https://github.com/NVIDIA/stdexec/pull/354)
