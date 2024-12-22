# uninitialized_default_construct_n
* memory[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template <no-throw-forward-iterator I>
    requires default_initializable<iter_value_t<I>>
  I
    uninitialized_default_construct_n(I first,
                                      iter_difference_t<I> n); // (1) C++20
  template <no-throw-forward-iterator I>
    requires default_initializable<iter_value_t<I>>
  constexpr I
    uninitialized_default_construct_n(I first,
                                      iter_difference_t<I> n); // (1) C++26
}
```
* no-throw-forward-iterator[link no-throw-forward-iterator.md]
* default_initializable[link /reference/concepts/default_initializable.md]
* iter_value_t[link /reference/iterator/iter_value_t.md]
* iter_difference_t[link /reference/iterator/iter_difference_t.md]

## 概要
未初期化領域の範囲 (`[first, first + n)`) の各要素をデフォルト構築する。


## テンプレートパラメータ制約
- (1):
    - `I`が[`no-throw-forward-iterator`](no-throw-forward-iterator.md)である
    - `I`の要素型が、[デフォルト構築可能](/reference/concepts/default_initializable.md)である


## 効果
以下と等価である：

```cpp
return uninitialized_default_construct(counted_iterator(first, n),
                                       default_sentinel).base();
```
* uninitialized_default_construct[link ranges_uninitialized_default_construct.md]
* counted_iterator[link /reference/iterator/counted_iterator.md]
* default_sentinel[link /reference/iterator/default_sentinel_t.md]
* base()[link /reference/iterator/counted_iterator/base.md]

## 例外

呼び出すコンストラクタなどから例外がスローされた場合、その例外がこの関数の外側に伝播される前に、その時点で構築済のオブジェクトは全て未規定の順序で破棄される。すなわち、例外がスローされた場合は初期化対象領域は未初期化のままとなる。

## 例
```cpp example
#include <iostream>
#include <memory>
#include <algorithm>

struct Vector {
  int x, y;
};

int main()
{
  std::allocator<Vector> alloc;

  // メモリ確保。
  // この段階では、[p, p + size)の領域は未初期化
  const std::size_t size = 3;
  Vector* p = alloc.allocate(size);

  // 未初期化領域[p, p + size)の各要素をデフォルト構築
  std::ranges::uninitialized_default_construct_n(p, size);

  // pの領域が初期化され、かつ範囲pの全ての要素が2で埋められているか確認
  std::for_each(p, p + size, [](const Vector& v) {
    std::cout << v.x << ',' << v.y << std::endl;
  });

  // 要素を破棄
  std::ranges::destroy_n(p, size);

  // メモリ解放
  alloc.deallocate(p, size);
}
```
* std::ranges::uninitialized_default_construct_n[color ff0000]
* std::allocator[link allocator.md]
* alloc.allocate[link allocator/allocate.md]
* std::ranges::destroy_n[link ranges_destroy_n.md]
* alloc.deallocate[link allocator/deallocate.md]

### 出力例
```
1445540552,1445540279
0,1445540279
0,1445540279
```


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 16.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.2.0 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]


## 関連項目
- [`uninitialized_default_construct_n`](uninitialized_default_construct_n.md)

## 参照
- [P0896R4 The One Ranges Proposal](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)
- [P3508R0 Wording for "constexpr for specialized memory algorithms"](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p3508r0.html)
- [P3369R0 `constexpr` for `uninitialized_default_construct`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p3369r0.html)
    - 上記2文書で、C++26から`constexpr`がついた
