# move_backward
* algorithm[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template <bidirectional_iterator I1,
            sentinel_for<I1> S1,
            bidirectional_iterator I2>
    requires indirectly_movable<I1, I2>
  constexpr move_backward_result<I1, I2>
    move_backward(I1 first,
                  S1 last,
                  I2 result); // (1) C++20

  template <bidirectional_range R,
            bidirectional_iterator I>
    requires indirectly_movable<iterator_t<R>, I>
  constexpr move_backward_result<borrowed_iterator_t<R>, I>
    move_backward(R&& r,
                  I result); // (2) C++20
}
```
* move_backward_result[link ranges_in_out_result.md]
* bidirectional_iterator[link /reference/iterator/bidirectional_iterator.md]
* sentinel_for[link /reference/iterator/sentinel_for.md]
* indirectly_movable[link /reference/iterator/indirectly_movable.md]
* bidirectional_range[link /reference/ranges/bidirectional_range.md]
* iterator_t[link /reference/ranges/iterator_t.md]
* borrowed_iterator_t[link /reference/ranges/borrowed_iterator_t.md]

## 概要
指定された範囲の要素を後ろからムーブする。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する

## 事前条件
`result` は `(first,last]` の範囲に含まれてはならない。


## 効果
`[first,last)` 内にある要素を、それぞれ `[result - (last-first),result)` へムーブする。

ムーブは `last - 1` から順番に行い、1 以上 `last - first` 以下であるそれぞれの `n` について、`*(result - n) = std::move(*(last - n))` を行う。


## 戻り値
```cpp
move_backward_result {
  .in  = last,
  .out = result - (last - first),
}
```
* move_backward_result[link ranges_in_out_result.md]

## 計算量
正確に `last - first` 回ムーブ代入が行われる。


## 備考
`last` が `[result - (last-first),result)` の範囲内にあるときには、[`move()`](move.md) の代わりに `move_backward()` を使うべきである。


## 例
```cpp example
#include <algorithm>
#include <iostream>
#include <vector>
#include <memory>
#include <ranges>

void print(const std::unique_ptr<int>& v) {
  if (v) std::cout << *v       << std::endl;
  else   std::cout << "(null)" << std::endl;
}

int main() {
  std::vector<std::unique_ptr<int>> v;

  for (int i = 0; i < 5; i++) {
    v.emplace_back(new int(i));
  }

  // 0,1,2 の値がある範囲を、2,3,4 の値がある範囲へムーブする
  std::ranges::move_backward(v | std::views::take(3), v.end());

  // 以下のコードだと期待した結果にならないことを確認しよう。
  // 移動元の後方と移動先の前方で範囲が重なっている場合は、move_backwardを使わないといけない
  // std::ranges::move(v | std::views::take(3), v.begin() + 2);

  std::ranges::for_each(v, &print);
}
```
* std::ranges::move_backward[color ff0000]
* v.emplace_back[link /reference/vector/vector/emplace_back.md]
* std::ranges::move[link ranges_move.md]
* std::views::take[link /reference/ranges/take_view.md]

### 出力
```
(null)
(null)
0
1
2
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
