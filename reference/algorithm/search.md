#search
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template<class ForwardIterator1, class ForwardIterator2>
  ForwardIterator1 search(ForwardIterator1 first1, ForwardIterator1 last1,
                          ForwardIterator2 first2, ForwardIterator2 last2);

  template<class ForwardIterator1, class ForwardIterator2, class BinaryPredicate>
  ForwardIterator1 search(ForwardIterator1 first1, ForwardIterator1 last1,
                          ForwardIterator2 first2, ForwardIterator2 last2,
                          BinaryPredicate pred);
}
```


##概要
あるシーケンスの中から、特定のサブシーケンスを探す


##戻り値
`[first1,last1 - (last2 - first2))` 内のイテレータ `i` があるとき、0 以上 `last2 - first2` 未満の整数 `n` について、それぞれ `*(i + n) == *(first2 + n)` もしくは `pred(*(i + n), *(first2 + n)) != false` であるようなサブシーケンスを探し、見つかった最初のサブシーケンスの先頭のイテレータを返す。

そのようなイテレータが見つからない場合は `last1` を返し、`[first2,last2)` が空である場合には `first1` を返す。


##計算量
最大で `(last1 - first1) * (last2 - first2)` 回の、対応する比較もしくは述語が適用される


##備考
`search()` と [`find_end()`](/reference/algorithm/find_end.md) は共にサブシーケンスを検索する関数だが、以下の点が異なる。

* `search()` は見つかった最初のサブシーケンスを返すが [`find_end()`](/reference/algorithm/find_end.md) は見つかった最後のサブシーケンスを返す
* `[first2,last2)` が空であるときに `search()` は `first1` を返すが、[`find_end()`](/reference/algorithm/find_end.md) は `last1` を返す


##例
```cpp
#include <algorithm>
#include <iostream>
#include <vector>
#include <list>

int main() {
  std::vector<int> v = { 1,2,1,2,3 };
  std::list<int> ls = { 1,2 };

  // 1,2 と連続している最初のシーケンスを探す
  std::vector<int>::iterator it = std::search(v.begin(), v.end(), ls.begin(), ls.end());
  // v[0] の位置を指すイテレータが見つかる。
  if (it == v.end()) {
    std::cout << "not found" << std::endl;
  } else {
    std::cout << "found: index==" << std::distance(v.begin(), it) << std::endl;
  }
}
```
* std::search[color ff0000]
* std::list[link /reference/list.md]
* ls.begin()[link /reference/list/begin.md]
* ls.end()[link /reference/list/end.md]

###出力
```
found: index==0
```


##実装例
```cpp
template<class ForwardIterator1, class ForwardIterator2>
ForwardIterator1 search(ForwardIterator1 first1, ForwardIterator1 last1,
                        ForwardIterator2 first2, ForwardIterator2 last2) {
  for ( ; first1 != last1; ++first1) {
    ForwardIterator1 p1 = first1;
    ForwardIterator2 p2 = first2;
    while (true) {
      if (p2 == last2) return first1;
      if (p1 == last1) return last1;
      if (!bool(*p1 == *p2)) break;
      ++p1, ++p2;
    }
  }
  return first1;
}

template<class ForwardIterator1, class ForwardIterator2, class BinaryPredicate>
ForwardIterator1 search(ForwardIterator1 first1, ForwardIterator1 last1,
                        ForwardIterator2 first2, ForwardIterator2 last2, BinaryPredicate pred) {
  for ( ; first1 != last1; ++first1) {
    ForwardIterator1 p1 = first1;
    ForwardIterator2 p2 = first2;
    while (true) {
      if (p2 == last2) return first1;
      if (p1 == last1) return last1;
      if (!bool(pred(*p1, *p2))) break;
      ++p1, ++p2;
    }
  }
  return first1;
}
```


##参照
- [LWG Issue 2150. Unclear specification of `find_end`](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2150)
