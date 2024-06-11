# operator==
* chrono[meta header]
* std::chrono[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  constexpr bool operator==(const month_weekday& x, const month_weekday& y) noexcept; // (1) C++20
}
```

## 概要
`month_weekday`同士の等値比較を行う。


## 戻り値
- (1) :

```cpp
return x.month() == y.month() && x.weekday_indexed() == y.weekday_indexed();
```
* month()[link month.md]
* weekday_indexed()[link weekday_indexed.md]


## 例外
投げない


## 備考
- この演算子により、`operator!=`が使用可能になる


## 例
```cpp example
#include <cassert>
#include <chrono>

using namespace std::chrono;

int main()
{
  assert(March/Sunday[1] == March/Sunday[1]);
  assert(March/Sunday[1] != March/Sunday[2]);
}
```
* March[link /reference/chrono/month_constants.md]
* Sunday[link /reference/chrono/weekday_constants.md]

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 8.0 [mark verified]
- [GCC](/implementation.md#gcc): 11.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]
