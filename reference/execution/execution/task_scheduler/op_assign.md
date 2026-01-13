# operator=
* execution[meta header]
* std::execution[meta namespace]
* task_scheduler[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
task_scheduler& operator=(const task_scheduler&) = default;
```
* task_scheduler[link ../task_scheduler.md]

## 概要
ムーブ代入演算子


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
