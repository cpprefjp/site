#equal_range
```cpp
std::pair<iterator, iterator> equal_range(const key_type& k);
std::pair<const_iterator, const_iterator> equal_range(const key_type& k) const;
```
* pair[link /reference/utility/pair.md]

##概要
指定したキーの範囲を取得する


##戻り値
キー値が引数 <code style='color:black'>k</code> と等価な要素を全て含む範囲。そのような要素が無い場合には、<code style='color:black'>[make_pair](/reference/utility/pair/make_pair.md)([end](/reference/unordered_set/unordered_set/end.md)(), [end](/reference/unordered_set/unordered_set/end.md)())</code>。


##計算量
平均的なケースでは O(<code style='color:black'>[count](/reference/unordered_set/unordered_set/count.md)(k)</code>)。最悪のケースでは O(<code style='color:black'>[size](/reference/unordered_set/unordered_set/size.md)()</code>)。


##備考
<code style='color:black'>[unordered_set](/reference/unordered_set/unordered_set.md)</code> の場合には、等価なキーはたかだか1つであるため、<code style='color:black'>[find](/reference/unordered_set/unordered_set/find.md)</code> ほど有用ではないと思われる。

##例

```cpp
#include <iostream>
#include <string>
#include <unordered_set>
#include <algorithm>
#include <iterator>

template <class Iter>
void print_range(const std::string& label, Iter begin, Iter it1, Iter it2, std::ostream& os = std::cout)
{
  os << label << ": " << std::distance(begin, it1) << ", "  << std::distance(begin, it2) << ")" << std::endl;
}

int main()
{
  std::unordered_set<int> us{ 1, 3, 5, 7, 9, };

  std::copy(us.begin(), us.end(), std::ostream_iterator<int>(std::cout, ", "));
  std::cout << std::endl;

  auto p1 = us.equal_range(5);
  print_range("equal_range(5)", us.begin(), p1.first, p1.second);

  auto p2 = us.equal_range(8);
  print_range("equal_range(8)", us.begin(), p2.first, p2.second);
}
```
* iostream[link /site/cpprefjp/reference/iostream]
* string[link /reference/string.md]
* unordered_set[link /reference/unordered_set.md]
* algorithm[link /reference/algorithm.md]
* iterator[link /reference/iterator.md]
* ostream[link /site/cpprefjp/reference/ostream]
* distance[link /reference/iterator/distance.md]
* copy[link /reference/algorithm/copy.md]
* begin[link /reference/unordered_set/unordered_set/begin.md]
* end[link /reference/unordered_set/unordered_set/end.md]
* ostream_iterator[link /reference/iterator/ostream_iterator/ostream_iterator.md]
* first[link /reference/utility/pair.md]
* second[link /reference/utility/pair.md]

###出力

```
9, 7, 5, 3, 1,
equal_range(5): [2, 3)
equal_range(8): [5, 5)
```

##バージョン

###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): -
- [Clang, C++0x mode](/implementation#clang.md): 3.0, 3.1
- [GCC](/implementation#gcc.md): -
- [GCC, C++0x mode](/implementation#gcc.md): 4.4.7, 4.5.3, 4.6.3, 4.7.0
- [ICC](/implementation#icc.md): ?
- [Visual C++](/implementation#visual_cpp.md): ?

##参照
|ページ|概要|
|------|----|
|[find](/reference/unordered_set/unordered_set/find.md)|指定したキーの位置を検索|
|[count](/reference/unordered_set/unordered_set/count.md)|指定したキーの要素数を取得|
