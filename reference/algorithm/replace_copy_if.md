# replace_copy_if
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class InputIterator,
            class OutputIterator,
            class Predicate,
            class T>
  OutputIterator
    replace_copy_if(InputIterator first,
                    InputIterator last,
                    OutputIterator result,
                    Predicate pred,
                    const T& new_value);     // (1) C++03

  template <class InputIterator,
            class OutputIterator,
            class Predicate,
            class T>
  constexpr OutputIterator
    replace_copy_if(InputIterator first,
                    InputIterator last,
                    OutputIterator result,
                    Predicate pred,
                    const T& new_value);     // (1) C++20

  template <class ExecutionPolicy,
            class ForwardIterator1,
            class ForwardIterator2,
            class Predicate, class T>
  ForwardIterator2
    replace_copy_if(ExecutionPolicy&& exec,
                    ForwardIterator1 first,
                    ForwardIterator1 last,
                    ForwardIterator2 result,
                    Predicate pred,
                    const T& new_value);     // (2) C++17
}
```

## 概要
条件を満たす要素を指定された値に置き換え、その結果を出力の範囲へコピーする。


## 要件
- `*first` と `new_value` は `result` へ書き込み可能でなければならない。
- また、`[first,last)` と `[result,result + (last - first))` の範囲が重なっていてはならない。


## 効果
`[result,result + (last - first))` 内のイテレータ `i` について、`pred(*(first + (i - result))) != false` である場合は `new_value` が代入され、そうでない場合は `*(first + (i - result))` が 代入される。


## 戻り値
`result + (last - first)`


## 計算量
�確に `last - first` 回の述語の適用を行う


## 例
```cpp example
#include <algorithm>
#include <iostream>
#include <vector>
#include <iterator>

int main() {
  std::vector<int> v = { 3,1,2,1,2 };

  // 奇数の要素を全部 10 に置き換えたものを出力する
  std::replace_copy_if(v.begin(), v.end(),
    std::ostream_iterator<int>(std::cout, ","),
    [](int x) { return x%2 != 0; }, 10);
}
```
* std::replace_copy_if[color ff0000]

### 出力
```
10,10,2,10,2,
```

## 実装例
```cpp
template <class InputIterator, class OutputIterator, class Predicate, class T>
OutputIterator replace_copy_if(InputIterator first, InputIterator last, OutputIterator result,
                               Predicate pred, const T& new_value) {
  for ( ; first != last; ++first)
    *result++ = pred(*first, old_value) ? new_value : *first;
  return result;
}
```


## 参照
- [P0202R3 Add Constexpr Modifiers to Functions in `<algorithm>` and `<utility>` Headers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0202r3.html)
- [P0467R2 Iterator Concerns for Parallel Algorithms](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0467r2.html)
