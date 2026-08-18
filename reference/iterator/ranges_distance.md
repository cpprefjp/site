# distance
* iterator[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template<class I, sentinel_for<I> S>
    requires (!sized_sentinel_for<S, I>)
  constexpr iter_difference_t<I> distance(I first, S last);              // (1) C++20

  template<class I, sized_sentinel_for<decay_t<I>> S>
  constexpr iter_difference_t<decay_t<I>> distance(I&& first, S last);   // (2) C++20

  template<range R>
  constexpr range_difference_t<R> distance(R&& r);                       // (3) C++20
}
```
* sentinel_for[link sentinel_for.md]
* sized_sentinel_for[link sized_sentinel_for.md]
* decay_t[link /reference/type_traits/decay.md]

## 概要

イテレータ間あるいは範囲の距離を求める。

## 引数

- `first` -- 距離を求めたい範囲の開始イテレータ
- `last` -- 距離を求めたい範囲の終端イテレータ（あるいは番兵）
- `r` -- 範囲を示す*range*オブジェクト

## 事前条件

- (1) : `[first, last)`は有効なイテレータ範囲である

## 効果

- (1) : `first`から`last`に到達するのに必要なインクリメントの回数を返す。
- (2) : 以下と等価： `return last - static_cast<const decay_t<I>&>(first);`
- (3) : 次のいずれかによって、範囲の長さを求める。
    - `R`が[`sized_range`](/reference/ranges/sized_range.md)`<R>`のモデルとなる : `return static_cast<`[`range_difference_t`](/reference/ranges/range_difference_t.md)`<R>>(`[`ranges::size`](/reference/ranges/size.md)`(r));`
    - それ以外の場合 : `return ranges::distance(`[`ranges::begin`](/reference/ranges/begin.md)`(r),` [`ranges::end`](/reference/ranges/end.md)`(r))` （(1)または(2)に委譲）

## 戻り値

- (1), (2) : `first`から`last`までの距離
- (3) : `r`の範囲の長さ（先頭から終端までの距離）

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
  
  // (1), (2) イテレータ間距離を求める
  std::cout << std::ranges::distance(it, std::end(vec)) << std::endl;
  std::cout << std::ranges::distance(it, std::next(it, 5)) << std::endl;
  std::cout << std::ranges::distance(std::next(it, 5), it) << std::endl;

  // (3) rangeの長さを求める
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
    - C++20で`std::ranges::distance`が追加された
- [LWG Issue 3392. `ranges::distance()` cannot be used on an array of unknown bound](https://cplusplus.github.io/LWG/issue3392)
    - イテレータ版のオーバーロードを、`sized_sentinel_for`を満たさない版(1)と満たす版(2)に分割した。この仕様はC++20から導入されたが、仕様の欠陥を修正したものであるためコンパイラは早期に対応している場合がある
- [LWG Issue 3664. LWG 3392 broke `std::ranges::distance(a, a+3)`](https://cplusplus.github.io/LWG/issue3664)
    - LWG 3392の分割によって配列を渡す`distance(a, a+3)`が使えなくなっていた問題を修正するため、テンプレートパラメータ制約を`input_or_output_iterator`から`class`へ緩め、sized版(2)の番兵と差分型・`first`引数を`decay_t<I>`で扱うようにした。この仕様はC++20から導入されたが、仕様の欠陥を修正したものであるためコンパイラは早期に対応している場合がある
