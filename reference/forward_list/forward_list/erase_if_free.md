# erase_if
* forward_list[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class T, class Allocator, class Predicate>
  typename forward_list<T, Allocator>::size_type erase_if(forward_list<T, Allocator>& c, Predicate pred);
}
```

## 概要
指定した条件に合致する要素とその分の領域を、コンテナから削除する。


## 効果
以下と等価：

```cpp
c.remove_if(pred);
```
* c.remove_if[link remove_if.md]


## 戻り値
削除した要素数を返す。


## 例
```cpp example
#include <iostream>
#include <forward_list>

int main()
{
  std::forward_list<int> ls = {3, 1, 4, 5, 2};

  // コンテナlsから、偶数をすべて削除する
  std::erase_if(ls, [](int x) { return x % 2 == 0; });

  for (int x : ls) {
    std::cout << x << std::endl;
  }
}
```
* std::erase_if[color ff0000]

### 出力
```
3
1
5
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
