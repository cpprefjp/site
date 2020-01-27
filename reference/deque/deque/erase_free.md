# erase (非メンバ関数)
* deque[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class T, class Allocator, class U>
  void erase(deque<T, Allocator>& c, const U& value);
}
```

## 概要
指定した値をもつ要素とその分の領域を、コンテナから削除する。


## 効果
以下と�価：

```
c.erase(remove(c.begin(), c.end(), value), c.end());
```
* c.erase[link erase.md]
* remove[link /reference/algorithm/remove.md]
* c.begin()[link begin.md]
* c.end()[link end.md]


## 戻り値
なし


## 例
```cpp example
#include <iostream>
#include <deque>

int main()
{
  std::deque<int> deq = {3, 1, 4, 1, 5};

  // コンテナdeqから、値1をもつ要素をすべて削除する
  std::erase(deq, 1);

  for (int x : deq) {
    std::cout << x << std::endl;
  }
}
```
* std::erase[color ff0000]

### 出力
```
3
4
5
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
