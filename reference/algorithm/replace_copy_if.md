#replace_copy_if
* algorithm[meta header]

```cpp
namespace std {
  template <class InputIterator,
            class OutputIterator,
            class Predicate,
            class T>
  OutputIterator replace_copy_if(InputIterator first,
                                 InputIterator last,
                                 OutputIterator result,
                                 Predicate pred,
                                 const T& new_value);
}
```

##概要
条件を満たす要素を指定された値に置き換え、その結果を出力の範囲へコピーする。


##要件
- `*first` と `new_value` は `result` へ書き込み可能でなければならない。
- また、`[first,last)` と `[result,result + (last - first))` の範囲が重なっていてはならない。


##効果
`[result,result + (last - first))` 内のイテレータ `i` について、`pred(*(first + (i - result))) != false` である場合は `new_value` が代入され、そうでない場合は `*(first + (i - result))` が 代入される。


##戻り値
`result + (last - first)`


##計算量
正確に `last - first` 回の述語の適用を行う


##例
```cpp
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
* replace_copy_if[color ff0000]


###出力
```
10,10,2,10,2,
```

##実装例
```cpp
template <class InputIterator, class OutputIterator, class Predicate, class T>
OutputIterator replace_copy_if(InputIterator first, InputIterator last, OutputIterator result,
                               Predicate pred, const T& new_value) {
  for ( ; first != last; ++first)
    *result++ = pred(*first, old_value) ? new_value : *first;
  return result;
}
```

