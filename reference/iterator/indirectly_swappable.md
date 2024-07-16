# indirectly_swappable
* iterator[meta header]
* std[meta namespace]
* concept[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class I1, class I2 = I1>
  concept indirectly_swappable =
    indirectly_readable<I1> && indirectly_readable<I2> &&
    requires(const I1 i1, const I2 i2) {
      ranges::iter_swap(i1, i1);
      ranges::iter_swap(i2, i2);
      ranges::iter_swap(i1, i2);
      ranges::iter_swap(i2, i1);
    };
}
```
* indirectly_readable[link /reference/iterator/indirectly_readable.md]
* iter_swap[link /reference/iterator/iter_swap.md]

## 概要

`indirectly_swappable`は、`indirectly_readable`な型`I1, I2`の参照する要素のオブジェクトが`swap`可能であることを表すコンセプトである。

単純には、型`I1, I2`のオブジェクトをそれぞれ`i1, i2`とすると[`std::ranges::swap(*i1, *i2)`](/reference/concepts/swap.md)のような交換操作が可能であることを表している。

## 例
```cpp example
#include <iostream>
#include <concepts>
#include <iterator>
#include <vector>
#include <memory>

template<typename I1, typename I2>
  requires std::indirectly_swappable<I1, I2>
void f(const char* nameI1, const char* nameI2) {
  std::cout << nameI1 << " is indirectly_swappable " << nameI2 << std::endl;
}

template<typename I1, typename I2>
void f(const char* nameI1, const char* nameI2) {
  std::cout << nameI1 << " is not indirectly_swappable " << nameI2 << std::endl;
}


struct del_copy_ctor {
  del_copy_ctor(const del_copy_ctor&) = delete;
};

int main() {
  f<int*, int* const>("int*", "int* const");
  f<std::unique_ptr<int>, int*>("std::unique_ptr<int>", "int*");
  f<std::vector<int>::iterator, std::unique_ptr<int>>("std::vector<int>::iterator", "std::unique_ptr<int>");

  std::cout << "\n";
  f<int*, const int*>("int*", "const int*");
  f<std::istream_iterator<int>, std::vector<int>::iterator>("std::istream_iterator<int>", "std::vector<int>::iterator");
  f<std::istream_iterator<int>, std::ostream_iterator<int>>("std::istream_iterator<int>", "std::ostream_iterator<int>");
  f<del_copy_ctor*, del_copy_ctor*>("del_copy_ctor*", "del_copy_ctor*");
}
```
* std::indirectly_swappable[color ff0000]

### 出力
```
int* is indirectly_swappable int* const
std::unique_ptr<int> is indirectly_swappable int*
std::vector<int>::iterator is indirectly_swappable std::unique_ptr<int>

int* is not indirectly_swappable const int*
std::istream_iterator<int> is not indirectly_swappable std::vector<int>::iterator
std::istream_iterator<int> is not indirectly_swappable std::ostream_iterator<int>
del_copy_ctor* is not indirectly_swappable del_copy_ctor*
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
