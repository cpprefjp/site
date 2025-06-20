# erase (非メンバ関数)
* deque[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class T, class Allocator, class U>
  typename deque<T, Allocator>::size_type
    erase(deque<T, Allocator>& c, const U& value); // (1) C++20
  template <class T, class Allocator, class U = T>
  typename deque<T, Allocator>::size_type
    erase(deque<T, Allocator>& c, const U& value); // (1) C++26
}
```

## 概要
指定した値をもつ要素とその分の領域を、コンテナから削除する。


## 効果
以下と等価：

```cpp
auto it = remove(c.begin(), c.end(), value);
auto r = distance(it, c.end());
c.erase(it, c.end());
return r;
```
* c.erase[link erase.md]
* remove[link /reference/algorithm/remove.md]
* distance[link /reference/iterator/distance.md]
* c.begin()[link begin.md]
* c.end()[link end.md]


## 戻り値
削除した要素数を返す。


## 備考
- (1) :
    - C++26 : 引数として波カッコ初期化`{}`を受け付ける
        ```cpp
        std::deque<std::vector<int>> d;
        erase(d, {}); // 空の要素を削除
        erase(d, {1, 2, 3}); // 値{1, 2, 3}をもつ要素を削除
        ```


## 例
### 基本的な使い方
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

#### 出力
```
3
4
5
```

### 波カッコ初期化を入力として使用する (C++26)
```cpp example
#include <print>
#include <deque>
#include <vector>

int main() {
  std::deque<std::vector<int>> d = {
    {1, 2, 3},
    {4, 5, 6},
    {},
    {7, 8}
  };

  std::erase(d, {}); // 空の要素を削除
  std::erase(d, {1, 2, 3}); // 値{1, 2, 3}をもつ要素を削除

  std::println("{}", d);
}
```

#### 出力
```
[[4, 5, 6], [7, 8]]
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
- [P2248R8 Enabling list-initialization for algorithms](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2248r8.html)
    - C++26で波カッコ初期化 (リスト初期化) に対応した
