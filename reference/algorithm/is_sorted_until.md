#is_sorted_until
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class ForwardIterator>
  ForwardIterator is_sorted_until(ForwardIterator first,
                                  ForwardIterator last);

  template <class ForwardIterator, class Compare>
  ForwardIterator is_sorted_until(ForwardIterator first,
                                  ForwardIterator last,
                                  Compare comp);
}
```

##概要
ソート済みか判定し、ソートされていない位置のイテレータを取得する


##戻り値
[`distance`](/reference/iterator/distance.md)`(first, last) < 2` なら `last` を返す。そうでない場合、`[first,last]` の中でソートされている範囲を `[first,i)` としたとき、そのイテレータ `i` を返す。


##計算量
線形時間


##例
```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main()
{
  std::vector<int> v = {3, 1, 4, 2, 5};

  std::cout << std::boolalpha;
  std::cout << "before: is sorted? "
            << (std::is_sorted_until(v.begin(), v.end()) == v.end()) << std::endl;

  std::sort(v.begin(), v.end());

  std::cout << " after: is sorted? "
            << (std::is_sorted_until(v.begin(), v.end()) == v.end()) << std::endl;
}
```
* std::is_sorted_until[color ff0000]
* std::sort[link sort.md]

###出力
```
before: is sorted? false
 after: is sorted? true
```


##実装例
```cpp
template <class ForwardIterator>
ForwardIterator is_sorted_until(ForwardIterator first, ForwardIterator last)
{
  auto it = first;
  if (it == last || ++it == last)
    return last;
  while (it != last && *first < *it)
    ++first, ++it;
  return it;
}
```


##バージョン
###言語
- C++11


###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 10.0, 11.0, 12.0, 14.0


##参照
- [N2246 2 of the least crazy ideas for the standard library in C++0x](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2246.html)

