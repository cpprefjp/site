# operator>=

* compare[meta header]
* function[meta id-type]
* std[meta namespace]
* partial_ordering[meta class]
* cpp20[meta cpp]

```cpp
friend constexpr bool operator>=(partial_ordering v, /*unspecified*/) noexcept;   // (1)

friend constexpr bool operator>=(/*unspecified*/, partial_ordering v) noexcept;   // (2)
```

## 概要

- (1) : `partial_ordering`の値が`partial_ordering::greater`もしくは`equivalent`であるかを調べる。
- (2) : `partial_ordering`の値が`partial_ordering::less`もしくは`equivalent`であるかを調べる。

## 戻り値

`int`型のメンバ変数`value`に各有効値に対応する値、`bool`型メンバ変数`is_ordered`に順序付けされているかどうかを保持しているとして、以下と�価
- (1) : `return is_ordered && v.value >= 0` 
- (2) : `return is_ordered && 0 >= v.value`

## 例外
投げない。

## 備考

それぞれ*unspecified*となっている片側の引数には`0`リテラルのみが使用できる。それ以外の物を渡した場合、動作は未定義。

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
  std::cout << (comp1 >= 0) << std::endl;
  std::cout << (comp2 >= 0) << std::endl;
  std::cout << (comp3 >= 0) << std::endl;
  std::cout << (comp4 >= 0) << std::endl;
  std::cout << "\n";

  // (2)
  std::cout << (0 >= comp1) << std::endl;
  std::cout << (0 >= comp2) << std::endl;
  std::cout << (0 >= comp3) << std::endl;
  std::cout << (0 >= comp4) << std::endl;
}
```

### 出力
```
false
true
true
false

true
true
true
false
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 8.0
- [GCC](/implementation.md#gcc): 10.1
- [Visual C++](/implementation.md#visual_cpp): 2019

## 関連項目

- [C++20 一貫比較](/lang/cpp20/consistent_comparison.md)


## 参照

- [P0515R3 Consistent comparison](http://wg21.link/p0515)
- [P0768R1 Library support for the spaceship (comparison) operator](http://wg21.link/p0768)
- [P1614R2 The Mothership has Landed (Adding <=> to the Library)](http://wg21.link/p1614)