#is_heap
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

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
* std::is_heap[color ff0000]
* std::vector[link /reference/vector.md]
* std::cout[link /reference/iostream/cout.md]
* std::boolalpha[link /reference/ios/boolalpha.md]
* std::endl[link /reference/ostream/endl.md]
* v.begin()[link /reference/vector/begin.md]
* v.end()[link /reference/vector/end.md]
* std::make_heap[link make_heap.md]

###出力
```
before: is heap? false
 after: is heap? true
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
    - 9.0では、`_HAS_TRADITIONAL_STL`を1に定義してから`<algorithm>`をインクルードすると、`stdext`名前空間で`is_heap`が定義される。


##参照
- [N2246 2 of the least crazy ideas for the standard library in C++0x](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2246.html)
