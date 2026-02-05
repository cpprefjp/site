# replace_copy
* algorithm[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template <input_iterator I,
            sentinel_for<I> S,
            class T1,
            class T2,
            output_iterator<const T2&> O,
            class Proj = identity>
    requires indirectly_copyable<I, O> &&
             indirect_binary_predicate<
               ranges::equal_to,
               projected<I, Proj>,
               const T1*
             >
  constexpr replace_copy_result<I, O>
    replace_copy(I first,
                 S last,
                 O result,
                 const T1& old_value,
                 const T2& new_value,
                 Proj proj = {});                     // (1) C++20
  template <input_iterator I,
            sentinel_for<I> S,
            class O,
            class Proj = identity,
            class T1 = projected_value_t<I, Proj>,
            class T2 = iter_value_t<O>>
    requires indirectly_copyable<I, O> &&
             indirect_binary_predicate<
               ranges::equal_to,
               projected<I, Proj>,
               const T1*
             >
  constexpr replace_copy_result<I, O>
    replace_copy(I first,
                 S last,
                 O result,
                 const T1& old_value,
                 const T2& new_value,
                 Proj proj = {});                     // (1) C++26

  template <input_range R,
            class T1,
            class T2,
            output_iterator<const T2&> O,
            class Proj = identity>
    requires indirectly_copyable<iterator_t<R>, O> &&
             indirect_binary_predicate<
               ranges::equal_to,
               projected<iterator_t<R>, Proj>,
               const T1*
             > &&
             output_iterator<O, const T2&>
  constexpr replace_copy_result<borrowed_iterator_t<R>, O>
    replace_copy(R&& r,
                 O result,
                 const T1& old_value,
                 const T2& new_value,
                 Proj proj = {});                     // (2) C++20
  template <input_range R,
            class O,
            class Proj = identity,
            class T1 = projected_value_t<iterator_t<R>, Proj>,
            class T2 = iter_value_t<O>>
    requires indirectly_copyable<iterator_t<R>, O> &&
             indirect_binary_predicate<
               ranges::equal_to,
               projected<iterator_t<R>, Proj>,
               const T1*
             > &&
             output_iterator<O, const T2&>
  constexpr replace_copy_result<borrowed_iterator_t<R>, O>
    replace_copy(R&& r,
                 O result,
                 const T1& old_value,
                 const T2& new_value,
                 Proj proj = {});                     // (2) C++26

  template <execution-policy Ep,
            random_access_iterator I,
            sized_sentinel_for<I> S,
            random_access_iterator O,
            sized_sentinel_for<O> OutS,
            class T1,
            class T2,
            class Proj = identity>
    requires indirectly_copyable<I, O> &&
             indirect_binary_predicate<
               ranges::equal_to,
               projected<I, Proj>,
               const T1*
             >
  replace_copy_result<I, O>
    replace_copy(Ep&& exec,
                 I first,
                 S last,
                 O result,
                 OutS result_last,
                 const T1& old_value,
                 const T2& new_value,
                 Proj proj = {});                     // (3) C++26

  template <execution-policy Ep,
            sized-random-access-range R,
            sized-random-access-range OutR,
            class T1,
            class T2,
            class Proj = identity>
    requires indirectly_copyable<iterator_t<R>, iterator_t<OutR>> &&
             indirect_binary_predicate<
               ranges::equal_to,
               projected<iterator_t<R>, Proj>,
               const T1*
             >
  replace_copy_result<borrowed_iterator_t<R>, borrowed_iterator_t<OutR>>
    replace_copy(Ep&& exec,
                 R&& r,
                 OutR&& result_r,
                 const T1& old_value,
                 const T2& new_value,
                 Proj proj = {});                     // (4) C++26
}
```
* indirectly_copyable[link /reference/iterator/indirectly_copyable.md]
* replace_copy_result[link ranges_in_out_result.md]
* borrowed_iterator_t[link /reference/ranges/borrowed_iterator_t.md]
* execution-policy[link /reference/execution/execution-policy.md]
* random_access_iterator[link /reference/iterator/random_access_iterator.md]
* sized_sentinel_for[link /reference/iterator/sized_sentinel_for.md]
* sized-random-access-range[link /reference/ranges/sized-random-access-range.md]

## 概要
指定された値を一致する要素を指定された値に置き換え、その結果を出力の範囲へコピーする。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する
- (3): (1)の並列アルゴリズム版。実行ポリシーを指定し、出力範囲の終端も指定する
- (4): (2)の並列アルゴリズム版。実行ポリシーを指定する

## 事前条件
- `[first,last)` と `[result,result + (last - first))` の範囲が重なっていてはならない。


## 効果
`[result,result + (last - first))` 内のイテレータ `i` について、`*(first + (i - result)) == old_value` である場合は `new_value` が代入され、そうでない場合は `*(first + (i - result))` が 代入される。


## 戻り値
`{ .in = last, .out = result + (last - first) }`


## 計算量
正確に `last - first` 回の比較を行う


## 備考
- (1), (2) :
    - C++26 : 引数として波カッコ初期化`{}`を受け付ける
        ```cpp
        std::vector<T> v;
        std::ranges::replace_copy(v, result, {a, b}, {c, d});
        ```


## 例
### 基本的な使い方
```cpp example
#include <algorithm>
#include <iostream>
#include <vector>
#include <iterator>

int main() {
  std::vector<int> v = { 3,1,2,1,2 };

  // 1 の要素を全部 10 に置き換えたものを出力する
  std::ranges::replace_copy(v, std::ostream_iterator<int>(std::cout, ","), 1, 10);
}
```
* std::ranges::replace_copy[color ff0000]

#### 出力
```
3,10,2,10,2,
```

### 波カッコ初期化を入力として使用する (C++26)
```cpp example
#include <algorithm>
#include <iostream>
#include <vector>
#include <iterator>

struct Point {
  int x;
  int y;

  bool operator==(const Point& other) const = default;
};

std::ostream& operator<<(std::ostream& os, const Point& p) {
  return os << p.x << ',' << p.y << std::endl;
}

int main() {
  std::vector<Point> v = {
    {1, 2},
    {3, 4},
    {5, 6},
    {1, 2},
  };

  // 値が{1, 2}の要素をすべて{9, 9}に置き換えたものを出力する
  std::ranges::replace_copy(
    v,
    std::ostream_iterator<int>(std::cout, "\n"),
    {1, 2},
    {9, 9}
  );
}
```
* std::ranges::replace_copy[color ff0000]

#### 出力
```
9,9
3,4
5,6
9,9
```

### 並列アルゴリズムの例 (C++26)
```cpp example
#include <algorithm>
#include <execution>
#include <iostream>
#include <vector>

int main() {
  std::vector<int> src = {3, 1, 2, 1, 2};
  std::vector<int> dst(src.size());

  // 並列に1を10に置き換えてコピー
  std::ranges::replace_copy(std::execution::par,
                            src, dst, 1, 10);

  for (int x : dst) {
    std::cout << x << ' ';
  }
  std::cout << std::endl;
}
```
* std::ranges::replace_copy[color ff0000]

#### 出力
```
3 10 2 10 2
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
- [P2248R8 Enabling list-initialization for algorithms](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2248r8.html)
    - C++26で波カッコ初期化 (リスト初期化) に対応した
- [P3179R9 C++ parallel range algorithms](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3179r9.html)
