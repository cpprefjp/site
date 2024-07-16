# remove_copy_if
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class InputIterator, class OutputIterator, class Predicate>
  OutputIterator
    remove_copy_if(InputIterator first,
                   InputIterator last,
                   OutputIterator result,
                   Predicate pred);         // (1) C++03

  template <class InputIterator, class OutputIterator, class Predicate>
  constexpr OutputIterator
    remove_copy_if(InputIterator first,
                   InputIterator last,
                   OutputIterator result,
                   Predicate pred);         // (1) C++20

  template <class ExecutionPolicy, class ForwardIterator1, class ForwardIterator2,
            class Predicate>
  ForwardIterator2
    remove_copy_if(ExecutionPolicy&& exec,
                   ForwardIterator1 first,
                   ForwardIterator1 last,
                   ForwardIterator2 result,
                   Predicate pred);         // (2) C++17
}
```

## 概要
イテレータ範囲`[first, last)`から条件を満たす要素を除け、その結果を出力の範囲へコピーする。


## テンプレートパラメータ制約
- `*result = *first` という式が有効であること


## 事前条件
- `[first,last)` と `[result,result + (last - first)` は重なってはならない


## 効果
`[first,last)` 内にあるイテレータ `i` について、`pred(*i) != false` でない要素を `result` へコピーする


## 戻り値
実行結果の範囲の終端を返す


## 計算量
正確に `last - first` 回の述語の適用を行う


## 備考
安定


## 例
```cpp example
#include <algorithm>
#include <iostream>
#include <vector>
#include <iterator>

int main() {
  std::vector<int> v = { 2,3,1,2,1 };

  // 奇数を除去した結果を出力する
  std::remove_copy_if(v.begin(), v.end(),
    std::ostream_iterator<int>(std::cout, ","),
    [](int x) { return x%2 != 0; });
}
```
* std::remove_copy_if[color ff0000]

### 出力
```
2,2,
```


## 実装例
```cpp
template <class InputIterator, class OutputIterator, class Predicate>
OutputIterator remove_copy_if(InputIterator first, InputIterator last,
                              OutputIterator result, Predicate pred) {
  for ( ; first != last; ++first)
    if (!pred(*first))
      *result++ = *first;
  return result;
}
```


## 参照
- [P0202R3 Add Constexpr Modifiers to Functions in `<algorithm>` and `<utility>` Headers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0202r3.html)
- [P0467R2 Iterator Concerns for Parallel Algorithms](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0467r2.html)
