# operator+
* chrono[meta header]
* std::chrono[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  constexpr weekday operator+(const weekday& x, const days& y) noexcept; // (1) C++20
  constexpr weekday operator+(const days& x, const weekday& y) noexcept; // (2) C++20
}
```

## 概要
`weekday`の加算を行う。

- (1) : `weekday`に日単位の時間間隔を加算する
- (2) : 日単位の時間間隔に`weekday`を加算する


## 戻り値
- (1) :

ユークリッド除法 (Euclidean division) による除算関数`modulo(a, b)`、および`weekday`オブジェクト`x`がコンストラクタで�定された曜日を表す値`wd`を持っているとして、

```cpp
return weekday{modulo(static_cast<long long>(x.wd) + y.count(), 7)};
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
  assert(chrono::Saturday + chrono::days{3} == chrono::Tuesday);
  assert(chrono::days{3} + chrono::Saturday == chrono::Tuesday);
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
- [Clang](/implementation.md#clang): 8.0
- [GCC](/implementation.md#gcc): (9.2時点で実装なし)
- [Visual C++](/implementation.md#visual_cpp): (2019 Update 3時点で実装なし)
