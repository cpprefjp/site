# fold_left_with_iter
* algorithm[meta header]
* function template[meta id-type]
* std::ranges[meta namespace]
* cpp23[meta cpp]

```cpp
namespace std::ranges {
  template<input_iterator I, sentinel_for<I> S, class T,
           indirectly-binary-left-foldable<T, I> F>
  constexpr auto fold_left_with_iter(I first, S last, T init, F f); // (1)

  template<input_range R, class T,
           indirectly-binary-left-foldable<T, iterator_t<R>> F>
  constexpr auto fold_left_with_iter(R&& r, T init, F f);           // (2)
}
```
* input_iterator[link /reference/iterator/input_iterator.md]
* sentinel_for[link /reference/iterator/sentinel_for.md]
* indirectly-binary-left-foldable[link ./ranges_fold_left.md]
* input_range[link /reference/ranges/input_range.md]
* iterator_t[link /reference/ranges/iterator_t.md]

## 概要

処理の過程で得られた終端位置を指すイテレータを同時に返す[`fold_left`](./ranges_fold_left.md)。戻り値はイテレータと処理結果のペアとなる。

- (1) : 入力としてイテレータ範囲をとるオーバーロード
- (2) : 入力として範囲を直接とるオーバーロード

## 引数

- `first` -- 入力範囲の先頭イテレータ
- `last` -- 入力範囲の番兵（終端イテレータ）
- `r` -- 入力範囲のオブジェクト
- `init` -- 初期値
- `f` -- 適用する二項演算
    - `f(std::move(init), *first)`のような呼び出しが可能であり、その戻り値型のオブジェクトを`acc`とすると
    - `acc = f(std::move(acc), *first)`のような呼び出しも可能である必要がある

## テンプレートパラメータ制約

二項演算（`F`）は初期値・積算値と入力範囲の参照型に対して[`invocable`](/reference/concepts/invocable.md)であることしか求められていない（`regular_invocable`ではない）ため、適用する二項演算は任意の副作用を伴っていても良い。

## 戻り値

型`U`を次のように取得して

```cpp
using U = decay_t<invoke_result_t<F&, T, iter_reference_t<I>>>;
```
* decay_t[link /reference/type_traits/decay.md]
* invoke_result_t[link /reference/type_traits/invoke_result.md]
* iter_reference_t[link /reference/iterator/iter_reference_t.md]

- (1) : 以下と等価
    ```cpp
    if (first == last)
      return {std::move(first), U(std::move(init))};
    U accum = invoke(f, std::move(init), *first);
    for (++first; first != last; ++first)
      accum = invoke(f, std::move(accum), *first);
    return {std::move(first), std::move(accum)};
    ```
    * invoke[link /reference/functional/invoke.md]

- (2) : `r`からイテレータを取得して(1)に委譲
    ```cpp
    return ranges::fold_left_with_iter(ranges::begin(r), ranges::end(r), std::move(init), f);
    ```
    * begin[link /reference/ranges/begin.md]
    * end[link /reference/ranges/end.md]

空の入力範囲に対しては初期値`init`を返す。入力範囲によらず、戻り値の1つ目の値（イテレータ値）は渡した範囲の終端イテレータ（`last`/`ranges::end(r)`）と同じ位置を指すイテレータとなる（必ずしも同じ型もしくは同じイテレータにならない）。

戻り値型はそれぞれ、`U`を次の様に[`fold_left_with_iter_result`](/reference/algorithm/ranges_in_value_result.md)の2つ目の引数に当てはめた型となる

```cpp
template<input_iterator I, sentinel_for<I> S, class T,
         indirectly-binary-left-foldable<T, I> F>
constexpr fold_left_with_iter_result<I, U>
  fold_left_with_iter(I first, S last, T init, F f); 

template<input_range R, class T,
         indirectly-binary-left-foldable<T, iterator_t<R>> F>
constexpr fold_left_with_iter_result<borrowed_iterator_t<R>, U>
  fold_left_with_iter(R&& r, T init, F f);
```
* fold_left_with_iter_result[link /reference/algorithm/ranges_in_value_result.md]
* borrowed_iterator_t[link /reference/ranges/borrowed_iterator_t.md]

1つ目の引数には入力のイテレータ型が当てられる。

## 計算量

入力範囲`r`（`[first, last)`）の要素数を`N`とすると、正確に`N`回の`f`の適用が行われる。

## 備考

戻り値の項で使用している`U`は、指定した二項演算を初期値とイテレータによって`f(std::move(init), *first)`のように呼び出した時の戻り値型であり、`fold_left_with_iter()`の処理内部で積算値の型として使用されるものでもある。

