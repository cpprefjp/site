#equal_range (C++11)
* unordered_set[meta header]

```cpp
std::pair<iterator, iterator> equal_range(const key_type& k);
std::pair<const_iterator, const_iterator> equal_range(const key_type& k) const;
```
* pair[link /reference/utility/pair.md]

##概要
指定したキーの範囲を取得する


##戻り値
キー値が引数 `k` と等価な要素を全て含む範囲。そのような要素が無い場合には、[`make_pair`](/reference/utility/make_pair.md)`(`[`end`](./end.md)`(), `[`end`](./end.md)`())`。


##計算量
平均的なケースでは O([`count`](./count.md)`(k)`)。最悪のケースでは O([`size`](./size.md)`()`)。


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
  os << label << ": " << "[" << std::distance(begin, it1) << ", "  << std::distance(begin, it2) << ")" << std::endl;
}

int main()
{
  std::unordered_multiset<int> um{ 1, 3, 5, 7, 9, 1, 3, 5, 7, 9, };

  std::copy(um.begin(), um.end(), std::ostream_iterator<int>(std::cout, ", "));
  std::cout << std::endl;

  auto p1 = um.equal_range(5);
  print_range("equal_range(5)", um.begin(), p1.first, p1.second);

  auto p2 = um.equal_range(8);
  print_range("equal_range(8)", um.begin(), p2.first, p2.second);
}
```
* iostream[link /reference/iostream.md]
* string[link /reference/string.md]
* unordered_set[link /reference/unordered_set.md]
* algorithm[link /reference/algorithm.md]
* iterator[link /reference/iterator.md]
* ostream[link /reference/ostream.md]
* distance[link /reference/iterator/distance.md]
* unordered_multiset[link /reference/unordered_set/unordered_multiset.md]
* copy[link /reference/algorithm/copy.md]
* begin[link ./begin.md]
* end[link ./end.md]
* ostream_iterator[link /reference/iterator/ostream_iterator.md]
* first[link /reference/utility/pair.md]
* second[link /reference/utility/pair.md]

###出力
```
9, 9, 7, 7, 5, 5, 1, 1, 3, 3,
equal_range(5): [4, 6)
equal_range(8): [10, 10)
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): -
- [Clang, C++0x mode](/implementation.md#clang): 3.0, 3.1
- [GCC](/implementation.md#gcc): -
- [GCC, C++0x mode](/implementation.md#gcc): 4.4.7, 4.5.3, 4.6.3, 4.7.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): ?

##参照
- [`find`](./find.md)
- [`count`](./count.md)

