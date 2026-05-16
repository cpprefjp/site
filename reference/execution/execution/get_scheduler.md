# get_scheduler
* execution[meta header]
* cpo[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  struct get_scheduler { unspecified };
  inline constexpr get_scheduler_t get_scheduler{};
}
```
* unspecified[italic]

## 概要
`get_scheduler`は、[クエリ可能オブジェクト](../queryable.md)から関連する[Scheduler](scheduler.md)を取得する[クエリオブジェクト](../queryable.md)である。

コア定数式[`forwarding_query`](../forwarding_query.md)`(get_scheduler)`は`true`値を返す。


## 効果
呼び出し式`get_scheduler(env)`は下記と等価であり、適格であれば[`scheduler`](scheduler.md)を満たす型の値となる。

```cpp
get_completion_scheduler<set_value_t>(MANDATE-NOTHROW(AS-CONST(env).query(get_scheduler)), HIDE-SCHED(env))
```
* get_completion_scheduler[link get_completion_scheduler.md]]
* set_value_t[link set_value.md]


## 例外
投げない


## カスタマイゼーションポイント
const修飾[クエリ可能オブジェクト](../queryable.md)`cenv`に対して式`cenv.query(get_scheduler)`が呼び出される。
このとき、`noexcept(cenv.query(get_scheduler)) == true`であること。


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`execution::scheduler`](scheduler.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
- [P3826R5 Fix Sender Algorithm Customization](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3826r5.html)
