#insert
```cpp
iterator insert(const value_type& v);                          // (1)
iterator insert(value_type&& rv);

iterator insert(const_iterator position, const value_type& v); // (2)
iterator insert(const_iterator position, value_type&& rv);

template <class InputIterator>
void insert(InputIterator first, InputIterator last);          // (3)

void insert(initializer_list<value_type> il);                  // (4)
```
* initializer_list[link /reference/initializer_list.md]

##概要

コンテナに要素を追加する。


##要件

<li><code style='color:black'>v</code> を引数にとる形式（(1)、(2)の上側）では、<code style='color:black'>value_type</code> はコンテナに対してコピー挿入可能（CopyInsertable）でなければならない。
コンテナに対してコピー挿入可能とは、<code style='color:black'>m</code> をアロケータ型 <code style='color:black'>allocator_type</code> の lvalue、<code style='color:black'>p</code> を要素型 <code style='color:black'>value_type</code> へのポインタとすると、以下の式が適格（well-formed）であるということである。
<blockquote>
<pre style='margin:0'><code style='color:black'>std::[allocator_traits](/site/cpprefjp/reference/memory/allocator_traits)[construct](/site/cpprefjp/reference/memory/allocator_traits/construct)(m, p, v);</code></pre>
</blockquote>
</li>
<li><code style='color:black'>rv</code> を引数にとる形式（(1)、(2)の下側）では、<code style='color:black'>value_type</code> はコンテナに対してムーブ挿入可能（MoveInsertable）でなければならない。
コンテナに対してムーブ挿入可能とは、<code style='color:black'>m</code> をアロケータ型 <code style='color:black'>allocator_type</code> の lvalue、<code style='color:black'>p</code> を要素型 <code style='color:black'>value_type</code> へのポインタとすると、以下の式が適格（well-formed）であるということである。
<blockquote>
<pre style='margin:0'><code style='color:black'>std::[allocator_traits](/site/cpprefjp/reference/memory/allocator_traits)[construct](/site/cpprefjp/reference/memory/allocator_traits/construct)(m, p, rv);</code></pre>
</blockquote>
</li>
<li>引数 <code style='color:black'>position</code> は、コンテナの有効な読み取り専用イテレータでなければならない。
なお、標準では間接参照可能（dereferenceable）である必要があることになっているが、その必要はない（つまり、最終要素の次を指すイテレータでも良い）ものと思われる。</li>
<li>引数 <code style='color:black'>first</code>、および、<code style='color:black'>last</code>は、入力イテレータの要件を満たし、かつ、範囲 <code style='color:black'>[first, last)</code> が当該コンテナ<strong>以外を指す</strong>有効な範囲でなければならない。
また、引数 <code style='color:black'>first</code>、および、<code style='color:black'>last</code> を引数にとる形式（(3)）では、このコンテナの要素型 <code style='color:black'>value_type</code> は、コンテナに対して <code style='color:black'>*first</code> から直接構築可能（EmplaceConstructible）でなければならない。
ここで、コンテナに対して <code style='color:black'>*first</code> から直接構築可能とは、<code style='color:black'>m</code> をアロケータ型 <code style='color:black'>allocator_type</code> の lvalue、<code style='color:black'>p</code> を要素型 <code style='color:black'>value_type</code> へのポインタとすると、以下の式が適格（well-formed）であるということである。
<blockquote><code style='color:black'>std::[allocator_traits](/site/cpprefjp/reference/memory/allocator_traits)[construct](/site/cpprefjp/reference/memory/allocator_traits/construct)(m, p, *first);</code></blockquote>
なお、<code style='color:black'>first</code>、および、<code style='color:black'>last</code>は、標準では <code style='color:black'>value_type</code> を参照しなければならない（つまり、コンテナの <code style='color:black'>value_type</code> と <code style='color:black'>std::[iterator_traits](/reference/iterator/iterator_traits.md)<decltype(first)>::value_type</code> が同一の型でなければならない）ことになっているが、実際にはその必要はなく、上記の直接構築可能の要件を満たすだけで良いものと思われる。</li>

- (4)の形式では、<code style='color:black'>value_type</code> はコンテナに対してコピー挿入可能でなければならない。


##効果

- (1)	引数 <code style='font-size:10pt'>v</code>、あるいは <code style='font-size:10pt'>rv</code> で指定した値の要素を追加する。
- (2)	引数 <code style='font-size:10pt'>v</code>、あるいは <code style='font-size:10pt'>rv</code> で指定した値の要素を追加する。引数 `position` は、要素の挿入位置を探し始める場所のヒントとして使用されるが、実装によって無視されるかもしれない。
- (3)	範囲 <code style='font-size:10pt'>[first, last)</code> のすべての要素 <code style='font-size:10pt'>t</code> に対して、(1)の形式の <code style='font-size:10pt'>insert(t)</code> を呼び出した場合と同等である。
- (4)	(3)の形式を <code style='font-size:10pt'>insert(il.begin(), il.end())</code> として呼び出した場合と同等である。


