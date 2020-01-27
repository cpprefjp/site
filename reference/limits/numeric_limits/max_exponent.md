# max_exponent
* limits[meta header]
* std[meta namespace]
* numeric_limits[meta class]
* variable[meta id-type]

```cpp
// C++03
static const int max_exponent;

// C++11
static constexpr int max_exponent;
```

## 概要
浮動小数点数型において、型`T`の指数下限値を得る。  
基数[`radix`](radix.md)を`max_exponent`の値で累乗した値が、型`T`で表現可能な�規化された値となる最大の�の値。  
浮動小数点数型以外は0になる。  

対応するマク�を次の表に挙げる。

| 型            | 対応するマク� |
|---------------|----------------|
| `float`       | `FLT_MAX_EXP`  |
| `double`      | `DBL_MAX_EXP`  |
| `long double` | `LDBL_MAX_EXP` |


## 例
```cpp example
#include <iostream>
#include <limits>

int main()
{
  constexpr int f = std::numeric_limits<float>::max_exponent;
  constexpr int d = std::numeric_limits<double>::max_exponent;

  std::cout << "float : " << f << std::endl;
  std::cout << "double : " << d << std::endl;
}
```
* max_exponent[color ff0000]

### 出力例
```
float : 128
double : 1024
```

## 参照
* [takagi.in - 標準C++辞典 - `<cfloat>`ヘッダ](http://takagi.in/modules/bwiki/index.php?%A1%E3cfloat%A1%E4%A5%D8%A5%C3%A5%C0)
* [`numeric_limits::min_exponent`](min_exponent.md)
* [`numeric_limits::min_exponent10`](min_exponent10.md)
* [`numeric_limits::max_exponent10`](max_exponent10.md)


