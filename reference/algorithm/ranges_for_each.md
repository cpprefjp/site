# for_each
* algorithm[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template <input_iterator I,
            sentinel_for<I> S,
            class Proj = identity,
            indirectly_unary_invocable<projected<I, Proj>> Fun>
  constexpr for_each_result<I, Fun>
    for_each(I first,
             S last,
             Fun f,
             Proj proj = {}); // (1) C++20

  template <input_range R,
            class Proj = identity,
            indirectly_unary_invocable<projected<iterator_t<R>, Proj>> Fun>
  constexpr for_each_result<borrowed_iterator_t<R>, Fun>
    for_each(R&& r,
             Fun f,
             Proj proj = {}); // (2) C++20
}
```
* indirectly_unary_invocable[link /reference/iterator/indirectly_unary_invocable.md]
* borrowed_iterator_t[link /reference/ranges/borrowed_iterator_t.md]
* for_each_result[link /reference/algorithm/ranges_in_fun_result.md]


## 概要
範囲の全ての要素に、指定された関数を適用する。

* (1): イテレータ範囲を指定する
* (2): Rangeを直接指定する

## テンプレートパラメータ制約
- (1):
    - `I`が[`input_iterator`](/reference/iterator/input_iterator.md)である
    - `S`が[`I`に対する番兵](/reference/iterator/sentinel_for.md)である
    - `Fun`は`I`を`Proj`で射影した値を受け取る[1引数の`invocable`](/reference/iterator/indirectly_unary_invocable.md)である
- (2):
    - `R`が[`input_range`](/reference/ranges/input_range.md)である
    - `Fun`は`R`のイテレータを`Proj`で射影した値を受け取る[1引数の`invocable`](/reference/iterator/indirectly_unary_invocable.md)である

この他にFunは[`copy_constructible`](/reference/concepts/copy_constructible.md)のモデルであることが要求される。

## 効果
`[first,last)` 内の全てのイテレータ `i` に [`invoke`](/reference/functional/invoke.md)`(f, `[`invoke`](/reference/functional/invoke.md)`(proj, *i))` という操作を行う。`first` から順番に処理し、`last - 1` まで行う。

このアルゴリズムはその他のアルゴリズムと違い、[`invoke`](/reference/functional/invoke.md)`(proj, *i)` が書き換え可能な参照であれば、関数 `f` の内部でその値を書き換えても構わない。


## 戻り値

```cpp
for_each_result {
  .in = last,
  .fun = std::move(f),
}
```
* for_each_result[link /reference/algorithm/ranges_in_fun_result.md]

## 計算量
正確に `f` を `last - first` 回適用する


## 備考
- `f` に戻り値がある場合、それは単に無視される


## 例

```cpp example
#include <iostream>
#include <array>
#include <algorithm>

int main() {
  constexpr std::array v = { 3, 1, 4 };

  // vの全ての要素にラムダ式を適用する
  std::ranges::for_each(v, [](int x) { std::cout << x << std::endl; });

  std::cout << "----" << std::endl;

  // 要素の内容を書き換えても構わないし、呼び出し順序に依存した処理を書いても構わない
  int n = 0;
  std::ranges::for_each(v, [n](int& x) mutable { x += n++; });
  std::ranges::for_each(v, [](int x) { std::cout << x << std::endl; });
}
```
* std::ranges::for_each[color ff0000]

#### 出力
```
3
1
4
----
3
2
6
```


### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]


## 実装例
```cpp
struct for_each_impl {
  template<input_iterator I, sentinel_for<I> S, class Proj = identity, indirectly_unary_invocable<projected<I, Proj>> Fun>
    requires copy_constructible<Fun>
  constexpr for_each_result<I, Fun> operator()(I first, S last, Fun f, Proj proj = {}) const {
    for (; first != last; ++first) {
      invoke(f, invoke(proj, *first));
    }
    return {move(first), move(f)};
  }

  template<input_range R, class Proj = identity, indirectly_unary_invocable<projected<iterator_t<R>, Proj>> Fun>
    requires copy_constructible<Fun>
  constexpr for_each_result<borrowed_iterator_t<R>, Fun> operator()(R&& r, Fun f, Proj proj = {}) const {
    return (*this)(begin(r), end(r), move(f), ref(proj));
  }
};

inline constexpr for_each_impl for_each;
```
* indirectly_unary_invocable[link /reference/iterator/indirectly_unary_invocable.md]
* borrowed_iterator_t[link /reference/ranges/borrowed_iterator_t.md]
* ref[link /reference/functional/ref.md]
* move[link /reference/utility/move.md]


## 参照
- [N4861 25 Algorithms library](https://timsong-cpp.github.io/cppwp/n4861/algorithms)
