#count
* unordered_set[meta header]
* std[meta namespace]
* unordered_multiset[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
size_type count(const key_type& k) const;
```

##概要
指定されたキーの要素数を数える。


##戻り値
引数 `k` と等価なキーの要素数を返す。


##計算量
平均： O(`count(k)`)  
最悪： [`size`](size.md) について線形時間


##例
```cpp
#include <iostream>
#include <unordered_set>
#include <algorithm>
#include <iterator>

int main()
{
  std::unordered_multiset<int> um{ 1, 3, 5, 7, 9, 1, 3, 5, 7, 9, };

  std::copy(um.begin(), um.end(), std::ostream_iterator<int>(std::cout, ", "));
  std::cout << std::endl;

  auto c1 = um.count(5);
  std::cout << "count of 5:" << c1 << std::endl;

  auto c2 = um.count(8);
  std::cout << "count of 8:" << c2 << std::endl;
}
```
* iostream[link /reference/iostream.md]
* unordered_set[link /reference/unordered_set.md]
* algorithm[link /reference/algorithm.md]
* iterator[link /reference/iterator.md]
* unordered_multiset[link /reference/unordered_set/unordered_multiset.md]
* begin[link /reference/unordered_set/unordered_multiset/begin.md]
* end[link /reference/unordered_set/unordered_multiset/end.md]
* ostream_iterator[link /reference/iterator/ostream_iterator.md]

###出力
```
9, 9, 7, 7, 5, 5, 3, 3, 1, 1,
count of 5:2
count of 8:0
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): -
- [Clang, C++11 mode](/implementation.md#clang): 3.1
- [GCC](/implementation.md#gcc): -
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): ?


##参照
- [LWG Issue 2304. Complexity of `count` in unordered associative containers](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2304)


##関連項目

| | |
|-----------------------------------|--------------------------|
| [`find`](find.md)               | 指定したキーの位置を検索 |
| [`equal_range`](equal_range.md) | 指定したキーの範囲を取得 |

