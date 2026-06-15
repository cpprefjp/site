# nextdown
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std {
  constexpr floating-point-type
    nextdown(floating-point-type x); // (1) C++26

  constexpr float
    nextdownf(float x);              // (2) C++26

  constexpr long double
    nextdownl(long double x);        // (3) C++26
}
```
* floating-point-type[italic]

## 概要
負の無限大方向への次の表現可能な値を取得する。

C23で`<math.h>`に追加された関数であり、C++26で`<cmath>`に取り込まれた。

- (1) : 浮動小数点数型に対するオーバーロード
- (2) : `float`型規定
- (3) : `long double`型規定


## 戻り値
`x`より小さい、表現可能な最大の値を返す。

- `x`が負の有限の最小値の場合、負の無限大を返す
- `x`が負の無限大の場合、`x`を返す
- `x`が`±0`の場合、負の絶対値が最小の表現可能な値 (絶対値が最小の負の非正規化数) を返す
- `x`が正の最小の表現可能な値 (絶対値が最小の正数) の場合、`+0`を返す
- `x`が`NaN`の場合、`NaN`を返す


## 備考
- この関数は、IEEE 754の`nextDown`演算に対応する
- [`nextafter()`](nextafter.md)の「移動先の方向 (第2引数)」を負の無限大に固定したものに相当するが、以下の利点がある
    - 移動方向が固定されているため、目的が明確である
    - [`nextafter()`](nextafter.md)が、有限の最小値から無限大へ移動する場合にオーバーフロー、結果が非正規化数になる場合にアンダーフローの値域エラーを引き起こしうるのに対し、この関数は値域エラーを引き起こさない
- 隣接する浮動小数点数を例外なしに取得できるため、計算結果を含む最小の区間を求める区間演算 (interval arithmetic) などで利用される


## 例
```cpp example
#include <cmath>
#include <print>

int main()
{
  std::println("{}", std::nextdown(1.0f));
}
```
* std::nextdown[color ff0000]

### 出力例
```
0.99999994
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`nextup`](nextup.md): 正の無限大方向への次の表現可能な値を取得する
- [`nextafter`](nextafter.md): 指定方向への次の表現可能な値を取得する


## 参照
- [P3348R4 C++26 should refer to C23 not C17](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3348r4.pdf)
    - C++26がC23を参照するようになり、この関数が`<cmath>`に追加された
