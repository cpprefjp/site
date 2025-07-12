# tan
* valarray[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class T>
  ValOrProxy<T> tan(const ValOrProxy<T>& va);
}
```
* ValOrProxy[italic]

## 概要
正接（タンジェント：tangent）を得る。


## 戻り値
以下のコードと等価のことを行う：

```cpp
return va.apply(static_cast<T(*)(T)>(std::tan));
```
* apply[link apply.md]
* std::tan[link /reference/cmath/tan.md]


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

  std::valarray<float> result = std::tan(va);
  for (float x : result) {
    std::cout << x << std::endl;
  }
}
```
* std::tan[color ff0000]

### 出力
```
0.100335
0.20271
0.309336
```
