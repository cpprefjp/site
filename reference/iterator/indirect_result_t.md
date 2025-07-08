# indirect_result_t
* iterator[meta header]
* std[meta namespace]
* type-alias[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class F, class... Is>
    requires (indirectly_readable<Is> && ...) &&
             invocable<F, iter_reference_t<Is>...>
  using indirect_result_t = invoke_result_t<F, iter_reference_t<Is>...>;
}
```
* indirectly_readable[link /reference/iterator/indirectly_readable.md]
* iter_reference_t[link /reference/iterator/iter_reference_t.md]

## 概要

関数呼び出し可能な型`F`に間接参照可能な型（主にイテレータ型）`Is...`の指す要素を渡して呼び出した時の戻り値型を取得する。

## 例
```cpp example
#include <iterator>
#include <vector>
#include <string>

int main() {  
  using vec_iterator = std::vector<int>::iterator;
  using pointer = double*;

  using lambda1 = decltype([](int) -> std::size_t { return 0;});
  using lambda2 = decltype([](double) -> int { return 0;});
  using lambda3 = decltype([](int, int, double, double) -> std::string { return "";});

  static_assert(std::same_as<std::indirect_result_t<lambda1, vec_iterator>, std::size_t>);
  static_assert(std::same_as<std::indirect_result_t<lambda2, pointer>     , int>);
  static_assert(std::same_as<std::indirect_result_t<lambda3, vec_iterator, const vec_iterator, pointer, const pointer>, std::string>);
}
```
* std::indirect_result_t[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 10.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 6 [mark verified]

## 参照

- [P0896R4 The One Ranges Proposal (was Merging the Ranges TS)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)
