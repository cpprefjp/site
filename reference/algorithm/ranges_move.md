# move
* algorithm[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template <input_iterator I,
            sentinel_for<I> S,
            weakly_incrementable O>
    requires indirectly_movable<I, O>
  constexpr move_result<I, O>
    move(I first,
         S last,
         O result); // (1) C++20

  template <input_range R,
            weakly_incrementable O>
    requires indirectly_movable<iterator_t<R>, O>
  constexpr move_result<borrowed_iterator_t<R>, O>
    move(R&& r,
         O result); // (2) C++20
}
```
* move_result[link ranges_in_out_result.md]
* input_iterator[link /reference/iterator/input_iterator.md]
* sentinel_for[link /reference/iterator/sentinel_for.md]
* weakly_incrementable[link /reference/iterator/weakly_incrementable.md]
* indirectly_movable[link /reference/iterator/indirectly_movable.md]
* input_range[link /reference/ranges/input_range.md]
* iterator_t[link /reference/ranges/iterator_t.md]
* borrowed_iterator_t[link /reference/ranges/borrowed_iterator_t.md]

## 概要
指定された範囲の要素をムーブする。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する


## 事前条件
`result` は `[first,last)` の範囲に含まれてはならない。


## 効果
`[first,last)` 内の要素を、それぞれ `[result,result + (last - first))` へムーブする。

ムーブは `first` から順番に行い、0 以上 `last - first` 未満であるそれぞれの `n` について、`*(result + n) = std::move(*(first + n))` を行う。


## 戻り値
```cpp
move_result {
  .in  = last,
  .out = result + (last - first),
}
```
* move_result[link ranges_in_out_result.md]

## 計算量
正確に `last - first` 回ムーブ代入が行われる。


## 例
```cpp example
#include <algorithm>
#include <iostream>
#include <iterator>
#include <vector>
#include <memory>

int main() {
  std::vector<std::unique_ptr<int>> v;
  for (int i = 0; i < 5; i++) {
    v.emplace_back(new int(i));
  }

  std::vector<std::unique_ptr<int>> v2;
  // v のそれぞれの要素を v2 へムーブする
  std::ranges::move(v, std::back_inserter(v2));

  for (const auto& v : v2) {
    std::cout << *v << std::endl;
  }
}
```
* std::ranges::move[color ff0000]
* v.emplace_back[link /reference/vector/vector/emplace_back.md]

### 出力
```
0
1
2
3
4
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]

## 参照
- [N4861 25 Algorithms library](https://timsong-cpp.github.io/cppwp/n4861/algorithms)
