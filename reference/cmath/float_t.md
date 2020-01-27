# float_t
* cmath[meta header]
* std[meta namespace]
* type-alias[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  using float_t = implementation-defined;
}
```

## 概要
`float` と同じかそれより広い範囲の値を持つ浮動小数点数型を表す。

[`FLT_EVAL_METHOD`](/reference/cfloat/flt_eval_method.md) が 0 のとき `float`, 1 のとき `double`, 2 のとき `long double`, それ以外の場合は実装依�。


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc):
- [ICC](/implementation.md#icc):
- [Visual C++](/implementation.md#visual_cpp): 2013, 2015, 2017
	- 2013では、常に`float`の別名。
	- 2015で、ターゲットのCPUアー�テクチャが`x86`以外である場合、`float`の別名。
	- 2015で、ターゲットのCPUアー�テクチャが`x86`で、SSE2を使用する場合（`/arch:SSE2`以上のコンパイラオプション）、`double`の別名。
	- 2015で、ターゲットのCPUアー�テクチャが`x86`で、SSE2を使用しない場合（`/arch:IA32`や`/arch:SSE`コンパイラオプション）、`long double`の別名。
