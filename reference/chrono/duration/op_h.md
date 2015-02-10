#hリテラル (C++14)
```cpp
namespace std {
inline namespace literals {
inline namespace chrono_literals {
  constexpr chrono::hours
    operator "" h(unsigned long long x);                 // (1)

  constexpr chrono::duration<unspecified, ratio<3600,1>>
    operator "" h(long double x);                        // (2)
}}}
```
* chrono::hours[link /reference/chrono/hours.md]
* chrono::duration[link /reference/chrono/duration.md]
* ratio[link /reference/ratio/ratio.md]
* unspecified[italic]

##概要
時単位の値を表す[`duration`](/reference/chrono/duration.md)クラスのリテラル。

- (1) : 整数型の時リテラル
- (2) : 浮動小数点型の時リテラル


##戻り値
- (1) : `chrono::hours(x)`
- (2) : `chrono::duration<unspecified, ratio<3600,1>>(x)`


##例
```cpp
#include <iostream>
#include <chrono>

int main()
{
  using namespace std::literals::chrono_literals;

  auto hours_i = 3h;   // 整数型の3時間
  auto hours_f = 3.1h; // 浮動小数点型の3.1時間

  std::cout << hours_i.count() << std::endl;
  std::cout << hours_f.count() << std::endl;
}
```
* 3h[color ff0000]
* 3.1h[color ff0000]
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


