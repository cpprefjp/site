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
            class T = iter_value_t<I>>
    requires constructible_from<iter_value_t<I>, const T&>
  constexpr I
    uninitialized_fill(I first, S last, const T& x); // (1) C++26

  template <no-throw-forward-range R,
            class T>
    requires constructible_from<range_value_t<R>, const T&>
  borrowed_iterator_t<R>
    uninitialized_fill(R&& r, const T& x);           // (2) C++20
  template <no-throw-forward-range R,
            class T = range_value_t<R>>
    requires constructible_from<range_value_t<R>, const T&>
  constexpr borrowed_iterator_t<R>
    uninitialized_fill(R&& r, const T& x);           // (2) C++26

  template <execution-policy Ep,
            random_access_iterator I,
            sized_sentinel_for<I> S,
            class T = iter_value_t<I>>
    requires constructible_from<iter_value_t<I>, const T&>
  I uninitialized_fill(Ep&& exec,
                       I first, S last, const T& x); // (3) C++26

  template <execution-policy Ep,
            sized-random-access-range R,
            class T = range_value_t<R>>
    requires constructible_from<range_value_t<R>, const T&>
  borrowed_iterator_t<R>
    uninitialized_fill(Ep&& exec,
                       R&& r, const T& x);           // (4) C++26
}
```
* no-throw-forward-iterator[link no-throw-forward-iterator.md]
* no-throw-sentinel[link no-throw-sentinel.md]
* constructible_from[link /reference/concepts/constructible_from.md]
* no-throw-forward-range[link no-throw-forward-range.md]
* borrowed_iterator_t[link /reference/ranges/borrowed_iterator_t.md]
* execution-policy[link /reference/execution/execution-policy.md]
* random_access_iterator[link /reference/iterator/random_access_iterator.md]
* sized_sentinel_for[link /reference/iterator/sized_sentinel_for.md]
* sized-random-access-range[link /reference/ranges/sized-random-access-range.md]

## 概要
未初期化領域の範囲 (`r`、`[first, last)`) を、指定された値で配置`new`で初期化する。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する
- (3): (1)の並列アルゴリズム版。実行ポリシーを指定する
- (4): (2)の並列アルゴリズム版。実行ポリシーを指定する


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


以下と等価である：

```cpp
for (; first != last; ++first) {
  ::new (voidify(*first)) remove_reference_t<iter_reference_t<I>>(x);
}
return first;
```
* iter_reference_t[link /reference/iterator/iter_reference_t.md]

## 例外

呼び出すコンストラクタなどから例外が送出された場合、その例外がこの関数の外側に伝播される前に、その時点で構築済のオブジェクトは全て未規定の順序で破棄される。すなわち、例外が送出された場合は初期化対象領域は未初期化のままとなる。


## 備考
- C++26では、テンプレートパラメータ`T`にデフォルトテンプレート引数（`iter_value_t<I>`または`range_value_t<R>`）を指定するオーバーロードが追加された。これにより、波カッコ初期化リスト (`{...}`) を入力値`x`として渡せるようになる。波カッコ初期化リストは型を持たないため、`T`がデフォルト引数として要素型から推論されることで、この関数に波カッコ初期化リストを直接渡せる。


## 例
### 基本的な使い方
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
* alloc.allocate[link allocator/allocate.md]
* std::ranges::destroy[link ranges_destroy.md]
* alloc.deallocate[link allocator/deallocate.md]

### 出力
```
2
2
2
```


### 波カッコ初期化を入力として使用する (C++26)
```cpp example
#include <iostream>
#include <memory>
#include <ranges>

struct Point {
  int x;
  int y;
};

int main()
{
  std::allocator<Point> alloc;
  const std::size_t size = 3;
  Point* p = alloc.allocate(size);

  // 波カッコ初期化リストでPoint{1, 2}を直接渡せる
  std::ranges::uninitialized_fill(
    std::ranges::subrange{p, p + size},
    {1, 2});

  for (std::size_t i = 0; i < size; ++i) {
    std::cout << '(' << p[i].x << ", " << p[i].y << ')' << std::endl;
  }

  std::ranges::destroy(p, p + size);
  alloc.deallocate(p, size);
}
```
* std::ranges::uninitialized_fill[color ff0000]
* std::ranges::subrange[link /reference/ranges/subrange.md]
* std::ranges::destroy[link ranges_destroy.md]

#### 出力
```
(1, 2)
(1, 2)
(1, 2)
```


### 並列アルゴリズムの例 (C++26)
```cpp example
#include <iostream>
#include <memory>
#include <execution>

int main() {
  std::allocator<int> alloc;
  int* p = alloc.allocate(3);

  // 並列に未初期化領域を42で埋める
  std::ranges::uninitialized_fill(
    std::execution::par, p, p + 3, 42);

  for (int i = 0; i < 3; ++i) {
    std::cout << p[i] << ' ';
  }
  std::cout << std::endl;

  alloc.deallocate(p, 3);
}
```
* std::ranges::uninitialized_fill[color ff0000]

#### 出力
```
42 42 42
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
- [P0896R4 The One Ranges Proposal](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)
- [P3508R0 Wording for "constexpr for specialized memory algorithms"](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p3508r0.html)
    - C++26から`constexpr`がついた
- [P3179R9 C++ parallel range algorithms](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3179r9.html)
- [P3787R2 Adjoints to "Enabling list-initialization for algorithms": `uninitialized_fill`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3787r2.html)
    - C++26から波カッコ初期化リストを入力として使用できるよう、要素型をデフォルトテンプレート引数とするオーバーロードが追加された
