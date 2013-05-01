#end
```cpp
<pre style='margin:0'><code style='color:black'>iterator end() noexcept;
const_iterator end() const noexcept;
</pre>
```

##概要

最終の要素の次を指すイテレータを取得する。
<code style='color:black'>unordered_multiset</code> は非順序連想コンテナであるため「最終」に特に意味はないが、<code style='color:black'>[begin](/reference/unordered_set/unordered_multiset/begin.md)()</code> で得られたイテレータを <code style='color:black'>end()</code> まで <code style='color:black'>operator++()</code> でイテレートすることで当該コンテナの要素を漏れなくダブりなく走査することができる。


##戻り値

最終の要素の次を指すイテレータ


##例外

投げない。


##計算量

定数


##備考

<code style='color:black'>const</code> 版ではない <code style='color:black'>end</code> が返す <code style='color:black'>iterator</code> も読み取り専用イテレータである。
（が、<code style='color:black'>iterator</code> と <code style='color:black'>const_iterator</code> が同じ型とは限らない）


##例

```cpp
<pre style='margin:0'><code style='color:black'>#include <iostream>
#include <algorithm>
#include <iterator>
#include <unordered_set>

int main()
{
  std::unordered_multiset<int> um{ 1, 2, 3, 1, 2, 3, };
  const std::unordered_multiset<int> cum{um};

  copy(um.begin(), um.end(), std::ostream_iterator<int>(std::cout, " "));
  std::cout << std::endl;

  copy(cum.begin(), cum.end(), std::ostream_iterator<int>(std::cout, " "));
  std::cout << std::endl;
}</pre>
```
* iostream[link /reference/iostream.md]
* algorithm[link /reference/algorithm.md]
* iterator[link /reference/iterator.md]
* unordered_set[link /reference/unordered_set.md]
* unordered_multiset[link /reference/unordered_set/unordered_multiset/unordered_multiset.md]
* copy[link /reference/algorithm/copy.md]
* begin[link /reference/unordered_set/unordered_multiset/begin.md]
* ostream_iterator[link /reference/iterator/ostream_iterator.md]

###出力

```cpp
<pre style='margin:0'><code style='color:black'>3 3 2 2 1 1
1 1 2 2 3 3</pre>
```

注：<code style='color:black'>[unordered_multiset](/reference/unordered_set/unordered_multiset.md)</code> は非順序連想コンテナであるため、出力順序は無意味であることに注意


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

<table style='border-collapse:collapse;border-color:rgb(136,136,136);border-width:1px' cellspacing='0' bordercolor='#888' border='1'>
<tbody>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[begin](/reference/unordered_set/unordered_multiset/begin.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>先頭要素を指すイテレータの取得</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[cbegin](/reference/unordered_set/unordered_multiset/cbegin.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>先頭要素を指す読み取り専用イテレータの取得</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[cend](/reference/unordered_set/unordered_multiset/cend.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>最終要素の次を指す読み取り専用イテレータの取得</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[begin(size_type)](/reference/unordered_set/unordered_multiset/begin-size_type.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>インデックス（添え字）で指定したバケット内の先頭要素を指すイテレータを取得</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[end(size_type)](/reference/unordered_set/unordered_multiset/end-size_type.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>インデックス（添え字）で指定したバケット内の最終要素の次を指すイテレータを取得</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[cbegin(size_type)](/reference/unordered_set/unordered_multiset/cbegin-size_type.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>インデックス（添え字）で指定したバケット内の先頭要素を指す読み取り専用イテレータを取得</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[cend(size_type)](/reference/unordered_set/unordered_multiset/cend-size_type.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>インデックス（添え字）で指定したバケット内の最終要素の次を指す読み取り専用イテレータを取得</td>
</tr>
</tbody>
</table>