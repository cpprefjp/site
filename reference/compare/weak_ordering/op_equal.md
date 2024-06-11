# operator==

* compare[meta header]
* function[meta id-type]
* std[meta namespace]
* weak_ordering[meta class]
* cpp20[meta cpp]

```cpp
friend constexpr bool operator==(weak_ordering v, weak_ordering w) noexcept = default; // (1)

friend constexpr bool operator==(weak_ordering v, /*unspecified*/) noexcept;   // (2)

// (2)により、以下のオーバーロードが使用可能になる
friend constexpr bool operator==(/*unspecified*/, weak_ordering v) noexcept;   // (3)
```

## 概要

- (1) : `weak_ordering`同士の等値比較を行う
- (2)(3) : `weak_ordering`の値が`weak_ordering::equivalent`であるかを調べる。

## 戻り値

`int`型のメンバ変数`value`に各有効値に対応する値を保持しているとして、以下と等価

- (1) : `return v.value == w.value` 
- (2) : `return v.value == 0` 
- (3) : `return v == 0` 

## 例外
投げない。

## 備考
この演算子により、以下の演算子が使用可能になる：

  - `bool operator!=(weak_ordering v, weak_ordering w) noexcept;`
  - `bool operator!=(weak_ordering v, /*unspecified*/) noexcept;`
  - `bool operator!=(/*unspecified*/, weak_ordering w) noexcept;`

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
  std::cout << (comp1 == comp2) << std::endl;

  // (2) 
  std::cout << (comp1 == 0) << std::endl;

  // (3)
  std::cout << (0 == comp1) << std::endl;
}
```

### 出力
```
false
true
true
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