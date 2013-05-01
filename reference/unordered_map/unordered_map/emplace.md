#emplace
```cpp
<pre style='margin:0'><code style='color:black'>template <class... Args>
pair<iterator, bool> emplace(Args&&... args);</pre>
```

##概要

コンテナ内へ要素を直接構築する


##要件

このコンテナの要素型 <code style='color:black'>value_type</code> は、コンテナに対して引数 <code style='color:black'>args</code> から直接構築可能（EmplaceConstructible）でなければならない。

ここで、コンテナに対して引数 <code style='color:black'>args</code> から直接構築可能とは、<code style='color:black'>m</code> をアロケータ型 <code style='color:black'>allocator_type</code> の lvalue、<code style='color:black'>p</code> を要素型 <code style='color:black'>value_type</code> へのポインタとすると、以下の式が適格（well-formed）であるということである。

<blockquote><code style='color:black'>std::[allocator_traits](/site/cpprefjp/reference/memory/allocator_traits)[construct](/site/cpprefjp/reference/memory/allocator_traits/construct)(m, p, std::[forward](/reference/utility/forward.md)<Args>(args)...);</code></blockquote>

##効果

<code style='color:black'>std::[forward](/reference/utility/forward.md)<Args>(args)...</code> から構築された <code style='color:black'>value_type</code> のオブジェクトを <code style='color:black'>t</code> とすると、<code style='color:black'>t.first</code> と等価なキーがコンテナに既に存在していなければ、<code style='color:black'>t</code> をコンテナに挿入する。

なお、オブジェクト <code style='color:black'>t</code> は、構築後にコンテナにコピー、あるいはムーブされるわけではなく、コンテナ内に直接構築される。


##戻り値

<code style='color:black'>std::[pair](/reference/utility/pair.md)</code> の <code style='color:black'>bool</code> 部分（<code style='color:black'>second</code> 部）は、要素が追加されたら <code style='color:black'>true</code>、追加されなかったら（既にあったら）<code style='color:black'>false</code>。

<code style='color:black'>std::[pair](/reference/utility/pair.md)</code> の <code style='color:black'>iterator</code> 部分（<code style='color:black'>first</code> 部）は、追加された要素（<code style='color:black'>bool</code> 部分が <code style='color:black'>true</code> の場合）、あるいは、既にあった要素（<code style='color:black'>bool</code> 部分が <code style='color:black'>false</code> の場合）を指すイテレータ。


##例外

ハッシュ関数以外から例外が投げられた場合には、挿入はされない。


##計算量

平均的なケースでは定数（O(<code style='color:black'>1</code>)）だが、最悪のケースではコンテナの要素数に比例（O(<code style='color:black'>[size](/reference/unordered_map/unordered_map/size.md)</code>())）。


##備考


- この関数が呼ばれた後も、当該コンテナ内の要素を指す参照は無効にはならない。なお、標準に明確な記載は無いが、当該コンテナ内の要素を指すポインタも無効にはならない。
<li>この関数が呼ばれた後も、呼び出しの前後でこのコンテナのバケット数（<code style='color:black'>[bucket_count](bucket_count)()</code> の戻り値）が変わらなかった場合には当該コンテナを指すイテレータは無効にはならない。
それ以外の場合は、当該コンテナを指すイテレータは無効になる可能性がある。
コンテナのバケット数が変わらない場合とは、
<ol>

- 追加しようとした要素と等価なキーの要素が既にコンテナに存在したため、要素が追加されなかった（つまり、戻り値の <code style='color:black'>pair</code> の <code style='color:black'>bool</code> 部分が、<code style='color:black'>false</code> だった）。

- 要素追加後の要素数が、要素追加前のバケット数（<code style='color:black'>[bucket_count](bucket_count)()</code> の戻り値）×最大負荷率（<code style='color:black'>[max_load_factor](max_load_factor)()</code> の戻り値）よりも小さかった。
</ol>
のいずれかである。
なお、後者の条件は「よりも小さい」となっているが、最大負荷率の定義からすると「以下」の方が適切と思われる。<code style='color:black'>[reserve](reserve)</code> も参照。</li>
<li>このメンバ関数は、コンテナの種類によってシグネチャが異なるため、注意が必要である。
<code style='color:black'>emplace_hint</code> も含めた一覧を以下に示す。

