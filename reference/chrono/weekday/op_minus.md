# operator-
* chrono[meta header]
* std::chrono[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  constexpr weekday operator-(const weekday& x, const days& y) noexcept;    // (1) C++20
  constexpr days    operator-(const weekday& x, const weekday& y) noexcept; // (2) C++20
}
```

## 概要
`weekday`の減算を行う。

- (1) : `weekday`から日単位の時間間隔を引いた曜日を求める
- (2) : 曜日間の差を日単位で求める


## 戻り値
- (1) : `return x + -y;`
- (2) : `x.`[`ok()`](ok.md) `== true`かつ`y.`[`ok()`](ok.md) `== true`である場合、範囲`[days{0}, days{11}]`に収まるよう`x`と`y`の曜日の差を日単位として求めて返す。そうでなければ、未規定の値が返る

## 例外
投げない


## 例
```cpp example
#include <cassert>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
  assert(chrono::Tuesday - chrono::days{3} == chrono::Saturday);
  assert(chrono::Tuesday - chrono::Saturday == chrono::days{3});
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
