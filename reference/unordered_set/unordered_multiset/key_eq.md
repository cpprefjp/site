#key_eq
```cpp
<pre style='margin:0'><code style='color:black'>key_equal key_eq() const;</pre>
```

##概要

コンテナのキー比較用関数オブジェクトを返す


##戻り値

コンテナのキー比較用関数オブジェクト。

このメンバ関数で返されるキー比較用関数オブジェクトは、コンストラクタ、あるいは、直近の代入（コピー、あるいはムーブ）、交換でコンテナに保存されたオブジェクトのコピーである。


##計算量

定数


##備考

戻り値の型である、キー比較用関数オブジェクトの型 <code style='color:black'>key_equal</code> は、<code style='color:black'>[unordered_multiset](/reference/unordered_set/unordered_multiset.md)</code> のメンバ型で、三番目のテンプレートパラメータ <code style='color:black'>Pred</code> を <code style='color:black'>typedef</code> したものである。

キー比較用関数オブジェクトは、名前の通りキーを比較するためのオブジェクトで、与えられた二つのキーが等しいときには <code style='color:black'>true</code>、等しくないときには <code style='color:black'>false</code> を返すメンバ関数 <code style='color:black'>bool operator()(key_type, key_type)</code>を持つ必要がある。

テンプレートパラメータを省略した場合、<code style='color:black'>key_equal</code> はデフォルト値 <code style='color:black'>std::[equal_to](/reference/functional/comparisons.md)<key_type></code> となる。


##例

```cpp
<pre style='margin:0'><code style='color:black'>#include <iostream>
#include <unordered_set>

int main()
{
  std::cout << std::boolalpha;

  std::unordered_multiset<int> um{ 1, 2, 3, 4, 5, 6, };

  decltype(um)::key_equal eq{ um.key_eq() };

  std::cout << "eq(1, 2) = " << eq(1, 2) << std::endl;
  std::cout << "eq(1, 1) = " << eq(1, 1) << std::endl;
}</pre>
```
* iostream[link /site/cpprefjp/reference/iostream]
* unordered_set[link /reference/unordered_set.md]
* unordered_multiset[link /reference/unordered_set/unordered_multiset/unordered_multiset.md]

###出力

```cpp
<pre style='margin:0'><code style='color:black'>eq(1, 2) = false
eq(1, 1) = true</pre>
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
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[equal_to](/reference/functional/comparisons.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>等値比較演算関数オブジェクト(class template)</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[hash_function](/reference/unordered_set/unordered_multiset/hash_function.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>ハッシュ関数オブジェクトの取得</td>
</tr>
</tbody>
</table>