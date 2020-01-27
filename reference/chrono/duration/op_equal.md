# operator==
* chrono[meta header]
* std::chrono[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
namespace chrono {
  template <class Rep1, class Period1, class Rep2, class Period2>
  constexpr bool operator==(const duration<Rep1, Period1>& lhs,
                            const duration<Rep2, Period2>& rhs);
}}
```

## 概要
�値比較を行う


## 戻り値
2つの[`duration`](/reference/chrono/duration.md)の単位を合わせた上で、[`count()`](/reference/chrono/duration/count.md)の�値比較を行う。

```cpp
using ct = common_type<decltype(lhs), decltype(rhs)>::type;
return ct(lhs).count() == ct(rhs).count();
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
  const bool result = seconds(3) == seconds(3);
  assert(result);
}
```
* ==[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [GCC](/implementation.md#gcc): 4.6.1
- [Visual C++](/implementation.md#visual_cpp): 2012, 2013, 2015

## 参照
- [N3469 Constexpr Library Additions: chrono, v3](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3469.html)

