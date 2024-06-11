# operator+
* chrono[meta header]
* std::chrono[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  constexpr day operator+(const day& x, const days& y) noexcept; // (1) C++20
  constexpr day operator+(const days& x, const day& y) noexcept; // (2) C++20
}
```

## 概要
`day`の加算を行う。

- (1) : `day`に時間間隔を加算する
- (2) : 時間間隔に`day`を加算する


## 戻り値
- (1) :

```cpp
return day{static_cast<unsigned int>(x) + y.count()};
```
* y.count()[link /reference/chrono/duration/count.md]


- (2) :

```cpp
return y + x;
```


## 例外
投げない


## 備考
- [`month`](/reference/chrono/month.md)や[`weekday`](/reference/chrono/weekday.md)と違い、`[1, 31]`の範囲では循環しない


## 例
```cpp example
#include <cassert>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
  assert(chrono::day{1} + chrono::days{2} == chrono::day{3});
  assert(chrono::days{2} + chrono::day{1} == chrono::day{3});
}
```

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