##戻り値

- (1)	追加された要素を指すイテレータ。
- (2)	追加された要素を指すイテレータ。
- (3)	なし
- (4)	なし


##例外

単一要素の形式（(1)と(2)）では、ハッシュ関数以外から例外が投げられた場合には、挿入はされない。


##計算量

- (1)	平均的なケースでは定数（O(1)）だが、最悪のケースではコンテナの要素数 [`size()`](/reference/unordered_set/unordered_multiset/size.md) に比例（O(N)）。
- (2)	平均的なケースでは定数（O(1)）だが、最悪のケースではコンテナの要素数 [`size()`](/reference/unordered_set/unordered_multiset/size.md) に比例（O(N)）。
- (3)	平均的なケースでは引数の範囲の要素数 `std::[distance](/reference/iterator/distance.md)(first, last)` に比例（O(N)）するが、最悪のケースでは引数の範囲の要素数 `std::[distance](/reference/iterator/distance.md)(first, last)` とコンテナの要素数 [`size()`](/reference/unordered_set/unordered_multiset/size.md) に 1 加えたものの積に比例（O(`std::[distance](/reference/iterator/distance.md)(first, last) * ([size()](/reference/unordered_set/unordered_multiset/size.md) + 1)`)）。
- (4)	(3)の形式を `insert(il.begin(), il.end())` として呼び出した場合と同等。


##備考

- これら関数が呼ばれた後も、当該コンテナ内の要素を指す参照は無効にはならない。なお、標準に明確な記載は無いが、当該コンテナ内の要素を指すポインタも無効にはならない。
<li>これら関数が呼ばれた後も、呼び出しの前後でこのコンテナのバケット数（<code style='color:black'>[bucket_count](/reference/unordered_set/unordered_multiset/bucket_count.md)()</code> の戻り値）が変わらなかった場合には当該コンテナを指すイテレータは無効にはならない。
それ以外の場合は、当該コンテナを指すイテレータは無効になる可能性がある。
コンテナのバケット数が変わらない場合とは、要素追加後の要素数が、要素追加前のバケット数（<code style='color:black'>[bucket_count](/reference/unordered_set/unordered_multiset/bucket_count.md)()</code> の戻り値）×最大負荷率（<code style='color:black'>[max_load_factor](/reference/unordered_set/unordered_multiset/max_load_factor.md)()</code> の戻り値）よりも小さかった場合である。
なお、後者の条件は「よりも小さい」となっているが、最大負荷率の定義からすると「以下」の方が適切と思われる。<code style='color:black'>[reserve](/reference/unordered_set/unordered_set/reserve.md)</code> も参照。</li>

##例

```cpp
<pre style='margin:0'><code style='color:black'>#include <iostream>
#include <unordered_set>
#include <forward_list>
#include <iterator>
#include <algorithm>
#include <string>

template <class C>
void print(const std::string& label, const C& c)
{
  std::cout << label << " : ";
  std::copy(c.begin(), c.end(), std::ostream_iterator<typename C::value_type>(std::cout, " "));
  std::cout << std::endl;
}

int main()
{
  // 一つの要素を挿入（(1)の形式）
  {
    std::unordered_multiset<int> um{ 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, };

    auto it1 = um.insert(6); // 重複のないケース
    std::cout << *it1 << ' ';
    auto it2 = um.insert(2); // 重複のあるケース
    std::cout << *it2 << std::endl;
    print("insert one element", um);
  }

  // 一つの要素を挿入（(2)の形式）
  {
    std::unordered_multiset<int> um{ 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, };

    auto it1 = um.insert(um.begin(), 6); // 重複のないケース
    std::cout << *it1 << ' ';
    auto it2 = um.insert(um.begin(), 2); // 重複のあるケース
    std::cout << *it2 << std::endl;
    print("insert one element with hint", um);
  }

  // 複数の要素を挿入（(3)の形式）
  {
    std::unordered_multiset<int> um{ 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, };

    std::forward_list<int> fl{ 5, 6, 0, 8, 7, };
    um.insert(fl.cbegin(), fl.cend()); // forward_list の要素を全部
    print("insert range", um);
  }

  // 複数の要素を挿入（(4)の形式）
  {
    std::unordered_multiset<int> um{ 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, };

    um.insert({ 5, 6, 0, 8, 7, });
    print("insert initializer_list", um);
  }
}</pre>
```
* iostream[link /site/cpprefjp/reference/iostream]
* unordered_set[link /reference/unordered_set.md]
* forward_list[link /reference/forward_list.md]
* iterator[link /reference/iterator.md]
* algorithm[link /reference/algorithm.md]
* string[link /reference/string.md]
* copy[link /reference/algorithm/copy.md]
* begin[link /reference/unordered_set/unordered_multiset/begin.md]
* end[link /reference/unordered_set/unordered_multiset/end.md]
* ostream_iterator[link /reference/iterator/ostream_iterator.md]
* unordered_multiset[link /reference/unordered_set/unordered_multiset/unordered_multiset.md]
* cbegin[link /reference/forward_list/cbegin.md]
* cend[link /reference/forward_list/cend.md]

