# usリテラル
* chrono[meta header]
* std::chrono_literals[meta namespace]
* function[meta id-type]
* cpp14[meta cpp]

```cpp
namespace std {

inline namespace literals {
inline namespace chrono_literals {
  constexpr chrono::microseconds
    operator "" us(unsigned long long x);        // (1)

  constexpr chrono::duration<unspecified, micro>
    operator "" us(long double x);               // (2)
}}

namespace chrono {
using namespace literals::chrono_literals;
} // namespace chrono

}  // namespace std
```
* micro[link /reference/ratio/si_prefix.md]
* unspecified[italic]

## 概要
マイクロ秒単位の値を表す[`duration`](/reference/chrono/duration.md)クラスのリテラル。

- (1) : 整数型のマイクロ秒リテラル
- (2) : 浮動小数点型のマイクロ秒リテラル


## 戻り値
- (1) : `chrono::microseconds(x)`
- (2) : `chrono::duration<unspecified, micro>(x)`


## 例
```cpp example
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
* count()[link count.md]

### 出力
```
3
3.1
```

## バージョン
### 言語
- C++14

### 処理系
- [Clang](/implementation.md#clang): 3.4 [mark verified]
- [GCC](/implementation.md#gcc): 4.9.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2015 [mark verified]

## 参照
- [N3642 User-defined Literals for Standard Library Types (part 1 - version 4)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3642.pdf)
- [LWG Issue 2278. User-defined literals for Standard Library types](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2278)

