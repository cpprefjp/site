# isnormal
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  bool isnormal(float x);            // (1) C++11からC++20まで
  bool isnormal(double x);           // (2) C++11からC++20まで
  bool isnormal(long double x);      // (3) C++11からC++20まで

  constexpr bool
    isnormal(floating-point-type x); // (4) C++23

  bool
    isnormal(Integral x);            // (5) C++11
  constexpr bool
    isnormal(Integral x);            // (5) C++23
}
```
* Integral[italic]

## 概要
数値が正規化数(normalized value)であるか判定する。

- (1) : `float`に対するオーバーロード
- (2) : `double`に対するオーバーロード
- (3) : `long double`に対するオーバーロード
- (4) : 浮動小数点数型に対するオーバーロード
- (5) : 整数型に対するオーバーロード (`double`にキャストして計算される)


## 戻り値
パラメータ`x`がゼロ、非正規化数、無限大、NaNのいずれでもない場合に正規化数であると見なし、`true`を返す。そうでない場合、`false`を返す。


## 備考
- C標準ライブラリでは`isnormal`は関数マクロとして定義されるが、C++標準ライブラリでは関数として定義される
- C++23では、(1), (2), (3)が(4)に統合され、拡張浮動小数点数型を含む浮動小数点数型へのオーバーロードとして定義された


## 例
```cpp example
#include <iostream>
#include <cassert>
#include <cmath>
#include <limits>

int main()
{
  // 正規化数
  bool result_normal = std::isnormal(3.0f);
  assert(result_normal);

  // ゼロは正規化数ではない
  bool result_zero = std::isnormal(0.0f);
  assert(!result_zero);

  // 無限大は正規化数ではない
  bool result_infinity = std::isnormal(std::numeric_limits<float>::infinity());
  assert(!result_infinity);

  // NaNは正規化数ではない
  bool result_nan = std::isnormal(std::numeric_limits<float>::quiet_NaN());
  assert(!result_nan);

  if (std::numeric_limits<float>::has_denorm) {
    // 非正規化数は正規化数ではない
    bool result_denorm = std::isnormal(std::numeric_limits<float>::denorm_min());
    assert(!result_denorm);
  }
  else {
    std::cout << "非正規化数を持たない環境です" << std::endl;
  }
}
```
* std::isnormal[color ff0000]
* infinity()[link /reference/limits/numeric_limits/infinity.md]
* quiet_NaN()[link /reference/limits/numeric_limits/quiet_nan.md]
* has_denorm[link /reference/limits/numeric_limits/has_denorm.md]
* denorm_min()[link /reference/limits/numeric_limits/denorm_min.md]

### 出力
```
```

### 備考
特定の環境では、早期に `constexpr` 対応されている場合がある：

- GCC 4.6.1 以上


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0 [mark verified]
- [GCC](/implementation.md#gcc): 4.3 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0533R9 constexpr for `<cmath>` and `<cstdlib>`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p0533r9.pdf)
    - C++23での、一部関数の`constexpr`対応
- [P1467R9 Extended floating-point types and standard names](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p1467r9.html)
    - C++23で導入された拡張浮動小数点数型への対応として、`float`、`double`、`long double`のオーバーロードを`floating-point-type`のオーバーロードに統合し、拡張浮動小数点数型も扱えるようにした
