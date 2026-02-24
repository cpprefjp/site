# strong_order

* compare[meta header]
* cpo[meta id-type]
* std[meta namespace]
* cpp20[meta cpp]

```cpp
namespace std {
  inline namespace /*unspecified*/ {

    inline constexpr /*unspecified*/ strong_order = /*unspecified*/;
  }
}
```

## 概要

`strong_order`は2つの引数を受け取り、それらを全順序の上で比較する関数オブジェクトである。

## 効果

`strong_order(a, b)`のように呼び出された時、以下のいずれかと等価（上から順に考慮される）

1. [`decay`](/reference/type_traits/decay.md)を通した`a, b`の型が異なる場合、呼び出しは不適格（コンパイルエラー）

2. `strong_order(a, b)`の`strong_order`の意味がADLのみによって決まるコンテキストで、[`strong_ordering`](strong_ordering.md)`(strong_order(a, b))`が呼び出し可能ならば`strong_ordering(strong_order(a, b))`

3. [`decay`](/reference/type_traits/decay.md)を通した`a, b`の型`T`が浮動小数点型の場合、`T`の組み込みの比較演算子による順序と一貫する[`strong_ordering`](strong_ordering.md)の値を返す。  
   さらに、[`numeric_limits<T>::is_iec559`](/reference/limits/numeric_limits/is_iec559.md) `== true`の場合、その順序はISO/IEC/IEEE 60559の`totalOrder`による全順序と一致する。

4. [`strong_ordering`](strong_ordering.md)`(a <=> b)`が呼び出し可能ならば`strong_ordering(a <=> b)`

5. それ以外の場合、呼び出しは不適格。

## 戻り値

呼び出しが適格ならば、比較結果を表す[`strong_ordering`](strong_ordering.md)の値。

## 例外

上記「効果」節のそれぞれのケース毎に

1. --
2. 呼び出される`strong_order(a, b)`およびその戻り値の`strong_ordering`への変換が例外を送出するかに従う。
3. 投げない。
4. 呼び出される`a <=> b`およびその戻り値の`strong_ordering`への変換が例外を送出するかに従う。


## 定数式に評価される条件

上記「効果」節のそれぞれのケース毎に

1. --
2. 呼び出される`strong_order(a, b)`およびその戻り値の`strong_ordering`への変換が定数評価可能であるかに従う。
3. 引数`a, b`が定数（式）ならば、常に定数評価可能
4. 呼び出される`a <=> b`およびその戻り値の`strong_ordering`への変換が定数評価可能であるかに従う。


## カスタマイゼーションポイント

上記「効果」節2,4のケースでは、ユーザー定義の`strong_order()`もしくは`<=>`演算子を定義しておくことによって実行される比較をカスタマイズすることができる。

1. --
2. 引数`a, b`の型`T`と同じ名前空間、もしくは`T`の定義内で`friend`関数として`strong_order()`を定義しておく。
3. --
4. 引数`a, b`の型`T`に対して、使用可能な`<=>`演算子を定義しておく。

ただし、どちらのケースもその戻り値型は[`strong_ordering`](strong_ordering.md)に変換可能でなければならない。


## 備考

ISO/IEC/IEEE 60559の`totalOrder`による全順序では、`±0`や内部表現の異なる`NaN`を区別した上で順序付けされる。すなわち、本関数オブジェクトによる浮動小数点数の比較においてはこれらの値を識別することができる。

その順序付けは以下のようになる。

{負のquiet NaN} ` < ` {負のsignaling NaN} ` < ` {負の数} ` < ` `-0.0` ` < ` `+0.0` ` < ` {正の数} ` < ` {正のsignaling NaN} ` < ` {正のquiet NaN}

それぞれの種類の`NaN`の集合内では、`NaN`のペイロード（先頭ビットを除いた仮数部）の表現によって順序付けされる。

## 例
```cpp example
#include <iostream>
#include <compare>
#include <limits>

struct no_spaceship {
  int n1 = 0;
  int n2 = 0;
  int n3 = 0;

  friend auto strong_order(const no_spaceship& lhs, const no_spaceship& rhs) -> std::strong_ordering {
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

  friend auto operator<=>(const have_spaceship& lhs, const have_spaceship& rhs) -> std::strong_ordering {
    //宣言と逆順で比較
    if (auto cmp = lhs.n3 <=> rhs.n3; cmp != 0) return cmp;
    if (auto cmp = lhs.n2 <=> rhs.n2; cmp != 0) return cmp;
    return lhs.n1 <=> rhs.n1;
  }
};


int main()
{
  std::cout << std::boolalpha;

  //2. ユーザー定義strong_order()によるカスタム比較
  no_spaceship s1 = {1, 2, 3}, s2 = {2, 1, 3};
  std::cout << (std::strong_order(s1, s2) < 0) << std::endl;

  std::cout << "\n";

  //3. 浮動小数点数の比較
  constexpr auto qnan = std::numeric_limits<double>::quiet_NaN();
  constexpr auto snan = std::numeric_limits<double>::signaling_NaN();

  std::cout << (std::strong_order(-0.0, +0.0) < 0) << std::endl;
  std::cout << (std::strong_order(-qnan, +qnan) < 0) << std::endl;
  std::cout << (std::strong_order(+snan, +qnan) < 0) << std::endl;
  std::cout << (std::strong_order(-qnan, -snan) < 0) << std::endl;

  std::cout << "\n";

  //4. ユーザー定義<=>によるカスタム比較
  have_spaceship s3 = {1, 2, 3}, s4 = {2, 1, 3};
  std::cout << (std::strong_order(s3, s4) < 0) << std::endl;

  std::cout << "\n";

  //4. 組み込み型の比較
  std::cout << (std::strong_order(1, 2) < 0) << std::endl;
}
```
* strong_order[color ff0000]

### 出力
```
true

true
true
true
true

false

true
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 10.1(浮動小数点数の比較が未実装) [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??

## 関連項目

- [C++20 `<=>`/`==`による比較演算子の自動定義](/lang/cpp20/consistent_comparison.md)
- [`strong_ordering`](strong_ordering.md)
- [`compare_strong_order_fallback`](compare_strong_order_fallback.md)


## 参照

- [P0768R1 Library support for the spaceship (comparison) operator](http://wg21.link/p0768)
- [P1614R2 The Mothership has Landed (Adding <=> to the Library)](http://wg21.link/p1614)
- [P2602R2 Poison Pills are Too Toxic](https://open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2602r2.html)
- [IEEE 754 - wikipedia](https://en.wikipedia.org/wiki/IEEE_754#Total-ordering_predicate)
- [Floating-point extensions for C — Part 1: Binary floating-point arithmetic - WG14 N1605](http://www.open-std.org/jtc1/sc22/wg14/www/docs/n1605.pdf)
