# operator+=
* valarray[meta header]
* std[meta namespace]
* valarray[meta class]
* function[meta id-type]

```cpp
valarray<T>& operator+=(const ValOrProxy<T>& xs); // (1)
valarray<T>& operator+=(const T& x);              // (2)
```
* ValOrProxy[italic]

## 概要
加算の複合代入を行う。

- (1) : `*this`の各要素に、`xs`の各要素を加算する。
- (2) : `*this`の各要素に、`x`を加算する。


## 効果
- (1) : 以下のコードと等価のことを行う：

```cpp
for (std::size_t i = 0; i < size(); ++i) {
  (*this)[i] += xs[i];
}
```
* size()[link size.md]


- (2) : 以下のコードと等価のことを行う：

```cpp
for (std::size_t i = 0; i < size(); ++i) {
  (*this)[i] += x;
}
```
* size()[link size.md]


## 戻り値
`*this`


## 備考
- 引数の型 *`ValOrProxy`* は、[`valarray`](../valarray.md)、あるいは、その代理となる型である。  
	[`<valarray>`](../../valarray.md) の概要も参照のこと。
- (1) : `*this` と `xs` の要素数が異なる場合、未定義動作となる。


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

  std::valarray<int> result1 = a;
  result1 += b;
  print("valarray+=valarray", result1);

  std::valarray<int> result2 = a;
  result2 += 1;
  print("valarray+=int", result2);
}
```

### 出力
```
valarray+=valarray : {5,7,9}
valarray+=int : {5,6,7}
```


