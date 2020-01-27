# log10
* valarray[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class T>
  ValOrProxy<T> log10(const ValOrProxy<T>& va);
}
```
* ValOrProxy[italic]

## 概要
常用対数（10 を底とした対数）を得る。log は logarithm（対数）、あるいは、logarithmic function（対数関数）の略。


## 戻り値
以下のコードと�価のことを行う：

```cpp
return va.apply(static_cast<T(*)(T)>(std::log10));
```
* apply[link apply.md]
* std::log10[link /reference/cmath/log10.md]


## 備考
- 引数、および、戻り値の型 *`ValOrProxy`* は、[`valarray`](../valarray.md)、あるいは、その代理となる型である。  
	[`<valarray>`](../../valarray.md) の概要も参照のこと。


## 例
```cpp example
#include <iostream>
#include <valarray>

int main()
{
  const std::valarray<float> va = {100.0f, 10000.0f, 1000000.0f};

  std::valarray<float> result = std::log10(va);
  for (float x : result) {
    std::cout << x << std::endl;
  }
}
```
* std::log10[color ff0000]

### 出力
```
2
4
6
```


