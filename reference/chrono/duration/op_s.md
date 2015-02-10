#sリテラル (C++14)
```cpp
namespace std {
inline namespace literals {
inline namespace chrono_literals {
  constexpr chrono::seconds
    operator "" s(unsigned long long x);  // (1)

  constexpr chrono::duration<unspecified>
    operator "" s(long double x);         // (2)
}}}
```
* chrono::seconds[link /reference/chrono/seconds.md]
* chrono::duration[link /reference/chrono/duration.md]
* ratio[link /reference/ratio/ratio.md]
* unspecified[italic]

##概要
秒単位の値を表す[`duration`](/reference/chrono/duration.md)クラスのリテラル。

- (1) : 整数型の秒リテラル
- (2) : 浮動小数点型の秒リテラル


##戻り値
- (1) : `chrono::seconds(x)`
- (2) : `chrono::duration<unspecified>(x)`


##例
```cpp
#include <iostream>
#include <chrono>

int main()
{
  using namespace std::literals::chrono_literals;

  auto seconds_i = 3s;   // 整数型の3秒
  auto seconds_f = 3.1s; // 浮動小数点型の3.1秒

  std::cout << seconds_i.count() << std::endl;
  std::cout << seconds_f.count() << std::endl;
}
```
* 3s[color ff0000]
* 3.1s[color ff0000]
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


