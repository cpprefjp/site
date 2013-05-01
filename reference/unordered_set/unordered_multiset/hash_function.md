#hash_function
```cpp
<pre style='margin:0'><code style='color:black'>hasher hash_function() const;</pre>
```

##概要

コンテナのハッシュ関数オブジェクトを返す


##戻り値

コンテナのハッシュ関数オブジェクト。

このメンバ関数で返されるハッシュ関数オブジェクトは、コンストラクタ、あるいは、直近の代入（コピー、あるいはムーブ）、交換でコンテナに保存されたオブジェクトのコピーである。


##計算量

定数


##備考

戻り値の型である、ハッシュ関数オブジェクトの型 <code style='color:black'>hasher</code> は、<code style='color:black'>[unordered_multiset](/reference/unordered_set/unordered_multiset.md)</code> のメンバ型で、二番目のテンプレートパラメータ <code style='color:black'>Hash</code> を <code style='color:black'>typedef</code> したものである。

ハッシュ関数オブジェクトは、名前の通りハッシュ値を算出するためのオブジェクトで、キー値が与えられると <code style='color:black'>std::size_t</code> の値を返すメンバ関数 <code style='color:black'>std::size_t operator()(key_type)</code> を持つ必要がある。

また、<code style='color:black'>key_equal</code> が <code style='color:black'>true</code> を返すキー値に対しては、それらのキー値それぞれに対してハッシュ関数オブジェクト <code style='color:black'>hasher</code> が返す値も等しくなければならない。

なお、<code style='color:black'>key_equal</code> が <code style='color:black'>false</code> を返すキー値に対しては、それらのキー値それぞれに対してハッシュ関数オブジェクト <code style='color:black'>hasher</code> が返す値は必ずしも異なる必要はないが、可能な限り異なる値を返すべきである。

テンプレートパラメータを省略した場合、<code style='color:black'>hasher</code> はデフォルト値 <code style='color:black'>std::[hash](/reference/functional/hash.md)<key_type></code> となる。


##例

```cpp
<pre style='margin:0'><code style='color:black'>#include <iostream>
#include <unordered_set>

int main()
{
  std::unordered_multiset<int> um{ 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, };

  decltype(um)::hasher hash{ um.hash_function() };

  std::cout << "hash(1) = " << hash(1) << std::endl;
  std::cout << "hash(2) = " << hash(2) << std::endl;
}</pre>
```
* iostream[link /site/cpprefjp/reference/iostream]
* unordered_set[link /reference/unordered_set.md]
* unordered_multiset[link /reference/unordered_set/unordered_multiset/unordered_multiset.md]

###出力

```cpp
<pre style='margin:0'><code style='color:black'>hash(1) = 1
hash(2) = 2</pre>
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
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[hash](/reference/functional/hash.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>デフォルトのハッシュ関数オブジェクト(class template)</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[key_eq](/reference/unordered_set/unordered_multiset/key_eq.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>キー比較用関数オブジェクトの取得</td>
</tr>
</tbody>
</table>