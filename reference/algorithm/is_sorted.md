#is_sorted(C++11)

##概要
ソート済みか判定し、ソートされていない位置のイテレータを取得する

```cpp
namespace std {
  template <class ForwardIterator>
  bool is_sorted(ForwardIterator first, ForwardIterator last);
}
```

###戻り値
[`is_sorted_until`](/reference/algorithm/is_sorted_until.md)`(first, last) == last`

```cpp
namespace std {
  template<class ForwardIterator, class Compare>
  bool is_sorted(ForwardIterator first, ForwardIterator last, Compare comp);
}
```

###戻り値
[`is_sorted_until`](/reference/algorithm/is_sorted_until.md)`(first, last, comp) == last`

##例
```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main()
{
  std::vector<int> v = {3, 1, 4, 2, 5};

  std::cout << std::boolalpha;
  std::cout << "before: is sorted? " << std::is_sorted(v.begin(), v.end()) << std::endl;

  std::sort(v.begin(), v.end());

  std::cout << " after: is sorted? " << std::is_sorted(v.begin(), v.end()) << std::endl;
}
```
* is_sorted[color ff0000]

###出力
```
before: is sorted? false
 after: is sorted? true
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

