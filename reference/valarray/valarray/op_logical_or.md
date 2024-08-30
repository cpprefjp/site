# operator||
* valarray[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class T>
  ValOrProxy<bool> operator||(const ValOrProxy<T>& xs,
                              const ValOrProxy<T>& ys);                     // (1)

  template <class T>
  ValOrProxy<bool> operator||(const ValOrProxy<T>& xs,
                              const T& y);                                  // (2) C++17 まで
  template <class T>
  ValOrProxy<bool> operator||(const ValOrProxy<T>& xs,
                              const typename valarray<T>::value_type& y);   // (2) C++20 から

  template <class T>
  ValOrProxy<bool> operator||(const T& x,
                              const ValOrProxy<T>& ys);                     // (3) C++17 まで
  template <class T>
  ValOrProxy<bool> operator||(const typename valarray<T>::value_type& x,
                              const ValOrProxy<T>& ys);                     // (3) C++20 から
}
```
* ValOrProxy[italic]

## 概要
`valarray`において、左辺と右辺の式の論理和をとる。

- (1) : `xs`の各要素と、`ys`の各要素の論理和をとる。
- (2) : `xs`の各要素と、`y`の論理和をとる。
- (3) : `x`と、`ys`の各要素の論理和をとる。


## 要件
型`T`が`bool`に変換可能であること。


## 戻り値

- (1) : 以下のコードと等価のことを行う：

```cpp
valarray<bool> result(xs.size());
for (std::size_t i = 0; i < result.size(); ++i) {
  result[i] = xs[i] || ys[i];
}
return result;
```
* size()[link size.md]


- (2) : 以下のコードと等価のことを行う：

```cpp
valarray<bool> result(xs.size());
for (std::size_t i = 0; i < result.size(); ++i) {
  result[i] = xs[i] || y;
}
return result;
```
* size()[link size.md]


- (3) : 以下のコードと等価のことを行う：

```cpp
valarray<bool> result(ys.size());
for (std::size_t i = 0; i < result.size(); ++i) {
  result[i] = x || ys[i];
}
return result;
```
* size()[link size.md]


## 備考
- 引数、および、戻り値の型 *`ValOrProxy`* は、[`valarray`](../valarray.md)、あるいは、その代理となる型である。  
	[`<valarray>`](../../valarray.md) の概要も参照のこと。
- (1) : `xs` と `ys` の要素数が異なる場合、未定義動作となる。
- C++20における(2)と(3)に対する変更は、`std::valarray<double>{} * 2` のような式が型推論に失敗しないようにするためである。  
	なお、この変更は規格の誤り修正とみなされているため、処理系によっては C++17 以前でも使用可能となる。


## 例
```cpp example
#include <cassert>
#include <valarray>

int main()
{
  const std::valarray<bool> a = {true, false, true};
  const std::valarray<bool> b = {true, false, false};

  const std::valarray<bool> result1 = a || b;
  assert(result1[0]);
  assert(!result1[1]);
  assert(result1[2]);

  const std::valarray<bool> result2 = a || true;
  assert(result2[0]);
  assert(result2[1]);
  assert(result2[2]);

  const std::valarray<bool> result3 = true || a;
  assert(result3[0]);
  assert(result3[1]);
  assert(result3[2]);
}
```

### 出力
```
```


## 参照
- [LWG Issue 3074. Non-member functions for `valarray` should only deduce from the `valarray`](https://wg21.cmeerw.net/lwg/issue3074)
