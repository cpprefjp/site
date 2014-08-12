#is_heap (C++11)
```cpp
namespace std {
  template <class RandomAccessIterator>
  bool is_heap(RandomAccessIterator first,
               RandomAccessIterator last); // (1)

  template <class RandomAccessIterator, class Compare>
  bool is_heap(RandomAccessIterator first,
               RandomAccessIterator last,
               Compare comp);              // (2)
}
```

##概要
範囲がヒープ化されているか判定する。


##戻り値
- (1) : [`is_heap_until`](/reference/algorithm/is_heap_until.md)`(first, last) == last`
- (2) : [`is_heap_until`](/reference/algorithm/is_heap_until.md)`(first, last, comp) == last`


##例
```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main()
{
  std::vector<int> v = {3, 1, 4};

  std::cout << std::boolalpha;

  std::cout << "before: is heap? "
            << std::is_heap(v.begin(), v.end()) << std::endl;

  std::make_heap(v.begin(), v.end());
  std::cout << " after: is heap? "
            << std::is_heap(v.begin(), v.end()) << std::endl;
}
```
* is_heap[color ff0000]

###出力
```
before: is heap? false
 after: is heap? true
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


