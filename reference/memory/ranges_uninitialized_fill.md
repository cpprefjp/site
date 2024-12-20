# uninitialized_fill
* memory[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template <no-throw-forward-iterator I,
            no-throw-sentinel<I> S,
            class T>
    requires constructible_from<iter_value_t<I>, const T&>
  I uninitialized_fill(I first, S last, const T& x); // (1) C++20
  template <no-throw-forward-iterator I,
            no-throw-sentinel<I> S,
            class T>
    requires constructible_from<iter_value_t<I>, const T&>
  I uninitialized_fill(I first, S last, const T& x); // (1) C++26

  template <no-throw-forward-range R,
            class T>
    requires constructible_from<range_value_t<R>, const T&>
  borrowed_iterator_t<R>
    uninitialized_fill(R&& r, const T& x);           // (2) C++20
  template <no-throw-forward-range R,
            class T>
    requires constructible_from<range_value_t<R>, const T&>
  constexpr borrowed_iterator_t<R>
    uninitialized_fill(R&& r, const T& x);           // (2) C++26
}
```
* no-throw-forward-iterator[link no-throw-forward-iterator.md]
* no-throw-sentinel[link no-throw-sentinel.md]
* constructible_from[link /reference/concepts/constructible_from.md]
* iter_value_t[link /reference/iterator/iter_value_t.md]
* no-throw-forward-range[link no-throw-forward-range.md]
* range_value_t[link /reference/ranges/range_value_t.md]
* borrowed_iterator_t[link /reference/ranges/borrowed_iterator_t.md]

## 概要
未初期化領域の範囲 (`r`、`[first, last)`) を、指定された値で配置`new`で初期化する。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する


## テンプレートパラメータ制約
- (1):
    - `I`が[`no-throw-forward-iterator`](no-throw-forward-iterator.md)である
    - `S`が[`I`に対する例外を投げない番兵](no-throw-sentinel.md)である
    - `I`の要素型が、`const T&`型を引数として[構築可能](/reference/concepts/constructible_from.md)である
- (2):
    - `R`が[`no-throw-forward-range`](no-throw-forward-range.md)である
    - `R`の要素型が、`const T&`型を引数として[構築可能](/reference/concepts/constructible_from.md)である


## 効果
説明用の関数`voidify`があるとして、

```cpp
template<class T>
constexpr void* voidify(T& obj) noexcept {
  return const_cast<void*>(static_cast<const volatile void*>(addressof(obj)));
}
```
* addressof[link addressof.md]


以下と等価である：

```cpp
for (; first != last; ++first) {
  ::new (voidify(*first)) remove_reference_t<iter_reference_t<I>>(x);
}
return first;
```
* remove_reference_t[link /reference/type_traits/remove_reference.md]
* iter_reference_t[link /reference/iterator/iter_reference_t.md]

## 例外

呼び出すコンストラクタなどから例外がスローされた場合、その例外がこの関数の外側に伝播される前に、その時点で構築済のオブジェクトは全て未規定の順序で破棄される。すなわち、例外がスローされた場合は初期化対象領域は未初期化のままとなる。

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
  std::ranges::uninitialized_fill(std::ranges::subrange{p, p + size}, 2);

  // pの領域が初期化され、かつ範囲pの全ての要素が2で埋められているか確認
  std::for_each(p, p + size, [](int x) {
    std::cout << x << std::endl;
  });

  // 要素を破棄
  std::ranges::destroy(p, p + size);

  // メモリ解放
  alloc.deallocate(p, size);
}
```
* std::ranges::uninitialized_fill[color ff0000]
* std::ranges::subrange[link /reference/ranges/subrange.md]
* std::allocator[link allocator.md]
* alloc.allocate[link allocator/allocate.md]
* std::ranges::destroy[link ranges_destroy.md]
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
- [Clang](/implementation.md#clang): 16.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.2.0 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]


## 関連項目
- [`uninitialized_fill`](uninitialized_fill.md)

## 参照
- [P9896R4 The One Ranges Proposal](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)
- [P3508R0 Wording for "constexpr for specialized memory algorithms"](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p3508r0.html)
    - C++26から`constexpr`がついた
