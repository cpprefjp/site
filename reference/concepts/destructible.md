# destructible
* concepts[meta header]
* std[meta namespace]
* concept[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class T, class... Args>
  concept destructible = is_nothrow_destructible_v<T>;;
}
```
* is_nothrow_destructible_v[link /reference/type_traits/is_nothrow_destructible.md]


## 概要
`destructible`は、任意の型`T`が破棄可能であることを表す要件である。

## 備考

`noexcept(true)`相当の指定がされていないが実際には例外を投げる事はない場合でも、本コンセプトを満たす事は出来ない。

## 例

```cpp example
#include <iostream>
#include <concepts>
#include <vector>

template<std::destructible T>
void f(const char* name) {
  std::cout << name << " is destructible" << std::endl;
}

template<typename T, typename... Args>
void f(const char* name) {
  std::cout << name << " is not destructible" << std::endl;
}

struct S1 {
  ~S1() noexcept(false) {}
};

struct S2 {
  ~S2() = delete;
};


int main() {
  f<int>("int");
  f<std::vector<int>>("std::vector<int>");
  f<S1>("S1");
  f<S2>("S2");
}
```
* std::destructible[color ff0000]
* std::span[link /reference/span/span.md]

### 出力
```
int is destructible
std::vector<int> is destructible
S1 is not destructible
S2 is not destructible
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
- [`is_destructible`](/reference/type_traits/is_destructible.md)
- [`is_nothrow_destructible`](/reference/type_traits/is_nothrow_destructible.md)

## 参照
- [P0898R3 Standard Library Concepts](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0898r3.pdf)
- [P1754R1 Rename concepts to standard_case for C++20, while we still can](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1754r1.pdf)