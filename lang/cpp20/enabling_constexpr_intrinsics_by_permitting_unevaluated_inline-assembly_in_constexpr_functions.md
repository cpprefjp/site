# constexpr関数内で未評価のインラインアセンブリを許可することによる組み込み関数のconstexpr有効化 [P1668R1]
* cpp20[meta cpp]

<-- start lang caution -->

このページはC++20に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative_page)を参照してください。

<-- last lang caution -->

## 概要

`asm`宣言によるインラインアセンブリは`constexpr`関数内に現れる事が禁止されていたため、`constexpr`関数内に書く事は出来なかった。C++20からはコンパイル時に評価されない限り、`asm`宣言を`constexpr`関数内に書く事ができるようになる。

```cpp
#include <type_traits>

constexpr double fma(double a, double b, double c) {
  if (std::is_constant_evaluated()) {
    // コンパイル時のコード
    return a * b + c;
  } else {
    // 実行時のコード
    asm volatile ("vfmadd213sd %0,%1,%2" : "+x"(a) : "x"(b),"x"(c));
    return a;
  }
}
```

このように、[`is_constant_evaluated`](/reference/type_traits/is_constant_evaluated.md)と組み合わせて同じ関数で実行時とコンパイル時それぞれで最適な実装を選択する事ができるようになる。

ただし、コンパイル時に実行できるようになったわけではないため、`asm`宣言を評価するコードパスは実行時にのみ通過するようにしなければならない。

## 例

```cpp
#include <iostream>
#include <iomanip>
#include <type_traits>
#include <numbers>

constexpr double inner_product_2d(const double (&v1)[2], const double (&v2)[2]) {
  double dp{};

  if (std::is_constant_evaluated()) {
    dp = v1[0]*v2[0] + v1[1]*v2[1];
  } else {
    asm volatile (
      "movlpd %1, %%xmm0\n"
      "movhpd %2, %%xmm0\n"
      "movlpd %3, %%xmm1\n"
      "movhpd %4, %%xmm1\n"
      "dppd $0b110001, %%xmm1, %%xmm0\n"
      "movlpd %%xmm0, %0\n"
      : "=m"(dp)
      : "m"(v1[0]), "m"(v1[1]), "m"(v2[0]), "m"(v2[1])
    );
  }

  return dp;
}

int main() {
  std::cout << std::setprecision(16);
  constexpr double v1_1[2] = { 2.0, 2.0 }; 
  constexpr double v1_2[2] = { 2.0, -2.0 };
  constexpr double v2_1[2] = { 0.0, 1.0 }; 
  constexpr double v2_2[2] = { 1.0, std::numbers::sqrt2 };
  
  constexpr double dp1c = inner_product_2d(v1_1, v1_2); // コンパイル時
  double  dp1r = inner_product_2d(v1_1, v1_2);          // 実行時

  std::cout << dp1c << "\n" << dp1r << std::endl;
  
  constexpr double dp2c = inner_product_2d(v2_1, v2_2); // コンパイル時
  double  dp2r = inner_product_2d(v2_1, v2_2);          // 実行時

  std::cout << dp2c << "\n" << dp2r << std::endl;
}
```
* is_constant_evaluated[link /reference/type_traits/is_constant_evaluated.md]
* sqrt2[link /reference/numbers/sqrt2.md]

### 出力例（GCC 11.1 x86-64）

```
0
0
1.414213562373095
1.414213562373095
```

## この機能が必要になった背景・経緯

`asm`によるインラインアセンブリはコンパイラの最適化を補完するなど、特定の処理を高速化する事を目的として利用される。しかし、そのようなコードは実行時にのみ評価可能であり、コンパイラの定数化の対象ではなく、そのまま`constexpr`関数にすることはできなかった。

この機能に先立ち、C++20にはその実行がコンパイル時と実行時のどちらで行われているのかを判定する[`is_constant_evaluated`](/reference/type_traits/is_constant_evaluated.md)が導入されていた。これを用いると、1つの関数定義でコンパイル時と実行時のそれぞれに最適な処理を選択する事ができる。しかし、`asm`宣言は`constexpr`関数内で現れる事が禁止されていたため、インラインアセンブリによって最適化されたコードを`is_constant_evaluated`を用いて`constexpr`関数化する事は出来なかった。

特定のプロセッサ向けの組み込み関数や既存の`asm`宣言を用いたコードを`constexpr`化したいという需要があり、`is_constant_evaluated`によってそれが可能となったため、`asm`宣言が定数式で評価されない場合に限って`constexpr`関数内で書けないという制限を緩和する事となった。

副次的だが、複雑なインラインアセンブリによる記述とともにシンプルなC++コードによる記述が同居している事で、インラインアセンブリが何をしているのかをユーザーが理解しやすくなるという効果もある。

## <a id="relative-page" href="#relative-page">関連項目</a>

- [`is_constant_evaluated`](/reference/type_traits/is_constant_evaluated.md)

## 参照

- [P1668R1 Enabling constexpr Intrinsics By Permitting Unevaluated inline-assembly in constexpr Functions](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1668r1.html)