# output_iterator
* iterator[meta header]
* std[meta namespace]
* concept[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class I, class T>
  concept output_iterator =
    input_or_output_iterator<I> &&
    indirectly_writable<I, T> &&
    requires(I i, T&& t) {
      *i++ = std::forward<T>(t);  // 等しさを保持することを要求しない
    };
}
```
* input_or_output_iterator[link /reference/iterator/input_or_output_iterator.md]
* indirectly_writable[link /reference/iterator/indirectly_writable.md]

## 概要

`output_iterator`は、イテレータ型`I`が出力イテレータであることを表すコンセプトである。

`output_iterator`となるイテレータは、`operator*`による書き込みと前置/後置インクリメントによる進行が可能であるが、等値比較は必ずしも可能ではない。

## モデル

`decltype((E))`が型`T`を示す式`E`、間接参照可能な型`I`のオブジェクト`i`について次の条件を満たす場合に限って、型`I, T`は`output_iterator`のモデルである。

- `*i++ = E;`は次の式と等価となる
  ```cpp
  *i = E;
  ++i;
  ```

出力イテレータを用いるアルゴリズムは、同じイテレータ範囲を2回以上イテレートしてはならない。そのようなアルゴリズムはシングルパス（一回だけ走査する）でなければならない。

## 例
```cpp example
#include <iostream>
#include <concepts>
#include <iterator>
#include <memory>
#include <vector>

template<std::output_iterator<int> I>
void f(const char* name) {
  std::cout << name << " is output_iterator<int>" << std::endl;
}

template<typename I>
void f(const char* name) {
  std::cout << name << " is not output_iterator<int>" << std::endl;
}


struct sample_output_iterator {
  friend auto operator++(sample_output_iterator&) -> sample_output_iterator&;
  friend auto operator++(sample_output_iterator&, int) -> sample_output_iterator;

  friend auto operator*(const sample_output_iterator&) -> int&;

  using difference_type = int;
};


int main() {
  f<int*>("int*");
  f<std::vector<int>::iterator>("std::vector<int>::iterator");
  f<std::ostream_iterator<int>>("std::ostream_iterator<int>");
  f<sample_output_iterator>("sample_output_iterator");
  
  std::cout << "\n";
  f<const int*>("const int*");
  f<std::istream_iterator<int>>("std::istream_iterator<int>");
  f<int* const>("int* const");
}
```
* std::output_iterator[color ff0000]

### 出力
```
int* is output_iterator<int>
std::vector<int>::iterator is output_iterator<int>
std::ostream_iterator<int> is output_iterator<int>
sample_output_iterator is output_iterator<int>

const int* is not output_iterator<int>
std::istream_iterator<int> is not output_iterator<int>
int* const is not output_iterator<int>
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
