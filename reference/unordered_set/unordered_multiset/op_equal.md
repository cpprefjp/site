#operator==
* unordered_set[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class Key, class Hash, class Pred, class Allocator>
  bool operator==(const unordered_multiset<Key, Hash, Pred, Allocator>& a,
                  const unordered_multiset<Key, Hash, Pred, Allocator>& b);
}
```

##概要
`unordered_multiset` オブジェクトを等値比較する。


##要件
- `a.`[`hash_function`](hash_function.md)`()` と `b.`[`hash_function`](hash_function.md)`()` は同じふるまいをすること。

- `a.`[`key_eq`](key_eq.md)`()` と `b.`[`key_eq`](key_eq.md)`()` は同じふるまいをすること。

- `key_type` の等値比較演算子（`operator==`）で等値と判定された 2 つのオブジェクトは、[`key_eq`](key_eq.md)`()` でも等値と判定されること。


##戻り値
以下の両方を満たす場合 `true`、そうでない場合 `false`。

- `a.`[`size`](size.md)`() == b.`[`size`](size.md)`()` である。
  
- 一方のコンテナの全ての要素が、他方のコンテナにも存在する。ここで、存在するとは、`key_type` の等値比較演算子（`operator==`）で等値と判定されるということである。


##計算量
平均的には O(Σ(E<sub>i</sub><sup>2</sup>)) だが、最悪のケースでは O(n<sup>2</sup>)。ここで、E<sub>i</sub> は `a` の `i` 番目の同値キーのグループの大きさ、`n = a.`[`size`](size.md)`()`。


##備考
- 本関数は、コンテナ内の要素の比較に [`key_eq`](key_eq.md)`()` で返されるキー比較用関数オブジェクトを使用しないことに注意。

- 本関数は、標準コンテナの要件を満たさない。これは、標準コンテナの要件が `iterator` と `std::`[`equal`](/reference/algorithm/equal.md) を用いて定義されているためである。しかし、本関数の戻り値は、両方のコンテナが同じ要素を保持しているという意味においては、標準コンテナと同様とも考えることができる。


##例
```cpp
#include <iostream>
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
}
```
* iostream[link /reference/iostream.md]
* string[link /reference/string.md]
* unordered_set[link /reference/unordered_set.md]
* iterator[link /reference/iterator.md]
* algorithm[link /reference/algorithm.md]
* ostream[link /reference/ostream.md]
* copy[link /reference/algorithm/copy.md]
* begin[link /reference/iterator/begin.md]
* end[link /reference/iterator/end.md]
* ostream_iterator[link /reference/iterator/ostream_iterator.md]
* unordered_multiset[link ../unordered_multiset.md]

###出力
```
um1:3, 3, 2, 2, 1, 1,
um2:6, 6, 5, 5, 4, 4,
um3:3, 3, 2, 2, 1, 1,
um1 == um2:false
um1 == um3:true
```

注：[`unordered_multiset`](/reference/unordered_set/unordered_multiset.md) は非順序連想コンテナであるため、出力順序は無意味であることに注意


##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): -
- [Clang, C++11 mode](/implementation.md#clang): 3.0, 3.1
- [GCC](/implementation.md#gcc): -
- [GCC, C++11 mode](/implementation.md#gcc): 4.4.7, 4.5.3, 4.6.3, 4.7.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): ?


##実装例
```cpp
namespace std {
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
}
```
* size[link size.md]
* begin[link begin.md]
* end[link end.md]
* equal_range[link equal_range.md]
* distance[link /reference/iterator/distance.md]
* is_permutation[link /reference/algorithm/is_permutation.md]

##参照

| | |
|--------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|
| [`operator!=`](op_not_equal.md) |非等値比較 |

