#adjacent_find

```cpp
namespace std {
  template <class ForwardIterator>

  ForwardIterator adjacent_find(ForwardIterator first, ForwardIterator last);


  template <class ForwardIterator, class BinaryPredicate>

  ForwardIterator adjacent_find(ForwardIterator first, ForwardIterator last, BinaryPredicate pred);

}
```

###概要
隣接する要素で条件を満たしている最初の要素を検索する。

###戻り値

`[first,last)` 内にあるイテレータ i について、`*i == *(i + 1)` もしくは `pred(*i, *(i + 1)) != false` であるような最初のイテレータを返す。
もしそのようなイテレータが見つからなかった場合は `last` を返す。

###計算量

与えられたシーケンスが空きでない場合、正確に [`min`](/reference/algorithm/min.md)((i - first) + 1, (last - first) - 1) 回（`i` は `adjacent_find` の戻り値）の比較または述語が適用される

###実装例

<pre>```cpp
template <class ForwardIterator>ForwardIterator adjacent_find(ForwardIterator first, ForwardIterator last) {  if (first == last) return last;  ForwardIterator next = first;  ++next;  for ( ; next != last; ++next, ++first)    if (*first == *next)      return first;  return last;}
template <class ForwardIterator, class BinaryPredicate>ForwardIterator adjacent_find(ForwardIterator first, ForwardIterator last, BinaryPredicate pred) {  if (first == last) return last;  ForwardIterator next = first;  ++next;  for ( ; next != last; ++next, ++first)    if (pred(*first, *next))      return first;  return last;}
</pre>
```

###使用例
```cpp
<code style='color:rgb(0,0,0)'>#include <algorithm><br style='color:rgb(0,0,0)'/><code style='color:rgb(0,0,0)'>#include <iostream><br style='color:rgb(0,0,0)'/><code style='color:rgb(0,0,0)'>#include <iomanip><br style='color:rgb(0,0,0)'/><code style='color:rgb(0,0,0)'>#include <vector><br style='color:rgb(0,0,0)'/><code style='color:rgb(0,0,0)'> <br style='color:rgb(0,0,0)'/><code style='color:rgb(0,0,0)'>int main() {<br style='color:rgb(0,0,0)'/><code style='color:rgb(0,0,0)'>  std::vector<int> v = { 1,4,3,3,1,2,2 };<br style='color:rgb(0,0,0)'/><code style='color:rgb(0,0,0)'> <br style='color:rgb(0,0,0)'/><code style='color:rgb(0,0,0)'>  // 同じ値が連続している最初の要素を検索する<br style='color:rgb(0,0,0)'/><code style='color:rgb(0,0,0)'>  auto it = std::adjacent_find(v.begin(), v.end());<br style='color:rgb(0,0,0)'/><code style='color:rgb(0,0,0)'>  if (it == v.end()) {<br style='color:rgb(0,0,0)'/><code style='color:rgb(0,0,0)'>    std::cout << "not found" << std::endl;<br style='color:rgb(0,0,0)'/><code style='color:rgb(0,0,0)'>  } else {<br style='color:rgb(0,0,0)'/><code style='color:rgb(0,0,0)'>    std::cout << "found: index==" << std::distance(v.begin(), it) << std::endl;<br style='color:rgb(0,0,0)'/><code style='color:rgb(0,0,0)'>    std::cout << std::boolalpha << "*it == *(it+1): " << (*it == *(it+1)) << std::endl;<br style='color:rgb(0,0,0)'/><code style='color:rgb(0,0,0)'>  }<br style='color:rgb(0,0,0)'/><code style='color:rgb(0,0,0)'>}
```

###出力
```cpp
<code style='color:rgb(0,0,0)'>found: index==2</code><br style='color:rgb(0,0,0)'/><code style='color:rgb(0,0,0)'>*it == *(it+1): true</code><br style='color:rgb(0,0,0)'/>
