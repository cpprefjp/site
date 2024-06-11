# indirectly_movable
* iterator[meta header]
* std[meta namespace]
* concept[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class In, class Out>
  concept indirectly_movable =
    indirectly_readable<In> &&
    indirectly_writable<Out, iter_rvalue_reference_t<In>>;
}
```
* indirectly_readable[link /reference/iterator/indirectly_readable.md]
* indirectly_writable[link /reference/iterator/indirectly_writable.md]
* iter_rvalue_reference_t[link /reference/iterator/iter_rvalue_reference_t.md]

## 概要

`indirectly_movable`は、`indirectly_readable`な型`In`から`indirectly_writable`な型`Out`へ、その要素のオブジェクトがムーブ可能であることを表すコンセプトである。

単純には、型`In, Out`のオブジェクトをそれぞれ`in, out`とすると`*out = std::move(*in)`のような代入が可能であることを表している。

## 例
```cpp example
#include <iostream>
#include <concepts>
#include <iterator>
#include <vector>
#include <memory>

template<typename In, typename Out>
  requires std::indirectly_movable<In, Out>
void f(const char* nameIn, const char* nameO) {
  std::cout << nameIn << " is indirectly_movable " << nameO << std::endl;
}

template<typename In, typename Out>
void f(const char* nameIn, const char* nameO) {
  std::cout << nameIn << " is not indirectly_movable " << nameO << std::endl;
}


struct del_copy_ctor {
  del_copy_ctor(const del_copy_ctor&) = delete;
};

int main() {
  f<int*, int* const>("int*", "int* const");
  f<std::unique_ptr<int>, int*>("std::unique_ptr<int>", "int*");
  f<std::vector<int>::iterator, std::unique_ptr<int>>("std::vector<int>::iterator", "std::unique_ptr<int>");
  f<std::istream_iterator<int>, std::vector<int>::iterator>("std::istream_iterator<int>", "std::vector<int>::iterator");
  f<std::istream_iterator<int>, std::ostream_iterator<int>>("std::istream_iterator<int>", "std::ostream_iterator<int>");
  f<del_copy_ctor*, del_copy_ctor*>("del_copy_ctor*", "del_copy_ctor*");

  std::cout << "\n";
  f<int*, const int*>("int*", "const int*");
  f<std::ostream_iterator<int>, std::istream_iterator<int>>("std::ostream_iterator<int>", "std::istream_iterator<int>");
}
```
* std::indirectly_movable[color ff0000]

### 出力
```
int* is indirectly_movable int* const
std::unique_ptr<int> is indirectly_movable int*
std::vector<int>::iterator is indirectly_movable std::unique_ptr<int>
std::istream_iterator<int> is indirectly_movable std::vector<int>::iterator
std::istream_iterator<int> is indirectly_movable std::ostream_iterator<int>
del_copy_ctor* is indirectly_movable del_copy_ctor*

int* is not indirectly_movable const int*
std::ostream_iterator<int> is not indirectly_movable std::istream_iterator<int>
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
- [`indirectly_movable_storable`](indirectly_movable_storable.md)

## 参照

- [P0896R4 The One Ranges Proposal (was Merging the Ranges TS)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)
