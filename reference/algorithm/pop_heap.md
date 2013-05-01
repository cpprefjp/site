#pop_heap
```cpp
namespace std {
  template <class RandomAccessIterator>
  void pop_heap(RandomAccessIterator first, RandomAccessIterator last);

  template <class RandomAccessIterator, class Compare>
  void pop_heap(RandomAccessIterator first, RandomAccessIterator last, Compare comp);
}
```

##概要

ヒープ化された範囲の先頭と末尾を入れ替え、ヒープ範囲を作り直す



##要件

[first,last) は empty でない heap でなければならない。
RandomAccessIterator は ValueSwappable の要件を満たしている必要がある。
*first の型は MoveConstructible と MoveAssignable の要件を満たしている必要がある。



##効果

first にある値を last - 1 と交換し、その後 [first,last - 1) が有効な heap となるように配置する。


##戻り値

なし



##計算量

最大で 2 * log(last - first) 回比較する



##備考



##例

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main()
{
  std::vector<int> v = {3, 1, 4};

  std::make_heap(v.begin(), v.end());

  // 最後尾要素を削除してヒープ化
  std::pop_heap(v.begin(), v.end());
  v.pop_back();

  std::sort_heap(v.begin(), v.end());

  std::for_each(v.begin(), v.end(), [](int x) {
    std::cout << x << std::endl;
  });
}
```
* pop_heap[color ff0000]

###出力

```cpp
1
3
```

##実装例

```cpp
```

##参照
```