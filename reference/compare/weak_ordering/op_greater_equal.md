# operator>=

* compare[meta header]
* function[meta id-type]
* std[meta namespace]
* weak_ordering[meta class]
* cpp20[meta cpp]

```cpp
friend constexpr bool operator>=(weak_ordering v, /*unspecified*/) noexcept;   // (1)

friend constexpr bool operator>=(/*unspecified*/, weak_ordering v) noexcept;   // (2)
```

## 概要

- (1) : `weak_ordering`の値が`weak_ordering::greater`もしくは`equivalent`であるかを調べる。
- (2) : `weak_ordering`の値が`weak_ordering::less`もしくは`equivalent`であるかを調べる。

## 戻り値

`int`型のメンバ変数`value`に各有効値に対応する値を保持しているとして、以下と�価

- (1) : `return v.value >= 0` 
- (2) : `return 0 >= v.value`

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
  std::weak_ordering comp1 = 1 <=> 2;
  std::weak_ordering comp2 = 1 <=> 1;

  std::cout << std::boolalpha;

  // (1) 
  std::cout << (comp1 >= 0) << std::endl;
  std::cout << (comp2 >= 0) << std::endl;

  // (2)
  std::cout << (0 >= comp1) << std::endl;
  std::cout << (0 >= comp2) << std::endl;
}
```

### 出力
```
false
true
true
true
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