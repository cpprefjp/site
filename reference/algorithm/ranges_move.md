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
         O result);           // (1) C++20

  template <input_range R,
            weakly_incrementable O>
    requires indirectly_movable<iterator_t<R>, O>
  constexpr move_result<borrowed_iterator_t<R>, O>
    move(R&& r,
         O result);           // (2) C++20

  template <execution-policy Ep,
            random_access_iterator I,
            sized_sentinel_for<I> S,
            random_access_iterator O,
            sized_sentinel_for<O> OutS>
    requires indirectly_movable<I, O>
  move_result<I, O>
    move(Ep&& exec,
         I first,
         S last,
         O result,
         OutS result_last);   // (3) C++26

  template <execution-policy Ep,
            sized-random-access-range R,
            sized-random-access-range OutR>
    requires indirectly_movable<iterator_t<R>, iterator_t<OutR>>
  move_result<borrowed_iterator_t<R>, borrowed_iterator_t<OutR>>
    move(Ep&& exec,
         R&& r,
         OutR&& result_r);    // (4) C++26
}
```
* move_result[link ranges_in_out_result.md]
* weakly_incrementable[link /reference/iterator/weakly_incrementable.md]
* indirectly_movable[link /reference/iterator/indirectly_movable.md]
* borrowed_iterator_t[link /reference/ranges/borrowed_iterator_t.md]
* execution-policy[link /reference/execution/execution-policy.md]
* random_access_iterator[link /reference/iterator/random_access_iterator.md]
* sized_sentinel_for[link /reference/iterator/sized_sentinel_for.md]
* sized-random-access-range[link /reference/ranges/sized-random-access-range.md]

## 概要
指定された範囲の要素をムーブする。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する
- (3): (1)の並列アルゴリズム版。実行ポリシーを指定し、出力範囲の終端も指定する
- (4): (2)の並列アルゴリズム版。実行ポリシーを指定する


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
### 基本的な使い方
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

### 並列アルゴリズムの例 (C++26)
```cpp example
#include <algorithm>
#include <iostream>
#include <vector>
#include <string>
#include <execution>

int main() {
  std::vector<std::string> src = {"hello", "world", "foo", "bar", "baz"};
  std::vector<std::string> dst(src.size());

  // 並列にムーブする
  std::ranges::move(std::execution::par, src, dst);

  for (const auto& s : dst) {
    std::cout << s << ' ';
  }
  std::cout << std::endl;
}
```
* std::ranges::move[color ff0000]

#### 出力
```
hello world foo bar baz
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