| | |
|-------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------|
|シーケンスコンテナ |<code style='color:black'>template <class... Args><br/>iterator emplace(const_iterator, Args&&...)</code> |
|連想コンテナ、非順序連想コンテナ<br/>（同一キーの重複を許さない場合） |<code style='color:black'>template <class... Args><br/>pair<iterator, bool> emplace(Args&&...)</code> |
|連想コンテナ、非順序連想コンテナ<br/>（同一キーの重複を許す場合） |<code style='color:black'>template <class... Args><br/>iterator emplace(Args&&...)</code> |
|連想コンテナ、非順序連想コンテナ |<code style='color:black'>template <class... Args><br/>iterator emplace_hint(const_iterator, Args&&...)</code> |

</li>


##例

```cpp
<pre style='margin:0'><code style='color:black'>#include <iostream>
#include <unordered_map>
#include <string>
#include <complex>
#include <tuple>
#include <utility>    // for std::pair
#include <algorithm>  // for std::for_each

int main()
{
  std::unordered_map<std::string, std::complex<double>> um;
  std::cout << std::boolalpha;

  auto p1 = um.emplace("e", 2.718281828);
  std::cout << '{' << p1.first->first << ',' << p1.first->second << "} " << p1.second << '\n';
  auto p2 = um.emplace("pi", 3.14159265);
  std::cout << '{' << p2.first->first << ',' << p2.first->second << "} " << p2.second << '\n';
  auto p3 = um.emplace("pi", 3);
  std::cout << '{' << p3.first->first << ',' << p3.first->second << "} " << p3.second << '\n';

  auto p4 = um.emplace(std::piecewise_construct, std::forward_as_tuple("i"), std::forward_as_tuple(0, 1));
  std::cout << '{' << p4.first->first << ',' << p4.first->second << "} " << p4.second << '\n';

  std::for_each(um.cbegin(), um.cend(), [](const decltype(um)::value_type& v) {
    std::cout << '{' << v.first << ',' << v.second << "}, ";
  });
  std::cout << std::endl;
}</pre>
```
* iostream[link /site/cpprefjp/reference/iostream]
* unordered_map[link /reference/unordered_map.md]
* string[link /reference/string.md]
* complex[link /reference/complex.md]
* tuple[link /reference/tuple.md]
* utility[link /reference/utility.md]
* pair[link /reference/utility/pair.md]
* algorithm[link /reference/algorithm.md]
* for_each[link /reference/algorithm/for_each.md]
* piecewise_construct[link /reference/utility/piecewise_construct.md]
* forward_as_tuple[link /reference/tuple/tuple/forward_as_tuple.md]
* cbegin[link /reference/unordered_map/unordered_map/cbegin.md]
* cend[link /reference/unordered_map/unordered_map/cend.md]

###出力

```cpp
<pre style='margin:0'><code style='color:black'>{e,(2.71828,0)} true
{pi,(3.14159,0)} true
{pi,(3.14159,0)} false
{i,(0,1)} true
{pi,(3.14159,0)}, {i,(0,1)}, {e,(2.71828,0)},</pre>
```

注：<code style='color:black'>[unordered_map](/reference/unordered_map/unordered_map.md)</code> は非順序連想コンテナであるため、出力順序は無意味であることに注意


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
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[emplace_hint](emplace_hint)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>挿入位置のヒントを使用したコンテナ内への要素の直接構築</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[insert](insert)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>要素の追加</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[bucket_count](bucket_count)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>バケット数の取得</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[load_factor](load_factor)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>現在の負荷率（バケットあたりの要素数の平均）を取得</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[max_load_factor](max_load_factor)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>負荷率の最大値を取得、設定</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[rehash](rehash)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>最小バケット数指定によるバケット数の調整</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[reserve](reserve)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>最小要素数指定によるバケット数の調整</td>
</tr>
</tbody>
</table>