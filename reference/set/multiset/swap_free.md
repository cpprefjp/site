# swap (非メンバ関数)
* set[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class Key, class Compare, class Allocator>
  void
    swap(multiset<Key, Compare, Allocator>& x,
         multiset<Key, Compare, Allocator>& y); // (1) C++03
  template <class Key, class Compare, class Allocator>
  void
    swap(multiset<Key, Compare, Allocator>& x,
         multiset<Key, Compare, Allocator>& y)
      noexcept(noexcept(x.swap(y)));            // (1) C++17
  template <class Key, class Compare, class Allocator>
  constexpr void
    swap(multiset<Key, Compare, Allocator>& x,
         multiset<Key, Compare, Allocator>& y)
      noexcept(noexcept(x.swap(y)));            // (1) C++26
}
```

## 概要
2つの`multiset`オブジェクトを入れ替える。


## 効果
```cpp
x.swap(y);
```
* swap[link swap.md]

## 計算量
定数時間


## 例
```cpp example
#include <iostream>
#include <set>

int main()
{
  std::multiset<int> c1, c2;

  c1.insert(10);
  c1.insert(20);
  c1.insert(30);

  c2.insert(5);
  c2.insert(15);

  std::swap(c1, c2);

  std::multiset<int>::iterator i = c1.begin();
  while (i != c1.end()) {
    std::cout << *(i++) << ",";
  }
  std::cout << std::endl;
}
```
* std::swap[color ff0000]
* insert[link insert.md]
* c1.begin()[link begin.md]
* c1.end()[link end.md]

### 出力
```
5,15,
```

## 参照
- [N4258 Cleaning-up noexcept in the Library, Rev 3](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4258.pdf)
    - `noexcept` 追加の経緯となる提案文書
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
