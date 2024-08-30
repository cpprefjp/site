# operator%=
* valarray[meta header]
* std[meta namespace]
* indirect_array[meta class]
* function[meta id-type]

```cpp
void operator%=(const ValOrProxy<T>& xs) const;
```
* ValOrProxy[italic]

## 概要
剰余算の複合代入を行う。


## 効果
元となる [`valarray`](../valarray.md) オブジェクトから参照によって抽出した各要素に、`xs` の各要素を剰余算する。


## 戻り値
なし


## 備考
- 引数の型 *`ValOrProxy`* は、[`valarray`](../valarray.md)、あるいは、その代理となる型である。  
	[`<valarray>`](../../valarray.md) の概要も参照のこと。
-  [`valarray`](../valarray.md) から抽出した要素数と `xs` の要素数が異なる場合、未定義動作となる。


## 例
```cpp example
#include <iostream>
#include <valarray>

int main()
{
  std::valarray<int> va = {1, 2, 3, 4, 5, 6};
  std::valarray<std::size_t> mask = {1, 3, 5};

  std::indirect_array<int> result = va[mask];

  // 抽出した要素に3を剰余算する
  result %= std::valarray<int>(3, mask.size());

  for (int x : va) {
    std::cout << x << std::endl;
  }
}
```
* mask.size()[link /reference/valarray/valarray/size.md]

### 出力
```
1
2
3
1
5
0
```


