# operator=
* stop_token[meta header]
* std[meta namespace]
* stop_source[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
stop_source& operator=(const stop_source& r) noexcept; // (1)
stop_source& operator=(stop_source&& r) noexcept;      // (2)
```

## 概要
- (1) : コピー代入演算子。
- (2) : ムーブ代入演算子。


## 効果
- (1) : [`stop_source`](op_constructor.md)`(r).`[`swap`](swap.md)`(*this)`。これによって `*this` `==` `r` となる。
- (2) : [`stop_source`](op_constructor.md)`(std::`[`move`](/reference/utility/move.md)`(r)).`[`swap`](swap.md)`(*this)`。これによって、`r.`[`stop_possible()`](stop_possible.md) `==` `true` となる。

## 戻り値
`*this`

## 例外
投げない。

## 例
```cpp example
#include <cassert>
#include <stop_token>

int main()
{
  std::stop_source ss1;
  std::stop_source ss2(std::nostopstate);
  std::stop_source ss3(std::nostopstate);

  assert(ss1.stop_possible() == true);
  assert(ss2.stop_possible() == false);

  assert(ss1.stop_requested() == false);
  assert(ss2.stop_requested() == false);

  // (1) コピー代入演算子
  ss2 = ss1;
  assert(ss2 == ss1);
  assert(ss1.stop_possible() == true);
  assert(ss2.stop_possible() == true);

  // (2) ムーブ代入演算子
  ss3 = std::move(ss1);
  assert(ss1.stop_possible() == false);
  assert(ss3.stop_possible() == true);

  ss2.request_stop();

  assert(ss1.stop_requested() == false);
  assert(ss2.stop_requested() == true);
  assert(ss3.stop_requested() == true);
}
```
* std::move[link /reference/utility/move.md]
* stop_source[link ../stop_source.md]
* nostopstate[link ../nostopstate.md]
* stop_requested()[link stop_requested.md]
* stop_possible()[link stop_possible.md]

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [GCC](/implementation.md#gcc): ??
- [Clang](/implementation.md#clang): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
