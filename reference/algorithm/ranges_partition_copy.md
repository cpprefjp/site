# partition_copy
* algorithm[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template <input_iterator I,
            sentinel_for<I> S,
            weakly_incrementable O1,
            weakly_incrementable O2,
            class Proj = identity,
            indirect_unary_predicate<projected<I, Proj>> Pred>
    requires indirectly_copyable<I, O1> && indirectly_copyable<I, O2>
  constexpr partition_copy_result<I, O1, O2>
    partition_copy(I first,
                   S last, O1 out_true,
                   O2 out_false,
                   Pred pred,
                   Proj proj = {}); // (1) C++20

  template <input_range R,
            weakly_incrementable O1,
            weakly_incrementable O2,
            class Proj = identity,
            indirect_unary_predicate<projected<iterator_t<R>, Proj>> Pred>
    requires indirectly_copyable<iterator_t<R>, O1> &&
             indirectly_copyable<iterator_t<R>, O2>
  constexpr partition_copy_result<borrowed_iterator_t<R>, O1, O2>
    partition_copy(R&& r,
                   O1 out_true,
                   O2 out_false,
                   Pred pred,
                   Proj proj = {}); // (2) C++20
}
```
* weakly_incrementable[link /reference/iterator/weakly_incrementable.md]
* indirectly_copyable[link /reference/iterator/indirectly_copyable.md]
* partition_copy_result[link ranges_in_out_out_result.md]
* borrowed_iterator_t[link /reference/ranges/borrowed_iterator_t.md]


## 概要
与えられた範囲を条件によって 2 つの出力の範囲へ分けてコピーする。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する


## 事前条件
- 入力範囲は出力範囲のどちらとも重なっていてはならない。


## 効果
`[first,last)` 内にあるそれぞれのイテレータ `i` について、`pred(*i)` が `true` なら `*i` を `out_true` へコピーし、そうでない場合は `out_false` へコピーする。


## 戻り値
`o1` を `out_true` の終端、`o2` を `out_false` の終端とするとき、`{ .in = last, .out1 = o1, .out2 = o2 }`

## 計算量
正確に `last - first` 回述語が適用される。


## 例
```cpp example
#include <iostream>
#include <vector>
#include <algorithm>
#include <iterator>
#include <string>

void print(const std::string& name, const std::vector<int>& v)
{
  std::cout << name << " : ";
  for (int x : v) {
    std::cout << x << ",";
  }
  std::cout << std::endl;
}

bool is_even(int x) { return x % 2 == 0; }

int main()
{
  std::vector<int> v = {1, 2, 3, 4, 5};

  // 偶数グループと奇数グループに分ける
  std::vector<int> evens;
  std::vector<int> odds;
  std::ranges::partition_copy(v, std::back_inserter(evens), std::back_inserter(odds), is_even);

  print("v", v);
  print("evens", evens);
  print("odds", odds);
}
```
* std::ranges::partition_copy[color ff0000]

### 出力
```
v : 1,2,3,4,5,
evens : 2,4,
odds : 1,3,5,
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
