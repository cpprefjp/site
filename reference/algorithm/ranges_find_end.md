# find_end
* algorithm[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template <forward_iterator I1,
            sentinel_for<I1> S1,
            forward_iterator I2,
            sentinel_for<I2> S2,
            class Pred = ranges::equal_to,
            class Proj1 = identity,
            class Proj2 = identity>
    requires indirectly_comparable<I1, I2, Pred, Proj1, Proj2>
  constexpr subrange<I1>
    find_end(I1 first1,
             S1 last1,
             I2 first2,
             S2 last2,
             Pred pred = {},
             Proj1 proj1 = {},
             Proj2 proj2 = {}); // (1) C++20

  template <forward_range R1,
            forward_range R2,
            class Pred = ranges::equal_to,
            class Proj1 = identity,
            class Proj2 = identity>
    requires indirectly_comparable<iterator_t<R1>, iterator_t<R2>, Pred, Proj1, Proj2>
  constexpr borrowed_subrange_t<R1>
    find_end(R1&& r1,
             R2&& r2,
             Pred pred = {},
             Proj1 proj1 = {},
             Proj2 proj2 = {}); // (2) C++20
}
```

## 概要
範囲の中から、特定のサブシーケンスを検索する。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する


## 戻り値
- (1): `[first1,last1 - (last2 - first2))` 内のイテレータ `i` があるとき、0 以上 `last2 - first2` 未満の全ての整数 `n` について、それぞれ `*(i + n) == *(first2 + n)` もしくは `invoke(pred, invoke(proj1, *(i + n)), invoke(proj2, *(first2 + n))) != false` であるようなサブシーケンスを探し、見つかった **最後の** サブシーケンス`{i, i + (i == last1 ? 0 : last2 - first2)}`を返す。そのようなイテレータが見つからない、もしくは `[first2,last2)` が空である場合は `{last1, last1}` を返す。
- (2): `first1 = begin(r1)`, `last1 = end(r1)`, `first2 = begin(r2)`, `last2 = end(r2)`の下で(1)と等しい。

## 計算量
最大で `(last2 - first2) * (last1 - first1 - (last2 - first2) + 1)` 回の、対応する比較もしくは述語が適用される


## 備考
[`ranges::search()`](ranges_search.md) と `ranges::find_end()` は共にサブシーケンスを検索する関数だが、以下の点が異なる。

* `ranges::search()` は見つかった最初のサブシーケンスを返すが `ranges::find_end()` は見つかった最後のサブシーケンスを返す
* `[first2,last2)` が空であるときに `search()` は `{first1, first1}` を返すが、`ranges::find_end()` は `{last1, last1}` を返す


## 例
```cpp example
#include <algorithm>
#include <iostream>
#include <vector>
#include <list>

int main() {
  std::vector<int> v = { 1,2,1,2,3 };
  std::list<int> ls = { 1,2 };

  // 1,2 と連続している最後のシーケンスを探す
  subrange it = std::ranges::find_end(v, ls);
  // v[2] の位置を指すイテレータが見つかる。
  // v[0] の位置を指すイテレータではない。
  if (it == v.end()) {
    std::cout << "not found" << std::endl;
  } else {
    std::cout << "found: index==" << std::distance(v.begin(), it) << std::endl;
  }
}
```
* std::ranges::find_end[color ff0000]

### 出力
```
found: index==2
```


## 実装例
```cpp
struct find_end_impl {
  template<forward_iterator I1, sentinel_for<I1> S1, forward_iterator I2, sentinel_for<I2> S2, class Pred = ranges::equal_to, class Proj1 = identity, class Proj2 = identity>
    requires indirectly_comparable<I1, I2, Pred, Proj1, Proj2>
  constexpr subrange<I1> operator()(I1 first1, S1 last1, I2 first2, S2 last2, Pred pred = {}, Proj1 proj1 = {}, Proj2 proj2 = {}) const {
    if (first2 == last2)
      return last1;
    I1 result = last1;
    while ((first1 = search(first1, last1, first2, last2, ref(pred), ref(proj1), ref(proj2))) != last1) {
      result = first1;
      ++first1;
    }
    return result;
  }

  template<forward_range R1, forward_range R2, class Pred = ranges::equal_to, class Proj1 = identity, class Proj2 = identity>
    requires indirectly_comparable<iterator_t<R1>, iterator_t<R2>, Pred, Proj1, Proj2>
  constexpr borrowed_subrange_t<R1> operator()(R1&& r1, R2&& r2, Pred pred = {}, Proj1 proj1 = {}, Proj2 proj2 = {}) const {
    return (*this)(begin(r1), end(r1), begin(r2), end(r2), ref(pred), ref(proj1), ref(proj2));
  }
};

inline constexpr find_end_impl find_end;
```
* search[link ranges_search.md]

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
