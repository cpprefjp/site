# operator[]
* iterator[meta header]
* std[meta namespace]
* move_iterator[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
unspecified operator[](difference_type n) const;           // (1) C++11
constexpr unspecified operator[](difference_type n) const; // (1) C++17
constexpr reference operator[](difference_type n) const;   // (1) C++20
```
* unspecified[italic]

## 概要
任意の位置にランダムアクセスする。


## 戻り値
- (1) :
    - C++11 : `return std::`[`move`](/reference/utility/move.md)`(`[`base`](base.md)`()[n]);`
    - C++20 : `return ranges::`[`iter_move`](/reference/iterator/iter_move.md)`(`[`base`](base.md)`() + n);`


## 備考
- (1) :
    - C++11 : 戻り値の型は未規定である。[`base`](base.md)`()[n]`がプロキシオブジェクトを返す場合に、`reference` (`value_type&&`) へ暗黙変換すると、破棄済みの一時オブジェクトを参照しうるため
    - C++17 : `constexpr`が付加された
    - C++20 : 戻り値の型が`reference`となり、[`ranges::iter_move`](/reference/iterator/iter_move.md)を用いて規定されるようになった


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
  std::unique_ptr<int> p = it[2];

  std::cout << *p << std::endl;
}
```
* it[2][color ff0000]
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
- [P0896R4 The One Ranges Proposal (was Merging the Ranges TS)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)
- [LWG Issue 872. `move_iterator::operator[]` has wrong return type](https://cplusplus.github.io/LWG/issue872)
    - C++11の策定時に、戻り値の型が`reference`から未規定の型へ改められた。[`base`](base.md)`()[n]`がプロキシオブジェクトを返す場合、`reference` (`value_type&&`) への暗黙変換によって破棄済みの一時オブジェクトを参照しうるため
