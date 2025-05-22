# abs
* cstdlib[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  int
    abs(int j);         // (1) C++03
  constexpr int
    abs(int j);         // (1) C++23

  long
    int abs(long j);    // (2) C++03
  constexpr long
    int abs(long j);    // (2) C++23

  long long
    abs(long long j);   // (3) C++11
  constexpr long long
    abs(long long j);   // (3) C++23

  float
    abs(float j);               // (4) C++03からC++20まで
  double
    abs(double j);              // (5) C++03からC++20まで
  long double
    abs(long double j);         // (6) C++03からC++20まで

  floating-point-type
    abs(floating-point-type j); // (7) C++03からC++20まで

  long
    labs(long j);       // (8) C++03
  constexpr long
    labs(long j);       // (8) C++23

  long long
    llabs(long long j); // (9) C++11
  constexpr long long
    llabs(long long j); // (9) C++23
}
```

## 概要
絶対値を求める。abs は absolute value（絶対値）の略。

- (1) : `int`に対するオーバーロード
- (2) : `long`に対するオーバーロード
- (3) : `long long`に対するオーバーロード
- (4) : `float`に対するオーバーロード
- (5) : `double`に対するオーバーロード
- (6) : `long double`に対するオーバーロード
- (7) : 浮動小数点数型に対するオーバーロード
- (8) : `long`規定
- (9) : `long long`規定


## 戻り値
引数 `j` の絶対値を返す。

- (4), (5), (6), (7) : `j` が `±∞` だった場合 `+∞` を返す。


## 備考
- パラメータの型`X`において[`is_unsigned_v`](/reference/type_traits/is_unsigned.md)`<X>`が`true`であり、`X`が整数昇格によって`int`に変換できない場合、プログラムは不適格となる
    - Cとの互換性のため、`int`に昇格できる符号なし整数型は許可される
- C++23では、(4)、(5)、(6)が(7)に統合され、拡張浮動小数点数型を含む浮動小数点数型へのオーバーロードとして定義された


## 例
```cpp example
#include <iostream>
#include <cstdlib>

int main()
{
  int x = std::abs(-1);
  std::cout << x << std::endl;
}
```
* std::abs[color ff0000]

### 出力
```
1
```


### 備考
特定の環境では、早期に `constexpr` 対応されている場合がある：

- GCC 4.6.1 以上


## 参照
- [P0533R9 constexpr for `<cmath>` and `<cstdlib>`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p0533r9.pdf)
    - C++23での、一部関数の`constexpr`対応
- [P1467R9 Extended floating-point types and standard names](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p1467r9.html)
    - C++23で導入された拡張浮動小数点数型への対応として、`float`、`double`、`long double`のオーバーロードを`floating-point-type`のオーバーロードに統合し、拡張浮動小数点数型も扱えるようにした
