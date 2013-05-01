#is_permutation
```cpp
namespace std {
  template <class ForwardIterator1, class ForwardIterator2>
  bool is_permutation(ForwardIterator1 first1,
                      ForwardIterator1 last1,
                      ForwardIterator2 first2);

  template <class ForwardIterator1, class ForwardIterator2, class BinaryPredicate>
  bool is_permutation(ForwardIterator1 first1,
                      ForwardIterator1 last1,
                      ForwardIterator2 first2,
                      BinaryPredicate pred);
}
```

##概要

<b>first2で始まる範囲が、[first1, last1)の範囲の順列か判定する。</b>


##要件

`decltype(*first1)`と`decltype(*first2)`の型が同じであること。

`BinaryPredicate`は等価関係を持っていること。


##戻り値

`first2`で始まる範囲が、`[first1, last1)`の順列であれば`true`、そうでなければfalseを返す。


##計算量

[`equal`](/reference/algorithm/equal.md)(first1, last1, first2) == true`もしくは`[equal](/reference/algorithm/equal.md)(first1, last1, first2, pred) == true`の場合、`distance(first1, last1)回の述語適用で完了する。そうでなければ、`distance(first1, last1)`をNとした場合に最悪O(N^2)回の述語適用で完了する。


##備考



##例

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main ()
{
  std::vector<int> v = {1, 2, 3};

  std::vector<int> good = {2, 3, 1};
  std::vector<int> bad = {2, 3, 4};

  std::cout << std::boolalpha;
  std::cout << std::is_permutation(v.begin(), v.end(), good.begin()) << std::endl;
  std::cout << std::is_permutation(v.begin(), v.end(), bad.begin()) << std::endl;
}
```
* is_permutation[color ff0000]
* is_permutation[color ff0000]

###出力

```cpp
true
false
```

##バージョン


###言語


- C++11



###処理系

- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??<h4>備考</h4>
(処理系やライブラリのバグや不完全な実装などをここに書く。なければ備考欄を削除)



##実装例

```cpp
template <class ForwardIterator1, class ForwardIterator2>
bool is_permutation(ForwardIterator1 first1, ForwardIterator1 last1, ForwardIterator2 first2)
{
  auto const dist = std::distance(first1, last1);
  auto last2 = first2;
  std::advance(last2, dist);
 
  while (first1 != last1) {
    if (std::count(first1, last1, *first1) > std::count(first2, last2, *first1))
      return false;
    ++first1;
  }
  return true;
}
```

##参照


