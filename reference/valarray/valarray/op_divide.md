# operator/
* valarray[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class T>
  ValOrProxy<T> operator/(const ValOrProxy<T>& xs,
                          const ValOrProxy<T>& ys);                     // (1)

  template <class T>
  ValOrProxy<T> operator/(const ValOrProxy<T>& xs,
                          const T& y);                                  // (2) C++17 まで
  template <class T>
  ValOrProxy<T> operator/(const ValOrProxy<T>& xs,
                          const typename valarray<T>::value_type& y);   // (2) C++20 から

  template <class T>
  ValOrProxy<T> operator/(const T& x,
                          const ValOrProxy<T>& ys);                     // (3) C++17 まで
  template <class T>
  ValOrProxy<T> operator/(const typename valarray<T>::value_type& x,
                          const ValOrProxy<T>& ys);                     // (3) C++20 から
}
```
* ValOrProxy[italic]

## 概要
`valarray`において、左辺と右辺を除算する。

- (1) : `xs`の各要素を、`ys`の各要素で除算する。
- (2) : `xs`の各要素を、`y`で除算する。
- (3) : `x`を、`ys`の各要素で除算する。


## 戻り値
- (1) : 以下のコードと�価のことを行う：

```cpp
valarray<T> result = xs;
result /= ys;
return result;
```
* /=[link op_divide_assign.md]


- (2) : 以下のコードと�価のことを行う：

```cpp
valarray<T> result = xs;
result /= y;
return result;
```
* /=[link op_divide_assign.md]


- (3) : 以下のコードと�価のことを行う：

```cpp
valarray<T> result(x, ys.size());
result /= ys;
return result;
```
* size()[link size.md]
* /=[link op_divide_assign.md]


## 備考
- 引数、および、戻り値の型 *`ValOrProxy`* は、[`valarray`](../valarray.md)、あるいは、その代理となる型である。  
	[`<valarray>`](../../valarray.md) の概要も参照のこと。
- (1) : `xs` と `ys` の要素数が異なる場合、その挙動は未定義。
- C++20における(2)と(3)に対する変更は、`std::valarray<double>{} * 2` のような式が型推論に失敗しないようにするためである。  
	なお、この変更は規格の誤り修�とみなされているため、処理系によっては C++17 以前でも使用可能となる。


## 例
```cpp example
#include <iostream>
#include <valarray>

template <class T>
void print(const char* name, const std::valarray<T>& va)
{
  std::cout << name << " : {";
  bool first = true;

  for (const T& x : va) {
    if (first) {
      first = false;
    }
    else {
      std::cout << ',';
    }
    std::cout << x;
  }
  std::cout << "}" << std::endl;
}

int main()
{
  const std::valarray<int> a = {4, 5, 6};
  const std::valarray<int> b = {1, 2, 3};

  std::valarray<int> result1 = a / b;
  print("valarray/valarray", result1);

  std::valarray<int> result2 = a / 2;
  print("valarray/int", result2);

  std::valarray<int> result3 = 15 / a;
  print("int/valarray", result3);
}
```

### 出力
```
valarray/valarray : {4,2,2}
valarray/int : {2,2,3}
int/valarray : {3,3,2}
```


## 参照
- [LWG Issue 3074. Non-member functions for `valarray` should only deduce from the `valarray`](https://wg21.cmeerw.net/lwg/issue3074)
