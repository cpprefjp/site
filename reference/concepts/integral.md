# integral
* concepts[meta header]
* std[meta namespace]
* concept[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class T>
  concept integral = is_integral_v<T>;
}
```
* is_integral_v[link /reference/type_traits/is_integral.md]

## 概要
`integral`は、任意の型`T`が整数型であることを表すコンセプトである。

## 例
```cpp example
#include <iostream>
#include <concepts>
#include <cstdint>
#include <type_traits>

template<std::integral T>
void f(const char* name) {
  std::cout << name << " is integral" << std::endl;
}

template<typename T>
void f(const char* name) {
  std::cout << name << " is not integral" << std::endl;
}


int main() {
  f<bool>("bool");
  f<int>("int");
  f<std::size_t>("std::size_t");
  f<std::uint32_t>("std::uint32_t");
  f<char>("char");
  f<char8_t>("char8_t");

  std::cout << "\n";

  f<int*>("int*");
  f<int&>("int&");
  f<std::integral_constant<int, 1>>("std::integral_constant<int, 1>");
}
```
* std::integral[color ff0000]

### 出力
```
bool is integral
int is integral
std::size_t is integral
std::uint32_t is integral
char is integral
char8_t is integral

int* is not integral
int& is not integral
std::integral_constant<int, 1> is not integral
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 10.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark verified]

## 関連項目

- [C++20 コンセプト](/lang/cpp20/concepts.md)

## 参照

- [P0898R3 Standard Library Concepts](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0898r3.pdf)
- [P1754R1 Rename concepts to standard_case for C++20, while we still can](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1754r1.pdf)
