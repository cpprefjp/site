# permutable
* iterator[meta header]
* std[meta namespace]
* concept[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class I>
  concept permutable =
    forward_iterator<I> &&
    indirectly_movable_storable<I, I> &&
    indirectly_swappable<I, I>;
}
```
* forward_iterator[link /reference/iterator/forward_iterator.md]
* indirectly_movable_storable[link /reference/iterator/indirectly_movable_storable.md]
* indirectly_swappable[link /reference/iterator/indirectly_swappable.md]

## 概要

`permutable`は、イテレータ型`I`についてその要素の`move/swap`によって要素の位置を並べ替えることができる事を表すコンセプトである。

## 例
```cpp example
#include <iostream>
#include <concepts>
#include <iterator>
#include <memory>
#include <vector>
#include <forward_list>
#include <list>

template<std::permutable I>
void f(const char* name) {
  std::cout << name << " is permutable" << std::endl;
}

template<typename I>
void f(const char* name) {
  std::cout << name << " is not permutable" << std::endl;
}

int main() {
  f<int*>("int*");
  f<std::forward_list<int>::iterator>("std::forward_list<int>::iterator");
  f<std::list<int>::iterator>("std::list<int>::iterator");
  f<std::vector<int>::iterator>("std::vector<int>::iterator");

  std::cout << "\n";
  f<const int*>("const int*");
  f<int* const>("int* const");
  f<std::istream_iterator<double>>("std::istream_iterator<double>");
  f<std::ostream_iterator<double>>("std::ostream_iterator<double>");
}
```
* std::permutable[color ff0000]

### 出力
```
int* is permutable
std::forward_list<int>::iterator is permutable
std::list<int>::iterator is permutable
std::vector<int>::iterator is permutable
std::vector<std::unique_ptr<int>>::iterator is permutable

const int* is not permutable
int* const is not permutable
std::istream_iterator<double> is not permutable
std::ostream_iterator<double> is not permutable
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 10.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 6 [mark verified]

## 関連項目

- [C++20 コンセプト](/lang/cpp20/concepts.md)

## 参照

- [P0896R4 The One Ranges Proposal (was Merging the Ranges TS)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)
