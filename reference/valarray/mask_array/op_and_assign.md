# operator&=
* valarray[meta header]
* std[meta namespace]
* mask_array[meta class]
* function[meta id-type]

```cpp
void operator&=(const ValOrProxy<T>& xs) const;
```
* ValOrProxy[italic]

## 概要
論理積の複合代入を行う。


## 効果
元となる [`valarray`](../valarray.md) オブジェクトから参照によって抽出した各要素に、`xs` の各要素を論理積する。


## 戻り値
なし


## 備考
- 引数の型 *`ValOrProxy`* は、[`valarray`](../valarray.md)、あるいは、その代理となる型である。  
	[`<valarray>`](../../valarray.md) の概要も参照のこと。
- [`valarray`](../valarray.md) から抽出した要素数と `xs` の要素数が異なる場合、未定義動作を引き起こす。


## 例
```cpp example
#include <iostream>
#include <valarray>
#include <bitset>

int main()
{
  std::valarray<int> va = {
    0b00000101,
    0b00001010,
    0b00010101
  };

  std::valarray<bool> mask = {true, true, true};

  std::mask_array<int> result = va[mask];

  // 抽出した要素に0b11を論理積する
  result &= std::valarray<int>(0b00000011, 3);

  for (int x : va) {
    std::cout << std::bitset<8>(x).to_string() << std::endl;
  }
}
```
* to_string()[link /reference/bitset/bitset/to_string.md]

### 出力
```
00000001
00000010
00000001
```


