# remove_copy_if
* algorithm[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template <input_iterator I,
            sentinel_for<I> S,
            weakly_incrementable O,
            class Proj = identity,
            indirect_unary_predicate<projected<I, Proj>> Pred>
    requires indirectly_copyable<I, O>
  constexpr remove_copy_if_result<I, O>
    remove_copy_if(I first,
                   S last,
                   O result,
                   Pred pred,
                   Proj proj = {}); // (1) C++20

  template <input_range R,
            weakly_incrementable O,
            class Proj = identity,
            indirect_unary_predicate<projected<iterator_t<R>, Proj>> Pred>
    requires indirectly_copyable<iterator_t<R>, O>
  constexpr remove_copy_if_result<borrowed_iterator_t<R>, O>
    remove_copy_if(R&& r,
                   O result,
                   Pred pred,
                   Proj proj = {}); // (2) C++20

  template <execution-policy Ep,
            random_access_iterator I,
            sized_sentinel_for<I> S,
            random_access_iterator O,
            sized_sentinel_for<O> OutS,
            class Proj = identity,
            indirect_unary_predicate<projected<I, Proj>> Pred>
    requires indirectly_copyable<I, O>
  remove_copy_if_result<I, O>
    remove_copy_if(Ep&& exec,
                   I first,
                   S last,
                   O result,
                   OutS result_last,
                   Pred pred,
                   Proj proj = {}); // (3) C++26

  template <execution-policy Ep,
            sized-random-access-range R,
            sized-random-access-range OutR,
            class Proj = identity,
            indirect_unary_predicate<projected<iterator_t<R>, Proj>> Pred>
    requires indirectly_copyable<iterator_t<R>, iterator_t<OutR>>
  remove_copy_if_result<borrowed_iterator_t<R>, borrowed_iterator_t<OutR>>
    remove_copy_if(Ep&& exec,
                   R&& r,
                   OutR&& result_r,
                   Pred pred,
                   Proj proj = {}); // (4) C++26
}
```
* weakly_incrementable[link /reference/iterator/weakly_incrementable.md]
* indirectly_copyable[link /reference/iterator/indirectly_copyable.md]
* remove_copy_if_result[link ranges_in_out_result.md]
* borrowed_iterator_t[link /reference/ranges/borrowed_iterator_t.md]
* execution-policy[link /reference/execution/execution-policy.md]
* random_access_iterator[link /reference/iterator/random_access_iterator.md]
* sized_sentinel_for[link /reference/iterator/sized_sentinel_for.md]
* sized-random-access-range[link /reference/ranges/sized-random-access-range.md]

## 概要
条件を満たす要素を除け、その結果を出力の範囲へコピーする。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する
- (3): (1)の並列アルゴリズム版。実行ポリシーを指定する
- (4): (2)の並列アルゴリズム版。実行ポリシーを指定する

## 事前条件
- `[first,last)` と `[result,result + (last - first))` は重なってはならない。


## 効果
`[first,last)` 内にあるイテレータ `i` について、`pred(*i) != false` でない要素を `result` へコピーする


## 戻り値
`{ .in = last, .out = result + (last - first) }`


## 計算量
正確に `last - first` 回の述語の適用を行う


## 備考
安定


## 例
### 基本的な使い方
```cpp example
#include <algorithm>
#include <iostream>
#include <vector>
#include <iterator>

int main() {
  std::vector<int> v = { 2,3,1,2,1 };

  // 奇数を除去した結果を出力する
  std::ranges::remove_copy_if(v, std::ostream_iterator<int>(std::cout, ","), [](int x) { return x%2 != 0; });
}
```
* std::ranges::remove_copy_if[color ff0000]

### 出力
```
2,2,
```


### 並列アルゴリズムの例 (C++26)
```cpp example
#include <algorithm>
#include <iostream>
#include <vector>
#include <execution>

int main() {
  std::vector<int> src = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
  std::vector<int> dst(src.size());

  // 並列に奇数を除去してコピーする
  auto result = std::ranges::remove_copy_if(std::execution::par, src, dst,
                                            [](int x) { return x % 2 != 0; });

  for (auto it = dst.begin(); it != result.out; ++it) {
    std::cout << *it << ' ';
  }
  std::cout << std::endl;
}
```
* std::ranges::remove_copy_if[color ff0000]

#### 出力
```
2 4 6 8 10
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
