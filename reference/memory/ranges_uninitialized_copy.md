# uninitialized_copy
* memory[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template <class I, class O>
  using uninitialized_copy_result = in_out_result<I, O>;

  template <input_iterator I, sentinel_for<I> S1,
            no-throw-forward-iterator O, no-throw-sentinel<O> S2>
  requires constructible_from<iter_value_t<O>, iter_reference_t<I>>
  uninitialized_copy_result<I, O>
    uninitialized_copy(I ifirst,
                       S1 ilast,
                       O ofirst,
                       S2 olast);       // (1) C++20
  template <input_iterator I, sentinel_for<I> S1,
            no-throw-forward-iterator O, no-throw-sentinel<O> S2>
  requires constructible_from<iter_value_t<O>, iter_reference_t<I>>
  constexpr uninitialized_copy_result<I, O>
    uninitialized_copy(I ifirst,
                       S1 ilast,
                       O ofirst,
                       S2 olast);       // (1) C++26

  template <input_range IR, no-throw-forward-range OR>
  requires constructible_from<range_value_t<OR>, range_reference_t<IR>>
  uninitialized_copy_result<
    borrowed_iterator_t<IR>,
    borrowed_iterator_t<OR>
  >
    uninitialized_copy(IR&& in_range,
                       OR&& out_range); // (2) C++20
  template <input_range IR, no-throw-forward-range OR>
  requires constructible_from<range_value_t<OR>, range_reference_t<IR>>
  constexpr uninitialized_copy_result<
    borrowed_iterator_t<IR>,
    borrowed_iterator_t<OR>
  >
    uninitialized_copy(IR&& in_range,
                       OR&& out_range); // (2) C++26

  template <execution-policy Ep,
            random_access_iterator I, sized_sentinel_for<I> S1,
            random_access_iterator O, sized_sentinel_for<O> S2>
  requires constructible_from<iter_value_t<O>, iter_reference_t<I>>
  uninitialized_copy_result<I, O>
    uninitialized_copy(Ep&& exec,
                       I ifirst,
                       S1 ilast,
                       O ofirst,
                       S2 olast);       // (3) C++26

  template <execution-policy Ep,
            sized-random-access-range IR,
            sized-random-access-range OR>
  requires constructible_from<range_value_t<OR>, range_reference_t<IR>>
  uninitialized_copy_result<
    borrowed_iterator_t<IR>,
    borrowed_iterator_t<OR>
  >
    uninitialized_copy(Ep&& exec,
                       IR&& in_range,
                       OR&& out_range); // (4) C++26
}
```
* in_out_result[link /reference/algorithm/ranges_in_out_result.md]
* no-throw-forward-iterator[link no-throw-forward-iterator.md]
* no-throw-sentinel[link no-throw-sentinel.md]
* constructible_from[link /reference/concepts/constructible_from.md]
* iter_reference_t[link /reference/iterator/iter_reference_t.md]
* no-throw-forward-range[link no-throw-forward-range.md]
* borrowed_iterator_t[link /reference/ranges/borrowed_iterator_t.md]
* execution-policy[link /reference/execution/execution-policy.md]
* random_access_iterator[link /reference/iterator/random_access_iterator.md]
* sized_sentinel_for[link /reference/iterator/sized_sentinel_for.md]
* sized-random-access-range[link /reference/ranges/sized-random-access-range.md]

## 概要
未初期化領域のイテレータ範囲（`out_range`、`[ofirst, olast)`）を配置`new`で入力イテレータ範囲（`in_range`、`[ifirst, ilast)`）の対応する要素から初期化してコピー出力する。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する
- (3): (1)の並列アルゴリズム版。実行ポリシーを指定する
- (4): (2)の並列アルゴリズム版。実行ポリシーを指定する


## テンプレートパラメータ制約
- (1):
    - `I`が[`input_iterator`](/reference/iterator/input_iterator.md)である
    - `S1`が[`I`に対する番兵](/reference/iterator/sentinel_for.md)である
    - `O`が[`no-throw-forward-iterator`](no-throw-forward-iterator.md)である
    - `S2`が[`O`に対する例外を投げない番兵](no-throw-sentinel.md)である
    - `O`の要素型が、`I`の要素型を引数として[構築可能](/reference/concepts/constructible_from.md)である
- (2):
    - `IR`が[`input_range`](/reference/ranges/input_range.md)である
    - `OR`が[`no-throw-forward-range`](no-throw-forward-range.md)である
    - `OR`の要素型が、`IR`の要素型を引数として[構築可能](/reference/concepts/constructible_from.md)である


## 事前条件

- イテレータ範囲`[ofirst, olast)`が`[ifirst, ilast)`と重ならないこと


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
for (; ifirst != ilast && ofirst != olast; ++ofirst, (void)++ifirst) {
  ::new (voidify(*ofirst)) remove_reference_t<iter_reference_t<O>>(*ifirst);
}
return {std::move(ifirst), ofirst};
```
* iter_reference_t[link /reference/iterator/iter_reference_t.md]
* std::move[link /reference/utility/move.md]

## 例外

呼び出すコンストラクタなどから例外が送出された場合、その例外がこの関数の外側に伝播される前に、その時点で構築済のオブジェクトは全て未規定の順序で破棄される。すなわち、例外が送出された場合は初期化対象領域は未初期化のままとなる。


## 例
### 基本的な使い方
```cpp example
#include <iostream>
#include <memory>

#include <vector>
#include <algorithm>

int main()
{
  const std::vector<int> v = {1, 2, 3};

  std::allocator<int> alloc;

  // メモリ確保。
  // この段階では、[p, p + size)の領域は未初期化
  const std::size_t size = 3;
  int* p = alloc.allocate(size);

  // 未初期化領域pを初期化しつつ範囲vから要素をコピー
  std::ranges::uninitialized_copy(v, std::ranges::subrange{p, p + size});

  // pの領域が初期化され、かつvからpに要素がコピーされているか確認
  std::for_each(p, p + size, [](int x) {
    std::cout << x << std::endl;
  });

  // 要素を破棄
  std::ranges::destroy(p, p + size);

  // メモリ解放
  alloc.deallocate(p, size);
}
```
* std::ranges::uninitialized_copy[color ff0000]
* std::ranges::subrange[link /reference/ranges/subrange.md]
* alloc.allocate[link allocator/allocate.md]
* std::ranges::destroy[link ranges_destroy.md]
* alloc.deallocate[link allocator/deallocate.md]

### 出力
```
1
2
3
```


### 並列アルゴリズムの例 (C++26)
```cpp example
#include <iostream>
#include <memory>
#include <vector>
#include <execution>

int main() {
  std::vector<int> src = {1, 2, 3};
  std::allocator<int> alloc;
  int* dst = alloc.allocate(3);

  // 並列に未初期化領域へコピー
  std::ranges::uninitialized_copy(
    std::execution::par, src, dst, dst + 3);

  for (int i = 0; i < 3; ++i) {
    std::cout << dst[i] << ' ';
  }
  std::cout << std::endl;

  std::ranges::destroy(dst, dst + 3);
  alloc.deallocate(dst, 3);
}
```
* std::ranges::uninitialized_copy[color ff0000]

#### 出力
```
1 2 3
```


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 16.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.2.0 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]


## 関連項目
- [`uninitialized_copy`](uninitialized_copy.md)

## 参照
- [P0896R4 The One Ranges Proposal](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)
- [P3508R0 Wording for "constexpr for specialized memory algorithms"](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p3508r0.html)
    - C++26から`constexpr`がついた
- [P3179R9 C++ parallel range algorithms](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3179r9.html)
