#minリテラル
* chrono[meta header]
* std::chrono_literals[meta namespace]
* function[meta id-type]
* cpp14[meta cpp]

```cpp
namespace std {

inline namespace literals {
inline namespace chrono_literals {
  constexpr chrono::minutes
    operator "" min(unsigned long long x);             // (1)

  constexpr chrono::duration<unspecified, ratio<60,1>>
    operator "" min(long double x);                    // (2)
}}

namespace chrono {
using namespace literals::chrono_literals;
} // namespace chrono

}  // namespace std
```
* chrono::minutes[link /reference/chrono/minutes.md]
* chrono::duration[link /reference/chrono/duration.md]
* ratio[link /reference/ratio/ratio.md]
* unspecified[italic]

##概要
分単位の値を表す[`duration`](/reference/chrono/duration.md)クラスのリテラル。

- (1) : 整数型の分リテラル
- (2) : 浮動小数点型の分リテラル


##戻り値
- (1) : `chrono::minutes(x)`
- (2) : `chrono::duration<unspecified, ratio<60,1>>(x)`


##例
```cpp
#include <iostream>
#include <chrono>

int main()
{
  using namespace std::literals::chrono_literals;

  auto minutes_i = 3min;   // 整数型の3分
  auto minutes_f = 3.1min; // 浮動小数点型の3.1分

  std::cout << minutes_i.count() << std::endl;
  std::cout << minutes_f.count() << std::endl;
}
```
* 3min[color ff0000]
* 3.1min[color ff0000]
* std::cout[link /reference/iostream/cout.md]
* std::endl[link /reference/ostream/endl.md]

###出力
```
3
3.1
```

##バージョン
###言語
- C++14

###処理系
- [Clang, C++14 mode](/implementation.md#clang): 3.4
- [GCC, C++14 mode](/implementation.md#gcc): 4.9.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 14.0

##参照
- [N3642 User-defined Literals for Standard Library Types (part 1 - version 4)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3642.pdf)
- [LWG Issue 2278. User-defined literals for Standard Library types](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2278)


