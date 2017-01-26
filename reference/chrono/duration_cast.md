#duration_cast
* chrono[meta header]
* std::chrono[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
namespace chrono {
  template <class ToDuration, class Rep, class Period>
  constexpr ToDuration duration_cast(const duration<Rep, Period>& d);
}}
```
* duration[link /reference/chrono/duration.md]

##概要
分解能が低い[`duration`](/reference/chrono/duration.md)への変換


##戻り値
テンプレートパラメータ`ToDuration`で指定された型に変換された[`duration`](/reference/chrono/duration.md)。


##例
```cpp
#include <iostream>
#include <chrono>

using namespace std::chrono;

int main()
{
  milliseconds ms(1100);
//seconds s = ms;                         // error! 変換できない
  seconds s = duration_cast<seconds>(ms); // OK

  std::cout << s.count() << std::endl;
}
```
* duration_cast[color ff0000]
* milliseconds[link milliseconds.md]
* seconds[link seconds.md]
* s.count()[link duration/count.md]

###出力
```
1
```

##バージョン
###言語
- C++11

###処理系
- [GCC, C++11 mode](/implementation.md#gcc): 4.6.1
- [Visual C++](/implementation.md#visual_cpp): 11.0, 12.0, 14.0
