# swap (非メンバ関数)
* set[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  template <class Key, class Compare, class Allocator>
  void swap(set<Key, Compare, Allocator>& x,
            set<Key, Compare, Allocator>& y);
}
```

## 概要
2つの`set`オブジェクトを入れ替える。


## 効果
```cpp
x.swap(y);
```
* swap[link swap.md]

## 計算量
定数時間


## 例
```cpp
#include <iostream>
#include <set>

int main()
{
  std::set<int> c1, c2;

  c1.insert(10);
  c1.insert(20);
  c1.insert(30);

  c2.insert(5);
  c2.insert(15);

  std::swap(c1, c2);

  std::set<int>::iterator i = c1.begin();
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
