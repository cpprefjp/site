# unsigned_integral
* concepts[meta header]
* std[meta namespace]
* concept[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class T>
  concept unsigned_integral = integral<T> && !signed_integral<T>;
}
```
* integral[link /reference/concepts/integral.md]
* signed_integral[link /reference/concepts/signed_integral.md]

## 概要
`unsigned_integral`は、任意の型`T`が符号なし整数型であることを表すコンセプトである。

## 備考

`bool`など、符号なし整数型でなくても`unsigned_integral`のモデルとなる型が存在する。

## 例
```cpp example
#include <iostream>
#include <concepts>
#include <cstdint>
#include <type_traits>

template<std::unsigned_integral T>
void f(const char* name) {
  std::cout << name << " is unsigned_integral" << std::endl;
}

template<typename T>
void f(const char* name) {
  std::cout << name << " is not unsigned_integral" << std::endl;
}


int main() {
  f<bool>("bool");
  f<std::size_t>("std::size_t");
  f<std::uint32_t>("std::uint32_t");
  f<char8_t>("char8_t");

  std::cout << "\n";

  f<int>("int");
  f<std::int64_t>("std::int64_t");
  f<int>("char");
  f<int*>("int*");
  f<int&>("int&");
  f<std::integral_constant<unsigned int, 1>>("std::integral_constant<unsigned int, 1>");
}
```
* std::unsigned_integral[color ff0000]

### 出力
```tart
bool is unsigned_integral
std::size_t is unsigned_integral
std::uint32_t is unsigned_integral
char8_t is unsigned_integral

int is not unsigned_integral
std::int64_t is not unsigned_integral
char is not unsigned_integral
int* is not unsigned_integral
int& is not unsigned_integral
std::integral_constant<int, 1> is not unsigned_integral
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

