# yリテラル
* chrono[meta header]
* std::chrono_literals[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {

inline namespace literals {
inline namespace chrono_literals {
  constexpr year operator""y(unsigned long long y) noexcept; // (1)
}}

namespace chrono {
using namespace literals::chrono_literals;
} // namespace chrono

}  // namespace std
```

## 概要
年単位の値を表す`year`クラスのリテラル。

- (1) : 整数型の年リテラル


## 戻り値
- (1) : `return year{static_cast<int>(y)};`


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

  auto y = 2020y; // 整数型の2020年
  std::cout << y << std::endl;

  // 月のint型整数値と組み合わせることで、年・月を作れる
  chrono::year_month date = 2020y/3; // 日の情報をもたない「2020年3月」
  std::cout << date << std::endl;
}
```
* 2020y[color ff0000]
* chrono::year_month[link /reference/chrono/year_month.md]

### 出力
```
2020
2020/Mar
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 8.0 [mark verified]
- [GCC](/implementation.md#gcc): 9.2 [mark noimpl], 15.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]
