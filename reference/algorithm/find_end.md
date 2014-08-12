#find_end
```cpp
namespace std {
  template <class ForwardIterator1, class ForwardIterator2>
  ForwardIterator1 find_end(ForwardIterator1 first1, ForwardIterator1 last1,
                            ForwardIterator2 first2, ForwardIterator2 last2);

  template <class ForwardIterator1, class ForwardIterator2, class BinaryPredicate>
  ForwardIterator1 find_end(ForwardIterator1 first1, ForwardIterator1 last1,
                            ForwardIterator2 first2, ForwardIterator2 last2,
                            BinaryPredicate pred);
}
```

##概要
範囲の中から、特定のサブシーケンスを検索する。


##戻り値
`[first1,last1 - (last2 - first2))` 内のイテレータ `i` があるとき、0 以上 `last2 - first2` 未満の全ての整数 `n` について、それぞれ `*(i + n) == *(first2 + n)` もしくは `pred(*(i + n), *(first2 + n)) != false` であるようなサブシーケンスを探し、見つかった<b>最後の</b>サブシーケンスの先頭のイテレータを返す。

そのようなイテレータが見つからない、もしくは `[first2,last2)` が空である場合は `last1` を返す。


##計算量
最大で `(last2 - first2) * (last1 - first1 - (last2 - first2) + 1)` 回の、対応する比較もしくは述語が適用される


##備考
[`search()`](search.md) と `find_end()` は共にサブシーケンスを検索する関数だが、以下の点が異なる。

* `search()` は見つかった最初のサブシーケンスを返すが `find_end()` は見つかった最後のサブシーケンスを返す
* `[first2,last2)` が空であるときに `search()` は `first1` を返すが、`find_end()` は `last1` を返す


##例
```cpp
#include <algorithm>
#include <iostream>
#include <vector>
#include <list>
 
int main() {
  std::vector<int> v = { 1,2,1,2,3 };
  std::list<int> v2 = { 1,2 };
 
  // 1,2 と連続している最後のシーケンスを探す
  std::vector<int>::iterator it = std::find_end(v.begin(), v.end(), v2.begin(), v2.end());
  // v[2] の位置を指すイテレータが見つかる。
  // v[0] の位置を指すイテレータではない。
  if (it == v.end()) {
    std::cout << "not found" << std::endl;
  } else {
    std::cout << "found: index==" << std::distance(v.begin(), it) << std::endl;
  }
}
```
* find_end[color ff0000]

###出力
```
found: index==2
```


##実装例
```cpp
template<class ForwardIterator1, class ForwardIterator2>
ForwardIterator1 find_end(ForwardIterator1 first1, ForwardIterator1 last1,
                          ForwardIterator2 first2, ForwardIterator2 last2) {
  if (first2 == last2)
    return last1;
  ForwardIterator1 result = last1;
  while ((first1 = std::search(first1, last1, first2, last2)) != last1) {
    result = first1;
    ++first1;
  }
  return result;
}

template<class ForwardIterator1, class ForwardIterator2, class BinaryPredicate>
ForwardIterator1 find_end(ForwardIterator1 first1, ForwardIterator1 last1,
                          ForwardIterator2 first2, ForwardIterator2 last2, BinaryPredicate pred) {

  if (first2 == last2)
    return last1;
  ForwardIterator1 result = last1;
  while ((first1 = std::search(first1, last1, first2, last2, pred)) != last1) {
    result = first1;
    ++first1;
  }
  return result;
}
```

