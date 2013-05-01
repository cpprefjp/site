#count_if

```cpp
namespace std {
  template <class InputIterator, class Predicate>

  typename iterator_traits<InputIterator>::difference_type

    count_if(InputIterator first, InputIterator last, Predicate pred);

}
```

###概要
条件を満たしている要素の数を数える。

###戻り値

[first,last) 内のイテレータ i について、pred(*i) != false であるイテレータの数を返す

###計算量

正確に last - first 回の述語の適用を行う

###実装例

<pre>```cpp
template <class InputIterator, class Predicate>typename iterator_traits<InputIterator>::difference_type  count_if(InputIterator first, InputIterator last, Predicate pred) {  typename iterator_traits<InputIterator>::difference_type ret = 0;  for ( ; first != last; ++first)    if (pred(*first)) ret++;  return ret;}
</pre>
```

###使用例
```cpp
<code style='color:rgb(0,0,0)'>#include <algorithm><br style='color:rgb(0,0,0)'/><code style='color:rgb(0,0,0)'>#include <iostream><br style='color:rgb(0,0,0)'/><code style='color:rgb(0,0,0)'>#include <vector><br style='color:rgb(0,0,0)'/><code style='color:rgb(0,0,0)'> <br style='color:rgb(0,0,0)'/><code style='color:rgb(0,0,0)'>int main() {<br style='color:rgb(0,0,0)'/><code style='color:rgb(0,0,0)'>  std::vector<int> v = { 1,4,3,3,1,2,2,1 };<br style='color:rgb(0,0,0)'/><code style='color:rgb(0,0,0)'> <br style='color:rgb(0,0,0)'/><code style='color:rgb(0,0,0)'>  // 値が 1 または 3 の要素がいくつあるかを数える<br style='color:rgb(0,0,0)'/><code style='color:rgb(0,0,0)'>  auto count = std::count_if(v.begin(), v.end(), [](int x) { return x == 1 || x == 3; });<br style='color:rgb(0,0,0)'/><code style='color:rgb(0,0,0)'>  std::cout << "count of 1 or 3: " << count << std::endl;<br style='color:rgb(0,0,0)'/><code style='color:rgb(0,0,0)'>}
```

###出力
```cpp
<code style='color:rgb(0,0,0)'>count of 1 or 3: 5</code>
