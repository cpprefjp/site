# acos
* valarray[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class T>
  ValOrProxy<T> acos(const ValOrProxy<T>& va);
}
```
* ValOrProxy[italic]

## 概要
逆余弦（アークコサイン：arc cosine）を得る。


## 戻り値
以下のコードと等価のことを行う：

```cpp
return va.apply(static_cast<T(*)(T)>(std::acos));
```
* apply[link apply.md]
* std::acos[link /reference/cmath/acos.md]


## 備考
- 引数、および、戻り値の型 *`ValOrProxy`* は、[`valarray`](../valarray.md)、あるいは、その代理となる型である。  
	[`<valarray>`](../../valarray.md) の概要も参照のこと。


## 例
```cpp example
#include <iostream>
#include <valarray>

int main()
{
  const std::valarray<float> va = {0.1f, 0.2f, 0.3f};

  std::valarray<float> result = std::acos(va);
  for (float x : result) {
    std::cout << x << std::endl;
  }
}
```
* std::acos[color ff0000]

### 出力
```
1.47063
1.36944
1.2661
```
