# compare_strong_order_fallback

* compare[meta header]
* function[meta id-type]
* std[meta namespace]
* cpp20[meta cpp]

```cpp
namespace std {
  inline namespace /*unspecified*/ {

    inline constexpr /*unspecified*/ compare_strong_order_fallback = /*unspecified*/;
  }
}
```

## 概要

`compare_strong_order_fallback`は2つの引数を受け取り、それらを全順序の上で比較する関数オブジェクトである。  
[`strong_order`](strong_order.md)が使用できない場合でも、引数型が`< ==`両演算子を使用可能であればそれを用いて比較を行う。


## 効果

`compare_strong_order_fallback(a, b)`のように呼び出された時、以下のいずれかと等価（上から順に考慮される）

1. [`decay`](/reference/type_traits/decay.md)を通した`a, b`の型が異なる場合、呼び出しは不適格（コンパイルエラー）

2. [`strong_order`](strong_order.md)`(a, b)`が呼び出し可能ならば`strong_order(a, b)`

3. `a == b`、`a < b`の両方の演算子が使用可能でありその戻り値型が`bool`へ変換可能ならば、以下の式
   ```cpp
   a == b ? strong_ordering::equal :
   a <  b ? strong_ordering::less :
            strong_ordering::greater
   ```

4. それ以外の場合、呼び出しは不適格。

## 戻り値

呼び出しが適格ならば、比較結果を表す[`strong_ordering`](strong_ordering.md)の値。


## 例外

上記「効果」節のそれぞれのケース毎に

1. --
2. 呼び出される`strong_order(a, b)`が例外を送出するかに従う。
3. 呼び出される`a < b`および`a == b`が例外を送出するかに従う。

## 定数式に評価される条件

上記「効果」節のそれぞれのケース毎に

1. --
2. 呼び出される`strong_order(a, b)`が定数評価可能であるかに従う。
3. 呼び出される`a < b`および`a == b`が定数評価可能であるかに従う。

## カスタマイゼーションポイント

上記「効果」節2,3のケースでは、ユーザー定義の`< ==`演算子を定義、もしくは`strong_order()`へアダプトしておくことによって実行される比較をカスタマイズすることができる。

1. --
2. 引数`a, b`の型`T`を[`strong_order`](strong_order.md)にアダプトしておく。
3. 引数`a, b`の型`T`に対して、使用可能な`< ==`演算子を定義しておく。

ただし、どのケースにおいてもその戻り値型は[`strong_ordering`](strong_ordering.md)に変換可能でなければならない。

## 例
```cpp example
#include <iostream>
#include <compare>
#include <limits>

struct legacy {
  int n = 0;
  
  friend bool operator==(const legacy& lhs, const legacy& rhs) {
    return lhs.n == rhs.n;
  }

  friend bool operator<(const legacy& lhs, const legacy& rhs) {
    return lhs.n < rhs.n;
  }
};


int main()
{
  std::cout << std::boolalpha;

  legacy l1 = {1}, l2 = {2};
  std::cout << (std::compare_strong_order_fallback(l1, l2) <  0) << std::endl;
  std::cout << (std::compare_strong_order_fallback(l1, l2) >  0) << std::endl;
  std::cout << (std::compare_strong_order_fallback(l1, l1) == 0) << std::endl;
}
```
* compare_strong_order_fallback[color ff0000]

### 出力
```
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

- [C++20 `<=>`/`==`による比較演算子の自動定義](/lang/cpp20/consistent_comparison.md)


## 参照

- [P0768R1 Library support for the spaceship (comparison) operator](http://wg21.link/p0768)
- [P1614R2 The Mothership has Landed (Adding <=> to the Library)](http://wg21.link/p1614)
