# fold_left
* algorithm[meta header]
* function template[meta id-type]
* std::ranges[meta namespace]
* cpp23[meta cpp]

```cpp
namespace std::ranges {
  template<input_iterator I, sentinel_for<I> S, class T,
           indirectly-binary-left-foldable<T, I> F>
  constexpr auto fold_left(I first, S last, T init, F f);       // (1)

  template<input_range R, class T, 
           indirectly-binary-left-foldable<T, iterator_t<R>> F>
  constexpr auto fold_left(R&& r, T init, F f);                 // (2)
}
```
* input_iterator[link /reference/iterator/input_iterator.md]
* sentinel_for[link /reference/iterator/sentinel_for.md]
* input_range[link /reference/ranges/input_range.md]
* iterator_t[link /reference/ranges/iterator_t.md]

## 概要

初期値から始めて、入力範囲の各要素に対して指定された二項演算を適用していきその結果を返す。二項演算が適用される各ステップでは、前のステップまでの積算値が一緒に渡される。

これは、関数型言語におけるリスト操作の一般形である高階関数`foldl`に対応し、[`std::accumulate`](/reference/numeric/accumulate.md)を改善したものでもある。

- (1) : 入力としてイテレータ範囲をとるオーバーロード
- (2) : 入力として範囲を直接とるオーバーロード

この関数は、初期値を入力範囲の先頭に付加した範囲に対してその先頭の隣り合う2要素に対して与えられた二項演算を適用し、その結果によって処理した要素を置換し、処理後の範囲に対して同様の処理を残りの要素が無くなるまで繰り返すような処理を行う。

入力範囲を`{1, 2, 3, 4, 5}`、初期値を`0`、二項演算を`+`（[`std::plus<>`](/reference/functional/plus.md)）とした時の`fold_left`の処理の様子

```
0 : init
[1, 2, 3, 4, 5] : rng

0  [1, 2, 3, 4, 5]
0 + 1
   1 + 2
      3 + 3
         6 + 4
           10 + 5 -> fold_left(rng, 0, +)
```

[`fold_right`](./ranges_fold_right.md)に対しては、入力範囲の先頭から末尾に向かって処理を進めていく点が異なる。

## 引数

- `first` -- 入力範囲の先頭イテレータ
- `last` -- 入力範囲の番兵（終端イテレータ）
- `r` -- 入力範囲のオブジェクト
- `init` -- 初期値
- `f` -- 適用する二項演算
    - `f(std::move(init), *first)`のような呼び出しが可能であり、その戻り値型のオブジェクトを`acc`とすると
    - `f(std::move(acc), *first)`のような呼び出しも可能である必要がある

## テンプレートパラメータ制約

`indirectly-binary-left-foldable`は次のように定義される説明専用のコンセプトである

```cpp
template<class F, class T, class I, class U>
concept indirectly-binary-left-foldable-impl =
  movable<T> &&
  movable<U> &&
  convertible_to<T, U> &&
  invocable<F&, U, iter_reference_t<I>> &&
  assignable_from<U&, invoke_result_t<F&, U, iter_reference_t<I>>>;

template<class F, class T, class I>
concept indirectly-binary-left-foldable =
  copy_constructible<F> &&
  indirectly_readable<I> &&
  invocable<F&, T, iter_reference_t<I>> &&
  convertible_to<invoke_result_t<F&, T, iter_reference_t<I>>,
         decay_t<invoke_result_t<F&, T, iter_reference_t<I>>>> &&
  indirectly-binary-left-foldable-impl<F, T, I,
                  decay_t<invoke_result_t<F&, T, iter_reference_t<I>>>>;
```
* movable[link /reference/concepts/movable.md]
* convertible_to[link /reference/concepts/convertible_to.md]
* iter_reference_t[link /reference/iterator/iter_reference_t.md]
* invocable[link /reference/concepts/invocable.md]
* assignable_from[link /reference/concepts/assignable_from.md]
* copy_constructible[link /reference/concepts/copy_constructible.md]
* indirectly_readable[link /reference/iterator/indirectly_readable.md]
* invoke_result_t[link /reference/type_traits/invoke_result.md]
* decay_t[link /reference/type_traits/decay.md]

ここでのテンプレートパラメータはそれぞれ、二項演算を指定する呼出可能な型`F`、初期値の型`T`、イテレータ型`I`、戻り値型（積算値の型）`U`である。

二項演算（`F`）は初期値・積算値と入力範囲の参照型に対して[`invocable`](/reference/concepts/invocable.md)であることしか求められていない（`regular_invocable`ではない）ため、適用する二項演算は任意の副作用を伴っていても良い。

## 戻り値

- (1) : 以下と等価
    ```cpp
    return ranges::fold_left_with_iter(std::move(first), last, std::move(init), f).value;
    ```
    * fold_left_with_iter[link /reference/algorithm/ranges_fold_left_with_iter.md.nolink]

