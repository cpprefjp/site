# partial_order

* compare[meta header]
* cpo[meta id-type]
* std[meta namespace]
* cpp20[meta cpp]

```cpp
namespace std {
  inline namespace /*unspecified*/ {

    inline constexpr /*unspecified*/ partial_order = /*unspecified*/;
  }
}
```

## 概要

`partial_order`は2つの引数を受け取り、それらを半順序の上で比較する関数オブジェクトである。


## 効果

`partial_order(a, b)`のように呼び出された時、以下のいずれかと等価（上から順に考慮される）

1. [`decay`](/reference/type_traits/decay.md)を通した`a, b`の型が異なる場合、呼び出しは不適格（コンパイルエラー）

2. `std::partial_order`（本関数オブジェクト）の宣言を含まないコンテキストで、[`partial_ordering`](partial_ordering.md)`(partial_order(a, b))`が呼び出し可能ならば`partial_ordering(partial_order(a, b))`

3. [`partial_ordering`](partial_ordering.md)`(a <=> b)`が呼び出し可能ならば`partial_ordering(a <=> b)`

4. [`partial_ordering(`](partial_ordering.md)[`weak_order`](weak_order.md)`(a, b))`が呼び出し可能ならば`partial_ordering(weak_order(a, b))`

5. それ以外の場合、呼び出しは不適格。

## 戻り値

呼び出しが適格ならば、比較結果を表す[`partial_ordering`](partial_ordering.md)の値。


## 例外

上記「効果」節のそれぞれのケース毎に

1. --
2. 呼び出される`partial_order(a, b)`およびその戻り値の`partial_ordering`への変換が例外を送出するかに従う。
3. 呼び出される`a <=> b`およびその戻り値の`partial_ordering`への変換が例外を送出するかに従う。
4. 呼び出される[`weak_order`](weak_order.md)`(a, b)`およびその戻り値の`partial_ordering`への変換が例外を送出するかに従う。

## 定数式に評価される条件

上記「効果」節のそれぞれのケース毎に

1. --
2. 呼び出される`partial_order(a, b)`およびその戻り値の`partial_ordering`への変換が定数評価可能であるかに従う。
3. 呼び出される`a <=> b`およびその戻り値の`partial_ordering`への変換が定数評価可能であるかに従う。
4. 呼び出される[`weak_order`](weak_order.md)`(a, b)`およびその戻り値の`partial_ordering`への変換が定数評価可能であるかに従う。


## カスタマイゼーションポイント

上記「効果」節2,3,4のケースでは、ユーザー定義の`partial_order()`、`<=>`演算子を定義、もしくは`weak_order()`へアダプトしておくことによって実行される比較をカスタマイズすることができる。

1. --
2. 引数`a, b`の型`T`と同じ名前空間、もしくは`T`の定義内で`friend`関数として`partial_order()`を定義しておく。
3. 引数`a, b`の型`T`に対して、使用可能な`<=>`演算子を定義しておく。
4. 引数`a, b`の型`T`を[`weak_order`](weak_order.md)にアダプトしておく。

ただし、どのケースにおいてもその戻り値型は[`partial_ordering`](partial_ordering.md)に変換可能でなければならない。


## 例
```cpp example
#include <iostream>
#include <compare>
#include <limits>

struct no_spaceship {
  int n1 = 0;
  int n2 = 0;
  int n3 = 0;

  friend auto partial_order(const no_spaceship& lhs, const no_spaceship& rhs) -> std::partial_ordering {
    //1 -> 3 -> 2の順で比較
    if (auto cmp = lhs.n1 <=> rhs.n1; cmp != 0) return cmp;
    if (auto cmp = lhs.n3 <=> rhs.n3; cmp != 0) return cmp;
    return lhs.n2 <=> rhs.n2;
  }
};

struct have_spaceship {  
  int n1 = 0;
  int n2 = 0;
  int n3 = 0;

  friend auto operator<=>(const have_spaceship& lhs, const have_spaceship& rhs) -> std::partial_ordering {
    //宣言と逆順で比較
    if (auto cmp = lhs.n3 <=> rhs.n3; cmp != 0) return cmp;
    if (auto cmp = lhs.n2 <=> rhs.n2; cmp != 0) return cmp;
    return lhs.n1 <=> rhs.n1;
  }
};


int main()
{
  std::cout << std::boolalpha;

  //2. ユーザー定義weak_order()によるカスタム比較
  no_spaceship s1 = {1, 2, 3}, s2 = {2, 1, 3};
  std::cout << (std::partial_order(s1, s2) < 0) << std::endl;

  std::cout << "\n";

  //3. 浮動小数点数の比較
  constexpr auto qnan = std::numeric_limits<double>::quiet_NaN();

  std::cout << (std::partial_order(-0.0, +0.0) == 0) << std::endl;
  constexpr auto cmp = std::partial_order(-qnan, +qnan);
  std::cout << (cmp <  0) << std::endl;
  std::cout << (cmp >  0) << std::endl;
  std::cout << (cmp == 0) << std::endl;

  std::cout << "\n";

  //4. ユーザー定義<=>によるカスタム比較
  have_spaceship s3 = {1, 2, 3}, s4 = {2, 1, 3};
  std::cout << (std::partial_order(s3, s4) < 0) << std::endl;

  std::cout << "\n";

  //4. 組み込み型の比較
  std::cout << (std::partial_order(1, 2) < 0) << std::endl;
}
```
* partial_order[color ff0000]

### 出力
```
true

true
false
false
false

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

- [C++20 `<=>`/`==`による比較演算子の自動定義](/lang/cpp20/consistent_comparison.md)
- [`weak_order`](weak_order.md)
- [`partial_ordering`](partial_ordering.md)
- [`compare_partial_order_fallback`](compare_partial_order_fallback.md)


## 参照

- [P0768R1 Library support for the spaceship (comparison) operator](http://wg21.link/p0768)
- [P1614R2 The Mothership has Landed (Adding <=> to the Library)](http://wg21.link/p1614)
