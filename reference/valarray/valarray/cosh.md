# cosh
* valarray[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class T>
  ValOrProxy<T> cosh(const ValOrProxy<T>& va);
}
```
* ValOrProxy[italic]

## 概要
双曲線余弦（ハイパボリックコサイン：hyperbolic cosine）を得る。


## 戻り値
以下のコードと�価のことを行う：

```cpp
return va.apply(static_cast<T(*)(T)>(std::cosh));
```
* apply[link apply.md]
* std::cosh[link /reference/cmath/cosh.md]


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

  std::valarray<float> result = std::cosh(va);
  for (float x : result) {
    std::cout << x << std::endl;
  }
}
```
* std::cosh[color ff0000]

### 出力
```
1.005
1.02007
1.04534
```


