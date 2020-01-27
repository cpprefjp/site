# operator^
* valarray[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class T>
  ValOrProxy<T> operator^(const ValOrProxy<T>& xs,
                          const ValOrProxy<T>& ys);                     // (1)

  template <class T>
  ValOrProxy<T> operator^(const ValOrProxy<T>& xs,
                          const T& y);                                  // (2) C++17 まで
  template <class T>
  ValOrProxy<T> operator^(const ValOrProxy<T>& xs,
                          const typename valarray<T>::value_type& y);   // (2) C++20 から

  template <class T>
  ValOrProxy<T> operator^(const T& x,
                          const ValOrProxy<T>& ys);                     // (3) C++17 まで
  template <class T>
  ValOrProxy<T> operator^(const typename valarray<T>::value_type& x,
                          const ValOrProxy<T>& ys);                     // (3) C++20 から
}
```
* ValOrProxy[italic]

## 概要
`valarray`において、左辺と右辺の排他的論理和を得る。

- (1) : `xs`の各要素と、`ys`の各要素の排他的論理和を得る。
- (2) : `xs`の各要素と、`y`の排他的論理和を得る。
- (3) : `ys`の各要素と、`x`の排他的論理和を得る。


## 戻り値
- (1) : 以下のコードと�価のことを行う：

```cpp
valarray<T> result = xs;
result ^= ys;
return result;
```
* ^=[link op_xor_assign.md]


- (2) : 以下のコードと�価のことを行う：

```cpp
valarray<T> result = xs;
result ^= y;
return result;
```
* ^=[link op_xor_assign.md]


- (3) : 以下のコードと�価のことを行う：

```cpp
valarray<T> result = ys;
result ^= x;
return result;
```
* ^=[link op_xor_assign.md]


## 備考
- 引数、および、戻り値の型 *`ValOrProxy`* は、[`valarray`](../valarray.md)、あるいは、その代理となる型である。  
	[`<valarray>`](../../valarray.md) の概要も参照のこと。
- (1) : `xs` と `ys` の要素数が異なる場合、その挙動は未定義。
- C++20における(2)と(3)に対する変更は、`std::valarray<double>{} * 2` のような式が型推論に失敗しないようにするためである。  
	なお、この変更は規格の誤り修�とみなされているため、処理系によっては C++17 以前でも使用可能となる。


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
    0b00000101,
    0b00001010,
    0b00010101
  };
  const std::valarray<std::uint8_t> b = {
    0b00000011,
    0b00000011,
    0b00000011
  };
  const std::valarray<std::uint8_t> expected = {
    0b00000110,
    0b00001001,
    0b00010110
  };

  std::valarray<std::uint8_t> result1 = a ^ b;
  assert((equal_valarray(result1, expected)));

  std::valarray<std::uint8_t> result2 = a ^ 0b00000011;
  assert((equal_valarray(result2, expected)));

  std::valarray<std::uint8_t> result3 = 0b00000011 ^ a;
  assert((equal_valarray(result3, expected)));
}
```
* std::uint8_t[link /reference/cstdint/uint8_t.md]
* std::all_of[link /reference/algorithm/all_of.md]
* std::begin[link begin_free.md]
* std::end[link end_free.md]

### 出力
```
```


## 参照
- [LWG Issue 3074. Non-member functions for `valarray` should only deduce from the `valarray`](https://wg21.cmeerw.net/lwg/issue3074)
