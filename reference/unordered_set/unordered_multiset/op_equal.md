#operator==
```cpp
<pre style='margin:0'><code style='color:black'>namespace std {
  template <class Key, class Hash, class Pred, class Allocator>
  bool operator==(const unordered_multiset<Key, Hash, Pred, Allocator>& a,
                  const unordered_multiset<Key, Hash, Pred, Allocator>& b);
}</pre>
```

##概要

<code style='color:black'>unordered_multiset</code> オブジェクトを等値比較する。


##要件


- <code style='color:black'>a.[hash_function](/reference/unordered_set/unordered_multiset/hash_function.md)()</code> と <code style='color:black'>b.[hash_function](/reference/unordered_set/unordered_multiset/hash_function.md)()</code> は同じふるまいをすること。

- <code style='color:black'>a.[key_eq](/reference/unordered_set/unordered_multiset/key_eq.md)()</code> と <code style='color:black'>b.[key_eq](/reference/unordered_set/unordered_multiset/key_eq.md)()</code> は同じふるまいをすること。

- <code style='color:black'>key_type</code> の等値比較演算子（<code style='color:black'>operator==</code>）で等値と判定された 2 つのオブジェクトは、<code style='color:black'>[key_eq](/reference/unordered_set/unordered_multiset/key_eq.md)()</code> でも等値と判定されること。


##戻り値

以下の両方を満たす場合 <code style='color:black'>true</code>、そうでない場合 <code style='color:black'>false</code>。

  
- <code style='color:black'>a.[size](/reference/unordered_set/unordered_multiset/size.md)() == b.[size](/reference/unordered_set/unordered_multiset/size.md)()</code> である。
  
- 一方のコンテナの全ての要素が、他方のコンテナにも存在する。ここで、存在するとは、<code style='color:black'>key_type</code> の等値比較演算子（<code style='color:black'>operator==</code>）で等値と判定されるということである。


##計算量

平均的には O(<code style='color:black'>Σ(E<sub>i</sub><sup>2</sup>)</code>) だが、最悪のケースでは O(<code style='color:black'>n<sup>2</sup></code>)。ここで、<code style='color:black'>E<sub>i</sub></code> は <code style='color:black'>a</code> の <code style='color:black'>i</code> 番目の同値キーのグループの大きさ、<code style='color:black'>n = a.[size](/reference/unordered_set/unordered_multiset/size.md)()</code>。


##備考


- 本関数は、コンテナ内の要素の比較に <code style='color:black'>[key_eq](/reference/unordered_set/unordered_multiset/key_eq.md)()</code> で返されるキー比較用関数オブジェクトを使用しないことに注意。

- 本関数は、標準コンテナの要件を満たさない。これは、標準コンテナの要件が <code style='color:black'>iterator</code> と <code style='color:black'>std::[equal](/reference/algorithm/equal.md)</code> を用いて定義されているためである。しかし、本関数の戻り値は、両方のコンテナが同じ要素を保持しているという意味においては、標準コンテナと同様とも考えることができる。


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
  std::cout << std::boolalpha;

  std::unordered_multiset<int> um1{ 1, 2, 3, 1, 2, 3, };
  std::unordered_multiset<int> um2{ 4, 5, 6, 4, 5, 6, };
  std::unordered_multiset<int> um3{ 1, 2, 3, 1, 2, 3, };

  print("um1", um1);
  print("um2", um2);
  print("um3", um3);

  std::cout << "um1 == um2:" << (um1 == um2) << std::endl;
  std::cout << "um1 == um3:" << (um1 == um3) << std::endl;
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
* unordered_multiset[link /reference/unordered_set/unordered_multiset/unordered_multiset.md]

###出力

```cpp
<pre style='margin:0'><code style='color:black'>um1:3, 3, 2, 2, 1, 1,
um2:6, 6, 5, 5, 4, 4,
um3:3, 3, 2, 2, 1, 1,
um1 == um2:false
um1 == um3:true</pre>
```

注：<code style='color:black'>[unordered_multiset](/reference/unordered_set/unordered_multiset.md)</code> は非順序連想コンテナであるため、出力順序は無意味であることに注意


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
<pre style='margin:0'><code style='color:black'>namespace std {
  template <class Key, class Hash, class Pred, class Allocator>
  bool operator==(const unordered_multiset<Key, Hash, Pred, Allocator>& a,
                  const unordered_multiset<Key, Hash, Pred, Allocator>& b)
  {
    if (a.size() != b.size())
      return false;

    for (auto it = a.begin(), ae = a.end(); it != ae; ) {
      auto ap = a.equal_range(*it);
      auto bp = b.equal_range(*it);
      if (std::distance(ap.first, ap.second) != std::distance(bp.first, bp.second) ||
          !std::is_permutation(ap.first, ap.second, bp.first))
        return false;
      it = ap.second;
    }

    return true;
  }
}</pre>
```
* size[link /reference/unordered_set/unordered_multiset/size.md]
* begin[link /reference/unordered_set/unordered_multiset/begin.md]
* end[link /reference/unordered_set/unordered_multiset/end.md]
* equal_range[link /reference/unordered_set/unordered_multiset/equal_range.md]
* distance[link /reference/iterator/distance.md]
* is_permutation[link /reference/algorithm/is_permutation.md]

##参照


| | |
|--------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|
|<code style='color:black'>[operator!=](/reference/unordered_set/unordered_multiset/op_not_equal.md)</code> |非等値比較 |

