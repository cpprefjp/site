# stdfloat
* stdfloat[meta header]
* cpp23[meta cpp]

`<stdfloat>`ヘッダでは、実装定義の拡張浮動小数点数型を定義する。

これらの拡張浮動小数点数型は、ISO/IEC/IEEE 60559 (IEEE 754) 浮動小数点数規格に従った内部表現をもつことが規定される。


| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`float16_t`](stdfloat/float16_t.md)   | 16ビット半精度の浮動小数点数型 | C++23 |
| [`float32_t`](stdfloat/float32_t.md)   | 32ビット単精度の浮動小数点数型 | C++23 |
| [`float64_t`](stdfloat/float64_t.md)   | 64ビット倍精度の浮動小数点数型 | C++23 |
| [`float128_t`](stdfloat/float128_t.md) | 128ビット四倍精度の浮動小数点数型 | C++23 |
| [`bfloat16_t`](stdfloat/bfloat16_t.md) | 16ビットのbrain floating point型 | C++23 |


## バージョン
### 言語
- C++23

## 参照
- [P1467R9 Extended floating-point types and standard names](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p1467r9.html)
