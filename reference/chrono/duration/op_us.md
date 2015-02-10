#usリテラル (C++14)
```cpp
namespace std {
inline namespace literals {
inline namespace chrono_literals {
  constexpr chrono::microseconds
    operator "" us(unsigned long long x);        // (1)

  constexpr chrono::duration<unspecified, micro>
    operator "" us(long double x);               // (2)
}}}
```
* chrono::microseconds[link /reference/chrono/microseconds.md]
* chrono::duration[link /reference/chrono/duration.md]
* micro[link /reference/ratio/si_unit.md]
* unspecified[italic]

##概要
マイクロ秒単位の値を表す[`duration`](/reference/chrono/duration.md)クラスのリテラル。

- (1) : 整数型のマイクロ秒リテラル
- (2) : 浮動小数点型のマイクロ秒リテラル


##戻り値
- (1) : `chrono::microseconds(x)`
- (2) : `chrono::duration<unspecified, micro>(x)`


##例
```cpp
#include <iostream>
#include <chrono>

int main()
{
  using namespace std::literals::chrono_literals;

  auto microseconds_i = 3us;   // 整数型の3マイクロ秒
  auto microseconds_f = 3.1us; // 浮動小数点型の3.1マイクロ秒

  std::cout << microseconds_i.count() << std::endl;
  std::cout << microseconds_f.count() << std::endl;
}
```
* 3us[color ff0000]
* 3.1us[color ff0000]
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


