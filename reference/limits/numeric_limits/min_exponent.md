#min_exponent
* limits[meta header]
* std[meta namespace]
* numeric_limits[meta class]
* variable[meta id-type]

```cpp
// C++03
static const int min_exponent;

// C++11
static constexpr int min_exponent;
```

##概要
浮動小数点数型において、型`T`の指数下限値を得る。  
基数[`radix`](radix.md)を`min_exponent`の値で累乗した値が、型`T`で表現可能な正規化された値となる最小の負の値。   
浮動小数点数以外は0となる。  

対応するマクロを次の表に挙げる。

| 型            | 対応するマクロ |
|---------------|----------------|
| `float`       | `FLT_MIN_EXP`  |
| `double`      | `DBL_MIN_EXP`  |
| `long double` | `LDBL_MIN_EXP` |


##例
```cpp
#include <iostream>
#include <limits>

int main()
{
  constexpr int f = std::numeric_limits<float>::min_exponent;
  constexpr int d = std::numeric_limits<double>::min_exponent;

  std::cout << "float : " << f << std::endl;
  std::cout << "double : " << d << std::endl;
}
```
* min_exponent[color ff0000]

###出力
```
float : -125
double : -1021
```

##参照
* [takagi.in - 標準C++辞典 - `<cfloat>`ヘッダ](http://takagi.in/modules/bwiki/index.php?%A1%E3cfloat%A1%E4%A5%D8%A5%C3%A5%C0)
* [`numeric_limits::min_exponent10`](min_exponent10.md)
* [`numeric_limits::max_exponent`](max_exponent.md)
* [`numeric_limits::max_exponent10`](max_exponent10.md)

