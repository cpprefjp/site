# sized_range
* ranges[meta header]
* concept[meta id-type]
* std::ranges[meta namespace]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template<class T>
  concept sized_range = range<T> && requires(T& t) { ranges::size(t); };
}
```

## 概要
`sized_range`は、大きさを償却定数時間で求めることができるRangeを表すコンセプトである。

`sized_range`なRangeからは[`ranges::size`](size.md)で大きさを取得できる。

`sized_range`ではないRangeとしては、[`iota_view`](iota_view.md)のように無限長のもの、
[`forward_list`](/reference/forward_list/forward_list.md)のように大きさは決まっているが償却定数時間で求められないもの、
[`basic_istream_view`](basic_istream_view.md)のように事前に求められないものなどがある。

## モデル
型が[`remove_reference_t`](/reference/type_traits/remove_reference.md)`<T>`であるようなlvalue`t`があるとする。`T`が`sized_range`のモデルとなるのは、以下の条件をすべて満たす場合である。

1. [`ranges::size`](size.md)`(t)`が償却定数時間で実行でき、[`ranges::distance`](/reference/iterator/ranges_distance.md)`(t)`と等しく、`t`を変更しない。
2. もし[`iterator_t`](iterator_t.md)`<T>`が[`forward_iterator`](/reference/iterator/forward_iterator.md)のモデルであれば、[`ranges::size`](size.md)`(t)`は[`ranges::begin`](begin.md)`(t)`の評価によらず一意に定まる。

構文要件では、`ranges::size(t)`という呼び出しが可能であることしか要求されない。これは例えば`T`のメンバ関数`size()`が整数を返せば満たしてしまうが、その計算量が償却定数でない場合は`sized_range`のモデルとはならないので、[`disable_sized_range`](disable_sized_range.md)を`true`に特殊化して[`ranges::size`](size.md)`(t)`を無効化する必要がある。

2番目の要件は、イテレータが[`input_iterator`](/reference/iterator/input_iterator.md)または[`output_iterator`](/reference/iterator/output_iterator.md)であるときは、[`ranges::begin`](begin.md)を呼び出すまでは大きさが定まらない、といった依存関係が許可されることを意味している。

## 例
```cpp example
#include <ranges>
#include <list>
#include <forward_list>
#include <vector>

int main()
{
  // vectorはsized_range
  static_assert(std::ranges::sized_range<std::vector<int>>);

  // listもsized_range
  static_assert(std::ranges::sized_range<std::list<int>>);

  // forward_listはsized_rangeではない
  static_assert(!std::ranges::sized_range<std::forward_list<int>>);
}
```
* std::ranges::sized_range[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]

## 参照
- [N4861 24 Ranges library](https://timsong-cpp.github.io/cppwp/n4861/ranges)
- [C++20 ranges](https://techbookfest.org/product/5134506308665344)
