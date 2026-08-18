# rotate_copy
* algorithm[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template <forward_iterator I,
            sentinel_for<I> S,
            weakly_incrementable O>
    requires indirectly_copyable<I, O>
  constexpr rotate_copy_result<I, O>
    rotate_copy(I first,
                I middle,
                S last,
                O result); // (1) C++20

  template <forward_range R,
            weakly_incrementable O>
    requires indirectly_copyable<iterator_t<R>, O>
  constexpr rotate_copy_result<borrowed_iterator_t<R>, O>
    rotate_copy(R&& r,
                iterator_t<R> middle,
                O result); // (2) C++20

  template <execution-policy Ep,
            random_access_iterator I,
            sized_sentinel_for<I> S,
            random_access_iterator O,
            sized_sentinel_for<O> OutS>
    requires indirectly_copyable<I, O>
  rotate_copy_truncated_result<I, O>
    rotate_copy(Ep&& exec,
                I first,
                I middle,
                S last,
                O result,
                OutS result_last); // (3) C++26

  template <execution-policy Ep,
            sized-random-access-range R,
            sized-random-access-range OutR>
    requires indirectly_copyable<iterator_t<R>, iterator_t<OutR>>
  rotate_copy_truncated_result<borrowed_iterator_t<R>, borrowed_iterator_t<OutR>>
    rotate_copy(Ep&& exec,
                R&& r,
                iterator_t<R> middle,
                OutR&& result_r); // (4) C++26
}
```
* weakly_incrementable[link /reference/iterator/weakly_incrementable.md]
* rotate_copy_result[link ranges_in_out_result.md]
* borrowed_iterator_t[link /reference/ranges/borrowed_iterator_t.md]
* execution-policy[link /reference/execution/execution-policy.md]
* random_access_iterator[link /reference/iterator/random_access_iterator.md]
* sized_sentinel_for[link /reference/iterator/sized_sentinel_for.md]
* sized-random-access-range[link /reference/ranges/sized-random-access-range.md]
* rotate_copy_truncated_result[link ranges_in_in_out_result.md]

## 概要
`middle`の要素が先頭、`middle-1`の要素が末尾となるように、`[first,last)`の要素の並びを回転させ、その結果を出力の範囲へコピーする。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する
- (3): (1)の並列アルゴリズム版。実行ポリシーを指定し、出力範囲の終端も指定する
- (4): (2)の並列アルゴリズム版。実行ポリシーを指定する


## 事前条件
`[first,last)` と `[result,result + (last - first))` の範囲は重なっていてはならない。


## 効果
- (1) : 0 以上 `last - first` 未満の整数 `i` について、`*(result + i) = *(first + (i + (middle - first)) % (last - first))` という操作によって `[first,last)` の範囲を `[result,result + (last - first))` の範囲へコピーする。
- (2) : 以下と等価：
    ```cpp
    return ranges::rotate_copy(ranges::begin(r), middle, ranges::end(r), std::move(result));
    ```
    * ranges::begin[link /reference/ranges/begin.md]
    * ranges::end[link /reference/ranges/end.md]
    * std::move[link /reference/utility/move.md]
- (3) : (1)と同じ効果を、指定された実行ポリシー`exec`に従って実行する。
- (4) : 以下と等価：
    ```cpp
    return ranges::rotate_copy(std::forward<Ep>(exec), ranges::begin(r), middle,
                               ranges::begin(r) + ranges::distance(r),
                               ranges::begin(result_r),
                               ranges::begin(result_r) + ranges::distance(result_r));
    ```
    * ranges::begin[link /reference/ranges/begin.md]
    * ranges::distance[link /reference/iterator/ranges_distance.md]
    * std::forward[link /reference/utility/forward.md]


## 戻り値
- (1), (2): `{ .in = last, .out = result + (last - first) }`
- (3), (4): 出力範囲が入力範囲より短い場合、出力範囲の末尾まで書き込み、`in1`と`in2`で入力範囲のどこまで処理されたかを示す。`in1`は`[middle, last)`の範囲内の停止点、`in2`は`[first, middle)`の範囲内の停止点を指す。出力範囲が十分な場合は`in1 == last`かつ`in2 == middle`となる


## 計算量
正確に `last - first` 回代入する。


## 例
### 基本的な使い方
```cpp example
#include <algorithm>
#include <iostream>
#include <string>
#include <iterator>

int main() {
  std::string str = "rotate";
  std::string result;

  std::ranges::rotate_copy(str, str.begin() + 2, std::back_inserter(result));

  std::cout << result << std::endl;
}
```
* std::ranges::rotate_copy[color ff0000]
* str.begin()[link /reference/string/basic_string/begin.md]

#### 出力
```
tatero
```

### 並列アルゴリズムの例 (C++26)
```cpp example
#include <algorithm>
#include <iostream>
#include <vector>
#include <execution>

int main() {
  std::vector<int> src = {1, 2, 3, 4, 5};
  std::vector<int> dst(src.size());

  // 並列に回転コピーする（3番目の要素が先頭になるように）
  auto result = std::ranges::rotate_copy(
    std::execution::par, src, src.begin() + 2, dst);

  for (int x : dst) {
    std::cout << x << ' ';
  }
  std::cout << std::endl;
}
```
* std::ranges::rotate_copy[color ff0000]

#### 出力
```
3 4 5 1 2
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
- [P3709R2 Reconsider parallel `ranges::rotate_copy` and `ranges::reverse_copy`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3709r2.html)
- [LWG Issue 3759. `ranges::rotate_copy` should use `std::move`](https://cplusplus.github.io/LWG/issue3759)
    - C++23で、範囲版がイテレータ版へ`result`を渡す際、`result`が`weakly_incrementable`のみでコピー不可の可能性があるため`std::move(result)`で渡すよう修正された
- [LWG Issue 4441. `ranges::rotate` do not handle sized-but-not-sized-sentinel ranges correctly](https://cplusplus.github.io/LWG/issue4441)
    - C++26で、実行ポリシーをとる範囲版の効果を規定する等価コードで、末尾イテレータの算出が`ranges::end(r)`から`ranges::begin(r) + ranges::distance(r)`へ変更された。サイズは判るがsized sentinelを持たない範囲を正しく扱うため
