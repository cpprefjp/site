# 月の定数
* chrono[meta header]
* std::chrono[meta namespace]
* variable[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  inline constexpr month January{1};    // (1) C++20
  inline constexpr month February{2};   // (2) C++20
  inline constexpr month March{3};      // (3) C++20
  inline constexpr month April{4};      // (4) C++20
  inline constexpr month May{5};        // (5) C++20
  inline constexpr month June{6};       // (6) C++20
  inline constexpr month July{7};       // (7) C++20
  inline constexpr month August{8};     // (8) C++20
  inline constexpr month September{9};  // (9) C++20
  inline constexpr month October{10};   // (10) C++20
  inline constexpr month November{11};  // (11) C++20
  inline constexpr month December{12};  // (12) C++20
}
```
* month[link month.md]

## 概要
月を表す定数。

- (1) : 1月を表す定数
- (2) : 2月を表す定数
- (3) : 3月を表す定数
- (4) : 4月を表す定数
- (5) : 5月を表す定数
- (6) : 6月を表す定数
- (7) : 7月を表す定数
- (8) : 8月を表す定数
- (9) : 9月を表す定数
- (10) : 10月を表す定数
- (11) : 11月を表す定数
- (12) : 12月を表す定数


## 例
### 基本的な使い方
```cpp example
#include <iostream>
#include <chrono>

namespace chrono = std::chrono;

int main() {
  chrono::month m = chrono::January;
  ++m;
  std::cout << m << std::endl;

  chrono::month n = chrono::March;
  n += chrono::months{3};
  std::cout << n << std::endl;
}
```
* chrono::January[color ff0000]
* chrono::March[color ff0000]
* chrono::month[link month.md]

#### 出力
```
Feb
Jun
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0 (入出力ストリームなし) [mark verified]
- [GCC](/implementation.md#gcc): 9.2 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]

