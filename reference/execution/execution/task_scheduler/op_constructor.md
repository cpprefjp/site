# コンストラクタ
* execution[meta header]
* std::execution[meta namespace]
* task_scheduler[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
template <class Sch, class Allocator = allocator<void>>
  requires(!same_as<task_scheduler, remove_cvref_t<Sch>>) && scheduler<Sch>
explicit task_scheduler(Sch&& sch, Allocator alloc = {});
```
* scheduler[link ../scheduler.md]

## 概要
[Scheduler](../scheduler.md)`sch`とアロケータ`alloc`を保持する`task_scheduler`オブジェクトを構築する。


## テンプレートパラメータ制約
`Sch`は`task_scheduler`ではなく、[`scheduler`](../scheduler.md)を満たす。


## 効果
説明専用のメンバ変数`sch_`を[`allocate_shared`](/reference/memory/allocate_shared.md)`<`[`remove_cvref_t`](/reference/type_traits/remove_cvref.md)`<Sch>>(alloc,` [`std::forward`](/reference/utility/forward.md)`<Sch>(sch))`で初期化する。


## 備考
処理系は小さなSchedulerオブジェクトに対して動的メモリ確保を避けることが推奨される。

`*this`上の呼び出しによってえられる[`sender`や`state`オブジェクト](schedule.md)の構築では、`alloc`のコピーを用いてメモリ確保が行われる。


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`execution::scheduler`](../scheduler.md)


## 参照
- [P3552R3 Add a Coroutine Task Type](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3552r3.html)
