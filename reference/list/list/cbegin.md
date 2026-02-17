# cbegin
* list[meta header]
* std[meta namespace]
* list[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
const_iterator cbegin() const noexcept;           // (1) C++11
constexpr const_iterator cbegin() const noexcept; // (1) C++26
```

## 概要
先頭の要素を指す読み取り専用イテレータを取得する。


## 戻り値
先頭要素を指す読み取り専用イテレータ


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <list>
#include <algorithm>

int main()
{
  std::list<int> ls = { 1, 2, 3 };

  // このアルゴリズム内ではlsの書き換えを決して行わない
  std::for_each(ls.cbegin(), ls.cend(), [](const int& x) {
    std::cout << x << std::endl;
  });
}
```
* cbegin()[color ff0000]
* ls.cend()[link cend.md]

### 出力
```
1
2
3
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2010 [mark verified]


## 参照
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