`fold_left`同様に、`f`は`init`の代わりに`U`の右辺値も受け取れる必要がある。二項演算の呼び出しにおいては、第一引数に初期値もしくは積算値が渡され、第二引数にイテレータの間接参照結果が直接渡される。そして、二項演算の適用結果は積算値を保存する変数に直接代入される（つまり、結果を次のステップに引き継ぎたい場合は積算処理も二項演算内で行う必要がある）。詳細は下の実装例を参照。

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
  // 初期値
  const int init = 0;
  // 二項演算
  auto op = std::plus<>{};
  
  auto [end1, resl] = fold_left_with_iter(rng, init, op);

  std::println("{{ {:s}, {:d} }}", end1 == end(rng), resl);


  // 入力範囲はfloatのvector
  std::vector<float> rngf = { 0.125f, 0.25f, 0.75f };
  
  // 計算結果はfloat
  auto [end2, reslf] = fold_left_with_iter(rngf, init, op);

  std::println("{{ {:s}, {:g} }}", end2 == end(rngf), reslf);
}
```
* fold_left_with_iter[color ff0000]
* iota[link /reference/ranges/iota_view.md]
* plus[link /reference/functional/plus.md]
* println[link /reference/print/println.md]

### 出力
```
{ true, 55 }
{ true, 1.125 }
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
  const int init = -1;
  auto op = std::plus<>{};

  auto res1 = fold_left(rng, init, op);
  auto res2 = fold_left_first(rng, op);
  auto [_, res3] = fold_left_with_iter(rng, init, op);

  std::println("{:d}", res1);
  std::println("{:d}", res2.value_or(-1));
  std::println("{:d}", res3);
}
```
* fold_left_with_iter[color ff0000]
* fold_left[link ranges_fold_left.md]
* fold_left_first[link ranges_fold_left_first.md]
* println[link /reference/print/println.md]
* value_or[link /reference/optional/optional/value_or.md]

### 出力
```
-1
-1
-1
```

### 戻り値のイテレータを活用する例

```cpp example
#include <ranges>
#include <algorithm>
#include <functional>
#include <print>
#include <forward_list>

using namespace std::ranges;

int main() {
  // forward_rangeな入力
  std::forward_list flist = {2, 4, 6, 7, 9, 3, 1, 4, 10, 3, 2, 6};

  // take_whileを使用して、先頭から10未満の要素だけを取り出す
  forward_range auto rng = flist | views::take_while([](int n) { return n < 10; });

  auto [last, sum] = fold_left_with_iter(rng, 0, std::plus<>{});

  std::println("sum = {:d}", sum);

  // 同じ範囲に対して別の処理をしたい
  // rng（take_while）をそのまま使うとイテレーション時に終端判定をもう一度行うことになり非効率
  auto [unuse1, mul1] = fold_left_with_iter(rng, 1, std::multiplies<>{});

  // 先ほど求めた終端を使用して元の範囲の上で部分範囲を構築
  auto [unuse2, mul2] = fold_left_with_iter(subrange{flist.begin(), last}, 1, std::multiplies<>{});

  std::println("mul = {:d}, {:d}", mul1, mul2);
}
```
* fold_left_with_iter[color ff0000]
* take_while[link /reference/ranges/take_while_view.md]
* subrange[link /reference/ranges/subrange.md]
* println[link /reference/print/println.md]

### 出力

```
sum = 36
mul = 36288, 36288
```

## 実装例

```cpp
template<typename F, typename T, typename I>
using R = decay_t<invoke_result_t<F&, T, iter_reference_t<I>>>;


template<input_iterator I, sentinel_for<I> S, class T,
         indirectly-binary-left-foldable<T, I> F>
constexpr auto fold_left_with_iter(I first, S last, T init, F f) -> fold_left_with_iter_result<I, R<F, T, I>> {
  using U = R<F, T, I>;

  if (first == last) {
    return {std::move(first), U(std::move(init))};
  }

  U accum = invoke(f, std::move(init), *first);

  ++first;

  for (; first != last; ++first) {
    accum = invoke(f, std::move(accum), *first);
  }

  return {std::move(first), std::move(accum)};
}
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 13.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 5 [mark verified]

## 関連項目

- [`ranges::fold_left`](ranges_fold_left.md)
    - 範囲の左からの`fold`
- [`ranges::fold_right`](ranges_fold_right.md)
    - 範囲の右からの`fold`
- [`ranges::fold_left_first`](ranges_fold_left_first.md)
    - 範囲の最初の要素を初期値として`fold_left`
- [`ranges::fold_right_last`](ranges_fold_right_last.md)
    - 範囲の最後の要素を初期値として`fold_right`
- [`ranges::fold_left_first_with_iter`](ranges_fold_left_first_with_iter.md)
    - `fold_left_first`の結果と共に、計算した終端イテレータも返す

## 参照

- [P2322R6 `ranges::fold`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2322r6.html)
