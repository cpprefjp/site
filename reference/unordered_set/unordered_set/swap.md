#swap
```cpp
<pre style='margin:0'><code style='color:black'>void swap(unordered_set& v);</pre>
```

##概要

コンテナの内容を交換する。


##要件

コンテナの <code style='color:black'>key_equal</code> と <code style='color:black'>hasher</code> のオブジェクト（それぞれ <code style='color:black'>[key_eq](/reference/unordered_set/unordered_set/key_eq.md)()</code> と <code style='color:black'>[hash_function](/reference/unordered_set/unordered_set/hash_function.md)()</code> が返すオブジェクト）は、交換可能（swappable）でなければならない。


##効果

当該コンテナと引数で渡されたコンテナの内容を交換する。
（計算量が示すように）個々の要素それぞれに対するコピー、ムーブ、交換は行われない。
また、コンテナの <code style='color:black'>key_equal</code> と <code style='color:black'>hasher</code> のオブジェクト（それぞれ <code style='color:black'>[key_eq](/reference/unordered_set/unordered_set/key_eq.md)()</code> と <code style='color:black'>[hash_function](/reference/unordered_set/unordered_set/hash_function.md)()</code> が返すオブジェクト）も非メンバ関数 <code style='color:black'>[swap](/reference/utility/swap.md)</code> を非修飾で（つまり <code style='color:black'>std::</code> を付けずに）呼び出すことで交換される。（したがって、<code style='color:black'>[swap](/reference/utility/swap.md)</code> の呼び出しには ADL が働く。）
もし、<code style='color:black'>std::[allocator_traits](/site/cpprefjp/reference/memory/allocator_traits)[get_allocator](/reference/unordered_set/unordered_set/get_allocator.md)()</code> が返すオブジェクト）も非メンバ関数 <code style='color:black'>[swap](/reference/utility/swap.md)</code> を非修飾で呼び出すことで交換される。そうでなければアロケータオブジェクトは交換されず、その場合、当該コンテナと引数 <code style='color:black'>v</code> がそれぞれ <code style='color:black'>[get_allocator](/reference/unordered_set/unordered_set/get_allocator.md)()</code> で返すオブジェクトが等価でない（<code style='color:black'>operator==</code> が <code style='color:black'>true</code> を返さない）場合、振る舞いは未定義（undefined）である。


##戻り値

無し


##例外

コンテナの <code style='color:black'>key_equal</code> と　<code style='color:black'>hasher</code> のオブジェクト（それぞれ <code style='color:black'>[key_eq](/reference/unordered_set/unordered_set/key_eq.md)()</code> と <code style='color:black'>[hash_function](/reference/unordered_set/unordered_set/hash_function.md)()</code> が返すオブジェクト）の <code style='color:black'>[swap](/reference/utility/swap.md)()</code> が例外を投げなければ、例外を投げない。


##計算量

定数


##備考

交換されたコンテナの要素を指す参照、ポインタ、および、イテレータはいずれも無効とはならない。なお、<code style='color:black'>[end](/reference/unordered_set/unordered_set/end.md)()</code> は要素を指さないため、無効になるかもしれない。


##例

```cpp
<pre style='margin:0'><code style='color:black'>#include <iostream>
#include <unordered_set>
#include <iterator>
#include <algorithm>
#include <string>

template <class C>
void print(const std::string& label, const C& c, std::ostream& os = std::cout)
{
  os << label << " : ";
  std::copy(c.begin(), c.end(), std::ostream_iterator<typename C::value_type>(os, " "));
  os << std::endl;
}

int main()
{
  std::unordered_set<int> us1{ 1, 3, 5, 7, 9, };
  std::unordered_set<int> us2{ 0, 2, 4, 6, 8, };

  print("us1 before", us1);
  print("us2 before", us2);
  std::cout << std::endl;

  us1.swap(us2);

  print("us1 after", us1);
  print("us2 after", us2);
}</pre>
```
* iostream[link /site/cpprefjp/reference/iostream]
* unordered_set[link /reference/unordered_set.md]
* iterator[link /reference/iterator.md]
* algorithm[link /reference/algorithm.md]
* string[link /reference/string.md]
* ostream[link /site/cpprefjp/reference/ostream]
* copy[link /reference/algorithm/copy.md]
* begin[link /reference/unordered_set/unordered_set/begin.md]
* end[link /reference/unordered_set/unordered_set/end.md]
* ostream_iterator[link /reference/iterator/ostream_iterator.md]

###出力

```cpp
<pre style='margin:0'><code style='color:black'>us1 before : 9 7 5 3 1
us2 before : 8 6 4 2 0

us1 after : 8 6 4 2 0
us2 after : 9 7 5 3 1</pre>
```

注：<code style='color:black'>[unordered_set](/reference/unordered_set/unordered_set.md)</code> は非順序連想コンテナであるため、出力順序は無意味であることに注意


##バージョン


###言語

- C++11

###処理系

- [Clang](/implementation#clang.md): -

- [Clang, C++0x mode](/implementation#clang.md): 3.1

- [GCC](/implementation#gcc.md): -

- [GCC, C++0x mode](/implementation#gcc.md): 4.7.2

- [ICC](/implementation#icc.md): ?

- [Visual C++](/implementation#visual_cpp.md): ?

##参照

<table style='border-collapse:collapse;border-color:rgb(136,136,136);border-width:1px' cellspacing='0' bordercolor='#888' border='1'>
<tbody>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[swap](/reference/unordered_set/unordered_set/swap_free.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>内容の交換（非メンバ関数）</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[emplace](/reference/unordered_set/unordered_set/emplace.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>コンテナ内への要素の直接構築</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[emplace_hint](/reference/unordered_set/unordered_set/emplace_hint.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>挿入位置のヒントを使用したコンテナ内への要素の直接構築</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[insert](/reference/unordered_set/unordered_set/insert.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>要素の追加</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[erase](/reference/unordered_set/unordered_set/erase.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>要素の削除</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[clear](/reference/unordered_set/unordered_set/clear.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>全要素の削除</td>
</tr>
</tbody>
</table>