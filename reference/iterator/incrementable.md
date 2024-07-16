# incrementable
* iterator[meta header]
* std[meta namespace]
* concept[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class I>
  concept incrementable =
    regular<I> &&
    weakly_incrementable<I> &&
    requires(I i) {
      { i++ } -> same_as<I>;
    };
}
```
* regular[link /reference/concepts/regular.md]
* weakly_incrementable[link /reference/iterator/weakly_incrementable.md]

## 概要

`incrementable`は、イテレータ型`I`が前置/後置インクリメント演算子（`operator++`）によってインクリメント可能であり、コピー/ムーブ構築/代入とデフォルト構築、等値比較が可能であることを表すコンセプトである。

## 要件

このコンセプトによって要求されるインクリメント操作は全て[等しさを保持](/reference/concepts.md)しなければならない。これは、[`weakly_incrementable`](/reference/iterator/weakly_incrementable.md)の注釈よりも優先される。

## モデル

型`I`のオブジェクト`a, b`について次の条件を満たす場合に限って、型`I`は`incrementable`のモデルである。

- `bool(a == b)`が`true`ならば、`bool(a++ == b)`
- `bool(a == b)`が`true`ならば、`bool(((void)a++, a) == ++b)`

`a == b`という要件は`++a == ++b`が等しいことを意味しており、これらの要件はイテレータにマルチパス保証を要求するものである。すなわち、あるイテレート範囲を複数のイテレータから同時に同じ順序で走査することができることを要求する。`incrementable`なイテレータはその操作によってイテレータが参照しているシーケンスの状態が変化してはならない。多くの一般的なイテレータがこの要件を満たしている。

## 例
```cpp example
#include <iostream>
#include <concepts>
#include <iterator>
#include <memory>
#include <vector>

template<std::incrementable I>
void f(const char* name) {
  std::cout << name << " is incrementable" << std::endl;
}

template<typename I>
void f(const char* name) {
  std::cout << name << " is not incrementable" << std::endl;
}


struct sample_incrementable {
  friend auto operator++(sample_incrementable&) -> sample_incrementable&;
  friend auto operator++(sample_incrementable&, int) -> sample_incrementable; // prvalueを返す必要がある

  friend bool operator==(const sample_incrementable&, const sample_incrementable&) = default;

  using difference_type = int;
};

struct sample_weak_incrementable {
  friend auto operator++(sample_weak_incrementable&) -> sample_weak_incrementable&;
  friend auto operator++(sample_weak_incrementable&, int) -> sample_weak_incrementable&;  

  using difference_type = int;
};


int main() {
  f<int*>("int*");
  f<const int*>("const int*");
  f<std::vector<int>::iterator>("std::vector<int>::iterator");
  f<sample_incrementable>("sample_incrementable");

  std::cout << "\n";
  f<int* const>("int* const");
  f<std::ostream_iterator<double>>("std::ostream_iterator<double>");
  f<sample_weak_incrementable>("sample_weak_incrementable");
}
```
* std::incrementable[color ff0000]

### 出力
```
int* is incrementable
const int* is incrementable
std::vector<int>::iterator is incrementable
sample_incrementable is incrementable

int* const is not incrementable
std::ostream_iterator<double> is not incrementable
sample_weak_incrementable is not incrementable
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

