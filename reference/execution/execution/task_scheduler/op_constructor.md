# コンストラクタ
* execution[meta header]
* std::execution[meta namespace]
* task_scheduler[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
template <class Sch, class Allocator = allocator<void>>
  requires(!same_as<task_scheduler, remove_cvref_t<Sch>>) && scheduler<Sch>
explicit task_scheduler(Sch&& sch, Allocator alloc = {});  // (1)

task_scheduler(const task_scheduler&) = default;  // (2)
```
* task_scheduler[link ../task_scheduler.md]
* scheduler[link ../scheduler.md]
* allocator[link /reference/memory/allocator.md]

## 概要
- (1) : [Scheduler](../scheduler.md)`sch`とアロケータ`alloc`を保持する`task_scheduler`オブジェクトを構築する。
- (2) : ムーブコンストラクタ


## 適格要件
`Sch`は[`infallible-scheduler`](../infallible-scheduler.md)`<`[`env<>`](../env.md)`>`を満たす。


## 効果
(1) 説明専用のメンバ変数`sch_`を[`allocate_shared`](/reference/memory/allocate_shared.md)`<`[`backend-for`](schedule.md)`<`[`remove_cvref_t`](/reference/type_traits/remove_cvref.md)`<Sch>>>(alloc,` [`std::forward`](/reference/utility/forward.md)`<Sch>(sch))`で初期化する。


## 備考
処理系（標準ライブラリ実装）は、小さなSchedulerオブジェクトに対して動的メモリ確保を避けることが推奨される。

`*this`上の任意の呼び出しによるメモリ確保では、`alloc`のコピーが用いられる。


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P3552R3 Add a Coroutine Task Type](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3552r3.html)
- [LWG4445. `sch_` must not be in moved-from state](https://cplusplus.github.io/LWG/issue4445)
- [P3941R4 Scheduler Affinity](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3941r4.html)
- [P3927R2 `task_scheduler` support for parallel `bulk` execution](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3927r2.html)
