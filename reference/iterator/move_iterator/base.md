# base
* iterator[meta header]
* std[meta namespace]
* move_iterator[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
Iterator base() const;           // C++11
constexpr Iterator base() const; // C++17
```

## 概要
メンバ変数として保持している、元のイテレータを取得する。


## 戻り値
元のイテレータオブジェクトのコピー


## 例
```cpp example
#include <iostream>
#include <vector>
#include <memory>
#include <iterator>

int main()
{
  std::vector<std::unique_ptr<int>> v;
  for (int i = 0; i < 5; ++i)
    v.emplace_back(new int(i));

  std::move_iterator<decltype(v)::iterator> it1(v.begin());

  decltype(v)::iterator base = it1.base();
  std::cout << **base << std::endl;
}
```
* base()[color ff0000]
* v.emplace_back[link /reference/vector/vector/emplace_back.md]

### 出力
```
0
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0031R0 A Proposal to Add Constexpr Modifiers to `reverse_iterator`, `move_iterator`, `array` and Range Access](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0031r0.html)
- [P1207R4 Movability of Single-pass Iterators](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1207r4.pdf)
