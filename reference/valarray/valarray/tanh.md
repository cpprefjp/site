# tanh
* valarray[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class T>
  ValOrProxy<T> tanh(const ValOrProxy<T>& va);
}
```
* ValOrProxy[italic]

## 概要
双曲線�接（ハイパボリックタンジェント：hyperbolic tangent）を得る。


## 戻り値
以下のコードと�価のことを行う：

```cpp
return va.apply(static_cast<T(*)(T)>(std::tanh));
```
* apply[link apply.md]
* std::tanh[link /reference/cmath/tanh.md]


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

  std::valarray<float> result = std::tanh(va);
  for (float x : result) {
    std::cout << x << std::endl;
  }
}
```
* std::tanh[color ff0000]

### 出力
```
0.099668
0.197375
0.291313
```


