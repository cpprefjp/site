# erase_if
* set[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class Key, class Compare, class Allocator, class Predicate>
  void erase_if(set<Key, Compare, Allocator>& c, Predicate pred);
}
```

## 概要
指定した条件に合致する要素とその分の領域を、コンテナから削除する。


## 効果
以下と�価：

```
for (auto i = c.begin(), last = c.end(); i != last;) {
  if (pred(*i)) {
    i = c.erase(i);
  } else {
    ++i;
  }
}
```
* c.begin()[link begin.md]
* c.end()[link end.md]
* c.erase[link erase.md]


## 戻り値
なし


## 例
```cpp example
#include <iostream>
#include <set>

int main()
{
  std::set<int> s = {3, 1, 4};

  // コンテナsから、�ー1をもつ要素をすべて削除する
  std::erase_if(s, [](int x) { return x == 1; });

  for (int x : s) {
    std::cout << x << std::endl;
  }
}
```
* std::erase_if[color ff0000]

### 出力
```
3
4
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 8.0
- [GCC](/implementation.md#gcc): 9.1
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P1209R0 | Adopt consistent container erasure from Library Fundamentals 2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p1209r0.html)
