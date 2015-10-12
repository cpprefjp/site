#FLT_EVAL_METHOD
* cfloat[meta header]
* macro[meta id-type]
* cpp11[meta cpp]

```cpp
#define FLT_EVAL_METHOD implementation-defined
```
* implementation-defined[italic]

##概要
`FLT_EVAL_METHOD` は、浮動小数点数がどのように評価されるかを表す。

`FLT_EVAL_METHOD` が

- 0 のとき、各浮動小数点数型でそのまま評価する。
- 1 のとき、`float` を `double`, `double` を `double`, `long double` を `long double` とみて評価する。
- 2 のとき、すべての浮動小数点数型を `long double` とみて評価する。
- -1 のときは決定できない。

その他の負の数のとき、実装依存の動作をする。

`FLT_EVAL_METHOD` の値により [`float_t`](/reference/cmath/float_t.md), [`double_t`](/reference/cmath/double_t.md) の型は次の表のようになる。


| `FLT_EVAL_METHOD` | [`float_t`](/reference/cmath/float_t.md) | [`double_t`](/reference/cmath/double_t.md) |
|-----------------|--------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------|
| 0 | `float` | `double` |
| 1 | `double` | `double` |
| 2 | `long double` | `long double` |
| その他 | 実装依存 | 実装依存 |

