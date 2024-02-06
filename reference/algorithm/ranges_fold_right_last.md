# fold_right_last
* algorithm[meta header]
* function template[meta id-type]
* std::ranges[meta namespace]
* cpp23[meta cpp]

```cpp
namespace std::ranges {
  template<bidirectional_iterator I, sentinel_for<I> S,
           indirectly-binary-right-foldable<iter_value_t<I>, I> F>
    requires constructible_from<iter_value_t<I>, iter_reference_t<I>>
  constexpr auto fold_right_last(I first, S last, F f);                         // (1)

  template<bidirectional_range R,
           indirectly-binary-right-foldable<range_value_t<R>, iterator_t<R>> F>
    requires constructible_from<range_value_t<R>, range_reference_t<R>>
  constexpr auto fold_right_last(R&& r, F f);                                   // (2)
}
```
* bidirectional_iterator[link /reference/iterator/bidirectional_iterator.md]
* sentinel_for[link /reference/iterator/sentinel_for.md]
* constructible_from[link /reference/concepts/constructible_from.md]
* iter_value_t[link /reference/iterator/iter_value_t.md]
* iter_reference_t[link /reference/iterator/iter_reference_t.md]
* bidirectional_range[link /reference/ranges/bidirectional_range.md]
* range_value_t[link /reference/ranges/range_value_t.md]
* range_reference_t[link /reference/ranges/range_reference_t.md]
* iterator_t[link /reference/ranges/iterator_t.md]
* indirectly-binary-right-foldable[link ./ranges_fold_right.md]

## 概要

初期値の指定を省略する[`fold_right`](./ranges_fold_right.md)。入力範囲の末尾要素が初期値として使用される。

- (1) : 入力としてイテレータ範囲をとるオーバーロード
- (2) : 入力として範囲を直接とるオーバーロード

## 引数

- `first` -- 入力範囲の先頭イテレータ
- `last` -- 入力範囲の番兵（終端イテレータ）
- `r` -- 入力範囲のオブジェクト
- `f` -- 適用する二項演算
    - `f(*first, *first)`のような呼び出しが可能であり（実際にこの様に呼ばれるわけではない）、その戻り値型のオブジェクトを`acc`とすると
    - `acc = f(*first, std::move(acc))`のような呼び出しも可能である必要がある

## テンプレートパラメータ制約

`indirectly-binary-right-foldable`は`F`の引数順が逆になることを除いて[`indirectly-binary-left-foldable`](ranges_fold_left.md)と同様の制約となる。

`indirectly-binary-left-foldable`では、初期値の型`T`が戻り値型（積算値の型）`U`に変換可能であることが要求（[`convertible_to`](/reference/concepts/convertible_to.md)`<T, U>`）されており、この関数では初期値の型を指定できない（`range_value_t<R>`が使用される）ため戻り値型を大きく制御することが困難になる（例えば、[`fold_right`](./ranges_fold_right.md)の例にある入力範囲を反転させる例の様なことは素直にはできない）。

## 戻り値

(1)(2)ともに、以下と等価

```cpp
using U = decay_t<invoke_result_t<F&, iter_reference_t<I>, T>>;
if (first == last)
  return optional<U>();
I tail = ranges::prev(ranges::next(first, std::move(last)));
return optional<U>(in_place, ranges::fold_right(std::move(first), tail, iter_value_t<I>(*tail), std::move(f)));
```
* decay_t[link /reference/type_traits/decay.md]
* invoke_result_t[link /reference/type_traits/invoke_result.md]
* iter_reference_t[link /reference/iterator/iter_reference_t.md]
* prev[link /reference/iterator/ranges_prev.md]
* invoke[link /reference/functional/invoke.md]
* optional[link /reference/optional/optional.md]
* fold_right[link ./ranges_fold_right.md]
* iter_value_t[link /reference/iterator/iter_value_t.md]

空の入力範囲に対しては無効値を保持する[`optional`](/reference/optional/optional.md)を返す。

## 計算量

入力範囲`r`（`[first, last)`）の要素数を`N`とすると、正確に`N - 1`回の`f`の適用が行われる。

## 備考

この関数の戻り値型は[`optional`](/reference/optional/optional.md)`<U>`であり、`U`は次のように求められる型と一致する

```cpp
auto tail = --last;
decltype(ranges::fold_right(std::move(first), tail, iter_value_t<I>(*tail), f));
```
* fold_right[link ./ranges_fold_right.md]
* iter_value_t[link /reference/iterator/iter_value_t.md]

すなわち、他の引数はそのままに初期値として入力範囲`r`の要素を手動で指定して`fold_right`を呼び出した際の戻り値型を包む`optional`となる。

`fold_right`と同様に、この型`U`は`fold_right_last`の処理内部で積算値の型として使用されるものでもあり、`f`は`*first`の代わりに`U`の右辺値も受け取れる必要がある。詳細は下の実装例を参照。

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
  
  auto resl = fold_right_last(rng, op);

  std::println("{:d}", resl.value());


  // 入力範囲はfloatのvector
  std::vector<float> rngf = { 0.125f, 0.25f, 0.75f };
  
  // 計算結果はoptional<float>
  auto reslf = fold_right_last(rngf, op);

  std::println("{:g}", reslf.value());
}
```
* fold_right_last[color ff0000]
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
  auto res2 = fold_right_last(rng, op);

  std::println("{:d}", res1);
  std::println("{:d}", res2.value_or(-1));
}
```
* fold_right_last[color ff0000]
* fold_left[link ranges_fold_right.md]
* println[link /reference/print/println.md]
* value_or[link /reference/optional/optional/value_or.md]

### 出力
```
-1
-1
```

## 実装例

```cpp
template<bidirectional_iterator I, sentinel_for<I> S,
         indirectly-binary-right-foldable<iter_value_t<I>, I> F>
  requires constructible_from<iter_value_t<I>, iter_reference_t<I>>
constexpr auto fold_right_last(I first, S last, F f) {
  using U = decay_t<invoke_result_t<F&, iter_reference_t<I>, T>>;

  if (first == last) {
    return optional<U>();
  }

  I tail = ranges::prev(ranges::next(first, std::move(last)));

  if (first == tail) {
    return optional<U>(in_place, *tail);
  }

  const auto copy_tail = tail;
  U accum = invoke(f, *--tail, *copy_tail);
  
  while (first != tail) {
    accum = invoke(f, *--tail, std::move(accum));
  }
  
  return optional<U>(in_place, std::move(accum));
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
- [`ranges::fold_left_first`](ranges_fold_left_first.md)
    - 範囲の最初の要素を初期値として`fold_left`
- [`ranges::fold_left_with_iter`](ranges_fold_left_with_iter.md)
    - `fold_left`の結果と共に、計算した終端イテレータも返す
- [`ranges::fold_left_first_with_iter`](ranges_fold_left_first_with_iter.md.nolink)
    - `fold_left_first`の結果と共に、計算した終端イテレータも返す

## 参照

- [P2322R6 `ranges::fold`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2322r6.html)
