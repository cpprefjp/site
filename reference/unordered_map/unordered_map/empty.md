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
#include <string>
#include <unordered_map>

int main()
{
  std::cout << std::boolalpha;

  std::unordered_map<std::string, int> um;

  // 空
  std::cout << um.empty() << std::endl;

  um.[emplace](emplace)("1st", 1);

  // 空ではない
  std::cout << um.empty() << std::endl;

  um.[clear](clear)();

  // 空
  std::cout << um.empty() << std::endl;

}</pre>
```
* iostream[link /site/cpprefjp/reference/iostream]
* string[link /reference/string.md]
* unordered_map[link /reference/unordered_map.md]

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
inline bool unordered_map<Key, Hash, Pred, Allocator>::empty() const noexcept {
  return [size](size)() == 0; // begin() == end() でも OK
}</pre>
```
* begin[link /reference/unordered_map/unordered_map/begin.md]
* end[link /reference/unordered_map/unordered_map/end.md]

##参照

<table style='border-collapse:collapse;border-color:rgb(136,136,136);border-width:1px' cellspacing='0' bordercolor='#888' border='1'>
<tbody>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[size](size)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>要素数の取得</td>
</tr>
<tr style='height:17px'>
<td style='padding:1px 0.5em;vertical-align:baseline'><code style='color:black'>[max_size](max_size)</code></td>
<td style='padding:1px 0.5em;vertical-align:baseline'>格納可能な最大の要素数の取得</td>
</tr>
</tbody>
</table>