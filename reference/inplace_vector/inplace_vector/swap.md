# swap
* inplace_vector[meta header]
* std[meta namespace]
* inplace_vector[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr void swap(inplace_vector& x)
  noexcept(N == 0 || (is_nothrow_swappable_v<T> &&
                      is_nothrow_move_constructible_v<T>)); // (1) C++26
```

## 概要
他の`inplace_vector`オブジェクトとデータを入れ替える。


## 効果
`*this`と`x`の要素を入れ替える。


## 例外
`N == 0`、もしくは要素型`T`がnothrowでswap可能かつnothrowでムーブ構築可能な場合は、例外を投げない。


## 計算量
[`size()`](size.md)と`x.`[`size()`](size.md)の大きいほうに対して線形時間。

[`std::vector`](/reference/vector/vector.md)の[`swap()`](/reference/vector/vector/swap.md)が定数時間であるのとは異なり、`inplace_vector`では要素の交換が必要なため線形時間となる。


## 備考
swapにより全てのイテレータが無効化される。


## 例
```cpp example
#include <print>
#include <inplace_vector>

int main()
{
  std::inplace_vector<int, 5> v1 = {1, 2, 3};
  std::inplace_vector<int, 5> v2 = {4, 5};

  v1.swap(v2);

  std::print("v1:");
  for (int x : v1) std::print(" {}", x);
  std::println("");

  std::print("v2:");
  for (int x : v2) std::print(" {}", x);
  std::println("");
}
```
* swap[color ff0000]

### 出力
```
v1: 4 5
v2: 1 2 3
```

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 23 [mark verified]
- [GCC](/implementation.md#gcc): 16 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]

## 参照
- [P0843R14 `inplace_vector`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p0843r14.html)
