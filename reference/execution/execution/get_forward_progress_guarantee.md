# get_forward_progress_guarantee
* execution[meta header]
* cpo[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  struct get_forward_progress_guarantee_t { unspecified };
  inline constexpr get_forward_progress_guarantee_t get_forward_progress_guarantee{};
}
```
* unspecified[italic]

## 概要
`get_forward_progress_guarantee_t`は、[Scheduler](scheduler.md)に関連付けられた実行リソースによる実行エージェントの前方進行保証を取得する[クエリオブジェクト](../queryable.md)である。


## 効果
説明用の変数`sch`に対して、型`Sch`を`decltype((sch))`とする。`Sch`が[`scheduler`](scheduler.md)を満たさないとき、`get_forward_progress_guarantee`は不適格となる。

そうでなければ、呼び出し式`get_forward_progress_guarantee(sch)`は下記と等価であり、[`forward_progress_guarantee`](forward_progress_guarantee.md)列挙型の値となる。

- 引数`sch`がconst修飾された`csch`を用いて、適格であるならば式`cenv.query(get_forward_progress_guarantee)`
- そうでなければ、[`forward_progress_guarantee::weakly_parallel`](forward_progress_guarantee.md)


## 例外
投げない


## カスタマイゼーションポイント
const修飾[Scheduler](scheduler.md)`sch`に対して式`csch.query(get_forward_progress_guarantee)`が呼び出される。
このとき、`noexcept(csch.query(get_forward_progress_guarantee)) == true`であること。


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
- [`execution::forward_progress_guarantee`](forward_progress_guarantee.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
