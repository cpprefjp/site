# operator-
* chrono[meta header]
* std::chrono[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  constexpr year_month_weekday_last
    operator-(const year_month_weekday_last& ymwdl,
              const months& dm) noexcept;           // (1) C++20
  constexpr year_month_weekday_last
    operator-(const year_month_weekday_last& ymwdl,
              const years& dy) noexcept;            // (2) C++20
}
```

## 概要
`year_month_weekday_last`の減算を行う。

- (1) : `year_month_weekday_last`から月の時間間隔を減算する
- (2) : `year_month_weekday_last`から年の時間間隔を減算する


## テンプレートパラメータ制約
- (1) : [`months`](/reference/chrono/duration_aliases.md)パラメータに指定した引数が[`years`](/reference/chrono/duration_aliases.md)に変換可能である場合、[`years`](/reference/chrono/duration_aliases.md)への暗黙変換は、[`months`](/reference/chrono/duration_aliases.md)への暗黙変換よりも劣る


## 戻り値
- (1) : `return ymwdl + (-dm);`
- (2) : `return ymwdl + (-dy);`


## 例外
投げない


## 例
```cpp example
#include <cassert>
#include <chrono>

using namespace std::chrono;

int main()
{
  assert(2020y/4/Sunday[last] - months{1} == 2020y/3/Sunday[last]);
  assert(2021y/3/Sunday[last] - years{1} == 2020y/3/Sunday[last]);
}
```
* 2020y[link /reference/chrono/year/op_y.md]
* 2021y[link /reference/chrono/year/op_y.md]
* Sunday[link /reference/chrono/weekday_constants.md]
* last[link /reference/chrono/last_spec.md]

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 8.0 [mark verified]
- [GCC](/implementation.md#gcc): 11.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]


## 参照
- [LWG Issue 3260. `year_month*` arithmetic rejects durations convertible to `years`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p2117r0.html#3260)
