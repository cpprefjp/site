# atan2
* valarray[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class T>
  ValOrProxy<T> atan2(const ValOrProxy<T>& ys,
                      const ValOrProxy<T>& xs);                     // (1)

  template <class T>
  ValOrProxy<T> atan2(const ValOrProxy<T>& ys,
                      const T& x);                                  // (2) C++17 まで
  template <class T>
  ValOrProxy<T> atan2(const ValOrProxy<T>& ys,
                      const typename valarray<T>::value_type& x);   // (2) C++20 から

  template <class T>
  ValOrProxy<T> atan2(const T& y,
                      const ValOrProxy<T>& xs);                     // (3) C++17 まで
  template <class T>
  ValOrProxy<T> atan2(const typename valarray<T>::value_type& y,
                      const ValOrProxy<T>& xs);                     // (3) C++20 から
}
```
* ValOrProxy[italic]

## 概要
逆正接（アークタンジェント：arc tangent）を対辺と隣辺から求める。


## 戻り値
- (1) : 以下のコードと等価のことを行う：

```cpp
std::valarray<T> result(ys.size());
for (std::size_t i = 0; i < result.size(); ++i) {
  result[i] = std::atan2(ys[i], xs[i]);
}
return result;
```
* size()[link size.md]
* std::atan2[link /reference/cmath/atan2.md]


- (2) : 以下のコードと等価のことを行う：

```cpp
std::valarray<T> result(ys.size());
for (std::size_t i = 0; i < result.size(); ++i) {
  result[i] = std::atan2(ys[i], x);
}
return result;
```
* size()[link size.md]
* std::atan2[link /reference/cmath/atan2.md]


- (3) : 以下のコードと等価のことを行う：

```cpp
std::valarray<T> result(xs.size());
for (std::size_t i = 0; i < result.size(); ++i) {
  result[i] = std::atan2(y, xs[i]);
}
return result;
```
* size()[link size.md]
* std::atan2[link /reference/cmath/atan2.md]


## 備考
- 引数、および、戻り値の型 *`ValOrProxy`* は、[`valarray`](../valarray.md)、あるいは、その代理となる型である。  
	[`<valarray>`](../../valarray.md) の概要も参照のこと。
- (1) : `ys` と `xs` の要素数が異なる場合、未定義動作となる。
- C++20における(2)と(3)に対する変更は、`std::valarray<double>{} * 2` のような式が型推論に失敗しないようにするためである。  
	なお、この変更は規格の誤り修正とみなされているため、処理系によっては C++17 以前でも使用可能となる。


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
  const std::valarray<float> ys = {0.1f, 0.2f, 0.3f};
  const std::valarray<float> xs = {0.3f, 0.2f, 0.1f};

  std::valarray<float> result1 = std::atan2(ys, xs);
  print("valarray-valarray", result1);

  std::valarray<float> result2 = std::atan2(ys, 0.3f);
  print("valarray-float", result2);

  std::valarray<float> result3 = std::atan2(0.1f, xs);
  print("float-valarray", result3);
}
```
* std::atan2[color ff0000]

### 出力
```
valarray-valarray : {0.321751,0.785398,1.24905}
valarray-float : {0.321751,0.588003,0.785398}
float-valarray : {0.321751,0.463648,0.785398}
```


## 参照
- [LWG Issue 3074. Non-member functions for `valarray` should only deduce from the `valarray`](https://wg21.cmeerw.net/lwg/issue3074)
