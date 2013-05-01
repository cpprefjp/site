#reserve
```cpp
<pre style='margin:0'><code style='color:black'>void reserve(size_type n);</pre>
```

##概要

コンテナが、リハッシュされずに少なくとも引数 <code style='color:black'>n</code> で指定された要素数格納できるようにバケット数を調整（リハッシュ）する。（ただし、備考を参照）


##事後条件

<code style='color:black'>[bucket_count](/reference/unordered_set/unordered_multiset/bucket_count.md)() > [size](/reference/unordered_set/unordered_multiset/size.md)() / [max_load_factor](/reference/unordered_set/unordered_multiset/max_load_factor.md)()</code> かつ、<code style='color:black'>[bucket_count](/reference/unordered_set/unordered_multiset/bucket_count.md)() >= [ceil](/site/cpprefjp/reference/cmath/ceil)(n / [max_load_factor](/reference/unordered_set/unordered_multiset/max_load_factor.md)())</code>。


##戻り値

なし


##例外

ハッシュ関数、および、キー比較用関数以外から例外が投げられた場合、コンテナは変更されない。


##計算量

平均的なケースでは <code style='color:black'>[size](/reference/unordered_set/unordered_multiset/size.md)()</code> に比例するが、最悪のケースでは <code style='color:black'>[size](/reference/unordered_set/unordered_multiset/size.md)()</code> の 2 乗に比例する。


##備考


- 本関数は、概要の通り、リハッシュされずに引数 <code style='color:black'>n</code> で指定された要素数格納できるように意図されているはずであるが、現在の条件では <code style='color:black'>n - 1</code> しか格納することができない場合がある（少なくとも、事後条件を満たすだけでは確実に <code style='color:black'>n</code> 要素を格納できる保証はない）。この件については、既に Issue が上がっている（[2156. Unordered containers' reserve(n) reserves for n-1 elements](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-active.html#2156)）。リハッシュされる条件については、<code style='color:black'>[insert](/reference/unordered_set/unordered_multiset/insert.md)()</code>、<code style='color:black'>[emplace](/reference/unordered_set/unordered_multiset/emplace.md)()</code>、<code style='color:black'>[emplace_hint](/reference/unordered_set/unordered_multiset/emplace_hint.md)()</code> も参照。
<li>リハッシュが行われた場合、

- 全てのイテレータが無効になる。

- 要素間の順番が変わる。

- 要素の格納されているバケットが変更になる。

- 要素へのポインタや参照は無効に<strong style='color:red'>ならない</strong>。

</li>

- 現在のバケット数が既に <code style='color:black'>[ceil](/site/cpprefjp/reference/cmath/ceil)(n / [max_load_factor](/reference/unordered_set/unordered_multiset/max_load_factor.md)())</code> 以上の場合の動作は、標準では特に規定されていない。

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

  // 現在の要素数より大きな値を指定する。
  um.reserve(100);
  std::cout << "bucket_count is " << um.bucket_count() << std::endl;

  // 現在の要素数よりは大きく、現在のバケット数 / max_load_factor() よりは小さい値を指定する。
  um.reserve(20);
  std::cout << "bucket_count is " << um.bucket_count() << std::endl;

  // 現在の要素数より小さい値を指定する。
  um.reserve(1);
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
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[rehash](./reserve.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>最小バケット数指定によるバケット数の調整</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[insert](/reference/unordered_set/unordered_multiset/insert.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>要素の追加</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[emplace](/reference/unordered_set/unordered_multiset/emplace.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>コンテナ内への要素の直接構築</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[emplace_hint](/reference/unordered_set/unordered_multiset/emplace_hint.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>挿入位置のヒントを使用したコンテナ内への要素の直接構築</td>
</tr>
</tbody>
</table>