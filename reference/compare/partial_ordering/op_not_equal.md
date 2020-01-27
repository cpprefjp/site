# operator!=

* compare[meta header]
* function[meta id-type]
* std[meta namespace]
* partial_ordering[meta class]
* cpp20[meta cpp]

```cpp
//operator==により、以下のオーバー�ードが使用可能になる        
friend constexpr bool operator!=(partial_ordering v, partial_ordering w) noexcept; // (1)

friend constexpr bool operator!=(partial_ordering v, /*unspecified*/) noexcept;   // (2)

friend constexpr bool operator!=(/*unspecified*/, partial_ordering v) noexcept;   // (3)
```

## 概要

- (1) : `partial_ordering`同士の非�値比較を行う
- (2)(3) : `partial_ordering`の値が`partial_ordering::equivalent`で無いことを調べる。

## 戻り値

- (1) : `return !(v == w)`
- (2)(3) : `return !(v == 0)`


## 例外

投げない。

## 備考

これらの演算�は全て[`operator==`](op_equal.md)によって使用可能になる。

*unspecified*となっている片側の引数には`0`リテラルのみが使用できる。それ以外の物を渡した場合、動作は未定義。

## 例
```cpp example
#include <iostream>
#include <compare>

int main()
{
  std::partial_ordering comp1 = 1 <=> 2;
  std::partial_ordering comp2 = 1 <=> 1;
  std::partial_ordering comp3 = -0.0 <=> +0.0;
  
  constexpr auto qnan = std::numeric_limits<double>::quiet_NaN();
  std::partial_ordering comp4 = qnan <=> qnan;

  std::cout << std::boolalpha;

  // (1)
  std::cout << (comp1 != comp2) << std::endl;

  // (2) 
  std::cout << (comp1 != 0) << std::endl;
  std::cout << (comp3 != 0) << std::endl;
  std::cout << (comp4 != 0) << std::endl;

  // (3)
  std::cout << (0 != comp1) << std::endl;
  std::cout << (0 != comp3) << std::endl;
  std::cout << (0 != comp4) << std::endl;
}
```

### 出力
```
true
true
false
true
true
false
true
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 8.0(1が未実装)
- [GCC](/implementation.md#gcc): 10.1(full support)
- [Visual C++](/implementation.md#visual_cpp): 2019(1が未実装)

## 関連項目

- [C++20 一貫比較](/lang/cpp20/consistent_comparison.md)


## 参照

- [P0515R3 Consistent comparison](http://wg21.link/p0515)
- [P0768R1 Library support for the spaceship (comparison) operator](http://wg21.link/p0768)
- [P1614R2 The Mothership has Landed (Adding <=> to the Library)](http://wg21.link/p1614)