# operator/
* chrono[meta header]
* std::chrono[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
namespace chrono {
  // duration / N = duration
  template <class Rep1, class Period, class Rep2>
  constexpr duration<typename common_type<Rep1, Rep2>::type, Period>
    operator/(const duration<Rep1, Period>& d,
              const Rep2& s);                      // (1)

  // duration / duration = N
  template <class Rep1, class Period1, class Rep2, class Period2>
  constexpr typename common_type<Rep1, Rep2>::type
    operator/(const duration<Rep1, Period1>& lhs,
              const duration<Rep2, Period2>& rhs); // (2)
}}
```
* common_type[link /reference/type_traits/common_type.md]

## 概要
`duration`の除算を行う

- (1) : `duration`を任意の算術型で除算する
- (2) : `duration`を`duration`で除算する


## テンプレートパラメータ制約
- (1) : [`is_convertible_v`](/reference/type_traits/is_convertible.md)`<const Rep2&,` [`common_type_t`](/reference/type_traits/common_type.md)`<Rep1, Rep2>>`が`true`であり、かつ`Rep2`が`duration`の特殊化でないこと


## 戻り値
- (1)

```cpp
using cd = duration<typename common_type<Rep1, Rep2>::type, Period>;
return cd(cd(d).count() / s);
```
* common_type[link /reference/type_traits/common_type.md]
* count[link /reference/chrono/duration/count.md]

- (2)

```cpp
using cd = typename common_type<duration<Rep1, Period1>, duration<Rep2, Period2>>::type;
return cd(lhs).count() / cd(rhs).count();
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
  // duration / rep
  {
    seconds s = seconds(8) / 2;
    std::cout << s.count() << std::endl;

    milliseconds ms = milliseconds(8) / 2;
    std::cout << ms.count() << std::endl;
  }

  // duration / duration
  {
    seconds::rep s = seconds(8) / seconds(2);
    std::cout << s << std::endl;

    milliseconds::rep ms = milliseconds(8) / milliseconds(2);
    std::cout << ms << std::endl;
  }
}
```
* count()[link count.md]

### 出力
```
4
4
4
4
```

## バージョン
### 言語
- C++11

### 処理系
- [GCC](/implementation.md#gcc): 4.6.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2012 [mark verified], 2013 [mark verified], 2015 [mark verified]
	- 2013でサンプルコードをコンパイルしたところ、duration / durationでコンパイルエラーになった。


## 参照
- [LWG Issue 3104. Fixing `duration` division](https://wg21.cmeerw.net/lwg/issue3104)
- [P2117R0 C++ Standard Library Issues Resolved Directly In Prague](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p2117r0.html)
