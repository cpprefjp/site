#clear
```cpp
<pre style='margin:0'><code style='color:black'>void clear() noexcept;</pre>
```

##概要

コンテナ内のすべての要素を削除する。


##要件

無し。


##効果

コンテナ内のすべての要素を削除する。


##事後条件

<code style='color:black'>[empty](/reference/unordered_set/unordered_multiset/empty.md)() == true</code>


##戻り値

無し。


##例外

投げない。


##計算量

線形


##例

```cpp
<pre style='margin:0'>#include <iostream>
#include <unordered_set>

int main()
{
  std::unordered_multiset<int> um{ 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, };

  std::cout << std::boolalpha;
  std::cout << um.empty() << std::endl;
  um.clear();
  std::cout << um.empty() << std::endl;
}</pre>
```
* iostream[link /site/cpprefjp/reference/iostream]
* unordered_set[link /reference/unordered_set.md]
* unordered_multiset[link /reference/unordered_set/unordered_multiset/unordered_multiset.md]
* empty[link /reference/unordered_set/unordered_multiset/empty.md]

###出力

```cpp
<pre style='margin:0'><code style='color:black'>false
true</pre>
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
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[empty](/reference/unordered_set/unordered_multiset/empty.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>コンテナが空かどうかを判定</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[emplace](/reference/unordered_set/unordered_multiset/emplace.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>コンテナ内への要素の直接構築</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[emplace_hint](/reference/unordered_set/unordered_multiset/emplace_hint.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>挿入位置のヒントを使用したコンテナ内への要素の直接構築</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[insert](/reference/unordered_set/unordered_multiset/insert.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>要素の追加</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[erase](/reference/unordered_set/unordered_multiset/erase.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>要素の削除</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[swap](/reference/unordered_set/unordered_multiset/swap.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>内容の交換</td>
</tr>
</tbody>
</table>