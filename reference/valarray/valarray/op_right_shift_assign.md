# operator>>=
* valarray[meta header]
* std[meta namespace]
* valarray[meta class]
* function[meta id-type]

```cpp
valarray<T>& operator>>=(const ValOrProxy<T>& xs); // (1)
valarray<T>& operator>>=(const T& x);              // (2)
```
* ValOrProxy[italic]

## 概要
右シフトの複合代入を行う。

- (1) : `*this`の各要素に、`xs`の各要素の値だけ右シフトした結果を代入する。
- (2) : `*this`の各要素に、`x`の値だけ右シフトした結果を代入する。


## 効果
- (1) : 以下のコードと�価のことを行う：

```cpp
for (std::size_t i = 0; i < size(); ++i) {
  (*this)[i] >>= xs[i];
}
```
* size()[link size.md]

- (2) : 以下のコードと�価のことを行う：

```cpp
for (std::size_t i = 0; i < size(); ++i) {
  (*this)[i] >>= x;
}
```
* size()[link size.md]


## 戻り値
`*this`


## 備考
- 引数の型 *`ValOrProxy`* は、[`valarray`](../valarray.md)、あるいは、その代理となる型である。  
	[`<valarray>`](../../valarray.md) の概要も参照のこと。
- (1) : `*this` と `xs` の要素数が異なる場合、その挙動は未定義。


## 例
```cpp example
#include <cassert>
#include <valarray>
#include <cstdint>
#include <algorithm>

template <class T>
bool equal_valarray(const std::valarray<T>& a, const std::valarray<T>& b)
{
  const std::valarray<bool> result = a == b;
  return std::all_of(std::begin(result), std::end(result), [](bool b) { return b; });
}

int main()
{
  const std::valarray<std::uint8_t> a = {
    0b01010001,
    0b10100000,
    0b01011000
  };
  const std::valarray<std::uint8_t> b = {
    4,
    4,
    4
  };
  const std::valarray<std::uint8_t> expected = {
    0b00000101,
    0b00001010,
    0b00000101
  };

  std::valarray<std::uint8_t> result1 = a;
  result1 >>= b;
  assert((equal_valarray(result1, expected)));

  std::valarray<std::uint8_t> result2 = a;
  result2 >>= 4;
  assert((equal_valarray(result2, expected)));
}
```
* std::uint8_t[link /reference/cstdint/uint8_t.md]
* std::all_of[link /reference/algorithm/all_of.md]
* std::begin[link begin_free.md]
* std::end[link end_free.md]

### 出力
```
```


