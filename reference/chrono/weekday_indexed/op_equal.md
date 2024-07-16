# operator==
* chrono[meta header]
* std::chrono[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  constexpr bool operator==(const weekday_indexed& x, const weekday_indexed& y) noexcept; // (1) C++20
}
```

## 概要
`weekday_indexed`同士の等値比較を行う。


## 戻り値
- (1) :

```cpp
return x.weekday() == y.weekday() && x.index() == y.index();
```
* weekday()[link weekday.md]
* index()[link index.md]


## 例外
投げない


## 備考
- この演算子により、`operator!=`が使用可能になる


## 例
```cpp example
#include <cassert>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
  assert(chrono::Sunday[1] == chrono::Sunday[1]);
  assert(chrono::Sunday[1] != chrono::Sunday[2]);
  assert(chrono::Sunday[1] != chrono::Monday[1]);
}
```
* chrono::Sunday[link /reference/chrono/weekday_constants.md]
* chrono::Monday[link /reference/chrono/weekday_constants.md]

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
