#size
```cpp
<pre style='margin:0'><code style='color:black'>size_type size() const noexcept;</pre>
```

##概要

要素数を取得する。


##戻り値

現在 <code style='color:black'>unordered_map</code> オブジェクトに格納されている要素の数


##例外

投げない。


##計算量

定数


##例

```cpp
<pre style='margin:0'><code style='color:black'>#include <iostream>
#include <string>
#include <unordered_map>

int main()
{
  std::unordered_map<std::string, int> um{ { "1st", 3 }, { "2nd", 1 }, { "3rd", 4 }, { "4th", 5 }, { "5th", 2 }, };

  // 要素数を出力
  std::cout << um.size() << std::endl;

  // 以下も要素数を出力するが、計算量は定数ではない（線形時間）
  std::cout << std::distance(um.begin(), um.end()) << std::endl;
}</pre>
```
* iostream[link /site/cpprefjp/reference/iostream]
* string[link /reference/string.md]
* unordered_map[link /reference/unordered_map.md]
* distance[link /reference/iterator/distance.md]
* begin[link /reference/unordered_map/unordered_map/begin.md]
* end[link /reference/unordered_map/unordered_map/end.md]

###出力

```cpp
<pre style='margin:0'><code style='color:black'>5
5</pre>
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

<table style='border-collapse:collapse;border-color:rgb(136,136,136);border-width:1px' cellspacing='0' bordercolor='#888' border='1'>
<tbody>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[empty](/reference/unordered_map/unordered_map/empty.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>コンテナが空かどうかを判定</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[max_size](max_size)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>格納可能な最大の要素数の取得</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[begin](/reference/unordered_map/unordered_map/begin.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>先頭要素を指すイテレータの取得</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[end](/reference/unordered_map/unordered_map/end.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>最終要素の次を指すイテレータの取得</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[distance](/reference/iterator/distance.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>イテレータ間の距離を求める</td>
</tr>
</tbody>
</table>