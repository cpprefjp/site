# in_range
* utility[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class R, class T>
  constexpr bool in_range(T t) noexcept;
}
```

## 概要
値が型のとりうる範囲内か判定する。

この関数は、任意の整数型`T`の値`t`が、指定した整数型`R`のとりうる範囲内かを判定する。


## 適格要件
- 型`T`と型`U`はどちらも、符号なし整数型もしくは符号付き整数型であること


## 効果
以下と等価：

```cpp
return cmp_greater_equal(t, numeric_limits<R>::min()) &&
       cmp_less_equal(t, numeric_limits<R>::max());
```
* cmp_greater_equal[link cmp_greater_equal.md]
* cmp_less_equal[link cmp_less_equal.md]
* numeric_limits[link /reference/limits/numeric_limits.md]
* min()[link /reference/limits/numeric_limits/min.md]
* max()[link /reference/limits/numeric_limits/max.md]


## 例外
投げない


## 例
```cpp example
#include <cassert>
#include <utility>
#include <cstdint>

int main() {
  // -1は、符号付き整数型intのとりうる範囲内である
  assert(std::in_range<int>(-1));

  // -1は、符号なし整数型unsigned intのとりうる範囲内ではない
  assert(!std::in_range<unsigned int>(-1));

  // 255は、符号なし8ビット整数の範囲内である
  assert(std::in_range<std::uint8_t>(255));

  // 255は、符号付き8ビット整数の範囲内ではない
  assert(!std::in_range<std::int8_t>(255));
}
```
* std::in_range[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++20

## 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 10.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 7 [mark verified]


## 参照
- [P0586R2 Safe integral comparisons](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p0586r2.html)
