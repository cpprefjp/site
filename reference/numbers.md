# numbers
* numbers[meta header]
* cpp20[meta cpp]

`<numbers>`ヘッダでは、数値に関する機能を定義する。このヘッダの機能は、`std::numbers`名前空間で定義される。


## 備考
- このヘッダで定義される数学定数の変数テンプレートは、標準外のプログラム定義型に対して`std`名前空間で明示的特殊化もしくは部分特殊化することが許可される


## 数学定数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`e`](numbers/e.md)          | ネイピア数 (variable) | C++20 |
| `log2e`      | eに対する2を底とする対数 (variable) | C++20 |
| `log10e`     | eに対する10を底とする対数 (variable) | C++20 |
| `pi`         | 円周率 (variable) | C++20 |
| `inv_pi`     | 1/pi (variable) | C++20 |
| `inv_sqrtpi` | 1/√pi (variable) | C++20 |
| `ln2`        | 2に対するeを底とする対数 (variable) | C++20 |
| `ln10`       | 10に対するeを底とする対数 (variable) | C++20 |
| `sqrt2`      | √2 (variable) | C++20 |
| `sqrt3`      | √3 (variable) | C++20 |
| `inv_sqrt3`  | 1/√3 (variable) | C++20 |
| `egamma`     | オイラー定数 (variable) | C++20 |
| `phi`        | 黄金比 (variable) | C++20 |


## バージョン
### 言語
- C++20

## 関連項目
- [`<cmath>`](cmath.md)

## 参照
- [P0631R8 Math Constants](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0631r8.pdf)
