# constructible_from
* concepts[meta header]
* std[meta namespace]
* concept[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class T, class... Args>
  concept constructible_from = destructible<T> && is_constructible_v<T, Args...>;
}
```
* is_constructible_v[link /reference/type_traits/is_constructible.md]
* destructible[link /reference/concepts/destructible.md]

## 概要

`constructible_from`は、任意の型`T`が引数型`Args...`から構築可能であることを表すコンセプトである。

## 例

```cpp example
#include <iostream>
#include <concepts>
#include <vector>
#include <optional>
#include <memory>
#include <span>

template<typename T, typename... Args>
requires std::constructible_from<T, Args...>
void f(const char* name, const char* args) {
  std::cout << name << " is constructible from " << args << std::endl;
}

template<typename T, typename... Args>
void f(const char* name, const char* args) {
  std::cout << name << " is not constructible from " << args << std::endl;
}


int main() {
  f<std::vector<int>, std::initializer_list<int>>("std::vector<int>", "std::initializer_list<int>");
  f<std::optional<std::vector<int>>, std::in_place_t, std::initializer_list<int>, std::allocator<int>>("std::optional<std::vector<int>>", "std::in_place_t, std::initializer_list<int>, std::allocator<int>");
  f<std::unique_ptr<const int>, std::unique_ptr<int>>("std::unique_ptr<const int>", "std::unique_ptr<int>");
  f<std::span<int, 4>, std::array<int, 4>&>("std::span<int, 4>", "std::array<int, 4>&");

  std::cout << "\n";

  f<std::vector<int>, std::vector<double>>("std::vector<int>", "std::vector<double>");
  f<std::optional<std::vector<int>>, std::optional<std::vector<double>>>("std::optional<std::vector<int>>", "std::optional<std::vector<double>>");
  f<std::unique_ptr<int>, std::unique_ptr<const int>>("std::unique_ptr<int>", "std::unique_ptr<const int>");
  f<std::span<int, 4>, std::array<int, 4>>("std::span<int, 4>", "std::array<int, 4>");
}
```
* std::constructible_from[color ff0000]

### 出力
```
std::vector<int> is constructible from std::initializer_list<int>
std::optional<std::vector<int>> is constructible from std::in_place_t, std::initializer_list<int>, std::allocator<int>
std::unique_ptr<const int> is constructible from std::unique_ptr<int>
std::span<int, 4> is constructible from std::array<int, 4>&

std::vector<int> is not constructible from std::vector<double>
std::optional<std::vector<int>> is not constructible from std::optional<std::vector<double>>
std::unique_ptr<int> is not constructible from std::unique_ptr<const int>
std::span<int, 4> is not constructible from std::array<int, 4>
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
