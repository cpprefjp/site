#is_heap_until (C++11)
```cpp
namespace std {
  template <class RandomAccessIterator>
  RandomAccessIterator is_heap_until(RandomAccessIterator first, RandomAccessIterator last);

  template <class RandomAccessIterator, class Compare>
  RandomAccessIterator is_heap_until(RandomAccessIterator first, RandomAccessIterator last, Compare comp);
}
```

##概要
範囲がヒープ化されているか判定し、ヒープ化されていない最初の要素を指すイテレータを取得する


##戻り値
[`distance`](/reference/iterator/distance.md)`(first, last) < 2` の場合は `last` を返す。そうでない場合、`[first,last]` 内のイテレータ `i` について、`[first,i)` が `heap` であるような最後の `i` を返す。



##計算量
線形時間


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
            << (std::is_heap_until(v.begin(), v.end()) == v.end()) << std::endl;

  std::make_heap(v.begin(), v.end());
  std::cout << " after: is heap? "
            << (std::is_heap_until(v.begin(), v.end()) == v.end()) << std::endl;
}
```
* is_heap_until[color ff0000]

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


##実装例
```cpp
```

##参照

