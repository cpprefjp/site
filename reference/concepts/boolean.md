# boolean
* concepts[meta header]
* std[meta namespace]
* concept[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class B>
  concept boolean =
    movable<remove_cvref_t<B>> &&
    requires(const remove_reference_t<B>& b1,
             const remove_reference_t<B>& b2, const bool a) {
      { b1 } -> convertible_to<bool>;
      { !b1 } -> convertible_to<bool>;
      { b1 && b2 } -> same_as<bool>;
      { b1 &&  a } -> same_as<bool>;
      {  a && b2 } -> same_as<bool>;
      { b1 || b2 } -> same_as<bool>;
      { b1 ||  a } -> same_as<bool>;
      {  a || b2 } -> same_as<bool>;
      { b1 == b2 } -> convertible_to<bool>;
      { b1 ==  a } -> convertible_to<bool>;
      {  a == b2 } -> convertible_to<bool>;
      { b1 != b2 } -> convertible_to<bool>;
      { b1 !=  a } -> convertible_to<bool>;
      {  a != b2 } -> convertible_to<bool>;
    };
}
```
* movable[link /reference/concepts/movable.md.nolink]
* same_as[link /reference/concepts/same_as.md]
* convertible_to[link /reference/concepts/convertible_to.md]
* remove_cvref_t[link /reference/type_traits/remove_cvref.md]
* remove_reference_t[link /reference/type_traits/remove_reference.md]

## 概要

`boolean`は、任意の型`B`が真理値を表す型として使用可能であることを表すコンセプトである。

## モデル

`const remove_reference_t<B>`型の左辺値`b1, b2`について以下の条件を満たす場合に限って、型`B`は`boolean`のモデルである。

- `bool(b1) == !bool(!b1)`
- `(b1 && b2)`, `(b1 && bool(b2))`及び`(bool(b1) && b2)`は`(bool(b1) && bool(b2))`と等値であり、短絡評価されるかも同一である
- `(b1 || b2)`, `(b1 || bool(b2))`及び`(bool(b1) || b2)`は`(bool(b1) || bool(b2))`と等値であり、短絡評価されるかも同一である
- `bool(b1 == b2)`, `bool(b1 == bool(b2))`及び`bool(bool(b1) == b2)`は`(bool(b1) == bool(b2))`と等値である
- `bool(b1 != b2)`, `bool(b1 != bool(b2))`及び`bool(bool(b1) != b2)`は`(bool(b1) != bool(b2))`と等値である

## 備考

`bool`, [`std::true_type`](/reference/type_traits/true_type.md), [`std::bitset<N>::reference`](https://cpprefjp.github.io/reference/bitset/bitset/reference.html)等の型は真理値型として`boolean`コンセプトのモデルであるが、ポインタ型やスマートポインタ等の明示的に`bool`へ変換できるだけの型は真理値型ではなく`boolean`コンセプトのモデルとならない。

## 例
```cpp example
#include <iostream>
#include <concepts>
#include <memory>
#include <type_traits>
#include <bitset>
#include <optional>

template<std::boolean T>
void f(const char* name) {
  std::cout << name << " is boolean" << std::endl;
}

template<typename T>
void f(const char* name) {
  std::cout << name << " is not boolean" << std::endl;
}


int main() {
  f<bool>("bool");
  f<int>("int");
  f<std::size_t>("std::size_t");
  f<std::true_type>("std::true_type");
  f<std::false_type>("std::false_type");
  f<std::bitset<8>::reference>("std::bitset<8>::reference");
  std::cout << "\n";
  f<int*>("int*");
  f<std::unique_ptr<int>>("std::unique_ptr<int>");
  f<std::shared_ptr<int>>("std::shared_ptr<int>");
  f<std::optional<int>>("std::optional<int>");
}

```
* std::boolean[color ff0000]

### 出力
```
bool is boolean
int is boolean
std::size_t is boolean
std::true_type is boolean
std::false_type is boolean
std::bitset<8>::reference is boolean

int* is not boolean
std::unique_ptr<int> is not boolean
std::shared_ptr<int> is not boolean
std::optional<int> is not boolean
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
- [LWG Issue 3208. Boolean's expression requirements are ordered inconsistently](https://wg21.cmeerw.net/lwg/issue3208)
- [P1964R2 Wording for `boolean-testable`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p1964r2.html)
