#find
```cpp
<pre style='margin:0'><code style='color:black'>iterator find(const key_type& k);
const_iterator find(const key_type& k) const;</pre>
```

##概要

指定されたキーの位置を検索する。


##戻り値

引数 <code style='color:black'>k</code> と等価なキーの要素を指すイテレータを返す。そのような要素がない場合には、<code style='color:black'>[end](/reference/unordered_set/unordered_set/end.md)()</code>を返す。


##計算量

平均的なケースでは定数（O(<code style='color:black'>1</code>)）だが、最悪のケースではコンテナの要素数 <code style='color:black'>[size](/reference/unordered_set/unordered_set/size.md)()</code> に比例（O(<code style='color:black'>[size](/reference/unordered_set/unordered_set/size.md)()</code>)）。


##備考

コンテナが <code style='color:black'>const</code> の場合には <code style='color:black'>const_iterator</code>、そうでない場合には <code style='color:black'>iterator</code> が返るが、<code style='color:black'>unordered_set</code> の場合には、いずれにせよ読み取り専用イテレータである。


##例

```cpp
<pre style='margin:0'><code style='color:black'>#include <iostream>
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
}</pre>
```
* iostream[link /site/cpprefjp/reference/iostream]
* unordered_set[link /reference/unordered_set.md]
* algorithm[link /reference/algorithm.md]
* iterator[link /reference/iterator.md]
* begin[link /reference/unordered_set/unordered_set/begin.md]
* end[link /reference/unordered_set/unordered_set/end.md]
* ostream_iterator[link /reference/iterator/ostream_iterator.md]
* distance[link /reference/iterator/distance.md]

###出力

```cpp
<pre style='margin:0'><code style='color:black'>9, 7, 5, 3, 1,
found 5 at 2
not found</pre>
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
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[count](/reference/unordered_set/unordered_set/count.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>指定したキーの要素数を取得</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[equal_range](/reference/unordered_set/unordered_set/equal_range.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>指定したキーの範囲を取得</td>
</tr>
</tbody>
</table>