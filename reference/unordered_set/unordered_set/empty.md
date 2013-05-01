#empty
```cpp
<pre style='margin:0'><code style='color:black'>bool empty() const noexcept;</pre>
```

##概要

コンテナが空かどうかを判定する。


##戻り値

コンテナが空であれば <code style='color:black'>true</code>、そうでなければ <code style='color:black'>false</code> を返す。


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
  std::cout << std::boolalpha;

  std::unordered_set<int> us;

  // 空
  std::cout << us.empty() << std::endl;

  us.insert(1);

  // 空ではない
  std::cout << us.empty() << std::endl;

  us.clear();

  // 空
  std::cout << us.empty() << std::endl;

}</pre>
```
* iostream[link /site/cpprefjp/reference/iostream]
* unordered_set[link /reference/unordered_set.md]
* insert[link /reference/unordered_set/unordered_set/insert.md]
* clear[link /reference/unordered_set/unordered_set/clear.md]

###出力

```cpp
<pre style='margin:0'><code style='color:black'>true
false
true
</pre>
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

##実装例

```cpp
<pre style='margin:0'><code style='color:black'>template <class Key, class Hash, class Pred, class Allocator>
inline bool unordered_set<Key, Hash, Pred, Allocator>::empty() const noexcept {
  return size() == 0; // begin() == end() でも OK
}</pre>
```
* size[link /reference/unordered_set/unordered_set/size.md]
* begin[link /reference/unordered_set/unordered_set/begin.md]
* end[link /reference/unordered_set/unordered_set/end.md]

##参照

<table style='border-collapse:collapse;border-color:rgb(136,136,136);border-width:1px' cellspacing='0' bordercolor='#888' border='1'>
<tbody>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[size](/reference/unordered_set/unordered_set/size.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>要素数の取得</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[max_size](/reference/unordered_set/unordered_set/max_size.md)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>格納可能な最大の要素数の取得</td>
</tr>
</tbody>
</table>