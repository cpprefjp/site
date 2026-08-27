# operator%
* chrono[meta header]
* std::chrono[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
namespace chrono {
  // duration % N = duration
  template <class Rep1, class Period, class Rep2>
  duration<typename common_type<Rep1, Rep2>::type, Period>
    constexpr operator%(const duration<Rep1, Period>& d,
                        const Rep2& s);                      // (1)

  // duration % duration = duration
  template <class Rep1, class Period1, class Rep2, class Period2>
  typename common_type<duration<Rep1, Period1>, duration<Rep2, Period2>>::type
    constexpr operator%(const duration<Rep1, Period1>& lhs,
                        const duration<Rep2, Period2>& rhs); // (2)
}}
```
* common_type[link /reference/type_traits/common_type.md]

## 概要
durationの剰余演算を行う


## テンプレートパラメータ制約
- (1) : [`is_convertible_v`](/reference/type_traits/is_convertible.md)`<const Rep2&,` [`common_type_t`](/reference/type_traits/common_type.md)`<Rep1, Rep2>>`が`true`であり、かつ`Rep2`が`duration`の特殊化でないこと


## 戻り値
- (1)

```cpp
using cd = duration<typename common_type<Rep1, Rep2>::type, Period>;
return cd(cd(d).count() % s);
```
* common_type[link /reference/type_traits/common_type.md]
* count[link /reference/chrono/duration/count.md]

- (2)

```cpp
using cd = typename common_type<duration<Rep1, Period1>, duration<Rep2, Period2>>::type;
return cd(cd(lhs).count() % cd(rhs).count());
```
* common_type[link /reference/type_traits/common_type.md]
* count[link /reference/chrono/duration/count.md]

## 例
```cpp example
#include <iostream>
#include <chrono>

using namespace std::chrono;

int main()
{
  // duration % rep
  {
    seconds s = seconds(8) % 3;
    std::cout << s.count() << std::endl;

    milliseconds ms = milliseconds(8) % 3;
    std::cout << ms.count() << std::endl;
  }

  // duration % duration
  {
    seconds s = seconds(8) % seconds(3);
    std::cout << s.count() << std::endl;

    milliseconds ms = milliseconds(8) % milliseconds(3);
    std::cout << ms.count() << std::endl;
  }
}
```
* %[color ff0000]
* count()[link count.md]

### 出力
```
2
2
2
2
```

## バージョン
### 言語
- C++11

### 処理系
- [GCC](/implementation.md#gcc): 4.6.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2012 [mark verified], 2013 [mark verified], 2015 [mark verified]
    - 2012, 2013でサンプルコードをコンパイルしたところ、duration % durationでコンパイルエラーになった。


## 参照
- [P2117R0 C++ Standard Library Issues Resolved Directly In Prague](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p2117r0.html)
- [LWG Issue 934. `duration` is missing `operator%`](https://cplusplus.github.io/LWG/issue934)
    - C++11で、剰余演算子が追加された。時間を単位ごとに分解する (秒数から分と秒を求めるなど) 用途で必要となるため
- [LWG Issue 1271. CR undefined in `duration` operators](https://cplusplus.github.io/LWG/issue1271)
    - C++11で、戻り値の記述で使用していた`CR`が、引数の型を明示した`CR(Rep1, Rep2)`という表記へ修正された
