# erase_if
* map[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class Key, class T, class Compare, class Allocator, class Predicate>
  void erase_if(multimap<Key, T, Compare, Allocator>& c, Predicate pred);
}
```

## 概要
指定した条件に合致する要素とその分の領域を、コンテナから削除する。

述語関数オブジェクトには、キーではなく、要素全体 (キーと値の組) が渡されるので注意。


## 効果
以下と等価：

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
#include <map>

int main()
{
  std::multimap<int, char> m = {
    {3, 'a'},
    {1, 'b'},
    {4, 'c'}
  };

  // コンテナmから、キー'a'をもつ要素をすべて削除する
  std::erase_if(m, [](const auto& x) { return x.first == 1; });

  for (const auto& [key, value] : m) {
    std::cout << key << ':' << value << std::endl;
  }
}
```
* std::erase_if[color ff0000]

### 出力
```
3:a
4:c
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
