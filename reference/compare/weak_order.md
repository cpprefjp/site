# weak_order

* compare[meta header]
* function[meta id-type]
* std[meta namespace]
* cpp20[meta cpp]

```cpp
namespace std {
  inline namespace /*unspecified*/ {

    inline constexpr /*unspecified*/ weak_order = /*unspecified*/;
  }
}
```

## 概要

`weak_order`は2つの引数を受け取り、それらを弱順序の上で比較する関数オブジェクトである。


## 効果

`weak_order(a, b)`のように呼び出された時、以下のいずれかと�価（上から順に考慮される）

1. [`decay`](/reference/type_traits/decay.md)を通した`a, b`の型が異なる場合、呼び出しは不適格（コンパイルエラー）

2. `std::weak_order`（本関数オブジェクト）の宣言を含まないコンテ�ストで、[`weak_ordering`](strong_ordering.md)`(weak_order(a, b))`が呼び出し可能ならば`weak_ordering(weak_order(a, b))`

3. [`decay`](/reference/type_traits/decay.md)を通した`a, b`の型`T`が浮動小数点型の場合、`T`の組み込みの比較演算�および[`strong_order`](strong_order.md)による順序と一貫する[`weak_ordering`](weak_ordering.md)の値を返す。  
   さらに、[`numeric_limits<T>::is_iec559`](/reference/limits/numeric_limits/is_iec559.md)` == true`の場合、追加で以下の同値類の順序に従った順序付けを行う。

    1. 全ての`-NaN`
    2. `-Inf`
    3. 負の�規化数
    4. 負の非�規化数
    5. `±0.0`
    6. �の非�規化数
    7. �の�規化数
    8. `+Inf`
    9. 全ての`+NaN`

4. [`weak_ordering`](strong_ordering.md)`(a <=> b)`が呼び出し可能ならば`weak_ordering(a <=> b)`

5. [`weak_ordering(`](strong_ordering.md)[`strong_order`](strong_order.md)`(a, b))`が呼び出し可能ならば`weak_ordering(strong_order(a, b))`

6. それ以外の場合、呼び出しは不適格。

## 戻り値

呼び出しが適格ならば、比較結果を表す[`weak_ordering`](weak_ordering.md)の値。


## 例外

上記「効果」節のそれぞれのケース毎に

1. --
2. 呼び出される`weak_order(a, b)`およびその戻り値の`weak_ordering`への変換が例外を送出するかに従う。
3. 投げない。
4. 呼び出される`a <=> b`およびその戻り値の`weak_ordering`への変換が例外を送出するかに従う。
5. 呼び出される[`strong_order`](strong_order.md)`(a, b)`およびその戻り値の`weak_ordering`への変換が例外を送出するかに従う。

## 定数式に評価される条件

上記「効果」節のそれぞれのケース毎に

1. --
2. 呼び出される`weak_order(a, b)`およびその戻り値の`weak_ordering`への変換が定数評価可能であるかに従う。
3. 常に定数評価可能
4. 呼び出される`a <=> b`およびその戻り値の`weak_ordering`への変換が定数評価可能であるかに従う。
5. 呼び出される[`strong_order`](strong_order.md)`(a, b)`およびその戻り値の`weak_ordering`への変換が定数評価可能であるかに従う。


## カスタマイゼーションポイント

上記「効果」節2,4,5のケースでは、ユーザー定義の`weak_order()`、`<=>`演算�を定義、もしくは`strong_order()`へアダプトしておくことによって実行される比較をカスタマイズすることができる。

1. --
2. 引数`a, b`の型`T`と同じ名前空間、もしくは`T`の定義内で`friend`関数として`weak_order()`を定義しておく。
3. --
4. 引数`a, b`の型`T`に対して、使用可能な`<=>`演算�を定義しておく。
5. 引数`a, b`の型`T`を[`strong_order`](strong_order.md)にアダプトしておく。

ただし、どのケースにおいてもその戻り値型は[`weak_ordering`](strong_ordering.md)に変換可能でなければならない。


## 備考

[`numeric_limits<T>::is_iec559`](/reference/limits/numeric_limits/is_iec559.md)` == true`の場合の浮動小数点数の比較において、各同値類間の順序は以下のようになる。

{全ての`-NaN`} ` < ` {`-Inf`} ` < ` {負の�規化数} ` < ` {負の非�規化数} ` < ` {`±0.0`} ` < ` {�の非�規化数} ` < ` {�の�規化数} ` < ` {`+Inf`} ` < ` {全ての`+NaN`}

それぞれの同値類における順序付けは通常の比較演算�の順序付けに従う。ただし、比較不能である場合はその値は同値として扱われる。すなわち、{`±0.0`}および{`±NaN`}のそれぞの同値類では全ての値が同値(`=`)として扱われる。

## 例
```cpp example
#include <iostream>
#include <compare>
#include <limits>

struct no_spaceship {
  int n1 = 0;
  int n2 = 0;
  int n3 = 0;

  friend auto weak_order(const no_spaceship& lhs, const no_spaceship& rhs) -> std::weak_ordering {
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

  friend auto operator<=>(const have_spaceship& lhs, const have_spaceship& rhs) -> std::weak_ordering {
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
  std::cout << (std::weak_order(s1, s2) < 0) << std::endl;

  std::cout << "\n";

  //3. 浮動小数点数の比較
  constexpr auto qnan = std::numeric_limits<double>::quiet_NaN();
  constexpr auto snan = std::numeric_limits<double>::signaling_NaN();

  std::cout << (std::weak_order(-0.0, +0.0) == 0) << std::endl;
  std::cout << (std::weak_order(-qnan, +qnan) < 0) << std::endl;
  std::cout << (std::weak_order(qnan, snan) == 0) << std::endl;

  std::cout << "\n";

  //4. ユーザー定義<=>によるカスタム比較
  have_spaceship s3 = {1, 2, 3}, s4 = {2, 1, 3};
  std::cout << (std::weak_order(s3, s4) < 0) << std::endl;

  std::cout << "\n";

  //4. 組み込み型の比較
  std::cout << (std::weak_order(1, 2) < 0) << std::endl;
}
```
* weak_order[color ff0000]

### 出力
```
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
- [GCC](/implementation.md#gcc): 10.1
- [Visual C++](/implementation.md#visual_cpp): ??

## 関連項目

- [C++20 一貫比較](/lang/cpp20/consistent_comparison.md)
- [`strong_order`](strong_order.md)
- [`weak_ordering`](weak_ordering.md)
- [`compare_weak_order_fallback`](compare_weak_order_fallback.md)


## 参照

- [P0768R1 Library support for the spaceship (comparison) operator](http://wg21.link/p0768)
- [P1614R2 The Mothership has Landed (Adding <=> to the Library)](http://wg21.link/p1614)
