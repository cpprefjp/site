# abs
* valarray[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class T>
  ValOrProxy<T> abs(const ValOrProxy<T>& va);
}
```
* ValOrProxy[italic]

## 概要
絶対値（大きさ・マグニチュード）を得る。abs は absolute value（絶対値）の略。


## 戻り値
以下のコードと等価のことを行う：

```cpp
return va.apply(static_cast<T(*)(T)>(std::abs));
```
* apply[link apply.md]
* std::abs[link /reference/cmath/abs.md]


## 備考
- 引数、および、戻り値の型 *`ValOrProxy`* は、[`valarray`](../valarray.md)、あるいは、その代理となる型である。  
	[`<valarray>`](../../valarray.md) の概要も参照のこと。


## 例
```cpp example
#include <iostream>
#include <valarray>

int main()
{
  const std::valarray<float> va = {1.0f, -2.0f, 3.0f, -4.0f};

  std::valarray<float> result = std::abs(va);
  for (float x : result) {
    std::cout << x << std::endl;
  }
}
```
* std::abs[color ff0000]

### 出力
```
1
2
3
4
```
