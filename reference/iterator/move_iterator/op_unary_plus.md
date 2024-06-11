# operator+
* iterator[meta header]
* std[meta namespace]
* move_iterator[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
move_iterator operator+(difference_type n) const;           // C++11
constexpr move_iterator operator+(difference_type n) const; // C++17
```

## 概要
イテレータを`n`回進める。


## 戻り値
`return move_iterator(`[`base`](base.md)`() + n);`


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

  auto it = std::make_move_iterator(v.begin());
  auto it2 = it + 2;
  std::unique_ptr<int> p = *it2;

  std::cout << *p << std::endl;
}
```
* it + 2[color ff0000]
* v.emplace_back[link /reference/vector/vector/emplace_back.md]
* std::make_move_iterator[link /reference/iterator/make_move_iterator.md]


### 出力
```
2
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.6.1 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0031R0 A Proposal to Add Constexpr Modifiers to `reverse_iterator`, `move_iterator`, `array` and Range Access](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0031r0.html)
