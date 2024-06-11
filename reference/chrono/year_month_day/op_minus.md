# operator-
* chrono[meta header]
* std::chrono[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  constexpr year_month_day operator-(const year_month_day& ymd, const months& dm) noexcept; // (1) C++20
  constexpr year_month_day operator-(const year_month_day& ymd, const years& dy) noexcept;  // (2) C++20
}
```

## 概要
`year_month_day`の減算を行う。

- (1) : `year_month_day`から月の時間間隔を減算する
- (2) : `year_month_day`から年の時間間隔を減算する


## テンプレートパラメータ制約
- (1) : [`months`](/reference/chrono/duration_aliases.md)パラメータに指定した引数が[`years`](/reference/chrono/duration_aliases.md)に変換可能である場合、[`years`](/reference/chrono/duration_aliases.md)への暗黙変換は、[`months`](/reference/chrono/duration_aliases.md)への暗黙変換よりも劣る


## 戻り値
- (1) : `return ymd + (-dm);`
- (2) : `return ymd + (-dy);`


## 例外
投げない


## 備考
- 日の値が29以上である場合、減算により年月の値によっては範囲外の日となり、[`ok()`](ok.md) `== false`になる可能性がある


## 例
```cpp example
#include <cassert>
#include <chrono>

namespace chrono = std::chrono;
using namespace std::chrono_literals;

int main()
{
  assert(2020y/3/1 - chrono::months{1} == 2020y/2/1);
  assert(2020y/3/1 - chrono::years{1} == 2019y/3/1);
}
```
* 2020y[link /reference/chrono/year/op_y.md]
* 2019y[link /reference/chrono/year/op_y.md]

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 8.0 [mark verified]
- [GCC](/implementation.md#gcc): 9.2 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]


## 参照
- [LWG Issue 3260. `year_month*` arithmetic rejects durations convertible to `years`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p2117r0.html#3260)
