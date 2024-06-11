# operator<=>
* chrono[meta header]
* std::chrono[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  strong_ordering operator<=>(const time_zone& x, const time_zone& y) noexcept; // (1) C++20
}
```

## 概要
`time_zone`同士の三方比較を行う。


## 戻り値
- (1) :

```cpp
return x.name() <=> y.name();
```
* name()[link name.md]


## 例外
投げない


## 備考
- この演算子により、`operator<`、`operator<=`、`operator>`、`operator>=`が使用可能になる


## 例
```cpp example
#include <cassert>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
  assert((chrono::locate_zone("Asia/Tokyo") <=> chrono::locate_zone("Asia/Tokyo")) == 0);
}
```
* chrono::locate_zone[link /reference/chrono/locate_zone.md]

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0 [mark noimpl]
- [GCC](/implementation.md#gcc): 9.2 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]
