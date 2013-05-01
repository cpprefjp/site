#cend
```cpp
<pre style='margin:0'><code style='color:black'>const_iterator cend() const noexcept;</pre>
```

##概要

最終の要素の次を指す読み取り専用イテレータを取得する。
<code style='color:black'>unordered_set</code> は非順序連想コンテナであるため「最終」に特に意味はないが、<code style='color:black'>[cbegin](/reference/unordered_set/unordered_set/cbegin.md)()</code> で得られたイテレータを <code style='color:black'>cend()</code> まで <code style='color:black'>operator++()</code> でイテレートすることで当該コンテナの要素を漏れなくダブりなく走査することができる。


##戻り値

最終の要素の次を指すイテレータ


##例外

投げない。


##計算量

定数


##例

```cpp
<pre style='margin:0'><code style='color:black'>#include <iostream>
#include <algorithm>
#include <iterator>
#include <unordered_set>

int main()
{
  std::unordered_set<int> us{ 1, 2, 3, };

  std::copy(us.cbegin(), us.cend(), std::ostream_iterator<int>(std::cout, ", "));
  std::cout << std::endl;
}</pre>
```
* iostream[link /reference/iostream.md]
* algorithm[link /reference/algorithm.md]
* iterator[link /reference/iterator.md]
* unordered_set[link /reference/unordered_set.md]
* copy[link /reference/algorithm/copy.md]
* cbegin[link /reference/unordered_set/unordered_set/cbegin.md]
* ostream_iterator[link /reference/iterator/ostream_iterator.md]

###出力

```cpp
<pre style='margin:0'><code style='color:black'>3, 2, 1,</pre>
```

注：<code style='color:black'>[unordered_set](/reference/unordered_set/unordered_set.md)</code> は非順序連想コンテナであるため、出力順序は無意味であることに注意


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
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[begin](/reference/unordered_set/unordered_set/begin.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>先頭要素を指すイテレータの取得</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[end](/reference/unordered_set/unordered_set/end.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>最終要素の次を指すイテレータの取得</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[cbegin](/reference/unordered_set/unordered_set/cbegin.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>先頭要素を指す読み取り専用イテレータの取得</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[begin(size_type)](/reference/unordered_set/unordered_set/begin-size_type.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>インデックス（添え字）で指定したバケット内の先頭要素を指すイテレータを取得</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[end(size_type)](/reference/unordered_set/unordered_set/end-size_type.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>インデックス（添え字）で指定したバケット内の最終要素の次を指すイテレータを取得</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[cbegin(size_type)](/reference/unordered_set/unordered_set/cbegin-size_type.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>インデックス（添え字）で指定したバケット内の先頭要素を指す読み取り専用イテレータを取得</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[cend(size_type)](/reference/unordered_set/unordered_set/cend-size_type.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>インデックス（添え字）で指定したバケット内の最終要素の次を指す読み取り専用イテレータを取得</td>
</tr>
</tbody>
</table>