# dリテラル
* chrono[meta header]
* std::chrono_literals[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {

inline namespace literals {
inline namespace chrono_literals {
  constexpr day operator""d(unsigned long long d) noexcept; // (1)
}}

namespace chrono {
using namespace literals::chrono_literals;
} // namespace chrono

}  // namespace std
```

## 概要
日単位の値を表す`day`クラスのリテラル。

- (1) : 整数型の日リテラル


## 戻り値
- (1) : `return day{static_cast<unsigned int>(d)};`


## 備考
- 時間間隔のリテラルではなく、カレンダーのリテラルなので注意


## 例
```cpp example
#include <iostream>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
  using namespace std::chrono_literals;

  auto d = 3d; // 整数型の3日
  std::cout << d << std::endl;

  // 月のint型整数値と組み合わせることで、月・日を作れる
  chrono::month_day date = 3/1d; // 年の情報をもたない「3月1日」
  std::cout << date << std::endl;
}
```
* 3d[color ff0000]
* 1d[color ff0000]
* chrono::month_day[link /reference/chrono/month_day.md]

### 出力
```
03
Mar/01
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 8.0 [mark verified]
- [GCC](/implementation.md#gcc): 9.2 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]
