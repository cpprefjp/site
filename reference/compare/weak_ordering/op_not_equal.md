# operator!=

* compare[meta header]
* function[meta id-type]
* std[meta namespace]
* weak_ordering[meta class]
* cpp20[meta cpp]

```cpp
//operator==により、以下のオーバーロードが使用可能になる        
friend constexpr bool operator!=(weak_ordering v, weak_ordering w) noexcept; // (1)

friend constexpr bool operator!=(weak_ordering v, /*unspecified*/) noexcept;   // (2)

friend constexpr bool operator!=(/*unspecified*/, weak_ordering v) noexcept;   // (3)
```

## 概要

- (1) : `weak_ordering`同士の非等値比較を行う
- (2)(3) : `weak_ordering`の値が`weak_ordering::equivalent`で無いことを調べる。

## 戻り値

- (1) : `return !(v == w)` 
- (2)(3) : `return !(v == 0)`


## 例外

投げない。

## 備考

これらの演算子は全て[`operator==`](op_equal.md)によって使用可能になる。

*unspecified*となっている片側の引数には`0`リテラルのみが使用できる。それ以外の物を渡した場合、動作は未定義。

## 例
```cpp example
#include <iostream>
#include <compare>

int main()
{
  std::weak_ordering comp1 = 1 <=> 1;
  std::weak_ordering comp2 = 2 <=> 1;

  std::cout << std::boolalpha;

  // (1)
  std::cout << (comp1 != comp2) << std::endl;

  // (2) 
  std::cout << (comp1 != 0) << std::endl;

  // (3)
  std::cout << (0 != comp1) << std::endl;
}
```

### 出力
```
true
false
false
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 8.0(1が未実装) [mark verified]
- [GCC](/implementation.md#gcc): 10.1(full support) [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019(1が未実装) [mark verified]

## 関連項目

- [C++20 一貫比較](/lang/cpp20/consistent_comparison.md)


## 参照

- [P0515R3 Consistent comparison](http://wg21.link/p0515)
- [P0768R1 Library support for the spaceship (comparison) operator](http://wg21.link/p0768)
- [P1614R2 The Mothership has Landed (Adding <=> to the Library)](http://wg21.link/p1614)