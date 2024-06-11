# is_clock
* chrono[meta header]
* std::chrono[meta namespace]
* class template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  template <class T>
  struct is_clock;                                       // (1) C++20

  template <class T>
  inline constexpr bool is_clock_v = is_clock<T>::value; // (2) C++20
}
```

## 概要
`is_clock`は、クロック型かを判定する型特性である。

型`T`がClock要件を満たす場合は[`true_type`](/reference/type_traits/true_type.md)から派生し、そうでなければ[`false_type`](/reference/type_traits/false_type.md)から派生する。

Clock要件を満たすには、以下が必要である：

- 修飾された型`T`が、`T::period`、`T::duration`、`T::time_point`メンバ型を持っていること
- 式`T::is_steady`が評価されないオペランドで使用された場合に妥当であること
- 式`T::now()`が評価されないオペランドで使用された場合に妥当であること

`is_clock`の特殊化を追加した場合のプログラムの動作は未定義である。


## 例
```cpp example
#include <chrono>

using namespace std::chrono;

int main()
{
  static_assert(is_clock_v<system_clock>);
  static_assert(is_clock_v<steady_clock>);
  static_assert(is_clock_v<high_resolution_clock>);
  static_assert(is_clock_v<utc_clock>);
  static_assert(is_clock_v<tai_clock>);
  static_assert(is_clock_v<gps_clock>);
  static_assert(is_clock_v<file_clock>);
}
```
* is_clock_v[color ff0000]
* system_clock[link system_clock.md]
* steady_clock[link steady_clock.md]
* high_resolution_clock[link high_resolution_clock.md]
* utc_clock[link utc_clock.md]
* tai_clock[link tai_clock.md]
* gps_clock[link gps_clock.md]
* file_clock[link file_clock.md]

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

