#make_heap
```cpp
namespace std {
  template <class RandomAccessIterator>
  void make_heap(RandomAccessIterator first, RandomAccessIterator last);

  template <class RandomAccessIterator, class Compare>
  void make_heap(RandomAccessIterator first, RandomAccessIterator last, Compare comp);
}
```

##概要

範囲をヒープ化する



##要件

*first の型は MoveConstructible と MoveAssignable の要件を満たしている必要がある



##効果

[first,last) の範囲で heap を構築する


##戻り値

なし


##計算量

最大で 3 * (last - first) 回比較する



##備考



##例

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main()
{
  std::vector<int> v = {3, 1, 4};

  // ヒープ化する
  std::make_heap(v.begin(), v.end());

  std::for_each(v.begin(), v.end(), [](int x) {
    std::cout << x << std::endl;
  });
}
```
* make_heap[color ff0000]

###出力

```cpp
4
1
3
```

##実装例

```cpp
```

##参照
```