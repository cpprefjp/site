#max_size
```cpp
<pre style='margin:0'><code style='color:black'>size_type max_size() const noexcept;
</pre>
```

##概要

格納可能な最大の要素数を取得する。


##戻り値

このコンテナに格納可能な最大の要素数


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
  std::unordered_set<int> us;
  std::unordered_set<int>::size_type s = us.max_size();

  std::cout << s << std::endl;
}</pre>
```
* iostream[link /site/cpprefjp/reference/iostream]
* unordered_set[link /reference/unordered_set.md]

###出力

```cpp
<pre style='margin:0'><code style='color:black'>2305843009213693951</pre>
```

##バージョン


###言語

- C++11

###処理系

- [Clang](/implementation#clang.md): -

- [Clang, C++0x mode](/implementation#clang.md): 3.0, 3.1

- [GCC](/implementation#gcc.md): -

- [GCC, C++0x mode](/implementation#gcc.md): 4.4.7, 4.5.3, 4.6.3, 4.7.0

- [ICC](/implementation#icc.md): ?

- [Visual C++](/implementation#visual_cpp.md): ?

###備考

libstdc++ では、コンテナのアロケータ <code style='color:black'>allocator_type</code> にメンバ関数 <code style='color:black'>max_size</code> が無いとコンパイル時エラーが発生する。
（<code style='color:black'>allocator_type::max_size</code> を <code style='color:black'>std::[allocator_traits](/site/cpprefjp/reference/memory/allocator_traits)[max_size](/site/cpprefjp/reference/memory/allocator_traits/max_size)</code> 経由ではなく直接使用しているため。）


##参照

<table style='border-collapse:collapse;border-color:rgb(136,136,136);border-width:1px' cellspacing='0' bordercolor='#888' border='1'>
<tbody>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[empty](/reference/unordered_set/unordered_set/empty.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>コンテナが空かどうかを判定</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[size](/reference/unordered_set/unordered_set/size.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>要素数の取得</td>
</tr>
</tbody>
</table>