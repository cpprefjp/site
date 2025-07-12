# operator+ (単項)
* valarray[meta header]
* std[meta namespace]
* valarray[meta class]
* function[meta id-type]

```cpp
ValOrProxy<T> operator+() const;
```
* ValOrProxy[italic]

## 概要
単項 `+` 演算（符号そのままの要素を得る）。


## 戻り値
以下のコードと等価のことを行う：

```cpp
valarray<T> result(size());
for (std::size_t i = 0; i < size(); ++i) {
  result[i] = +(*this)[i];
}
return result;
```
* size()[link size.md]


## 備考
- 戻り値の型 *`ValOrProxy`* は、[`valarray`](../valarray.md)、あるいは、その代理となる型である。  
	[`<valarray>`](../../valarray.md) の概要も参照のこと。


## 例
```cpp example
#include <iostream>
#include <valarray>

int main()
{
  std::valarray<int> a = {1, -2, 3};

  std::valarray<int> result = +a;
  for (int x : result) {
    std::cout << x << std::endl;
  }
}
```
* +a[color ff0000]

### 出力
```
1
-2
3
```
