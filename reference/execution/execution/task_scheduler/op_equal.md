# operator==
* execution[meta header]
* std::execution[meta namespace]
* task_scheduler[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
friend bool operator== (const task_scheduler& lhs, const task_scheduler& rhs) noexcept;  // (1)

template <class Sch>
  requires (!same_as<task_scheduler, Sch>) && scheduler<Sch>
friend bool operator== (const task_scheduler& lhs, const Sch& rhs) noexcept;  // (2)
```
* task_scheduler[link ../task_scheduler.md]
* scheduler[link ../scheduler.md]

## 概要
等値比較を行う


## 戻り値
- (1) : `lhs == SCHED(rhs)`を返す。
- (2) : `SCHED(lhs)`の型が`Sch`でなければ`false`、そうでなければ`SCHED(lhs) == rhs`を返す。


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
