#max_bucket_count
```cpp
<pre style='margin:0'><code style='color:black'>size_type max_bucket_count() const noexcept;</pre>
```

##概要

コンテナで格納可能な最大のバケット数を返す。


##戻り値

コンテナで格納可能な最大のバケット数


##例外

投げない。


##計算量

定数


##例

```cpp
<pre style='margin:0'><code style='color:black'>#include <iostream>
#include <unordered_set>

int main()
{
  std::unordered_set<int> us{ 1, 3, 5, 7, 9, };

  std::cout << "max bucket count is " << us.max_bucket_count() << std::endl;
}</pre>
```
* iostream[link /site/cpprefjp/reference/iostream]
* unordered_set[link /reference/unordered_set.md]

###出力

```cpp
<pre style='margin:0'><code style='color:black'>max bucket count is 2305843009213693951</pre>
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
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[bucket_count](/reference/unordered_set/unordered_set/bucket_count.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>バケット数の取得</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[bucket_size](/reference/unordered_set/unordered_set/bucket_size.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>インデックス（添え字）で指定したバケット内の要素数を取得</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[bucket](/reference/unordered_set/unordered_set/bucket.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>キーで指定したバケットのインデックス（添え字）を取得</td>
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