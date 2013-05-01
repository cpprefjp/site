#rehash
```cpp
<pre style='margin:0'><code style='color:black'>void rehash(size_type n);</pre>
```

##概要

コンテナのバケット数が最小でも引数 <code style='color:black'>n</code> で指定された値になるように調整（リハッシュ）する。


##事後条件

<code style='color:black'>[bucket_count](/reference/unordered_set/unordered_multiset/bucket_count.md)() > [size](/reference/unordered_set/unordered_multiset/size.md)() / [max_load_factor](/reference/unordered_set/unordered_multiset/max_load_factor.md)()</code> かつ、<code style='color:black'>[bucket_count](/reference/unordered_set/unordered_multiset/bucket_count.md)() >= n</code>。


##戻り値

なし


##例外

ハッシュ関数、および、キー比較用関数以外から例外が投げられた場合、コンテナは変更されない。


##計算量

平均的なケースでは <code style='color:black'>[size](/reference/unordered_set/unordered_multiset/size.md)()</code> に比例するが、最悪のケースでは <code style='color:black'>[size](/reference/unordered_set/unordered_multiset/size.md)()</code> の 2 乗に比例する。


##備考

<li>リハッシュが行われた場合、

- 全てのイテレータが無効になる。

- 要素間の順番が変わる。

- 要素の格納されているバケットが変更になる。

- 要素へのポインタや参照は無効に<strong style='color:red'>ならない</strong>。

</li>

- 現在のバケット数が <code style='color:black'>n</code> よりも大きい場合の動作は、標準では特に規定されていない。

- 標準では、事後条件が <code style='color:black'>[bucket_count](/reference/unordered_set/unordered_multiset/bucket_count.md)() > [size](/reference/unordered_set/unordered_multiset/size.md)() / [max_load_factor](/reference/unordered_set/unordered_multiset/max_load_factor.md)()</code> となっている（等号がない）が、<code style='color:black'>[load_factor](/reference/unordered_set/unordered_multiset/load_factor.md)()</code>（<code style='color:black'>= [size](/reference/unordered_set/unordered_multiset/size.md)() / [bucket_count](/reference/unordered_set/unordered_multiset/bucket_count.md)()</code>）の条件は <code style='color:black'>[max_load_factor](/reference/unordered_set/unordered_multiset/max_load_factor.md)() ><strong style='color:red'>=</strong> [load_factor](/reference/unordered_set/unordered_multiset/load_factor.md)()</code> である（等号がある）ため、<code style='color:black'>[bucket_count](/reference/unordered_set/unordered_multiset/bucket_count.md)() ><strong style='color:red'>=</strong> [size](/reference/unordered_set/unordered_multiset/size.md)() / [max_load_factor](/reference/unordered_set/unordered_multiset/max_load_factor.md)()</code> の（等号がある）方が適切であると思われる。


##例

```cpp
<pre style='margin:0'><code style='color:black'>#include <iostream>
#include <unordered_set>

int main()
{
  std::unordered_multiset<int> um{ 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, };

  std::cout << "size is " << um.size() << ", max_load_factor is " << um.max_load_factor() << std::endl;

  std::cout << "bucket_count is " << um.bucket_count() << std::endl;

  // 現在のバケット数より大きな値を指定する。
  um.rehash(100);
  std::cout << "bucket_count is " << um.bucket_count() << std::endl;

  // 現在の要素数 / max_load_factor() よりは大きく、現在のバケット数よりは小さい値を指定する。
  um.rehash(20);
  std::cout << "bucket_count is " << um.bucket_count() << std::endl;

  // 現在の要素数 / max_load_factor() より小さい値を指定する。
  um.rehash(1);
  std::cout << "bucket_count is " << um.bucket_count() << std::endl;
}</pre>
```
* iostream[link /site/cpprefjp/reference/iostream]
* unordered_set[link /reference/unordered_set.md]
* unordered_multiset[link /reference/unordered_set/unordered_multiset/unordered_multiset.md]
* size[link /reference/unordered_set/unordered_multiset/size.md]
* max_load_factor[link /reference/unordered_set/unordered_multiset/max_load_factor.md]
* bucket_count[link /reference/unordered_set/unordered_multiset/bucket_count.md]

###出力

```cpp
<pre style='margin:0'><code style='color:black'>size is 12, max_load_factor is 1
bucket_count is 23
bucket_count is 101
bucket_count is 23
bucket_count is 13</pre>
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
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[size](/reference/unordered_set/unordered_multiset/size.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>要素数の取得</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[bucket_count](/reference/unordered_set/unordered_multiset/bucket_count.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>バケット数の取得</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[load_factor](/reference/unordered_set/unordered_multiset/load_factor.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>現在の負荷率（バケットあたりの要素数の平均）を取得</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[max_load_factor](/reference/unordered_set/unordered_multiset/max_load_factor.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>負荷率の最大値を取得、設定</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[reserve](/reference/unordered_set/unordered_multiset/reserve.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>最小要素数指定によるバケット数の調整</td>
</tr>
</tbody>
</table>