# operator+=
* chrono[meta header]
* std::chrono[meta namespace]
* weekday[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr weekday& operator+=(const days& d) noexcept; // (1) C++20
```

## 概要
`weekday`の値に対して加算の複合代入を行う。


## 効果
- (1) : `*this = *this + d`


## 戻り値
- (1) : `*this`


## 例外
投げない


## 例
```cpp example
#include <cassert>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
  chrono::weekday w = chrono::Saturday;

  w += chrono::days{3};
  assert(w == chrono::Tuesday);
}
```
* chrono::Saturday[link /reference/chrono/weekday_constants.md]
* chrono::Tuesday[link /reference/chrono/weekday_constants.md]

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
