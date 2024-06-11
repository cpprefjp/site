# operator+
* chrono[meta header]
* std::chrono[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  constexpr month operator+(const month& x, const months& y) noexcept; // (1) C++20
  constexpr month operator+(const months& x, const month& y) noexcept; // (2) C++20
}
```

## 概要
`month`の加算を行う。

- (1) : `month`に時間間隔を加算する
- (2) : 時間間隔に`month`を加算する


## 戻り値
- (1) :

ユークリッド除法 (Euclidean division) による除算関数`modulo(a, b)`があるとして、

```cpp
return month{modulo(static_cast<long long>(static_cast<unsigned int>(x)) + (y.count() - 1), 12) + 1};
```
* y.count()[link /reference/chrono/duration/count.md]

- (2) :

```cpp
return y + x;
```

## 例外
投げない


## 例
```cpp example
#include <cassert>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
  assert(chrono::January + chrono::months{2} == chrono::March);
  assert(chrono::months{2} + chrono::January == chrono::March);

  assert(chrono::February + chrono::months{11} == chrono::January);
}
```
* chrono::January[link /reference/chrono/month_constants.md]
* chrono::February[link /reference/chrono/month_constants.md]
* chrono::March[link /reference/chrono/month_constants.md]

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 8.0 [mark verified]
- [GCC](/implementation.md#gcc): 9.2 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]
