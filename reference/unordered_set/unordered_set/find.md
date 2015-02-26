#find (C++11)
* unordered_set[meta header]
* std[meta namespace]
* unordered_set[meta class]
* function[meta id-type]

```cpp
iterator find(const key_type& k);
const_iterator find(const key_type& k) const;
```

##概要
指定されたキーの位置を検索する。


##戻り値
パラメータ `k` と等価なキーの要素を指すイテレータを返す。そのような要素がない場合には、[`end`](./end.md)`()`を返す。


##計算量
平均的なケースでは定数（O(`1`)）だが、最悪のケースではコンテナの要素数 [`size`](./size.md)`()` に比例（O([`size`](./size.md)`()`)）。


##備考
コンテナが `const` の場合には `const_iterator`、そうでない場合には `iterator` が返るが、`unordered_set` の場合には、いずれにせよ読み取り専用イテレータである。


##例
```cpp
#include <iostream>
#include <unordered_set>
#include <algorithm>
#include <iterator>

int main()
{
  std::unordered_set<int> us{ 1, 3, 5, 7, 9, };

  std::copy(us.begin(), us.end(), std::ostream_iterator<int>(std::cout, ", "));
  std::cout << std::endl;

  auto it1 = us.find(5);
  if (it1 == us.end()) {
    std::cout << "not found" << std::endl;
  } else {
    std::cout << "found " << *it1 << " at " << std::distance(us.begin(), it1) << std::endl;
  }

  auto it2 = us.find(8);
  if (it2 == us.end()) {
    std::cout << "not found" << std::endl;
  } else {
    std::cout << "found " << *it2 << " at " << std::distance(us.begin(), it2) << std::endl;
  }
}
```
* iostream[link /reference/iostream.md]
* unordered_set[link /reference/unordered_set.md]
* algorithm[link /reference/algorithm.md]
* iterator[link /reference/iterator.md]
* begin[link ./begin.md]
* end[link ./end.md]
* ostream_iterator[link /reference/iterator/ostream_iterator.md]
* distance[link /reference/iterator/distance.md]

###出力
```
9, 7, 5, 3, 1,
found 5 at 2
not found
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): -
- [Clang, C++0x mode](/implementation.md#clang): 3.1
- [GCC](/implementation.md#gcc): -
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): ?

##参照

| | |
|-----------------------------------|----------------------------|
| [`count`](./count.md)             | 指定したキーの要素数を取得 |
| [`equal_range`](./equal_range.md) | 指定したキーの範囲を取得   |

