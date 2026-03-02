# operator=
* stop_token[meta header]
* std[meta namespace]
* stop_token[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
stop_token& operator=(const stop_token& r) noexcept; // (1)
stop_token& operator=(stop_token&& r) noexcept;      // (2)
```

## 概要
- (1) : コピー代入演算子。
- (2) : ムーブ代入演算子。


## 効果
- (1) : [`stop_token`](op_constructor.md)`(r).`[`swap`](swap.md)`(*this)`。これによって `*this` `==` `r` となる。
- (2) : [`stop_token`](op_constructor.md)`(std::`[`move`](/reference/utility/move.md)`(r)).`[`swap`](swap.md)`(*this)`。これによって、`r.`[`stop_possible()`](stop_possible.md) `==` `false` となる。

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
  std::stop_source ss;

  std::stop_token st1 = ss.get_token();
  std::stop_token st2;
  std::stop_token st3;

  assert(st1.stop_possible() == true);
  assert(st2.stop_possible() == false);

  assert(st1.stop_requested() == false);
  assert(st2.stop_requested() == false);

  // (1) コピー代入演算子
  st2 = st1;
  assert(st2 == st1);
  assert(st1.stop_possible() == true);
  assert(st2.stop_possible() == true);

  // (2) ムーブ代入演算子
  st3 = std::move(st1);
  assert(st1.stop_possible() == false);
  assert(st3.stop_possible() == true);

  ss.request_stop();

  assert(st1.stop_requested() == false);
  assert(st2.stop_requested() == true);
  assert(st3.stop_requested() == true);
}
```
* std::move[link /reference/utility/move.md]
* std::stop_token[link ../stop_token.md]
* std::stop_source[link ../stop_source.md]
* stop_requested()[link stop_requested.md]
* stop_possible()[link stop_possible.md]
* get_token()[link ../stop_source/get_token.md]

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
