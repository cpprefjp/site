# operator+=
* chrono[meta header]
* std::chrono[meta namespace]
* month[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr month& operator+=(const months& m) noexcept; // (1) C++20
```

## 概要
`month`の値に対して加算の複合代入を行う。

パラメータの型が、本クラスである`month`ではなく、月単位の時間間隔を表す[`months`](/reference/chrono/duration_aliases.md)であることに注意。


## 効果
- (1) : `*this = *this + m`


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
  chrono::month m = chrono::January;

  m += chrono::months{2};
  assert(m == chrono::March);
}
```
* chrono::January[link /reference/chrono/month_constants.md]
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
