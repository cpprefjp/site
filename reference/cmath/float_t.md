# float_t
* cmath[meta header]
* std[meta namespace]
* type-alias[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  using float_t = floating-type;
}
```
* floating-type[italic]

## 概要
`float` と同じかそれより広い範囲の値を持つ浮動小数点数型を表す。

[`FLT_EVAL_METHOD`](/reference/cfloat/flt_eval_method.md) が 0 のとき `float`, 1 のとき `double`, 2 のとき `long double`, それ以外の場合は実装依存。

## 例
```cpp example
#include <cmath>
#include <iostream>
int main() {
	std::float_t num = 1.010;
	std::cout << num << std::endl;
}
```
## 出力例
```
1.01
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc):
- [ICC](/implementation.md#icc):
- [Visual C++](/implementation.md#visual_cpp): 2013 [mark verified], 2015 [mark verified], 2017 [mark verified], 2019 [mark verified], 2022 [mark verified]
	- 2013, 2015では、常に`float`の別名。
	- 2017以降で、ターゲットのCPUアーキテクチャが`x86`以外である場合、`float`の別名。
	- 2017以降で、ターゲットのCPUアーキテクチャが`x86`で、SSE2を使用する場合（`/arch:SSE2`以上のコンパイラオプション）、`float`の別名。
	- 2017以降で、ターゲットのCPUアーキテクチャが`x86`で、`/fp:fast`コンパイラオプションが指定されている場合、`float`の別名。
	- 2017以降で、ターゲットのCPUアーキテクチャが`x86`で、SSE2を使用せず（`/arch:IA32`や`/arch:SSE`コンパイラオプション）、`/fp:fast`コンパイラオプションが指定されていない場合、`long double`の別名。
