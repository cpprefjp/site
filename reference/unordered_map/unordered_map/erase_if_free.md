# erase_if
* unordered_map[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class K, class T, class H, class P, class A, class Predicate>
  void erase_if(unordered_map<K, T, H, P, A>& c, Predicate pred);
}
```

## 概要
指定した条件に合致する要素とその分の領域を、コンテナから削除する。

述語関数オブジェクトには、�ーではなく、要素全体 (�ーと値の組) が渡されるので注意。


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
#include <unordered_map>

int main()
{
  std::unordered_map<int, char> um = {
    {3, 'a'},
    {1, 'b'},
    {4, 'c'}
  };

  // コンテナumから、�ー1をもつ要素をすべて削除する
  std::erase_if(um, [](const auto& x) { return x.first == 1; });

  for (const auto& [key, value] : um) {
    std::cout << key << ':' << value << std::endl;
  }
}
```
* std::erase_if[color ff0000]

### 出力例
```
4:c
3:a
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