###出力

```cpp
<pre style='margin:0'><code style='color:black'>6 2
insert one element : 6 5 5 4 4 3 3 2 2 2 1 1 0 0
6 2
insert one element with hint : 6 5 5 4 4 3 3 2 2 2 1 1 0 0
insert range : 7 8 6 5 5 5 4 4 3 3 2 2 1 1 0 0 0
insert initializer_list : 7 8 6 5 5 5 4 4 3 3 2 2 1 1 0 0 0</pre>
```

注：<code style='color:black'>[unordered_multiset](/reference/unordered_set/unordered_multiset.md)</code> は非順序連想コンテナであるため、出力順序は無意味であることに注意


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

##実装例

(2)以降の形式は、(1)の形式を使って実装することができる。

```cpp
<pre style='margin:0'><code style='color:black'>template <class Key, class Hash, class Pred, class Allocator>
inline iterator unordered_multiset<Key, Hash, Pred, Allocator>::insert(const_iterator, const value_type& v)
{
  return insert(v);
}

template <class Key, class Hash, class Pred, class Allocator>
inline iterator unordered_multiset<Key, Hash, Pred, Allocator>::insert(const_iterator, value_type&& rv)
{
  return insert(std::move(rv));
}

template <class Key, class Hash, class Pred, class Allocator>
template <class InputIterator>
inline void unordered_multiset<Key, Hash, Pred, Allocator>::insert(InputIterator first, InputIterator last);
{
  for (; first != last; ++first)
    insert(*first);
}

template <class Key, class Hash, class Pred, class Allocator>
inline void unordered_multiset<Key, Hash, Pred, Allocator>::insert(initializer_list<Key> il);
{
  insert(il.begin(), il.end());
}</pre>
```
* move[link /reference/utility/move.md]
* initializer_list[link /reference/initializer_list.md]
* begin[link /site/cpprefjp/reference/initializer_list/begin]
* end[link /site/cpprefjp/reference/initializer_list/end]

##参照

<table style='border-collapse:collapse;border-color:rgb(136,136,136);border-width:1px' cellspacing='0' bordercolor='#888' border='1'>
<tbody>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'>[<code style='color:black'>emplace</code>](/reference/unordered_set/unordered_multiset/emplace.md)</td>
<td style='padding:1px 0.5em;vertical-align:baseline'>コンテナ内への要素の直接構築</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'>[<code style='color:black'>emplace_hint</code>](/reference/unordered_set/unordered_multiset/emplace_hint.md)</td>
<td style='padding:1px 0.5em;vertical-align:baseline'>挿入位置のヒントを使用したコンテナ内への要素の直接構築</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'>[<code style='color:black'>bucket_count</code>](/reference/unordered_set/unordered_multiset/bucket_count.md)</td>
<td style='padding:1px 0.5em;vertical-align:baseline'>バケット数の取得</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'>[<code style='color:black'>load_factor</code>](/reference/unordered_set/unordered_multiset/load_factor.md)</td>
<td style='padding:1px 0.5em;vertical-align:baseline'>現在の負荷率（バケットあたりの要素数の平均）を取得</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'>[<code style='color:black'>max_load_factor</code>](/reference/unordered_set/unordered_multiset/max_load_factor.md)</td>
<td style='padding:1px 0.5em;vertical-align:baseline'>負荷率の最大値を取得、設定</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'>[<code style='color:black'>rehash</code>](/reference/unordered_set/unordered_multiset/rehash.md)</td>
<td style='padding:1px 0.5em;vertical-align:baseline'>最小バケット数指定によるバケット数の調整</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'>[<code style='color:black'>reserve</code>](/reference/unordered_set/unordered_multiset/reserve.md)</td>
<td style='padding:1px 0.5em;vertical-align:baseline'>最小要素数指定によるバケット数の調整</td>
</tr>
</tbody>
</table>