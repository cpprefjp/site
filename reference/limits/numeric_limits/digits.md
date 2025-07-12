# digits
* limits[meta header]
* std[meta namespace]
* numeric_limits[meta class]
* variable[meta id-type]

```cpp
static const int digits;     // C++03
static constexpr int digits; // C++11
```

## 概要
基数 **[`radix`](radix.md)** において表現できる桁数を示す。

型ごとに、以下のような値を表す：

| 型 | 値 |
|----|----|
| 符号付き整数型 | 符号ビット以外のビット数 |
| 符号なし整数型 | 全ビット数 (符号ビットはない) |
| 浮動小数点数型 | 仮数部の桁数 |


## 備考
`is_specialized == false`の場合は`0`

対応するマクロを次の表に挙げる。

| 型            | 対応するマクロ                                      |
|---------------|-----------------------------------------------------|
| `float`       | [`FLT_MANT_DIG`](/reference/cfloat/flt_mant_dig.md) |
| `double`      | [`DBL_MANT_DIG`](/reference/cfloat/dbl_mant_dig.md) |
| `long double` | [`LDBL_MANT_DIG`](/reference/cfloat/ldbl_mant_dig.md)    |


## 例
```cpp example
#include <iostream>
#include <limits>

int main()
{
  constexpr int i = std::numeric_limits<int>::digits;
  constexpr int ui = std::numeric_limits<unsigned int>::digits;
  constexpr int d = std::numeric_limits<double>::digits;

  std::cout << i << std::endl;
  std::cout << ui << std::endl;
  std::cout << d << std::endl;
}
```
* digits[color ff0000]

### 出力例
```
31
32
53
```
