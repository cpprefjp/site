# partial_sort_copy
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class InputIterator, class RandomAccessIterator>
  RandomAccessIterator
    partial_sort_copy(InputIterator first,
                      InputIterator last,
                      RandomAccessIterator result_first,
                      RandomAccessIterator result_last); // (1) C++03

  template <class InputIterator, class RandomAccessIterator>
  constexpr RandomAccessIterator
    partial_sort_copy(InputIterator first,
                      InputIterator last,
                      RandomAccessIterator result_first,
                      RandomAccessIterator result_last); // (1) C++20

  template <class InputIterator, class RandomAccessIterator, class Compare>
  RandomAccessIterator
    partial_sort_copy(InputIterator first,
                      InputIterator last,
                      RandomAccessIterator result_first,
                      RandomAccessIterator result_last,
                      Compare comp);                     // (2) C++03

  template <class InputIterator, class RandomAccessIterator, class Compare>
  constexpr RandomAccessIterator
    partial_sort_copy(InputIterator first,
                      InputIterator last,
                      RandomAccessIterator result_first,
                      RandomAccessIterator result_last,
                      Compare comp);                     // (2) C++20

  template <class ExecutionPolicy, class ForwardIterator, class RandomAccessIterator>
  RandomAccessIterator
    partial_sort_copy(ExecutionPolicy&& exec,
                      ForwardIterator first,
                      ForwardIterator last,
                      RandomAccessIterator result_first,
                      RandomAccessIterator result_last); // (3) C++17

  template <class ExecutionPolicy, class ForwardIterator, class RandomAccessIterator,
            class Compare>
  RandomAccessIterator
    partial_sort_copy(ExecutionPolicy&& exec,
                      ForwardIterator first,
                      ForwardIterator last,
                      RandomAccessIterator result_first,
                      RandomAccessIterator result_last,
                      Compare comp);                     // (4) C++17
}
```

## 概要
範囲を部分的にソートした結果を他の範囲にコピーする


## 要件
`RandomAccessIterator` は `ValueSwappable` の要件を満たしている必要がある。`*result_first` の型は `MoveConstructible` と `MoveAssignable` の要件を満たしている必要がある。


## 効果
`[first,last)` にある要素の�から、[`min`](/reference/algorithm/min.md)`(last - first, result_last - result_first)` 個の要素をソート済みの状態で `[result_first,result_first +` [`min`](/reference/algorithm/min.md)`(last - first, result_last - result_first))` に配置する。


## 戻り値
`result_last` と `result_first + (last - first)` で小さい方が返される


## 計算量
ほぼ `(last - first) * log(min(last - first, result_last - result_- first))` 回の比較を行う


## 例
```cpp example
#include <iostream>
#include <vector>
#include <algorithm>

int main()
{
  std::vector<int> v = {3, 1, 4, 2, 5};

  // vから小さい順に2要素取り出す
  std::vector<int> result(2);
  std::partial_sort_copy(v.begin(), v.end(), result.begin(), result.end());

  std::for_each(result.begin(), result.end(), [](int x) {
    std::cout << x << std::endl;
  });
}
```
* std::partial_sort_copy[color ff0000]
* result.begin()[link /reference/vector/vector/begin.md]
* result.end()[link /reference/vector/vector/end.md]

### 出力
```
1
2
```


## 参照
- [P0879R0 Constexpr for `swap` and `swap` related functions](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0879r0.html)
- [P0467R2 Iterator Concerns for Parallel Algorithms](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0467r2.html)
