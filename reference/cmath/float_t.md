#float_t
```cpp
namespace std {
  typedef implementation-defined float_t;
}
```
* implementation-defined[italic]

##概要
`float` と同じかそれより広い範囲の値を持つ浮動小数点数型を表す。

[`FLT_EVAL_METHOD`](/reference/cfloat/flt_eval_method.md) が 0 のとき `float`, 1 のとき `double`, 2 のとき `long double`, それ以外の場合は実装依存。

