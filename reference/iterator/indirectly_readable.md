# indirectly_readable
* iterator[meta header]
* std[meta namespace]
* concept[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class In>
  concept indirectly_readable = see below;
}
```

## 概要

`indirectly_readable`は、任意の型`In`が間接参照演算子（`operator*`）によって値を読み取り（入力）可能であることを表すコンセプトである。

イテレータ型に限らず、ポインタ型、スマートポインタ型などがこのコンセプトのモデルとなることができる。

## 要件

まず、説明専用コンセプト`indirectly-readable-impl`を以下のように定義する。

```cpp
template<class In>
concept indirectly-readable-impl =
  requires(const In in) {
    typename iter_value_t<In>;
    typename iter_reference_t<In>;
    typename iter_rvalue_reference_t<In>;
    { *in } -> same_as<iter_reference_t<In>>;
    { ranges::iter_move(in) } -> same_as<iter_rvalue_reference_t<In>>;
  } &&
  common_reference_with<iter_reference_t<In>&&, iter_value_t<In>&> &&
  common_reference_with<iter_reference_t<In>&&, iter_rvalue_reference_t<In>&&> &&
  common_reference_with<iter_rvalue_reference_t<In>&&, const iter_value_t<In>&>;
```
* iter_reference_t[link /reference/iterator/iter_reference_t.md]
* iter_move[link /reference/iterator/iter_move.md]

`indirectly_readable`は以下のように定義される。

```cpp
template<class In>
concept indirectly_readable =
  indirectly-readable-impl<remove_cvref_t<In>>;
```

## モデル

型`I`のオブジェクト`i`について、`*i`が[等しさを保持](/reference/concepts.md)する場合に限って型`I`は`indirectly_readable`のモデルである。

## 例
```cpp example
#include <iostream>
#include <concepts>
#include <memory>
#include <vector>
#include <optional>
#include <iterator>

template<typename T>
requires std::indirectly_readable<T>
void f(const char* name) {
  std::cout << name << " is indirectly readable" << std::endl;
}

template<typename T>
void f(const char* name) {
  std::cout << name << " is not indirectly readable" << std::endl;
}


int main() {
  f<int*>("int*");
  f<std::unique_ptr<int>>("std::unique_ptr<int>");
  f<std::vector<int>::iterator>("std::vector<int>::iterator");
  f<std::istream_iterator<double>>("std::istream_iterator<double>");
  
  std::cout << "\n";
  f<std::optional<int>>("std::optional<int>");
}
```
* std::indirectly_readable[color ff0000]

### 出力
```
int* is indirectly readable
std::unique_ptr<int> is indirectly readable
std::vector<int>::iterator is indirectly readable
std::istream_iterator<double> is indirectly readable

std::optional<int> is not indirectly readable
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
