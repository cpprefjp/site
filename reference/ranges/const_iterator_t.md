# const_iterator_t
* ranges[meta header]
* std::ranges[meta namespace]
* type-alias[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std::ranges {
  template<range R>
  using const_iterator_t = decltype(ranges::cbegin(declval<R&>()));
}
```
* cbegin[link cbegin.md]

## 概要

任意のRange型`R`の定数イテレータの型を取得する。

## 例

```cpp example
#include <ranges>
#include <vector>

int main() {
  static_assert(std::same_as<std::ranges::const_iterator_t<      std::vector<int>>, std::basic_const_iterator<std::vector<int>::iterator>>);
  static_assert(std::same_as<std::ranges::const_iterator_t<const std::vector<int>>, std::vector<int>::const_iterator>);
}
```
* std::ranges::const_iterator_t[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 13.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 6 [mark verified]

## 参照

- [P2278R4 `cbegin` should always return a constant iterator](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2278r4.html)
- [LWG Issue 3946. The definition of `const_iterator_t` should be reworked](https://cplusplus.github.io/LWG/issue3946)
