# sentinel_for
* iterator[meta header]
* std[meta namespace]
* concept[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class S, class I>
  concept sentinel_for =
    semiregular<S> &&
    input_or_output_iterator<I> &&
    weakly-equality-comparable-with<S, I>;
}
```
* semiregular[link /reference/concepts/semiregular.md]
* input_or_output_iterator[link /reference/iterator/input_or_output_iterator.md]
* weakly-equality-comparable-with[link /reference/concepts/equality_comparable.md]

## 概要

`sentinel_for`は、任意の[`semiregular`](/reference/concepts/semiregular.md)な型`S`がイテレータ型`I`の番兵（*sentinel*）型である事を表すコンセプトである。

番兵型とは、イテレータ範囲`[begin, end)`においての`end`を表す型の事である。これは通常`begin`の型と同じになるが、等値比較可能でありさえすれば別の型であっても構わない。

## モデル

型`I, S`の値`i, s`とそれによって示される範囲`[i, s)`について次の条件を満たす場合に限って、型`I, S`は`sentinel_for`のモデルである。

- `i == s`が適格である（未定義動作にならない）
- `bool(i != s) == true`の（`i`が範囲終端に到達していない）時、`i`は間接参照可能であり`[++i, s)`も範囲を示す
- `I&, S`が[`assignable_from`](/reference/concepts/assignable_from.md)`<I&, S>`のモデルとならないなら、構文的にも`assignable_from`コンセプトを満たさない

ここでの`==`の[定義域](/reference/concepts.md)は静的ではなく、実行時に変化しうる。`[i, s)`が範囲を示している時に`i == oi`となるような別のイテレータ`oi`をインクリメント（`++oi`）した後で、範囲`[i, s)`が有効であり続ける必要はない。

## 例

```cpp example
#include <iostream>
#include <iterator>
#include <vector>

template<typename I, std::sentinel_for<I> S>
void f(const char* namei, const char* names) {
  std::cout << names << " is sentinel for " << namei << std::endl;
}

template<typename I, typename S>
void f(const char* namei, const char* names) {
  std::cout << names << " is not sentinel for " << namei << std::endl;
}


struct sample_sentinel{};

struct sample_input_or_output_iterator {
  friend auto operator++(sample_input_or_output_iterator&) -> sample_input_or_output_iterator&;
  friend auto operator++(sample_input_or_output_iterator&, int) -> sample_input_or_output_iterator;

  friend auto operator*(sample_input_or_output_iterator&) -> int;

  friend bool operator==(const sample_input_or_output_iterator&, sample_sentinel);

  using difference_type = int;
};


int main() {
  f<int*, int*>("int*", "int*");
  f<const int*, int*>("const int*", "int*");
  f<int*, const int*>("int*", "int* const");
  f<std::vector<int>::iterator, std::vector<int>::iterator>("std::vector<int>::iterator", "std::vector<int>::iterator");
  f<sample_input_or_output_iterator, sample_sentinel>("sample_input_or_output_iterator", "sample_sentinel");

  std::cout << "\n";
  f<std::vector<int>::iterator, int*>("std::vector<int>::iterator", "int*");
  f<double*, int*>("double*", "int*");
}
```
* std::sentinel_for[color ff0000]

### 出力
```
int* is sentinel for int*
int* is sentinel for const int*
int* const is sentinel for int*
std::vector<int>::iterator is sentinel for std::vector<int>::iterator
sample_sentinel is sentinel for sample_input_or_output_iterator

int* is not sentinel for std::vector<int>::iterator
int* is not sentinel for double*
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
- [LWG Issue 3453. Generic code cannot call `ranges::advance(i, s)`](https://cplusplus.github.io/LWG/issue3453)
