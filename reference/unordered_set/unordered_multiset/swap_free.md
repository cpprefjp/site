#swap (非メンバ関数) (C++11)
* unordered_set[meta header]
* std[meta namespace]

```cpp
namespace std {
  template <class Key, class Hash, class Pred, class Alloc>
  void swap(unordered_multiset<Key, Hash, Pred, Alloc>& x,
            unordered_multiset<Key, Hash, Pred, Alloc>& y);
}
```

##概要
2 つの `unordered_multiset` オブジェクトの内容を入れ替える。


##効果
`x.`[`swap`](./swap.md)`(y)` と同等。


##戻り値
なし


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
  std::unordered_multiset<int> um1{ 1, 2, 3, 1, 2, 3, };
  std::unordered_multiset<int> um2{ 4, 5, 6, 4, 5, 6, };

  print("um1 before", um1);
  print("um2 before", um2);
  swap(um1, um2);
  print("um1 after", um1);
  print("um2 after", um2);
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
um1 before:3, 3, 2, 2, 1, 1,
um2 before:6, 6, 5, 5, 4, 4,
um1 after:6, 6, 5, 5, 4, 4,
um2 after:3, 3, 2, 2, 1, 1,
```

注：[`unordered_multiset`](/reference/unordered_set/unordered_multiset.md) は非順序連想コンテナであるため、出力順序は無意味であることに注意


##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): -
- [Clang, C++0x mode](/implementation.md#clang): 3.1
- [GCC](/implementation.md#gcc): -
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp) ?

##実装例
```cpp
namespace std {
  template <class Key, class Hash, class Pred, class Alloc>
  void swap(unordered_multiset<Key, Hash, Pred, Alloc>& x,
            unordered_multiset<Key, Hash, Pred, Alloc>& y)
  {
    x.swap(y);
  }
}
```
* swap[link ./swap.md]

##参照


| | |
|----------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------|
| [`swap`](./swap.md) | 内容の交換（メンバ関数） |
| [`operator=`](./op_assign.md) | 代入演算子 |
| [`operator==`](./op_equal.md) | 等値比較 |
| [`operator!=`](./op_not_equal.md) | 非等値比較 |

