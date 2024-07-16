# operator*
* iterator[meta header]
* std[meta namespace]
* move_iterator[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
reference operator*() const;           // C++11
constexpr reference operator*() const; // C++17
```

## 概要
イテレータを間接参照し、ムーブして返す。


## 戻り値

- C++17まで
    - `std::move(*base())`
- C++20
    - `return ranges::`[`iter_move`](/reference/iterator/iter_move.md)`(`[`base`](base.md)`());`



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
  std::unique_ptr<int> p = *it;

  std::cout << *p << std::endl;
}
```
* v.emplace_back[link /reference/vector/vector/emplace_back.md]
* std::make_move_iterator[link /reference/iterator/make_move_iterator.md]

### 出力
```
0
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0031R0 A Proposal to Add Constexpr Modifiers to `reverse_iterator`, `move_iterator`, `array` and Range Access](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0031r0.html)
- [P0896R4 The One Ranges Proposal (was Merging the Ranges TS)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)
