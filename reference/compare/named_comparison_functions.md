# is_eq, is_neq, is_lt, is_lteq, is_gt, is_gteq

* compare[meta header]
* function[meta id-type]
* std[meta namespace]
* cpp20[meta cpp]

```cpp
namespace std {
  constexpr bool is_eq  (partial_ordering cmp) noexcept;     // (1)
  constexpr bool is_neq (partial_ordering cmp) noexcept;     // (2)
  constexpr bool is_lt  (partial_ordering cmp) noexcept;  // (3)
  constexpr bool is_lteq(partial_ordering cmp) noexcept;  // (4)
  constexpr bool is_gt  (partial_ordering cmp) noexcept;  // (5)
  constexpr bool is_gteq(partial_ordering cmp) noexcept;  // (6)
}
```

## 概要

任意の`<=>`による比較結果のカテゴリ型の値から、`bool`値としての結果を取り出す。

## 戻り値

- (1) : `return cmp == 0;`
- (2) : `return cmp != 0;`
- (3) : `return cmp <  0;`
- (4) : `return cmp <= 0;`
- (5) : `return cmp >  0;`
- (6) : `return cmp >= 0;`


## 例
```cpp example
#include <iostream>
#include <compare>

int main()
{
  std::strong_ordering comp1 = 1 <=> 2;
  std::strong_ordering comp2 = 3 <=> 3;

  std::cout << std::boolalpha;

  // (1)
  std::cout << std::is_eq(comp1) << std::endl;
  std::cout << std::is_eq(comp2) << std::endl;
  std::cout << "\n";

  // (2)
  std::cout << std::is_neq(comp1) << std::endl;
  std::cout << std::is_neq(comp2) << std::endl;
  std::cout << "\n";

  // (3)
  std::cout << std::is_lt(comp1) << std::endl;
  std::cout << std::is_lt(comp2) << std::endl;
  std::cout << "\n";

  // (4)
  std::cout << std::is_lteq(comp1) << std::endl;
  std::cout << std::is_lteq(comp2) << std::endl;
  std::cout << "\n";

  // (5)
  std::cout << std::is_gt(comp1) << std::endl;
  std::cout << std::is_gt(comp2) << std::endl;
  std::cout << "\n";

  // (6)
  std::cout << std::is_gteq(comp1) << std::endl;
  std::cout << std::is_gteq(comp2) << std::endl;
}
```
* is_eq[color ff0000]
* is_neq[color ff0000]
* is_lt[color ff0000]
* is_lteq[color ff0000]
* is_gt[color ff0000]
* is_gteq[color ff0000]

### 出力
```
false
true

true
false

true
false

true
true

false
false

false
true
```


## 実装例
```cpp
constexpr bool is_eq  (partial_ordering cmp) noexcept    { return cmp == 0; }
constexpr bool is_neq (partial_ordering cmp) noexcept    { return cmp != 0; }
constexpr bool is_lt  (partial_ordering cmp) noexcept { return cmp <  0; }
constexpr bool is_lteq(partial_ordering cmp) noexcept { return cmp <= 0; }
constexpr bool is_gt  (partial_ordering cmp) noexcept { return cmp >  0; }
constexpr bool is_gteq(partial_ordering cmp) noexcept { return cmp >= 0; }
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 8.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 [mark verified]

## 関連項目

- [C++20 `<=>`/`==`による比較演算子の自動定義](/lang/cpp20/consistent_comparison.md)

## 参照

- [P0515R3 Consistent comparison](http://wg21.link/p0515)
- [P0768R1 Library support for the spaceship (comparison) operator](http://wg21.link/p0768)
