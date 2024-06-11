# compare_weak_order_fallback

* compare[meta header]
* function[meta id-type]
* std[meta namespace]
* cpp20[meta cpp]

```cpp
namespace std {
  inline namespace /*unspecified*/ {

    inline constexpr /*unspecified*/ compare_weak_order_fallback = /*unspecified*/;
  }
}
```

## 概要

`compare_weak_order_fallback`は2つの引数を受け取り、それらを弱順序の上で比較する関数オブジェクトである。  
[`weak_order`](weak_order.md)が使用できない場合でも、引数型が`< ==`両演算子を使用可能であればそれを用いて比較を行う。


## 効果

`compare_weak_order_fallback(a, b)`のように呼び出された時、以下のいずれかと等価（上から順に考慮される）

1. [`decay`](/reference/type_traits/decay.md)を通した`a, b`の型が異なる場合、呼び出しは不適格（コンパイルエラー）

2. [`weak_order`](weak_order.md)`(a, b)`が呼び出し可能ならば`weak_order(a, b)`

3. `a == b`、`a < b`の両方の演算子が使用可能でありその戻り値型が`bool`へ変換可能ならば、以下の式
   ```cpp
   a == b ? weak_ordering::equivalent :
   a <  b ? weak_ordering::less :
            weak_ordering::greater
   ```

4. それ以外の場合、呼び出しは不適格。

## 戻り値

呼び出しが適格ならば、比較結果を表す[`weak_ordering`](weak_ordering.md)の値。


## 例外

上記「効果」節のそれぞれのケース毎に

1. --
2. 呼び出される`weak_order(a, b)`が例外を送出するかに従う。
3. 呼び出される`a < b`および`a == b`が例外を送出するかに従う。

## 定数式に評価される条件

上記「効果」節のそれぞれのケース毎に

1. --
2. 呼び出される`weak_order(a, b)`が定数評価可能であるかに従う。
3. 呼び出される`a < b`および`a == b`が定数評価可能であるかに従う。

## カスタマイゼーションポイント

上記「効果」節2,3のケースでは、ユーザー定義の`< ==`演算子を定義、もしくは`weak_order()`へアダプトしておくことによって実行される比較をカスタマイズすることができる。

1. --
2. 引数`a, b`の型`T`を[`weak_order`](weak_order.md)にアダプトしておく。
3. 引数`a, b`の型`T`に対して、使用可能な`< ==`演算子を定義しておく。

ただし、どのケースにおいてもその戻り値型は[`weak_ordering`](weak_ordering.md)に変換可能でなければならない。


## 例
```cpp example
#include <iostream>
#include <compare>
#include <limits>

struct legacy {
  double v = 0.0;
  
  friend bool operator==(const legacy& lhs, const legacy& rhs) {
    return lhs.v == rhs.v;
  }
  
  friend bool operator<(const legacy& lhs, const legacy& rhs) {
    return lhs.v < rhs.v;
  }
};


int main()
{
  std::cout << std::boolalpha;

  legacy l1 = {+0.0}, l2 = {-0.0}, l3 = {-std::numeric_limits<double>::quiet_NaN()}, l4 = {std::numeric_limits<double>::quiet_NaN()};
  std::cout << (std::compare_weak_order_fallback(l1, l2) <  0) << std::endl;
  std::cout << (std::compare_weak_order_fallback(l1, l2) == 0) << std::endl;

  std::cout << "\n";
  
  auto comp1 = std::compare_weak_order_fallback(l1, l4);
  std::cout << (comp1 == 0) << std::endl;
  std::cout << (comp1 != 0) << std::endl;
  std::cout << (comp1 <  0) << std::endl;
  std::cout << (comp1 >  0) << std::endl; //比較不能がgreaterと判定される

  std::cout << "\n";
 
  auto comp2 = std::compare_weak_order_fallback(l3, l4);
  std::cout << (comp2 == 0) << std::endl;
  std::cout << (comp2 != 0) << std::endl;
  std::cout << (comp2 <  0) << std::endl;
  std::cout << (comp2 >  0) << std::endl; //比較不能がgreaterと判定される
}
```
* compare_weak_order_fallback[color ff0000]

### 出力
```
false
true

false
true
false
true

false
true
false
true
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 10.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??

## 関連項目

- [C++20 一貫比較](/lang/cpp20/consistent_comparison.md)


## 参照

- [P0768R1 Library support for the spaceship (comparison) operator](http://wg21.link/p0768)
- [P1614R2 The Mothership has Landed (Adding <=> to the Library)](http://wg21.link/p1614)
