# operator<=>

* compare[meta header]
* function[meta id-type]
* std[meta namespace]
* partial_ordering[meta class]
* cpp20[meta cpp]

```cpp
friend constexpr partial_ordering operator<=>(partial_ordering v, /*unspecified*/) noexcept;   // (1)

friend constexpr partial_ordering operator<=>(/*unspecified*/, partial_ordering v) noexcept;   // (2)
```

## 概要

- (1) : 左辺の`partial_ordering`の値を取得する。
- (2) : 右辺の`partial_ordering`の値の表現する順序を反転させた値を取得する。

## 戻り値

- (1) : `return v` 
- (2) : `return v < 0 ? partial_ordering::greater : (v > 0 ? partial_ordering::less : v)`

## 例外
投げない。

## 備考

これらの演算子は、`partial_ordering`がメンバ変数となっている時にその属する型の三方比較演算子の`default`実装を妨げないために定義されている。

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

  std::cout << (comp1 <  0) << std::endl;
  std::cout << (comp2 == 0) << std::endl;
  std::cout << (comp3 == 0) << std::endl;
  std::cout << (comp4 == 0) << std::endl;
  std::cout << "\n";
 
  // (1) 
  std::cout << ((comp1 <=> 0) <  0) << std::endl;
  std::cout << ((comp2 <=> 0) == 0) << std::endl;
  std::cout << ((comp3 <=> 0) == 0) << std::endl;
  std::cout << ((comp4 <=> 0) == 0) << std::endl;
  std::cout << "\n";

  // (2)
  std::cout << ((0 <=> comp1) <  0) << std::endl;
  std::cout << ((0 <=> comp2) == 0) << std::endl;
  std::cout << ((0 <=> comp3) == 0) << std::endl;
  std::cout << ((0 <=> comp4) == 0) << std::endl;
}
```

### 出力
```
true
true
true
false

true
true
true
false

false
true
true
false
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 10.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 [mark verified]

## 関連項目

- [C++20 一貫比較](/lang/cpp20/consistent_comparison.md)


## 参照

- [P0515R3 Consistent comparison](http://wg21.link/p0515)
- [P0768R1 Library support for the spaceship (comparison) operator](http://wg21.link/p0768)
- [P1614R2 The Mothership has Landed (Adding <=> to the Library)](http://wg21.link/p1614)