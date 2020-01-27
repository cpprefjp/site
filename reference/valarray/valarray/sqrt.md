# sqrt
* valarray[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class T>
  ValOrProxy<T> sqrt(const ValOrProxy<T>& va);
}
```
* ValOrProxy[italic]

## 概要
平方根（square root）を得る。


## 戻り値
以下のコードと�価のことを行う：

```cpp
return va.apply(static_cast<T(*)(T)>(std::sqrt));
```
* apply[link apply.md]
* std::sqrt[link /reference/cmath/sqrt.md]


## 備考
- 引数、および、戻り値の型 *`ValOrProxy`* は、[`valarray`](../valarray.md)、あるいは、その代理となる型である。  
	[`<valarray>`](../../valarray.md) の概要も参照のこと。


## 例
```cpp example
#include <iostream>
#include <valarray>

int main()
{
  const std::valarray<float> va = {1.0f, 2.0f, 3.0f};

  std::valarray<float> result = std::sqrt(va);
  for (float x : result) {
    std::cout << x << std::endl;
  }
}
```
* std::sqrt[color ff0000]

### 出力
```
1
1.41421
1.73205
```


