#remove_copy_if

```cpp
namespace std {

  template <class InputIterator, class OutputIterator, class Predicate>

  OutputIterator remove_copy_if(InputIterator first, InputIterator last,

                                OutputIterator result, Predicate pred);

}
```

###概要
条件を満たす要素を除け、その結果を出力の範囲へコピーする。

###要件

[first,last) と [result,result + (last - first9) は重なってはならない。
*result = *first という式が有効でなければならない。

###効果

[first,last) 内にあるイテレータ i について、pred(*i) != false でない要素を result へコピーする

###戻り値

実行結果の範囲の終端を返す

###計算量

正確に last - first 回の述語の適用を行う

###注意

安定。

###実装例

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

###使用例

```cpp
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
* remove_copy_if[color ff0000]

###出力
```cpp
2,2,
```
