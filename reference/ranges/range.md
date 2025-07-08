# range
* ranges[meta header]
* concept[meta id-type]
* std::ranges[meta namespace]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template<class T>
  concept range = requires(T& t) {
    ranges::begin(t);
    ranges::end(t);
  };
}
```

## 概要
要素の範囲を表すイテレータと番兵を取得でき、それらによって要素をイテレートできる型を表す、Rangeの最も基本的なコンセプト。

## モデル
`decltype((t))`が`T&`であるような式`t`があるとする。`T`が`range`のモデルとなるのは、以下の条件をすべて満たす場合である。

1. \[[`ranges::begin`](begin.md)`(t)`, [`ranges::end`](end.md)`(t)`) が範囲を表す。
2. [`ranges::begin`](begin.md)`(t)`と[`ranges::end`](end.md)`(t)`は共に償却定数時間で値を返し、Rangeを変更しない。
3. [`ranges::begin`](begin.md)`(t)`の型が[`forward_iterator`](/reference/iterator/forward_iterator.md)のモデルであるならば、[`ranges::begin`](begin.md)`(t)`は等しさを保持する。

式が等しさを保持する（equality‑preserving）とは、同じ入力に対しては常に同じ結果となることをいう。

イテレータ`i`に前置インクリメントを有限回適用したとき、番兵`s`と等しくなるならば、`s`は`i`から到達可能であるという。また、そのとき、`[i, s)`は範囲を表す。

1番目の要件では、同じRangeオブジェクトから取得したイテレータと番兵は、同じRangeのイテレータと番兵であることが要求される。特に、有限長のRangeであれば、番兵はイテレータから到達可能でなければならない。
2番目の要件では、要件が償却定数時間であることにより、イテレータを取得するタイミングで初めて要素を生成するような実装が許可される。

## 備考
[`forward_iterator`](/reference/iterator/forward_iterator.md)なRangeに対して[`ranges::begin`](begin.md)と[`ranges::end`](end.md)の両方が等しさを保持するならば、そのRangeを何度もアルゴリズム関数に渡したり、イテレータを繰り返し取得して使ったりしてもよい。

イテレータが[`forward_iterator`](/reference/iterator/forward_iterator.md)のモデルではない場合は、[`ranges::begin`](begin.md)でイテレータを繰り返し取得したときに同じオブジェクトが返る保証はなく、結果が一意に定まるともいえない。そのような場合、[`ranges::begin`](begin.md)の呼び出しはRange1つあたり1回に留めなければならない。

## 例
```cpp example
#include <ranges>
#include <vector>

int main()
{
  static_assert(std::ranges::range<std::vector<int>>);
  static_assert(std::ranges::range<int[3]>);
  static_assert(!std::ranges::range<double>);
  static_assert(!std::ranges::range<const char*>);
  static_assert(!std::ranges::range<int[]>);
}
```
* std::ranges::range[color ff0000]

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
