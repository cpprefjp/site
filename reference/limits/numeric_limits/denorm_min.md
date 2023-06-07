# denorm_min
* limits[meta header]
* std[meta namespace]
* numeric_limits[meta class]
* function[meta id-type]

```cpp
static T denorm_min() throw();            // (1) C++03
static constexpr T denorm_min() noexcept; // (1) C++11
```

## 概要
浮動小数点数型において、最小の正の非正規化数(denormalized value)を取得する。

対応するマクロを次の表に挙げる。

| 型            | 対応するマクロ |
|---------------|----------------|
| `float`       | [`FLT_TRUE_MIN`](/reference/cfloat/flt_true_min.md)  |
| `double`      | [`DBL_TRUE_MIN`](/reference/cfloat/dbl_true_min.md)  |
| `long double` | [`LDBL_TRUE_MIN`](/reference/cfloat/ldbl_true_min.md) |


## 戻り値
非正規化数をサポートするならば、最小の正の非正規化数。
そうでなければ、最小の正の正規化数。


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <limits>

int main()
{
  constexpr float f = std::numeric_limits<float>::denorm_min();
  constexpr double d = std::numeric_limits<double>::denorm_min();

  std::cout << "float : " << f << std::endl;
  std::cout << "double : " << d << std::endl;
}
```
* denorm_min()[color ff0000]

### 出力例
```
float : 1.4013e-045
double : 4.94066e-324
```


## 関連項目
* [`numeric_limits::has_denorm`](has_denorm.md)
* [`numeric_limits::has_denorm_loss`](has_denorm_loss.md)


## 参照
- [P2614R2 Deprecate `numeric_limits::has_denorm`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2614r2.pdf)
