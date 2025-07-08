# operator<=>
* chrono[meta header]
* std::chrono[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  template <class Rep1, class Period1, class Rep2, class Period2>
       requires three_way_comparable<
         typename common_type_t<
           duration<Rep1, Period1>,
           duration<Rep2, Period2>
         >::rep
       >
  constexpr auto
    operator<=>(const duration<Rep1, Period1>& lhs,
                const duration<Rep2, Period2>& rhs);  // (1) C++20
}
```

## 概要
三方比較を行う


## 戻り値
2つの[`duration`](/reference/chrono/duration.md)の単位を合わせた上で、[`count()`](/reference/chrono/duration/count.md)の三方比較を行う。

```cpp
using ct = common_type<decltype(lhs), decltype(rhs)>::type;
return ct(lhs).count() <=> ct(rhs).count();
```
* common_type[link /reference/type_traits/common_type.md]
* count()[link /reference/chrono/duration/count.md]


## 例
```cpp example
#include <cassert>
#include <chrono>

using namespace std::chrono;

int main()
{
  assert((seconds{3} <=> seconds{3}) == 0);
  assert((seconds{3} <=> milliseconds{3000}) == 0);
}
```

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 10 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P1614R2 The Mothership has Landed](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1614r2.html)
    - C++20での三方比較演算子の追加と、関連する演算子の自動導出
