# distance
* iterator[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template<input_or_output_iterator I, sentinel_for<I> S>
  constexpr iter_difference_t<I> distance(I first, S last);   // (1)

  template<range R>
  constexpr range_difference_t<R> distance(R&& r);            // (2)
}
```
* input_or_output_iterator[link /reference/iterator/input_or_output_iterator.md]

## 概要

イテレータ間あるいは範囲の距離を求める。

## 引数

- `first` -- 距離を求めたい範囲の開始イテレータ
- `last` -- 距離を求めたい範囲の終端イテレータ（あるいは番兵）
- `r` -- 範囲を示す*range*オブジェクト

## 事前条件

- (1) : 次のいずれか
    - `[first, last)`は有効なイテレータ範囲である
    - `[last, first)`は有効なイテレータ範囲であり、`S, I`は[`same_as`](/reference/concepts/same_as.md)`<S, I>`および[`sized_sentinel_for`](sized_sentinel_for.md)`<S, I>`のモデルとなる

## 効果

- (1) : 次のいずれかによって、`first`から`last`までの距離を求める。
    - `S, I`が[`sized_sentinel_for`](sized_sentinel_for.md)`<S, I>`のモデルとなる : `return (last - first)`
    - それ以外の場合 : `first`から`last`に到達するのに必要なインクリメントの回数を返す。
- (2) : 次のいずれかによって、範囲の長さを求める。
    - `R`が[`sized_range`](/reference/ranges/sized_range.md)`<R>`のモデルとなる : `return static_cast<`[`range_difference_t`](/reference/ranges/range_difference_t.md)`<R>>(`[`ranges::size`](/reference/ranges/size.md)`(r));`
    - それ以外の場合 : `return ranges::distance(`[`ranges::begin`](/reference/ranges/begin.md)`(r), `[`ranges::end`](/reference/ranges/end.md)`(r))` （(1)に委譲）

## 戻り値

- (1) : `first`から`last`までの距離
- (2) : `r`の範囲の長さ（先頭から終端までの距離）

## 備考

この関数テンプレートは通常の名前探索で発見されている場合にADLを無効化する。詳しくは「[ADLを無効にする関数定義](/article/lib/disable_adl_function.md)」を参照のこと。

## 例
```cpp example
#include <iostream>
#include <iterator>
#include <vector>
#include <forward_list>

int main() {
  std::vector<int> vec = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
  std::forward_list<int> fl = {1, 2, 3, 4, 5, 6, 7};
  
  auto it = std::begin(vec);
  
  // (1) イテレータ間距離を求める
  std::cout << std::ranges::distance(it, std::end(vec)) << std::endl;
  std::cout << std::ranges::distance(it, std::next(it, 5)) << std::endl;
  std::cout << std::ranges::distance(std::next(it, 5), it) << std::endl;

  // (2) rangeの長さを求める
  std::cout << std::ranges::distance(vec) << std::endl;
  std::cout << std::ranges::distance(fl) << std::endl;
}
```
* std::ranges::distance[color ff0000]

### 出力
```
10
5
-5
10
7
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 10.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 5 [mark verified]

## 関連項目

- [`distance()`](distance.md)

## 参照

- [P0896R4 The One Ranges Proposal (was Merging the Ranges TS)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)
