# schedule_result_t
* execution[meta header]
* std::execution[meta namespace]
* type-alias[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  template<scheduler Sndr>
  using schedule_result_t = decltype(schedule(declval<Sndr>()));
}
```
* scheduler[link scheduler.md]
* schedule[link schedule.md]

## 概要
[Scheduler型](scheduler.md)`Sndr`の[`schedule`](schedule.md)結果型を取得する。


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`execution::schedule`](schedule.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
