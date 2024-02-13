# fold_left_first
* algorithm[meta header]
* function template[meta id-type]
* std::ranges[meta namespace]
* cpp23[meta cpp]

```cpp
namespace std::ranges {
  template<input_iterator I, sentinel_for<I> S,
           indirectly-binary-left-foldable<iter_value_t<I>, I> F>
    requires constructible_from<iter_value_t<I>, iter_reference_t<I>>
  constexpr auto fold_left_first(I first, S last, F f);                         // (1)

  template<input_range R,
           indirectly-binary-left-foldable<range_value_t<R>, iterator_t<R>> F>
    requires constructible_from<range_value_t<R>, range_reference_t<R>>
  constexpr auto fold_left_first(R&& r, F f);                                   // (2)
}
```
* input_iterator[link /reference/iterator/input_iterator.md]
* sentinel_for[link /reference/iterator/sentinel_for.md]
* constructible_from[link /reference/concepts/constructible_from.md]
* iter_value_t[link /reference/iterator/iter_value_t.md]
* iter_reference_t[link /reference/iterator/iter_reference_t.md]
* input_range[link /reference/ranges/input_range.md]
* range_value_t[link /reference/ranges/range_value_t.md]
* range_reference_t[link /reference/ranges/range_reference_t.md]
* iterator_t[link /reference/ranges/iterator_t.md]
* indirectly-binary-left-foldable[link ./ranges_fold_left.md]

## 概要

初期値の指定を省略する[`fold_left`](./ranges_fold_left.md)。入力範囲の先頭要素が初期値として使用される。

- (1) : 入力としてイテレータ範囲をとるオーバーロード
- (2) : 入力として範囲を直接とるオーバーロード

## 引数

- `first` -- 入力範囲の先頭イテレータ
- `last` -- 入力範囲の番兵（終端イテレータ）
- `r` -- 入力範囲のオブジェクト
- `f` -- 適用する二項演算
    - `f(*first, *first)`のような呼び出しが可能であり（実際にこの様に呼ばれるわけではない）、その戻り値型のオブジェクトを`acc`とすると
    - `acc = f(std::move(acc), *first)`のような呼び出しも可能である必要がある

## テンプレートパラメータ制約

[`indirectly-binary-left-foldable`](ranges_fold_left.md)では、初期値の型`T`が戻り値型（積算値の型）`U`に変換可能であることが要求（[`convertible_to`](/reference/concepts/convertible_to.md)`<T, U>`）されており、この関数では初期値の型を指定できない（`range_value_t<R>`が使用される）ため戻り値型を大きく制御することが困難になる。

## 戻り値

- (1) : 以下と等価
    ```cpp
    return ranges::fold_left_first_with_iter(std::move(first), last, f).value;
    ```
    * fold_left_first_with_iter[link /reference/algorithm/ranges_fold_left_first_with_iter.md]

- (2) : `r`からイテレータを取得して(1)に委譲
    ```cpp
    return ranges::fold_left_first(ranges::begin(r), ranges::end(r), f);
    ```
    * begin[link /reference/ranges/begin.md]
    * end[link /reference/ranges/end.md]

空の入力範囲に対しては無効値を保持する[`optional`](/reference/optional/optional.md)を返す。

## 計算量

入力範囲`r`（`[first, last)`）の要素数を`N`とすると、正確に`N - 1`回の`f`の適用が行われる。

## 備考

この関数の戻り値型は[`optional`](/reference/optional/optional.md)`<U>`であり、`U`は引数と入力の型`I`から次のように取得される

```cpp
using U = decltype(ranges::fold_left(std::move(first), last, iter_value_t<I>(*first), f));
```
* fold_left[link ./ranges_fold_left.md]
* iter_value_t[link /reference/iterator/iter_value_t.md]

すなわち、他の引数はそのままに初期値として入力範囲`r`の要素を手動で指定して`fold_left`を呼び出した際の戻り値型を包む`optional`となる。

`fold_left`と同様に、この型`U`は`fold_left_first`の処理内部で積算値の型として使用されるものでもあり、`f`は`*first`の代わりに`U`の右辺値も受け取れる必要がある。詳細は下の実装例を参照。

## 例

### 基本的な数値集計処理の例

```cpp example
#include <ranges>
#include <algorithm>
#include <functional>
#include <print>
#include <vector>

using namespace std::ranges;

int main() {
  // 入力
  range auto rng = views::iota(1, 11);
  // 二項演算
  auto op = std::plus<>{};
  
  auto resl = fold_left_first(rng, op);

  std::println("{:d}", resl.value());


  // 入力範囲はfloatのvector
  std::vector<float> rngf = { 0.125f, 0.25f, 0.75f };
  
  // 計算結果はoptional<float>
  auto reslf = fold_left_first(rngf, op);

  std::println("{:g}", reslf.value());
}
```
* fold_left_first[color ff0000]
* iota[link /reference/ranges/iota_view.md]
* plus[link /reference/functional/plus.md]
* println[link /reference/print/println.md]

### 出力
```
55
1.125
```

### 空の入力範囲に対する動作の例

```cpp example
#include <ranges>
#include <algorithm>
#include <functional>
#include <print>
#include <vector>

using namespace std::ranges;

int main() {
  range auto rng = views::empty<int>;
  auto op = std::plus<>{};

  auto res1 = fold_left(rng, -1, op);
  auto res2 = fold_left_first(rng, op);

  std::println("{:d}", res1);
  std::println("{:d}", res2.value_or(-1));
}
```
* fold_left_first[color ff0000]
* fold_left[link ranges_fold_left.md]
* println[link /reference/print/println.md]
* value_or[link /reference/optional/optional/value_or.md]

### 出力
```
-1
-1
```

## 実装例

```cpp
template<input_iterator I, sentinel_for<I> S,
         indirectly-binary-left-foldable<iter_value_t<I>, I> F>
  requires constructible_from<iter_value_t<I>, iter_reference_t<I>>
constexpr auto fold_left_first(I first, S last, F f) {
  using U = decltype(ranges::fold_left(std::move(first), last, iter_value_t<I>(*first), f));

  if (first == last) {
    return optional<U>();
  }

  optional<U> accum(in_place, *first);

  ++first;

  for (; first != last; ++first) {
    *accum = invoke(f, std::move(*accum), *first);
  }

  return accum; // 暗黙ムーブ or NRVO
}
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 13.1
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 5

## 関連項目

- [`ranges::fold_left`](ranges_fold_left.md)
    - 範囲の左からの`fold`
- [`ranges::fold_right`](ranges_fold_right.md)
    - 範囲の右からの`fold`
- [`ranges::fold_right_last`](ranges_fold_right_last.md)
    - 範囲の最後の要素を初期値として`fold_right`
- [`ranges::fold_left_with_iter`](ranges_fold_left_with_iter.md)
    - `fold_left`の結果と共に、計算した終端イテレータも返す
- [`ranges::fold_left_first_with_iter`](ranges_fold_left_first_with_iter.md)
    - `fold_left_first`の結果と共に、計算した終端イテレータも返す

## 参照

- [P2322R6 `ranges::fold`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2322r6.html)
