#equal
```cpp
namespace std {
  template <class InputIterator1, class InputIterator2>
  bool equal(InputIterator1 first1, InputIterator1 last1,
             InputIterator2 first2);

  template <class InputIterator1, class InputIterator2, class BinaryPredicate>
  bool equal(InputIterator1 first1, InputIterator1 last1,
             InputIterator2 first2, BinaryPredicate pred);
}
```

###概要
2つの範囲を等値比較する。

###戻り値
`[first1,last1)` 内のイテレータ `i` について、`*i == *(first2 + (i - first1))` もしくは `pred(*i, *(first2 + (i - first1))) != false` が全てのイテレータ `i` について満たされているのであれば `true` を返す。
そうでない場合は `false` を返す。

###計算量

最大で `last1 - first1` 回の比較または述語が適用される。

###実装例
```cpp
template<class InputIterator1, class InputIterator2>
bool equal(InputIterator1 first1, InputIterator1 last1,
           InputIterator2 first2) {
  for ( ; first1 != last1; ++first1, ++first2)
    if (!bool(*first1 == *first2))
      return false;
  return true;
}

template<class InputIterator1, class InputIterator2, class BinaryPredicate>
bool equal(InputIterator1 first1, InputIterator1 last1,
           InputIterator2 first2, BinaryPredicate pred) {
  for ( ; first1 != last1; ++first1, ++first2)
    if (!bool(pred(*first1, *first2)))
      return false;
  return true;
}
```

###使用例
```cpp
#include <algorithm>
#include <iostream>
#include <vector>
#include <array>

int main() {
  std::vector<int>   v  = { 1,2,3,4,3,2 };
  std::array<int, 6> v2 = { 1,2,3,4,2,1 };

  // コンテナの中身が同じかどうか調べる
  bool result = std::equal(v.begin(), v.end(), v2.begin());
  std::cout << std::boolalpha << result << std::endl;

  // x±1 の誤差を許すようにする
  bool result2 = std::equal(v.begin(), v.end(), v2.begin(),
                            [](int x, int y) { return x - 1 <= y && y <= x + 1; });
  std::cout << std::boolalpha << result2 << std::endl;
}
```

###出力
```cpp
false
true
```

