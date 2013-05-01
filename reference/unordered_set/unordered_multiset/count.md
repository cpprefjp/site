#count
```cpp
<pre style='margin:0'><code style='color:black'>size_type count(const key_type& k) const;</pre>
```

##概要

指定されたキーの要素数を数える。


##戻り値

引数 <code style='color:black'>k</code> と等価なキーの要素数を返す。


##計算量

平均的なケースでは定数（O(<code style='color:black'>1</code>)）だが、最悪のケースではコンテナの要素数 <code style='color:black'>[size](/reference/unordered_set/unordered_multiset/size.md)()</code> に比例（O(<code style='color:black'>[size](/reference/unordered_set/unordered_multiset/size.md)()</code>)）。


##例

```cpp
<pre style='margin:0'><code style='color:black'>#include <iostream>
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
}</pre>
```
* iostream[link /site/cpprefjp/reference/iostream]
* unordered_set[link /reference/unordered_set.md]
* algorithm[link /reference/algorithm.md]
* iterator[link /reference/iterator.md]
* unordered_multiset[link /reference/unordered_set/unordered_multiset/unordered_multiset.md]
* begin[link /reference/unordered_set/unordered_multiset/begin.md]
* end[link /reference/unordered_set/unordered_multiset/end.md]
* ostream_iterator[link /reference/iterator/ostream_iterator.md]

###出力

```cpp
<pre style='margin:0'><code style='color:black'>9, 9, 7, 7, 5, 5, 3, 3, 1, 1,
count of 5:2
count of 8:0</pre>
```

##バージョン


###言語

- C++11

###処理系

- [Clang](/implementation#clang.md): -

- [Clang, C++0x mode](/implementation#clang.md): 3.1

- [GCC](/implementation#gcc.md): -

- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0

- [ICC](/implementation#icc.md): ?

- [Visual C++](/implementation#visual_cpp.md): ?

##参照

<table style='border-collapse:collapse;border-color:rgb(136,136,136);border-width:1px' cellspacing='0' bordercolor='#888' border='1'>
<tbody>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[find](/reference/unordered_set/unordered_multiset/find.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>指定したキーの位置を検索</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[equal_range](/reference/unordered_set/unordered_multiset/equal_range.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>指定したキーの範囲を取得</td>
</tr>
</tbody>
</table>