# apply
* valarray[meta header]
* std[meta namespace]
* valarray[meta class]
* function[meta id-type]

```cpp
ValOrProxy<T> apply(T func(T)) const;
ValOrProxy<T> apply(T func(const T&)) const;
```
* ValOrProxy[italic]

## 概要
各要素に任意の関数を適用する。


## 戻り値
`*this`の全ての要素に関数`func`を適用した`valarray`オブジェクトを新たに作って返す。

返される`valarray`オブジェクトは、`*this`と同じ要素数、同じ要素型を持つ。


## 備考
- 戻り値の型 *`ValOrProxy`* は、[`valarray`](../valarray.md)、あるいは、その代理となる型である。  
	[`<valarray>`](../../valarray.md) の概要も参照のこと。


## 例
```cpp example
#include <iostream>
#include <valarray>

int main()
{
  const std::valarray<int> va = {1, 2, 3};

  // 全要素を+1する
  std::valarray<int> result = va.apply([](int x) { return x + 1; });

  for (int x : result) {
    std::cout << x << std::endl;
  }
}
```
* apply[color ff0000]

### 出力
```
2
3
4
```
