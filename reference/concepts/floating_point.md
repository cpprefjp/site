# floating_point
* concepts[meta header]
* std[meta namespace]
* concept[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class T>
  concept floating_point = is_floating_point_v<T>;
}
```
* is_floating_point_v[link /reference/type_traits/is_floating_point.md]

## 概要

`floating_point`は、任意の型`T`が浮動小数点数型であることを表すコンセプトである。

## 例

```cpp example
#include <iostream>
#include <concepts>

template<std::floating_point T>
void f(const char* name) {
  std::cout << name << " is floating point" << std::endl;
}

template<typename T>
void f(const char* name) {
  std::cout << name << " is not floating point" << std::endl;
}


int main() {
  f<float>("float");
  f<double>("double");
  f<long double>("long double");
  f<const double>("const double");
  f<volatile double>("volatile double");

  std::cout << "\n";

  f<bool>("bool");
  f<int>("int");
  f<std::size_t>("std::size_t");
  f<double*>("double*");
  f<double&>("double&");
}
```
* std::floating_point[color ff0000]

### 出力
```
float is floating point
double is floating point
long double is floating point
const double is floating point
volatile double is floating point

bool is not floating point
int is not floating point
std::size_t is not floating point
double* is not floating point
double& is not floating point
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 10.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 5 [mark verified]

## 関連項目

- [C++20 コンセプト](/lang/cpp20/concepts.md)


## 参照
- [P0631R8 Math Constants](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0631r8.pdf)
- [P1754R1 Rename concepts to standard_case for C++20, while we still can](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1754r1.pdf)
