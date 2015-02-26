#msリテラル (C++14)
* chrono[meta header]
* std::chrono_literals[meta namespace]
* duration[meta class]

```cpp
namespace std {

inline namespace literals {
inline namespace chrono_literals {
  constexpr chrono::milliseconds
    operator "" ms(unsigned long long x);        // (1)

  constexpr chrono::duration<unspecified, milli>
    operator "" ms(long double x);               // (2)
}}

namespace chrono {
using namespace literals::chrono_literals;
} // namespace chrono

}  // namespace std
```
* chrono::milliseconds[link /reference/chrono/milliseconds.md]
* chrono::duration[link /reference/chrono/duration.md]
* milli[link /reference/ratio/si_unit.md]
* unspecified[italic]

##概要
ミリ秒単位の値を表す[`duration`](/reference/chrono/duration.md)クラスのリテラル。

- (1) : 整数型のミリ秒リテラル
- (2) : 浮動小数点型のミリ秒リテラル


##戻り値
- (1) : `chrono::milliseconds(x)`
- (2) : `chrono::duration<unspecified, milli>(x)`


##例
```cpp
#include <iostream>
#include <chrono>

int main()
{
  using namespace std::literals::chrono_literals;

  auto milliseconds_i = 3ms;   // 整数型の3ミリ秒
  auto milliseconds_f = 3.1ms; // 浮動小数点型の3.1ミリ秒

  std::cout << milliseconds_i.count() << std::endl;
  std::cout << milliseconds_f.count() << std::endl;
}
```
* 3ms[color ff0000]
* 3.1ms[color ff0000]
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
- [Visual C++](/implementation.md#visual_cpp): 

##参照
- [N3642 User-defined Literals for Standard Library Types (part 1 - version 4)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3642.pdf)
- [LWG Issue 2278. User-defined literals for Standard Library types](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2278)


