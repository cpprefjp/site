# exp
* valarray[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class T>
  ValOrProxy<T> exp(const ValOrProxy<T>& va);
}
```
* ValOrProxy[italic]

## 概要
自然対数の底 e（ネイピア数）の累乗を得る。exp は exponent（指数）、あるいは、exponential function（指数関数）の略。


## 戻り値
以下のコードと�価のことを行う：

```cpp
return va.apply(static_cast<T(*)(T)>(std::exp));
```
* apply[link apply.md]
* std::exp[link /reference/cmath/exp.md]


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

  std::valarray<float> result = std::exp(va);
  for (float x : result) {
    std::cout << x << std::endl;
  }
}
```
* std::exp[color ff0000]

### 出力
```
1.10517
1.2214
1.34986
```


