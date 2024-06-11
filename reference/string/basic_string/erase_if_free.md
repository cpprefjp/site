# erase_if
* string[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class CharT, class Traits, class Allocator, class Predicate>
  constexpr typename basic_string<CharT, Traits, Allocator>::size_type
    erase_if(basic_string<CharT, Traits, Allocator>& c, Predicate pred);
}
```

## 概要
指定した条件に合致する要素とその分の領域を、コンテナから削除する。


## 効果
以下と等価：

```
auto it = remove_if(c.begin(), c.end(), pred);
auto r = distance(it, c.end());
c.erase(it, c.end());
return r;
```
* c.erase[link erase.md]
* remove_if[link /reference/algorithm/remove_if.md]
* distance[link /reference/iterator/distance.md]
* c.begin()[link begin.md]
* c.end()[link end.md]


## 戻り値
削除した要素数を返す。


## 例
```cpp example
#include <iostream>
#include <string>

int main()
{
  std::string s = " Hello World ";

  // コンテナsから、スペースをすべて削除する
  std::erase_if(s, [](char c) { return c == ' '; });

  std::cout << s << std::endl;
}
```
* std::erase_if[color ff0000]

### 出力
```
HelloWorld
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
