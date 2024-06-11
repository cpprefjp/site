# operator<=>
* system_error[meta header]
* std[meta namespace]
* error_category[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
strong_ordering operator<=>(const error_category& rhs) const noexcept; // (1) C++11
```

## 概要
`error_category`オブジェクトの三方比較を行う。


## 戻り値
```cpp
return compare_three_way()(this, &rhs);
```
* compare_three_way[link /reference/compare/compare_three_way.md]


## 例外
投げない


## 備考
- この演算子により、以下の演算子が使用可能になる (C++20)：
    - `operator<`
    - `operator<=`
    - `operator>`
    - `operator>=`


## 例
```cpp example
#include <iostream>
#include <system_error>

int main()
{
  const std::error_category& a = std::generic_category();
  const std::error_category& b = std::generic_category();
  const std::error_category& c = std::system_category();

  std::cout << std::boolalpha;

  std::cout << ((a <=> b) == 0) << std::endl;
  std::cout << (a < c) << std::endl;
  std::cout << (a <= c) << std::endl;
  std::cout << (a > c) << std::endl;
  std::cout << (a >= c) << std::endl;
}
```
* std::generic_category()[link /reference/system_error/generic_category.md]
* std::system_category()[link /reference/system_error/system_category.md]

### 出力例
```
true
false
false
true
true
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 10 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P1614R2 The Mothership has Landed](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1614r2.html)
    - C++20での三方比較演算子の追加と、関連する演算子の自動導出
