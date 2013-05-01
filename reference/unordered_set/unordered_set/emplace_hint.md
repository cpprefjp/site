#emplace_hint
```cpp
<pre style='margin:0'><code style='color:black'>template <class... Args>
iterator emplace_hint(const_iterator position, Args&&... args);</pre>
```

##概要

挿入位置のヒントを使用してコンテナ内へ要素を直接構築する


##要件

<li>
このコンテナの要素型 <code style='color:black'>value_type</code> は、コンテナに対して引数 <code style='color:black'>args</code> から直接構築可能（EmplaceConstructible）でなければならない。
ここで、コンテナに対して引数 <code style='color:black'>args</code> から直接構築可能とは、<code style='color:black'>m</code> をアロケータ型 <code style='color:black'>allocator_type</code> の lvalue、<code style='color:black'>p</code> を要素型 <code style='color:black'>value_type</code> へのポインタとすると、以下の式が適格（well-formed）であるということである。

<blockquote><code style='color:black'>std::[allocator_traits](/site/cpprefjp/reference/memory/allocator_traits)[construct](/site/cpprefjp/reference/memory/allocator_traits/construct)(m, p, std::[forward](/reference/utility/forward.md)<Args>(args)...);</code></blockquote>
</li>

- 引数 <code style='color:black'>position</code> は、コンテナの有効な読み取り専用イテレータでなければならないが、間接参照可能（dereferenceable）である必要はない。（つまり、最終要素の次を指すイテレータでも良い）


##効果

<code style='color:black'>std::[forward](/reference/utility/forward.md)<Args>(args)...</code> から構築された <code style='color:black'>value_type</code> のオブジェクトを <code style='color:black'>t</code> とすると、<code style='color:black'>t</code> と等価なキーがコンテナに既に存在していなければ、<code style='color:black'>t</code> をコンテナに挿入する。

なお、オブジェクト <code style='color:black'>t</code> は、構築後にコンテナにコピー、あるいはムーブされるわけではなく、コンテナ内に直接構築される。

引数 <code style='color:black'>position</code> は、要素の挿入位置を探し始める場所のヒントとして使用されるが、実装によって無視されるかもしれない。


##戻り値

新たな要素が追加された場合、その追加された要素を指すイテレータ。新たな要素が追加されなかった場合、既にあった要素を指すイテレータ。


##例外

ハッシュ関数以外から例外が投げられた場合には、挿入はされない。


##計算量

平均的なケースでは定数（O(<code style='color:black'>1</code>)）だが、最悪のケースではコンテナの要素数に比例（O(<code style='color:black'>[size](/reference/unordered_set/unordered_set/size.md)</code>())）。


##備考


- この関数が呼ばれた後も、当該コンテナ内の要素を指す参照は無効にはならない。なお、標準に明確な記載は無いが、当該コンテナ内の要素を指すポインタも無効にはならない。
<li>この関数が呼ばれた後も、呼び出しの前後でこのコンテナのバケット数（<code style='color:black'>[bucket_count](/reference/unordered_set/unordered_set/bucket_count.md)()</code> の戻り値）が変わらなかった場合には当該コンテナを指すイテレータは無効にはならない。
それ以外の場合は、当該コンテナを指すイテレータは無効になる可能性がある。
コンテナのバケット数が変わらない場合とは、
<ol>

- 追加しようとした要素と等価なキーの要素が既にコンテナに存在したため、要素が追加されなかった。

- 要素追加後の要素数が、要素追加前のバケット数（<code style='color:black'>[bucket_count](/reference/unordered_set/unordered_set/bucket_count.md)()</code> の戻り値）×最大負荷率（<code style='color:black'>[max_load_factor](/reference/unordered_set/unordered_set/max_load_factor.md)()</code> の戻り値）よりも小さかった。
</ol>
のいずれかである。
なお、後者の条件は「よりも小さい」となっているが、最大負荷率の定義からすると「以下」の方が適切と思われる。<code style='color:black'>[reserve](/reference/unordered_set/unordered_set/reserve.md)</code> も参照。</li>
<li>このメンバ関数は、コンテナの種類によってシグネチャが異なるため、注意が必要である。
<code style='color:black'>emplace</code> も含めた一覧を以下に示す。

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
#include <unordered_set>
#include <string>
#include <utility>    // for std::pair
#include <algorithm>  // for std::copy
#include <iterator>   // for std::ostream_iterator

// サンプル用クラス
struct is : std::pair<int, std::string> {
  is(int i, const char* s) : std::pair<int, std::string>(i, s) {}
};

// サンプル用クラスのために std::hash を特殊化
namespace std {
  template <>
  struct hash<is> : private hash<int>, private hash<string> {
    size_t operator()(const is& v) const { return hash<int>::operator()(v.first) ^ hash<string>::operator()(v.second); }
  };
}

// サンプル用クラスのための挿入演算子
std::ostream& operator<<(std::ostream& os, const is& p)
{
  return os << '(' << p.first << ',' << p.second << ')';
}

int main()
{
  std::unordered_set<is> us{ {1, "1st"}, {2, "2nd"}, {3, "3rd"}, };

  // 初期状態の出力
  std::copy(us.cbegin(), us.cend(), std::ostream_iterator<is>(std::cout, ", "));
  std::cout << std::endl;

  auto it1 = us.emplace_hint(us.cend(), 4, "4th");
  std::cout << *it1 << '\n';
  auto it2 = us.emplace_hint(us.cbegin(), 5, "5th");
  std::cout << *it2 << '\n';
  auto it3 = us.emplace_hint(us.cbegin(), 1, "1st");
  std::cout << *it3 << '\n';

  // 追加結果の出力
  std::copy(us.cbegin(), us.cend(), std::ostream_iterator<is>(std::cout, ", "));
  std::cout << std::endl;
}
</pre>
```
* iostream[link /site/cpprefjp/reference/iostream]
* unordered_set[link /reference/unordered_set.md]
* string[link /reference/string.md]
* utility[link /reference/utility.md]
* pair[link /reference/utility/pair.md]
* algorithm[link /reference/algorithm.md]
* copy[link /reference/algorithm/copy.md]
* iterator[link /reference/iterator.md]
* ostream_iterator[link /reference/iterator/ostream_iterator.md]
* hash[link /reference/functional/hash.md]
* ostream[link /site/cpprefjp/reference/ostream]
* cbegin[link /reference/unordered_set/unordered_set/cbegin.md]
* cend[link /reference/unordered_set/unordered_set/cend.md]

###出力

```cpp
<pre style='margin:0'><code style='color:black'>(3,3rd), (2,2nd), (1,1st),
(4,4th)
(5,5th)
(1,1st)
(4,4th), (3,3rd), (2,2nd), (5,5th), (1,1st),</pre>
```

注：<code style='color:black'>[unordered_set](/reference/unordered_set/unordered_set.md)</code> は非順序連想コンテナであるため、出力順序は無意味であることに注意


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
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[emplace](/reference/unordered_set/unordered_set/emplace.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>コンテナ内への要素の直接構築</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[insert](/reference/unordered_set/unordered_set/insert.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>要素の追加</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[bucket_count](/reference/unordered_set/unordered_set/bucket_count.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>バケット数の取得</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[load_factor](/reference/unordered_set/unordered_set/load_factor.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>現在の負荷率（バケットあたりの要素数の平均）を取得</td>
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