# uninitialized_move_n
* memory[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template <class I, class O>
  using uninitialized_move_n_result = in_out_result<I, O>;

  template <input_iterator I,
            no-throw-forward-iterator O,
            no-throw-sentinel<O> S>
  requires constructible_from<iter_value_t<O>, iter_rvalue_reference_t<I>>
  uninitialized_move_n_result<I, O>
    uninitialized_move_n(
      I ifirst,
      iter_difference_t<I> n,
      O ofirst,
      S olast
    );                               // (1) C++20
  template <input_iterator I,
            no-throw-forward-iterator O,
            no-throw-sentinel<O> S>
  requires constructible_from<iter_value_t<O>, iter_rvalue_reference_t<I>>
  constexpr uninitialized_move_n_result<I, O>
    uninitialized_move_n(
      I ifirst,
      iter_difference_t<I> n,
      O ofirst,
      S olast
    );                               // (1) C++26
}
```
* in_out_result[link /reference/algorithm/ranges_in_out_result.md]
* no-throw-forward-iterator[link no-throw-forward-iterator.md]
* no-throw-sentinel[link no-throw-sentinel.md]
* constructible_from[link /reference/concepts/constructible_from.md]

## 概要
未初期化領域のイテレータ範囲`[ofirst, ofirst + n)`を配置`new`でイテレータ範囲`[ifirst, ifirst + n)`の対応する要素から初期化してムーブ出力する。

- (1): イテレータ範囲を指定する


## テンプレートパラメータ制約
- (1):
    - `I`が[`input_iterator`](/reference/iterator/input_iterator.md)である
    - `O`が[`no-throw-forward-iterator`](no-throw-forward-iterator.md)である
    - `S`が[`O`に対する例外を投げない番兵](no-throw-sentinel.md)である
    - `O`の要素型が、`I`の要素型の右辺値を引数として[構築可能](/reference/concepts/constructible_from.md)である


## 事前条件

- イテレータ範囲`[ofirst, olast)`が`ifirst + [0, n)`と重ならないこと


## 効果
以下と等価である：

```cpp
auto t = uninitialized_move(counted_iterator(ifirst, n),
                            default_sentinel, ofirst, olast);
return {std::move(t.in).base(), t.out};
```
* uninitialized_move[link ranges_uninitialized_move.md]
* counted_iterator[link /reference/iterator/counted_iterator.md]
* base()[link /reference/iterator/counted_iterator/base.md]
* std::move[link /reference/utility/move.md]

## 例外

呼び出すコンストラクタなどから例外がスローされた場合、その例外がこの関数の外側に伝播される前に、その時点で構築済のオブジェクトは全て未規定の順序で破棄される。すなわち、例外がスローされた場合は初期化対象領域は未初期化のままとなる。

またその場合、`[ifirst, ifirst + n)`内の一部のオブジェクトは有効だが未規定な状態として残される。

## 例
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

  // 未初期化領域pを初期化しつつ範囲vから要素をムーブ
  std::ranges::uninitialized_move_n(v.begin(), size, p, p + size);

  // pの領域が初期化され、かつvからpに要素がムーブされているか確認
  std::for_each(p, p + size, [](int x) {
    std::cout << x << std::endl;
  });

  // 要素を破棄
  std::ranges::destroy_n(p, size);

  // メモリ解放
  alloc.deallocate(p, size);
}
```
* std::ranges::uninitialized_move_n[color ff0000]
* alloc.allocate[link allocator/allocate.md]
* std::ranges::destroy_n[link ranges_destroy_n.md]
* alloc.deallocate[link allocator/deallocate.md]

### 出力
```
1
2
3
```


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 16.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.2.0 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]


## 関連項目
- [`uninitialized_move_n`](uninitialized_move_n.md)

## 参照
- [P0896R4 The One Ranges Proposal](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)
- [P3508R0 Wording for "constexpr for specialized memory algorithms"](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p3508r0.html)
    - C++26から`constexpr`がついた
