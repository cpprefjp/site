# numbers
* numbers[meta header]
* cpp20[meta cpp]

`<numbers>`ヘッダでは、数値に関する機能を定義する。このヘッダの機能は、`std::numbers`名前空間で定義される。


## 備考
- このヘッダで定義される数学定数の変数テンプレートは、標準外のプログラム定義型に対して`std`名前空間で明示的特殊化もしくは部分特殊化することが許可される


## 数学定数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`e`](numbers/e.md)                   | ネイピア数e (variable) | C++20 |
| [`log2e`](numbers/log2e.md)           | eに対する2を底とする対数log2(e) (variable) | C++20 |
| [`log10e`](numbers/log10e.md)         | eに対する10を底とする対数log10(e) (variable) | C++20 |
| [`pi`](numbers/pi.md)                 | 円周率π (variable) | C++20 |
| [`inv_pi`](numbers/inv_pi.md)         | 円周率の逆数1/π (variable) | C++20 |
| [`inv_sqrtpi`](numbers/inv_sqrtpi.md) | 円周率の平方根の逆数1/√π (variable) | C++20 |
| [`ln2`](numbers/ln2.md)               | 2の自然対数log(2) (variable) | C++20 |
| [`ln10`](numbers/ln10.md)             | 10の自然対数log(10) (variable) | C++20 |
| [`sqrt2`](numbers/sqrt2.md)           | 2の平方根√2 (variable) | C++20 |
| [`sqrt3`](numbers/sqrt3.md)           | 3の平方根√3 (variable) | C++20 |
| [`inv_sqrt3`](numbers/inv_sqrt3.md)   | 3の平方根の逆数1/√3 (variable) | C++20 |
| [`egamma`](numbers/egamma.md)         | オイラー定数 γ (variable) | C++20 |
| [`phi`](numbers/phi.md)               | 黄金比φ (variable) | C++20 |


## バージョン
### 言語
- C++20

## 関連項目
- [`<cmath>`](cmath.md)

## 参照
- [P0631R8 Math Constants](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0631r8.pdf)
