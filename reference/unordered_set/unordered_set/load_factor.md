#load_factor
```cpp
<pre style='margin:0'><code style='color:black'>float load_factor() const noexcept;</pre>
```

##概要

現在の負荷率（バケットあたりの要素数の平均）を取得する。


##戻り値

現在の負荷率（バケットあたりの要素数の平均：<code style='color:black'>[size](/reference/unordered_set/unordered_set/size.md)() / [bucket_count](/reference/unordered_set/unordered_set/bucket_count.md)()</code>）


##例外

投げない。


##計算量

定数。


##例

```cpp
<pre style='margin:0'><code style='color:black'>#include <iostream>
#include <unordered_set>
#include <algorithm>
#include <iterator>

template <class C>
void print(const C& c, std::ostream& os = std::cout)
{
  std::copy(c.begin(), c.end(), std::ostream_iterator<typename C::value_type>(os, ", "));
  os << "\nsize is " << c.size() << ", bucket_count is " << c.bucket_count() << ", load_factor is " << c.load_factor() << '\n' << std::endl;
}

int main()
{
  std::unordered_set<int> us{ 1, 3, 5, 7, 9, };

  print(us);

  us.insert({ 2, 4, 6, 8, 10, });

  print(us);
}</pre>
```
* iostream[link /site/cpprefjp/reference/iostream]
* unordered_set[link /reference/unordered_set.md]
* algorithm[link /reference/algorithm.md]
* iterator[link /reference/iterator.md]
* copy[link /reference/algorithm/copy.md]
* begin[link /reference/unordered_set/unordered_set/begin.md]
* end[link /reference/unordered_set/unordered_set/end.md]
* ostream_iterator[link /reference/iterator/ostream_iterator.md]
* size[link /reference/unordered_set/unordered_set/size.md]
* bucket_count[link /reference/unordered_set/unordered_set/bucket_count.md]
* insert[link /reference/unordered_set/unordered_set/insert.md]

###出力

```cpp
<pre style='margin:0'><code style='color:black'>9, 7, 5, 3, 1,
size is 5, bucket_count is 5, load_factor is 1

10, 8, 6, 4, 2, 9, 7, 5, 3, 1,
size is 10, bucket_count is 11, load_factor is 0.909091

</pre>
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
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[size](/reference/unordered_set/unordered_set/size.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>要素数の取得</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[bucket_count](/reference/unordered_set/unordered_set/bucket_count.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>バケット数の取得</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[max_load_factor](/reference/unordered_set/unordered_set/max_load_factor.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>負荷率の最大値を取得、設定</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[rehash](/reference/unordered_set/unordered_set/rehash.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>最小バケット数指定によるバケット数の調整</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[reserve](/reference/unordered_set/unordered_set/reserve.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>最小要素数指定によるバケット数の調整</td>
</tr>
</tbody>
</table>