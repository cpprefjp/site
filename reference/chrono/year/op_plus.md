# operator+
* chrono[meta header]
* std::chrono[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  constexpr year operator+(const year& x, const years& y) noexcept; // (1) C++20
  constexpr year operator+(const years& x, const year& y) noexcept; // (2) C++20
}
```

## 概要
`year`の加算を行う。

- (1) : `year`に時間間隔を加算する
- (2) : 時間間隔に`year`を加算する


## 戻り値
- (1) :

```cpp
return year{static_cast<int>(x) + y.count()};
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
  assert(chrono::year{2017} + chrono::years{3} == chrono::year{2020});
  assert(chrono::years{3} + chrono::year{2017} == chrono::year{2020});
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
