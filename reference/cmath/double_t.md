#double_t
* cmath[meta header]
* std[meta namespace]
* type-alias[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  using double_t = implementation-defined;
}
```

##概要
`double` と同じかそれより広い範囲の値を持つ浮動小数点数型を表す。

[`FLT_EVAL_METHOD`](/reference/cfloat/flt_eval_method.md) が 0 または 1 のとき `double`, 2 のとき `long double`, それ以外の場合は実装依存。


##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc):
- [GCC, C++11 mode](/implementation.md#gcc):
- [ICC](/implementation.md#icc):
- [Visual C++](/implementation.md#visual_cpp): 12.0, 14.0, 14.1
	- 12.0では、常に`double`からの`typedef`。
	- 14.0で、ターゲットのCPUアーキテクチャが`x86`以外である場合、`double`からの`typedef`。
	- 14.0で、ターゲットのCPUアーキテクチャが`x86`で、SSE2を使用する場合（`/arch:SSE2`以上のコンパイラオプション）、`double`からの`typedef`。
	- 14.0で、ターゲットのCPUアーキテクチャが`x86`で、SSE2を使用しない場合（`/arch:IA32`や`/arch:SSE`コンパイラオプション）、`long double`からの`typedef`。
