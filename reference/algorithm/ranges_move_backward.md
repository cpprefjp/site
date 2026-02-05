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
                  I2 result);           // (1) C++20

  template <bidirectional_range R,
            bidirectional_iterator I>
    requires indirectly_movable<iterator_t<R>, I>
  constexpr move_backward_result<borrowed_iterator_t<R>, I>
    move_backward(R&& r,
                  I result);            // (2) C++20

  template <execution-policy Ep,
            random_access_iterator I1,
            sized_sentinel_for<I1> S1,
            random_access_iterator I2>
    requires indirectly_movable<I1, I2>
  move_backward_result<I1, I2>
    move_backward(Ep&& exec,
                  I1 first,
                  S1 last,
                  I2 result);           // (3) C++26

  template <execution-policy Ep,
            sized-random-access-range R,
            random_access_iterator I>
    requires indirectly_movable<iterator_t<R>, I>
  move_backward_result<borrowed_iterator_t<R>, I>
    move_backward(Ep&& exec,
                  R&& r,
                  I result);            // (4) C++26
}
```
* move_backward_result[link ranges_in_out_result.md]
* indirectly_movable[link /reference/iterator/indirectly_movable.md]
* borrowed_iterator_t[link /reference/ranges/borrowed_iterator_t.md]
* execution-policy[link /reference/execution/execution-policy.md]
* random_access_iterator[link /reference/iterator/random_access_iterator.md]
* sized_sentinel_for[link /reference/iterator/sized_sentinel_for.md]
* sized-random-access-range[link /reference/ranges/sized-random-access-range.md]

## 概要
指定された範囲の要素を後ろからムーブする。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する
- (3): (1)の並列アルゴリズム版。実行ポリシーを指定する
- (4): (2)の並列アルゴリズム版。実行ポリシーを指定する

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
### 基本的な使い方
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

### 並列アルゴリズムの例 (C++26)
```cpp example
#include <algorithm>
#include <execution>
#include <iostream>
#include <vector>

int main() {
  std::vector<int> v = {1, 2, 3, 0, 0};

  // 並列に先頭3要素を後方へムーブ
  std::ranges::move_backward(std::execution::par,
                             v.begin(), v.begin() + 3, v.end());

  for (int x : v) {
    std::cout << x << ' ';
  }
  std::cout << std::endl;
}
```
* std::ranges::move_backward[color ff0000]

#### 出力
```
1 2 1 2 3
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
- [P3179R9 C++ parallel range algorithms](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3179r9.html)
