# fmaximum
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std {
  constexpr floating-point-type
    fmaximum(floating-point-type x,
             floating-point-type y); // (1) C++26

  constexpr Promoted
    fmaximum(Arithmetic1 x,
             Arithmetic2 y);         // (2) C++26
}
```
* Promoted[italic]
* Arithmetic1[italic]
* Arithmetic2[italic]

## 概要
浮動小数点数型の最大値を求める。

- (1) : 浮動小数点数型に対するオーバーロード
- (2) : 算術型に対するオーバーロード (大きい精度にキャストして計算される。整数は`double`で計算される)


同じ目的のほかの関数との比較は以下。

| 関数名 | -0.0 と +0.0 の比較 | NaN を含む場合の挙動 | 備考 |
|---|---|---|---|
| [`fmax`](fmax.md)                 | 未規定      | NaN でない方を返す | |
| [`fmaximum`](fmaximum.md)         | +0.0 を返す | NaN を返す | エラー伝播を優先 |
| [`fmaximum_num`](fmaximum_num.md) | +0.0 を返す | NaN でない方を返す | 数値を優先 |


## 戻り値
引数の最大値を返す。


## 備考
- 戻り値は正確で、現在の丸めモードに依存しない。
- 処理系が IEC 60559 に準拠している場合（[`std::numeric_limits`](../limits/numeric_limits.md)`<T>::`[`is_iec559`](../limits/numeric_limits/is_iec559.md)`() != false`）、以下の規定が追加される。
    - 引数のいずれかが NaN の場合、 NaN を返す。
- `-0.0`と`+0.0`の比較では、`+0.0`を返す。


## 例
```cpp example
#include <print>
#include <cmath>

int main() {
  std::println("fmaximum( 0.0, -1.0) = {:+}", std::fmaximum(0.0, -1.0));
  std::println("fmaximum(-0.0, +0.0) = {:+}", std::fmaximum(-0.0, +0.0));
  std::println("fmaximum( 0.0, +1.0) = {:+}", std::fmaximum(0.0, +1.0));
  std::println("fmaximum( 0.0, nan)  = {:+}", std::fmaximum(0.0, std::nan("")));
  std::println("fmaximum( nan, nan)  = {:+}", std::fmaximum(std::nan(""), std::nan("")));
}
```
* std::fmaximum[color ff0000]
* std::nan[link nanf.md]

### 出力例
```
fmaximum( 0.0, -1.0) = +0
fmaximum(-0.0, +0.0) = +0
fmaximum( 0.0, +1.0) = +1
fmaximum( 0.0, nan)  = +nan
fmaximum( nan, nan)  = +nan
```

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 21.0 [mark noimpl]
- [GCC](/implementation.md#gcc): 15 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 14 [mark noimpl]


## 関連項目
- [`fmax`](fmax.md)
- [`fmaximum_num`](fmaximum_num.md)


## 参照
- [P3008R6 Atomic floating-point min/max](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3008r6.html)