#FP_FAST_FMAL
```cpp
#define FP_FAST_FMAL implementation_defined
```
* implementation_defined[italic]

##概要
`FP_FAST_FMAL` は `long double` 型の変数 `x`, `y`, `z` に対し、関数呼び出し [`fma(x, y, z)`](/reference/cmath/fma.md) が式 `x * y + z` より高速であるとき、またそのときに限り `#define` される。
