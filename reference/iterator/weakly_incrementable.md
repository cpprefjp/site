# weakly_incrementable
* iterator[meta header]
* std[meta namespace]
* concept[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class I>
  concept weakly_incrementable =
    movable<I> &&
    requires(I i) {
      typename iter_difference_t<I>;
      requires is-signed-integer-like<iter_difference_t<I>>;
      { ++i } -> same_as<I&>;   // 等しさを保持することを要求しない
      i++;                      // 等しさを保持することを要求しない
    };
}
```
* movable[link /reference/concepts/movable.md]
* iter_difference_t[link /reference/iterator/iter_difference_t.md]
* is-signed-integer-like[link /reference/iterator/is_integer_like.md]

## 概要

`weakly_incrementable`は、イテレータ型`I`が前置/後置インクリメント演算子（`operator++`）によってインクリメント可能であることを表すコンセプトである。

そのようなインクリメント操作には[等しさを保持](/reference/concepts.md)することは要求されず、型`I`は等値比較可能（[`equality_comparable`](/reference/concepts/equality_comparable.md)）である必要もない。

## モデル

型`I`のオブジェクト`i`について次の条件を満たす場合に限って、型`I`は`weakly_incrementable`のモデルである。

- `++i`と`i++`は同じ[定義域](/reference/concepts.md)を持つ
- `i`がインクリメント可能ならば、`++i`と`i++`は`i`を次の要素へ進める
- `i`がインクリメント可能ならば、`addressof(++i)`と`addressof(i)`は等値となる

「`i`がインクリメント可能」というのは、`i`が前置/後置両方のインクリメント式（`++`）の[定義域](/reference/concepts.md)にある場合を言う。すなわち、一般的なイテレータ範囲の`end`などインクリメントが出来ない、あるいは未定義動作を引き起こすような状態に`i`が無い場合を指定している。

## 備考

このコンセプトはイテレータにマルチパス保証を要求しない。例えばイテレータ`a, b`がある時、`a == b`であっても`++a == ++b`となるとは限らない。すなわち、`weakly_incrementable`なイテレータはその操作によってイテレータが参照しているシーケンスの状態が変更されることを許可する。そのようなイテレータには例えば[`istream_iterator`](/reference/iterator/istream_iterator.md)がある。

## 例
```cpp example
#include <iostream>
#include <concepts>
#include <iterator>
#include <memory>
#include <vector>

template<std::weakly_incrementable I>
void f(const char* name) {
  std::cout << name << " is weakly incrementable" << std::endl;
}

template<typename I>
void f(const char* name) {
  std::cout << name << " is not weakly incrementable" << std::endl;
}


struct sample_weak_incrementable {
  friend auto operator++(sample_weak_incrementable&) -> sample_weak_incrementable&;
  friend auto operator++(sample_weak_incrementable&, int) -> sample_weak_incrementable&;  

  // これも必要
  using difference_type = int;
};

struct sample_not_weak_incrementable {
  // 前置++しか用意しない
  friend auto operator++(sample_weak_incrementable&) -> sample_weak_incrementable&;

  using difference_type = int;
};


int main() {
  f<int*>("int*");
  f<const int*>("const int*");
  f<std::vector<int>::iterator>("std::vector<int>::iterator");
  f<std::ostream_iterator<double>>("std::ostream_iterator<double>");
  f<sample_weak_incrementable>("sample_weak_incrementable");

  std::cout << "\n";
  f<int* const>("int* const");
  f<std::unique_ptr<int>>("std::unique_ptr<int>");
  f<sample_not_weak_incrementable>("sample_not_weak_incrementable");
}
```
* std::weakly_incrementable[color ff0000]

### 出力
```
int* is weakly incrementable
const int* is weakly incrementable
std::vector<int>::iterator is weakly incrementable
std::ostream_iterator<double> is weakly incrementable
sample_incrementable is weakly incrementable

int* const is not weakly incrementable
std::unique_ptr<int> is not weakly incrementable
sample_not_incrementable is not weakly incrementable
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
- [P1522R1 Iterator Difference Type and Integer Overflow](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1522r1.pdf)
- [P1207R4 Movability of single-pass iterators](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1207r4.pdf)
- [P2325R3 Views should not be required to be default constructible](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2325r3.html)
