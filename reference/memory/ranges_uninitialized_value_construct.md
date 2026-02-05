# uninitialized_value_construct
* memory[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template <no-throw-forward-iterator I, no-throw-sentinel<I> S>
    requires default_initializable<iter_value_t<I>>
  I
    uninitialized_value_construct(I first, S last);  // (1) C++20
  template <no-throw-forward-iterator I, no-throw-sentinel<I> S>
    requires default_initializable<iter_value_t<I>>
  constexpr I
    uninitialized_value_construct(I first, S last);  // (1) C++26

  template <no-throw-forward-range R>
    requires default_initializable<range_value_t<R>>
  borrowed_iterator_t<R>
    uninitialized_value_construct(R&& r);            // (2) C++20
  template <no-throw-forward-range R>
    requires default_initializable<range_value_t<R>>
  constexpr borrowed_iterator_t<R>
    uninitialized_value_construct(R&& r);            // (2) C++26

  template <execution-policy Ep,
            random_access_iterator I,
            sized_sentinel_for<I> S>
    requires default_initializable<iter_value_t<I>>
  I
    uninitialized_value_construct(Ep&& exec,
                                  I first, S last);  // (3) C++26

  template <execution-policy Ep,
            sized-random-access-range R>
    requires default_initializable<range_value_t<R>>
  borrowed_iterator_t<R>
    uninitialized_value_construct(Ep&& exec, R&& r); // (4) C++26
}
```
* no-throw-forward-iterator[link no-throw-forward-iterator.md]
* no-throw-sentinel[link no-throw-sentinel.md]
* no-throw-forward-range[link no-throw-forward-range.md]
* borrowed_iterator_t[link /reference/ranges/borrowed_iterator_t.md]
* execution-policy[link /reference/execution/execution-policy.md]
* random_access_iterator[link /reference/iterator/random_access_iterator.md]
* sized_sentinel_for[link /reference/iterator/sized_sentinel_for.md]
* sized-random-access-range[link /reference/ranges/sized-random-access-range.md]

## 概要
未初期化領域の範囲 (`r`、`[first, last)`) の各要素を値構築する。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する
- (3): (1)の並列アルゴリズム版。実行ポリシーを指定する
- (4): (2)の並列アルゴリズム版。実行ポリシーを指定する


## テンプレートパラメータ制約
- (1):
    - `I`が[`no-throw-forward-iterator`](no-throw-forward-iterator.md)である
    - `S`が[`I`に対する例外を投げない番兵](no-throw-sentinel.md)である
    - `I`の要素型が、[デフォルト構築可能](/reference/concepts/default_initializable.md)である
- (2):
    - `R`が[`no-throw-forward-range`](no-throw-forward-range.md)である
    - `R`の要素型が、[デフォルト構築可能](/reference/concepts/default_initializable.md)である


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
for (; first != last; ++first)
  ::new (voidify(*first)) remove_reference_t<iter_reference_t<I>>();
return first;
```
* iter_reference_t[link /reference/iterator/iter_reference_t.md]

## 例外

呼び出すコンストラクタなどから例外が送出された場合、その例外がこの関数の外側に伝播される前に、その時点で構築済のオブジェクトは全て未規定の順序で破棄される。すなわち、例外が送出された場合は初期化対象領域は未初期化のままとなる。


## 例
### 基本的な使い方
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

  // 未初期化領域[p, p + size)の各要素を値構築
  std::ranges::uninitialized_value_construct(std::ranges::subrange{p, p + size});

  // pの領域が初期化され、かつ範囲pの全ての要素が2で埋められているか確認
  std::for_each(p, p + size, [](const Vector& v) {
    std::cout << v.x << ',' << v.y << std::endl;
  });

  // 要素を破棄
  std::ranges::destroy(p, p + size);

  // メモリ解放
  alloc.deallocate(p, size);
}
```
* std::ranges::uninitialized_value_construct[color ff0000]
* std::ranges::subrange[link /reference/ranges/subrange.md]
* alloc.allocate[link allocator/allocate.md]
* std::ranges::destroy[link ranges_destroy.md]
* alloc.deallocate[link allocator/deallocate.md]

### 出力
```
0,0
0,0
0,0
```


### 並列アルゴリズムの例 (C++26)
```cpp example
#include <iostream>
#include <memory>
#include <execution>

int main() {
  std::allocator<int> alloc;
  int* p = alloc.allocate(3);

  // 並列に値初期化
  std::ranges::uninitialized_value_construct(
    std::execution::par, p, p + 3);

  for (int i = 0; i < 3; ++i) {
    std::cout << p[i] << ' ';
  }
  std::cout << std::endl;

  alloc.deallocate(p, 3);
}
```
* std::ranges::uninitialized_value_construct[color ff0000]

#### 出力
```
0 0 0
```


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 16.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.2.0 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]


## 関連項目
- [`uninitialized_value_construct`](uninitialized_value_construct.md)

## 参照
- [P0896R4 The One Ranges Proposal](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)
- [P3508R0 Wording for "constexpr for specialized memory algorithms"](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p3508r0.html)
    - C++26から`constexpr`がついた
- [P3179R9 C++ parallel range algorithms](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3179r9.html)