- (2) : `r`からイテレータを取得して(1)に委譲
    ```cpp
    return ranges::fold_left(ranges::begin(r), ranges::end(r), std::move(init), f);
    ```
    * begin[link /reference/ranges/begin.md]
    * end[link /reference/ranges/end.md]

空の入力範囲に対しては初期値`init`を返す。

## 計算量

入力範囲`r`（`[first, last)`）の要素数を`N`とすると、正確に`N`回の`f`の適用が行われる。

## 備考

この関数の戻り値型は、入力の型`F, T, I`から次のような`U`として取得される

```cpp
using U = decay_t<invoke_result_t<F&, T, iter_reference_t<I>>>;
```
* decay_t[link /reference/type_traits/decay.md]
* invoke_result_t[link /reference/type_traits/invoke_result.md]
* iter_reference_t[link /reference/iterator/iter_reference_t.md]

すなわち、指定した二項演算を初期値とイテレータによって`f(std::move(init), *first)`のように呼び出した時の戻り値型がこの関数の戻り値型となる。

また、この型`U`は`fold_left`の処理内部で積算値の型として使用されるものでもあり、`f`は`init`の代わりに`U`の右辺値も受け取れる必要がある。二項演算の呼び出しにおいては、第一引数に初期値もしくは積算値が渡され、第二引数にイテレータの間接参照結果が直接渡される。そして、二項演算の適用結果は積算値を保存する変数に直接代入される（つまり、結果を次のステップに引き継ぎたい場合は積算処理も二項演算内で行う必要がある）。詳細は下の実装例を参照。

## 例

### 基本的な数値集計処理の例

```cpp example
#include <ranges>
#include <algorithm>
#include <functional>
#include <format>
#include <vector>
#include <iostream>
#include <concepts>

using namespace std::ranges;

int main() {
  // 入力
  range auto rng = views::iota(1, 11);
  // 初期値
  const int init = 0;
  // 二項演算
  auto op = std::plus<>{};
  
  int resl = fold_left(rng, init, op);

  std::println("{:d}", resl);


  // 入力範囲はfloatのvector
  std::vector<float> rngf = { 0.125f, 0.25f, 0.75f };
  
  // 計算結果はfloat
  std::same_as<float> auto reslf = fold_left(rngf, init, op);

  std::println("{:g}", reslf);
}
```
* fold_left[color ff0000]
* same_as[link /reference/concepts/same_as.md]
* iota[link /reference/ranges/iota_view.md]
* plus[link /reference/functional/plus.md]
* println[link /reference/print/println.md]

### 出力
```
55
2.125
```

### 処理順序を表示する例

```cpp example
#include <ranges>
#include <algorithm>
#include <functional>
#include <format>
#include <vector>
#include <iostream>
#include <concepts>

using namespace std::ranges;

int main() {
  // [a, b, c, d, e, f]
  range auto rng = views::iota('a', 'g');

  const std::string init = "init";

  // fold_leftの二項演算op
  auto op_left = [](std::string acc, char elem) {
    acc += " -> ";
    acc += elem;
    return acc;
  };
  // fold_rightの二項演算op
  auto op_right = [op_left](char elem, std::string acc) {
    return op_left(std::move(acc), elem);
  };
  
  auto resl = fold_left(rng, init, op_left);
  auto resr = fold_right(rng, init, op_right);

  std::println("{:s}", resl);
  std::println("{:s}", resr);
}
```
* fold_left[color ff0000]
* println[link /reference/print/println.md]
* fold_right[link /referencealgorithm/ranges_fold_right.md]

### 出力
```
init -> a -> b -> c -> d -> e -> f
init -> f -> e -> d -> c -> b -> a
```

## 実装例

```cpp
template<input_iterator I, sentinel_for<I> S, class T,
         indirectly-binary-left-foldable<T, I> F>
constexpr auto fold_left(I first, S last, T init, F f) {
  using U = decay_t<invoke_result_t<F&, T, iter_reference_t<I>>>;

  if (first == last) {
    return U(std::move(init));
  }

  U accum = invoke(f, std::move(init), *first);

  ++first;

  for (; first != last; ++first) {
    accum = invoke(f, std::move(accum), *first);
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

- [`ranges::fold_right`](ranges_fold_right.md)
    - 範囲の右からの`fold`
- [`ranges::fold_left_first`](ranges_fold_left_first.md.nolink)
    - 範囲の最初の要素を初期値として`fold_left`
- [`ranges::fold_right_last`](ranges_fold_right_last.md.nolink)
    - 範囲の最後の要素を初期値として`fold_right`
- [`ranges::fold_left_with_iter`](ranges_fold_left_with_iter.md.nolink)
    - `fold_left`の結果と共に、計算した終端イテレータも返す
- [`ranges::fold_left_first_with_iter`](ranges_fold_left_first_with_iter.md.nolink)
    - `fold_left_first`の結果と共に、計算した終端イテレータも返す

## 参照

- [P2322R6 `ranges::fold`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2322r6.html)
- [プログラミングHaskellのfoldr, foldlの説明が秀逸だった件 - あと味](https://taiju.hatenablog.com/entry/20130202/1359773888)
