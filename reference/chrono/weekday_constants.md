# 曜日の定数
* chrono[meta header]
* std::chrono[meta namespace]
* variable[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  inline constexpr weekday Sunday{0};    // (1) C++20
  inline constexpr weekday Monday{1};    // (2) C++20
  inline constexpr weekday Tuesday{2};   // (3) C++20
  inline constexpr weekday Wednesday{3}; // (4) C++20
  inline constexpr weekday Thursday{4};  // (5) C++20
  inline constexpr weekday Friday{5};    // (6) C++20
  inline constexpr weekday Saturday{6};  // (7) C++20
}
```
* weekday[link weekday.md]

## 概要
曜日を表す定数。

- (1) : 日曜日を表す定数
- (2) : 月曜日を表す定数
- (3) : 火曜日を表す定数
- (4) : 水曜日を表す定数
- (5) : 木曜日を表す定数
- (6) : 金曜日を表す定数
- (7) : 土曜日を表す定数


## 例
### 基本的な使い方
```cpp example
#include <cassert>
#include <iostream>
#include <chrono>

namespace chrono = std::chrono;

int main() {
  chrono::weekday w = chrono::Sunday;
  ++w;
  std::cout << w << std::endl;

  chrono::weekday v = chrono::Wednesday;
  v += chrono::days{3};
  std::cout << v << std::endl;

  // 曜日は循環する
  chrono::weekday u = chrono::Saturday;
  v += chrono::days{2};
  assert(v == chrono::Monday);
}
```
* chrono::Sunday[color ff0000]
* chrono::Wednesday[color ff0000]
* chrono::Saturday[color ff0000]
* chrono::Monday[color ff0000]
* chrono::weekday[link weekday.md]

#### 出力
```
Mon
Sat
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 8.0 (入出力ストリームなし) [mark verified]
- [GCC](/implementation.md#gcc): 9.2 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]
