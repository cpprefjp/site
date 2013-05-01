#find_if
```cpp
namespace std {  template <class InputIterator, class Predicate>
  InputIterator find_if(InputIterator first, InputIterator last, Predicate pred);}
```

###概要
範囲の中から、指定された条件を満たす最初の要素を検索する。

###戻り値

[first,last) 内のイテレータ i について、pred(*i) != false である最初のイテレータを返す。そのようなイテレータが見つからなかった場合は last を返す。

###計算量

最大で last - first 回述語による比較を行う

###実装例

<pre>```cpp
template <class InputIterator, class Predicate>
InputIterator find_if(InputIterator first, InputIterator last, Predicate pred) {
  for ( ; first != last; ++first)
    if (pred(*first)) return first;
  return last;
}
</pre>
```

###使用例

<pre>```cpp
#include <algorithm>
#include <iostream>
#include <vector>
 
int main() {
  std::vector<int> v = { 3, 1, 4 };
  // 3ではない最初の要素を検索する
  auto result = std::find_if(v.begin(), v.end(), [](int x) { return x != 3; });
  if (result == v.end()) {
    std::cout << "not found" << std::endl;
  } else {
    std::cout << "found: " << *result << std::endl;
  }
}
</pre>
```
* find_if[color ff0000]

###出力

<pre>```cpp
found: 1
</pre>
```
