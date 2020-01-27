# operator>
* valarray[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class T>
  ValOrProxy<bool> operator>(const ValOrProxy<T>& xs,
                             const ValOrProxy<T>& ys);                     // (1)

  template <class T>
  ValOrProxy<bool> operator>(const ValOrProxy<T>& xs,
                             const T& y);                                  // (2) C++17 まで
  template <class T>
  ValOrProxy<bool> operator>(const ValOrProxy<T>& xs,
                             const typename valarray<T>::value_type& y);   // (2) C++20 から

  template <class T>
  ValOrProxy<bool> operator>(const T& x,
                             const ValOrProxy<T>& ys);                     // (3) C++17 まで
  template <class T>
  ValOrProxy<bool> operator>(const typename valarray<T>::value_type& x,
                             const ValOrProxy<T>& ys);                     // (3) C++20 から
}
```
* ValOrProxy[italic]

## 概要
`valarray`において、左辺が右辺より大きいかを判定する。

- (1) : `xs`の各要素が、`ys`の各要素より大きいかを判定する。
- (2) : `xs`の各要素が、`y`より大きいかを判定する。
- (3) : `x`が、`ys`の各要素より大きいかを判定する。


## 戻り値
- (1) : 以下のコードと�価のことを行う：

```cpp
valarray<bool> result(xs.size());
for (std::size_t i = 0; i < result.size(); ++i) {
  result[i] = xs[i] > ys[i];
}
return result;
```
* size()[link size.md]


- (2) : 以下のコードと�価のことを行う：

```cpp
valarray<bool> result(xs.size());
for (std::size_t i = 0; i < result.size(); ++i) {
  result[i] = xs[i] > y;
}
return result;
```
* size()[link size.md]


- (3) : 以下のコードと�価のことを行う：

```cpp
valarray<bool> result(ys.size());
for (std::size_t i = 0; i < result.size(); ++i) {
  result[i] = x > ys[i];
}
return result;
```
* size()[link size.md]


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
#include <algorithm>

void expect_all_true(const std::valarray<bool>& va)
{
  assert((std::all_of(std::begin(va), std::end(va), [](bool b) { return b; })));
}

int main()
{
  const std::valarray<int> a = {4, 5, 6};
  const std::valarray<int> b = {1, 2, 3};
  const std::valarray<int> c = {3, 3, 3};
  const std::valarray<int> d = {1, 1, 1};

  const std::valarray<bool> result1 = a > b;
  expect_all_true(result1);

  const std::valarray<bool> result2 = c > 2;
  expect_all_true(result2);

  const std::valarray<bool> result3 = 2 > d;
  expect_all_true(result3);
}
```
* std::all_of[link /reference/algorithm/all_of.md]
* std::begin[link begin_free.md]
* std::end[link end_free.md]

### 出力
```
```


## 参照
- [LWG Issue 3074. Non-member functions for `valarray` should only deduce from the `valarray`](https://wg21.cmeerw.net/lwg/issue3074)
