# uninitialized_fill_n
* memory[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template <no-throw-forward-iterator I, class T>
    requires constructible_from<iter_value_t<I>, const T&>
  I uninitialized_fill_n(I first, iter_difference_t<I> n, const T& x); // (1) C++20
}
```
* no-throw-forward-iterator[link no-throw-forward-iterator.md.nolink]
* constructible_from[link /reference/concepts/constructible_from.md]
* iter_value_t[link /reference/iterator/iter_value_t.md]
* iter_difference_t[link /reference/iterator/iter_difference_t.md]

## 概要
未初期化領域の範囲 (`[first, first + n)`) を、指定された値で配置`new`で初期化する。


## テンプレートパラメータ制約
- (1):
    - `I`が[`no-throw-forward-iterator`](no-throw-forward-iterator.md.nolink)である
    - `I`の要素型が、`const T&`型を引数として[構築可能](/reference/concepts/constructible_from.md)である


## 効果
以下と等価である：

```cpp
return uninitialized_fill(counted_iterator(first, n), default_sentinel, x).base();
```
* uninitialized_fill[link ranges_uninitialized_fill.md]
* counted_iterator[link /reference/iterator/counted_iterator.md]
* default_sentinel[link /reference/iterator/default_sentinel_t.md]
* base()[link /reference/iterator/counted_iterator/base.md]


## 例
```cpp example
#include <iostream>
#include <memory>
#include <algorithm>

int main()
{
  std::allocator<int> alloc;

  // メモリ確保。
  // この段階では、[p, p + size)の領域は未初期化
  const std::size_t size = 3;
  int* p = alloc.allocate(size);

  // 未初期化領域[p, p + size)を初期化しつつ、値2で埋める
  std::ranges::uninitialized_fill_n(p, size, 2);

  // pの領域が初期化され、かつ範囲pの全ての要素が2で埋められているか確認
  std::for_each(p, p + size, [](int x) {
    std::cout << x << std::endl;
  });

  // 要素を破棄
  for (std::size_t i = 0; i < size; ++i) {
    std::destroy_at(p + i);
  }

  // メモリ解放
  alloc.deallocate(p, size);
}
```
* std::ranges::uninitialized_fill_n[color ff0000]
* std::ranges::subrange[link /reference/ranges/subrange.md]
* std::allocator[link allocator.md]
* alloc.allocate[link allocator/allocate.md]
* std::destroy_at[link destroy_at.md]
* alloc.deallocate[link allocator/deallocate.md]

### 出力
```
2
2
2
```


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 16.0
- [GCC](/implementation.md#gcc): 10.2.0
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10


## 関連項目
- [`uninitialized_fill_n`](uninitialized_fill_n.md)

## 参照
- [P9896R4 The One Ranges Proposal](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)
