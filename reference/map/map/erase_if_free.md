# erase_if
* map[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class Key, class T, class Compare, class Allocator, class Predicate>
  typename map<Key, T, Compare, Allocator>::size_type
    erase_if(map<Key, T, Compare, Allocator>& c, Predicate pred); // (1) C++20
  template <class Key, class T, class Compare, class Allocator, class Predicate>
  constexpr typename map<Key, T, Compare, Allocator>::size_type
    erase_if(map<Key, T, Compare, Allocator>& c, Predicate pred); // (1) C++26
}
```

## 概要
指定した条件に合致する要素とその分の領域を、コンテナから削除する。

述語関数オブジェクトには、キーではなく、要素全体 (キーと値の[`pair`](/reference/utility/pair.md)) が渡されるので注意。


## 効果
以下と等価：

```cpp
auto original_size = c.size();
for (auto i = c.begin(), last = c.end(); i != last;) {
  if (pred(*i)) {
    i = c.erase(i);
  } else {
    ++i;
  }
}
return original_size - c.size();
```
* c.begin()[link begin.md]
* c.end()[link end.md]
* c.erase[link erase.md]
* c.size()[link size.md]


## 戻り値
削除した要素数を返す。


## 例
```cpp example
#include <iostream>
#include <map>

int main()
{
  std::map<int, char> m = {
    {3, 'a'},
    {1, 'b'},
    {4, 'c'}
  };

  // コンテナmから、キー1をもつ要素をすべて削除する
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
- [Clang](/implementation.md#clang): 8.0 [mark verified]
- [GCC](/implementation.md#gcc): 9.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P1209R0 Adopt consistent container erasure from Library Fundamentals 2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p1209r0.html)
- [R1115R3 Improving the Return Value of Erase-Like Algorithms II: Free `erase`/`erase_if`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1115r3.pdf)
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
