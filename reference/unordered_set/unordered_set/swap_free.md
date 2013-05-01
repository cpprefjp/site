#swap(非メンバ関数)
```cpp
<pre style='margin:0'><code style='color:black'>namespace std {
  template <class Key, class Hash, class Pred, class Alloc>
  void swap(unordered_set<Key, Hash, Pred, Alloc>& x,
            unordered_set<Key, Hash, Pred, Alloc>& y);
}</pre>
```

##概要

2 つの <code style='color:black'>unordered_set</code> オブジェクトの内容を入れ替える。


##効果

<code style='color:black'>x.[swap](/reference/unordered_set/unordered_set/swap.md)(y)</code> と同等。


##戻り値

なし


##例

```cpp
<pre style='margin:0'><code style='color:black'>#include <iostream>
#include <string>
#include <unordered_set>
#include <iterator>
#include <algorithm>

template <class C>
void print(const std::string& label, const C& c, std::ostream& os = std::cout)
{
  os << label << ":";
  std::copy(std::begin(c), std::end(c), std::ostream_iterator<typename C::value_type>(os, ", "));
  os << std::endl;
}

int main()
{
  std::unordered_set<int> us1{ 1, 2, 3, };
  std::unordered_set<int> us2{ 4, 5, 6, };

  print("us1 before", us1);
  print("us2 before", us2);
  swap(us1, us2);
  print("us1 after", us1);
  print("us2 after", us2);
}</pre>
```
* iostream[link /site/cpprefjp/reference/iostream]
* string[link /reference/string.md]
* unordered_set[link /reference/unordered_set.md]
* iterator[link /reference/iterator.md]
* algorithm[link /reference/algorithm.md]
* ostream[link /site/cpprefjp/reference/iostream/ostream]
* copy[link /reference/algorithm/copy.md]
* begin[link /reference/iterator/begin.md]
* end[link /reference/iterator/end.md]
* ostream_iterator[link /reference/iterator/ostream_iterator.md]

###出力

```cpp
<pre style='margin:0'><code style='color:black'>us1 before:3, 2, 1,
us2 before:6, 5, 4,
us1 after:6, 5, 4,
us2 after:3, 2, 1,</pre>
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

- [Visual C++](/implementation#visual_cpp.md) ?

##実装例

```cpp
<pre style='margin:0'><code style='color:black'>namespace std {
  template <class Key, class Hash, class Pred, class Alloc>
  void swap(unordered_set<Key, Hash, Pred, Alloc>& x,
            unordered_set<Key, Hash, Pred, Alloc>& y)
  {
    x.swap(y);
  }
}</pre>
```
* swap[link /reference/unordered_set/unordered_set/swap.md]

##参照


| | |
|-----------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------|
|<code style='color:black'>[swap](/reference/unordered_set/unordered_set/swap.md)</code> |内容の交換（メンバ関数） |
|<code style='color:black'>[operator=](/reference/unordered_set/unordered_set/op_assign.md)</code> |代入演算子 |
|<code style='color:black'>[operator==](op_equal)</code> |等値比較 |
|<code style='color:black'>[operator=!](op_not_equal)</code> |非等値比較 |
