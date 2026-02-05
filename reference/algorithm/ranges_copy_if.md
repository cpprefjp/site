# copy_if
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
  constexpr copy_if_result<I, O>
    copy_if(I first, S last, O result, Pred pred, Proj proj = {}); // (1) C++20

  template <input_range R,
            weakly_incrementable O,
            class Proj = identity,
            indirect_unary_predicate<projected<iterator_t<R>, Proj>> Pred>
    requires indirectly_copyable<iterator_t<R>, O>
  constexpr copy_if_result<borrowed_iterator_t<R>, O>
    copy_if(R&& r, O result, Pred pred, Proj proj = {});           // (2) C++20

  template <execution-policy Ep,
            random_access_iterator I,
            sized_sentinel_for<I> S,
            random_access_iterator O,
            sized_sentinel_for<O> OutS,
            class Proj = identity,
            indirect_unary_predicate<projected<I, Proj>> Pred>
    requires indirectly_copyable<I, O>
  copy_if_result<I, O>
    copy_if(Ep&& exec,
            I first,
            S last,
            O result,
            OutS result_last,
            Pred pred,
            Proj proj = {});                                       // (3) C++26

  template <execution-policy Ep,
            sized-random-access-range R,
            sized-random-access-range OutR,
            class Proj = identity,
            indirect_unary_predicate<projected<iterator_t<R>, Proj>> Pred>
    requires indirectly_copyable<iterator_t<R>, iterator_t<OutR>>
  copy_if_result<borrowed_iterator_t<R>, borrowed_iterator_t<OutR>>
    copy_if(Ep&& exec,
            R&& r,
            OutR&& result_r,
            Pred pred,
            Proj proj = {});                                       // (4) C++26
}
```
* copy_if_result[link ranges_in_out_result.md]
* weakly_incrementable[link /reference/iterator/weakly_incrementable.md]
* indirectly_copyable[link /reference/iterator/indirectly_copyable.md]
* borrowed_iterator_t[link /reference/ranges/borrowed_iterator_t.md]
* execution-policy[link /reference/execution/execution-policy.md]
* random_access_iterator[link /reference/iterator/random_access_iterator.md]
* sized_sentinel_for[link /reference/iterator/sized_sentinel_for.md]
* sized-random-access-range[link /reference/ranges/sized-random-access-range.md]

## 概要
条件を満たす要素のみをコピーする。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する
- (3): (1)の並列アルゴリズム版。実行ポリシーを指定し、出力範囲の終端も指定する
- (4): (2)の並列アルゴリズム版。実行ポリシーを指定する


## 事前条件
`[first,last)` の範囲と、`[result,result + (last - first))` の範囲は重なっていてはならない。

## 効果
`[first,last)` 内のイテレータ `i` について `pred(*i)` が `true` である要素を `result` へ順番にコピーする。

## 戻り値
```cpp
copy_if_result {
  .in  = last,
  .out = result + (last - first),
}
```
* copy_if_result[link ranges_in_out_result.md]

## 計算量
正確に `last - first` 回述語を適用する。


## 備考
このコピーは安定なコピーである。つまり、コピーによって要素の前後が入れ替わることは無い。


## 例
### 基本的な使い方
```cpp example
#include <algorithm>
#include <iostream>
#include <vector>
#include <iterator>

bool isOdd(int x) { return x % 2 != 0; }

int main() {
  std::vector<int> v1 = { 3, 1, 4 };
  std::vector<int> v2 = { 1, 5, 9 };
  std::vector<int> v3 = { 2, 6, 5 };
  std::vector<int> result(v1.size() + v2.size() + v3.size());

  // copy_if の戻り値を使って、複数のコンテナにある奇数を全て繋げる
  auto out = result.begin();
  out = std::ranges::copy_if(v1, out, isOdd).out;
  out = std::ranges::copy_if(v2, out, isOdd).out;
  out = std::ranges::copy_if(v3, out, isOdd).out;

  std::ranges::copy(result.begin(), out, std::ostream_iterator<int>(std::cout, ","));
}
```
* std::ranges::copy_if[color ff0000]
* result.begin()[link /reference/vector/vector/begin.md]

### 出力
```
3,1,1,5,9,5,
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

  // 並列に偶数のみをコピーする
  auto result = std::ranges::copy_if(std::execution::par, src, dst,
                                     [](int x) { return x % 2 == 0; });

  for (auto it = dst.begin(); it != result.out; ++it) {
    std::cout << *it << ' ';
  }
  std::cout << std::endl;
}
```
* std::ranges::copy_if[color ff0000]

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
