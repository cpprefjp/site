#is_sorted_until (C++11)
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
* is_sorted_until[color ff0000]

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
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??


