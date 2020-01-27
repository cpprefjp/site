# operator()
* compare[meta header]
* std[meta namespace]
* compare_three_way[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
template<class T, class U>
  requires three_way_comparable_with<T, U> || BUILTIN-PTR-THREE-WAY(T, U)
constexpr auto operator()(T&& t, U&& u) const;
```
* three_way_comparable_with[link /reference/compare/three_way_comparable.md]

## 概要

ポインタ比較時のみ実装定義の�義全順序による三方比較を行い、それ以外の場合は使用可能な`<=>`による三方比較を行う。

## テンプレートパラメータ制約

少なくともどちらかを満たしていること。

- `three_way_comparable_with<T, U>`
    - `T, U`が`<=>`による比較を使用可能であり、戻り値型は比較カテゴリ型であること
- `declval<T>() <=> declval<U>()`が組み込みのポインタ比較`<=>`演算�に解決されること
    - `BUILTIN-PTR-THREE-WAY(T, U)`はその場合にのみ`true`を返す定数式

## 事前条件

`std::forward<T>(t) <=> std::forward<U>(u)`が組み込みのポインタ型`P`に対する`<=>`演算�を呼び出す場合、`T, U`から`P`への変換は[�さを保持](/reference/concepts.md)すること。


## 効果
- `std::forward<T>(t) <=> std::forward<U>(u)`が組み込みのポインタ型`P`に対する`<=>`演算�を呼び出す場合
    - `P`に変換された`t`が`u`より前に順序付けられる場合、[`std::strong_ordering::less`](/reference/compare/strong_ordering.md)を返す
    - `P`に変換された`u`が`t`より前に順序付けられる場合、[`std::strong_ordering::greater`](/reference/compare/strong_ordering.md)を返す
    - どちらでもない場合、[`std::strong_ordering::equal`](/reference/compare/strong_ordering.md)を返す
- それ以外の場合は以下と�価
    - `return std::forward<T>(t) <=> std::forward<U>(u);`


## 戻り値

ポインタ比較時は`std::strong_ordering`の値、その他の場合は`T, U`で使用可能な`<=>`の戻り値。ただし、比較カテゴリ型以外の型のオブジェクトが返されることはない。


## 備考

ポインタ比較時の順序付けは、ポインタ型`P`に対する実装定義の�義全順序の上で行われ、`P`に対する組み込みの比較演算�が持つ半順序関係との一貫性がある。  
すなわちこの関数オブジェクトによるポインタ値の比較では、組み込みの`< <= > >= == !=`演算�の結果が未規定の場合でも実装定義ではあるが大小もしくは�価性を判定でき、順序が規定されている範囲での順序関係は組み込みの演算�の結果と一致する。

例えば、同じ型の異なるオブジェクトに対するポインタ間やポインタと`nullptr`の間に何らかの順序を付ける事ができる。  
ただし、そのような順序付けの結果がコンパイラや実行環境を超えて一致する保証はないので注意が必要である。


## 例
```cpp example
#include <iostream>
#include <compare>

int main() {
  int a{}, b{};

  int* pa = &a;
  int* pb = &b;

  std::compare_three_way comp{};

  std::cout << std::boolalpha;

  std::cout << (comp( a,  b) == 0) << std::endl;
  std::cout << (comp(pa, pb) == 0) << std::endl;
  std::cout << (comp(pa, pb) <  0) << std::endl;
  std::cout << (comp(pa, pb) >  0) << std::endl;
  std::cout << (comp(pa, nullptr) >  0) << std::endl;
}
```

### 出力例（GCC 10.0.0）
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
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 10.1
- [Visual C++](/implementation.md#visual_cpp): ??

## 関連項目

- [C++20 一貫比較](/lang/cpp20/consistent_comparison.md)


## 参照

- [P0768R1 Library support for the spaceship (comparison) operator](http://wg21.link/p0768)
- [P1614R2 The Mothership has Landed (Adding <=> to the Library)](http://wg21.link/p1614)
