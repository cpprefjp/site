#lowest (C++11)
* limits[meta header]
* std[meta namespace]
* numeric_limits[meta class]
* function[meta id-type]

```cpp
static constexpr T lowest() noexcept;
```

##概要
型ごとの値の最小値を取得する


##戻り値
指定された型の有限値のうち最小のもの。  
浮動小数点数の場合、無限大やNaNではない。


##例外
投げない


##備考
`is_specialized == false`の場合は`T()`が返される。


##例
```cpp
#include <iostream>
#include <limits>

int main()
{
  constexpr int i = std::numeric_limits<int>::lowest();
  constexpr double d = std::numeric_limits<double>::lowest();

  std::cout << i << std::endl;
  std::cout << d << std::endl;
}
```
* lowest[color ff0000]

###出力例
```
-2147483648
-1.79769e+308
```


##参照
- [N2348 Wording for `std::numeric_limits<T>::lowest()`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2348.pdf)

