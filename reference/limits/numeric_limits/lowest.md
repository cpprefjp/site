# lowest
* limits[meta header]
* std[meta namespace]
* numeric_limits[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
static constexpr T lowest() noexcept;
```

## 概要
型ごとの値の最小値を取得する。

浮動小数点数において、[`min()`](min.md)は非ゼロの正の値の最小値が返されるが、この関数では負の値の最小値が返される。


## 戻り値
指定された型の有限値のうち最小のもの。  
浮動小数点数の場合、無限大やNaNではない。


## 例外
投げない


## 備考
- `is_specialized == false`の場合は`T()`が返される
- 戻り値が`-`[`max()`](max.md)と等しい必要はない


## 例
```cpp example
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
* lowest()[color ff0000]

### 出力例
```
-2147483648
-1.79769e+308
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang, C++11 mode](/implementation.md#clang): 3.0
- [GCC, C++11 mode](/implementation.md#gcc): 4.5.4
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2010, 2012, 2013, 2015, 2017


## 関連項目
- [`std::numeric_limits::min()`](min.md)
- [`std::numeric_limits::max()`](max.md)


## 参照
- [N1880 A proposal to extend `numeric_limits` for consistent range query (Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2005/n1880.htm)
- [N2348 Wording for `std::numeric_limits<T>::lowest()`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2348.pdf)

