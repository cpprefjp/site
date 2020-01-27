# signed_integral
* concepts[meta header]
* std[meta namespace]
* concept[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class T>
  concept signed_integral = integral<T> && is_signed_v<T>;
}
```
* integral[link /reference/concepts/integral.md]
* is_signed_v[link /reference/type_traits/is_signed.md]

## 概要
`signed_integral`は、任意の型`T`が符号付き整数型であることを表すコンセプトである。

## 備考

`char`など、符号付整数型でなくても`signed_integral`のモデルとなる型が�在する。

## 例
```cpp example
#include <iostream>
#include <concepts>
#include <cstdint>
#include <type_traits>

template<std::signed_integral T>
void f(const char* name) {
  std::cout << name << " is signed_integral" << std::endl;
}

template<typename T>
void f(const char* name) {
  std::cout << name << " is not signed_integral" << std::endl;
}


int main() {
  f<int>("int");
  f<std::int64_t>("std::int64_t");
  f<int>("char");

  std::cout << "\n";

  f<bool>("bool");
  f<std::size_t>("std::size_t");
  f<std::uint32_t>("std::uint32_t");
  f<char8_t>("char8_t");
  f<int*>("int*");
  f<int&>("int&");
  f<std::integral_constant<int, 1>>("std::integral_constant<int, 1>");
}
```
* std::integral[color ff0000]

### 出力
```
int is signed_integral
std::int64_t is signed_integral
char is signed_integral

bool is not signed_integral
std::size_t is not signed_integral
std::uint32_t is not signed_integral
char8_t is not signed_integral
int* is not signed_integral
int& is not signed_integral
std::integral_constant<int, 1> is not signed_integral
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 10.1
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3

## 関連項目

- [C++20 コンセプト](/lang/cpp20/concepts.md)

## 参照

- [P0898R3 Standard Library Concepts](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0898r3.pdf)
- [P1754R1 Rename concepts to standard_case for C++20, while we still can](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1754r1.pdf)

