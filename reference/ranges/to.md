# to
* ranges[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std::ranges {
  template<class C, input_range R, class... Args> requires (!view<C>)
  constexpr C to(R&& r, Args&&... args);     // (1)

  template<template<class...> class C, input_range R, class... Args>
  constexpr auto to(R&& r, Args&&... args);  // (2)

  template<class C, class... Args> requires (!view<C>)
  constexpr auto to(Args&&... args);         // (3)

  template<template<class...> class C, class... Args>
  constexpr auto to(Args&&... args);         // (4)
}
```

## 概要

Rangeの各要素を要素とするコンテナを構築する。
この関数は再帰的に適用され、ネストされたRangeにも対応する。

- (1): 処理の実体となる関数テンプレート
- (2): (1)のテンプレートテンプレート版
- (3): (1)に対応するRangeアダプタ
- (4): (2)に対応するRangeアダプタ

(2), (4) の存在により、コンテナ型を指定するときにその要素の型を省略して(=テンプレートとして)渡すことができる。


## 適格要件
- (1), (3): `C` はCV装飾のないクラス型であること。


## 戻り値

(1) Rangeの各要素を要素とするコンテナCのオブジェクトを以下の通りに構築して返す。

`C`が[`input_range`](input_range.md)ではないか、[`convertible_to`](/reference/concepts/convertible_to.md)`<`[`range_reference_t`](range_reference_t.md)`<R>, `[`range_value_t`](range_value_t.md)`<C>>` である(`R`の要素への参照が`C`の要素に変換できる)場合:

1. [`constructible_from`](/reference/concepts/constructible_from.md)`<C, R, Args...>`である(`C`が`R`と残りの引数で構築できる)場合
    - `C(`[`std::forward`](/reference/utility/forward.md)`<R>(r), `[`std::forward`](/reference/utility/forward.md)`<Args>(args)...)`
2. [`constructible_from`](/reference/concepts/constructible_from.md)`<C, `[`from_range_t`](from_range_t.md)`, R, Args...>`である(`C`が[`from_range_t`](from_range_t.md)、`R`、残りの引数で構築できる)場合
    - `C(`[`from_range`](from_range_t.md)`, `[`std::forward`](/reference/utility/forward.md)`<R>(r), `[`std::forward`](/reference/utility/forward.md)`<Args>(args)...)`
3. [`common_range`](common_range.md)`<R>`が`true`で、[`iterator_traits`](/reference/iterator/iterator_traits.md)`<`[`iterator_t`](iterator_t.md)`<R>>::iterator_category`が `input_iterator_tag` から派生する有効な型であり、[`constructible_from`](/reference/concepts/constructible_from.md)`<C, `[`iterator_t`](iterator_t.md)`<R>, `[`sentinel_t`](sentinel_t.md)`<R>, Args...>`である(`C`が`R`のイテレータおよび番兵と残りの引数で構築できる)場合
    - `C(`[`ranges::begin(r)`](begin.md)`, `[`ranges::end(r)`](end.md)`, `[`std::forward`](/reference/utility/forward.md)`<Args>(args)...)`
4. [`constructible_from`](/reference/concepts/constructible_from.md)`<C, Args...>`が`true`で、`container-insertable<C, `[`range_reference_t`](range_reference_t.md)`<R>>`が`true`である場合
    - 以下のコードで初期化する

```cpp
C c(std::forward<Args>(args)...);
if constexpr (sized_range<R> && reservable-container<C>)
  c.reserve(static_cast<range_size_t<C>>(ranges::size(r)));
ranges::copy(r, container-inserter<range_reference_t<R>>(c));
```

[`input_range`](input_range.md)`<`[`range_reference_t`](range_reference_t.md)`<R>>`である場合:

```cpp
to<C>(r | views::transform([](auto&& elem) {
  return to<range_value_t<C>>(std::forward<decltype(elem)>(elem));
}), std::forward<Args>(args)...);
```

どの条件にもあてはまらない場合、プログラムは不適格である。

(2) `input-iterator` を次のように定義する。

```cpp
struct input-iterator {
  using iterator_category = input_iterator_tag;
  using value_type = range_value_t<R>;
  using difference_type = ptrdiff_t;
  using pointer = add_pointer_t<range_reference_t<R>>;
  using reference = range_reference_t<R>;
  reference operator*() const;
  pointer operator->() const;
  input-iterator& operator++();
  input-iterator operator++(int);
  bool operator==(const input-iterator&) const;
};
```

また、`DEDUCE_EXPR` を次のように定義する。

1. 有効な式ならば、`C(`[`declval`](/reference/utility/declval.md)`<R>(), `[`declval`](/reference/utility/declval.md)`<Args>()...)`
2. 有効な式ならば、`C(`[`from_range`](from_range_t.md)`, `[`declval`](/reference/utility/declval.md)`<R>(), `[`declval`](/reference/utility/declval.md)`<Args>()...)`
3. 有効な式ならば、`C(`[`declval`](/reference/utility/declval.md)`<input-iterator>(), `[`declval`](/reference/utility/declval.md)`<input-iterator>(), `[`declval`](/reference/utility/declval.md)`<Args>()...)`
4. 1-3が有効でなければ、ill-formed

このとき、戻り値は `to<`[`decltype`](/lang/cpp11/decltype.md)`(DEDUCE_EXPR)>(`[`std::forward`](/reference/utility/forward.md)`<R>(r), `[`std::forward`](/reference/utility/forward.md)`<Args>(args)...)`

(3), (4): 次の性質をもつ完全転送呼び出しラッパー(*perfect forwarding call wrapper*)であるようなRangeアダプタクロージャオブジェクト`f`を返す。

- ターゲットオブジェクトを持たない
- バインドされた引数`bound_args`は、[`decay_t`](/reference/type_traits/decay.md)`<Args>...`型のオブジェクトであり、それぞれ[`std::forward`](/reference/utility/forward.md)`<Args>(args)...`で直接非リスト初期化(*direct-non-list-initialize*)される
- 呼び出しパターンは`to<C>(r, bound_args...)`である。ただし、`r`は`f`の関数呼び出し式で使用される引数


## 備考

本説明に用いる説明専用コンセプトを以下のように定義する。

```cpp
template<class Container>
constexpr bool reservable-container =
  sized_range<Container> &&
  requires(Container& c, range_size_t<Container> n) {
    c.reserve(n);
    { c.capacity() } -> same_as<decltype(n)>;
    { c.max_size() } -> same_as<decltype(n)>;
  };

template<class Container, class Ref>
constexpr bool container-insertable =
  requires(Container& c, Ref&& ref) {
    requires (requires { c.push_back(std::forward<Ref>(ref)); } ||
              requires { c.insert(c.end(), std::forward<Ref>(ref)); });
  };

template<class Ref, class Container>
constexpr auto container-inserter(Container& c) {
  if constexpr (requires { c.push_back(declval<Ref>()); })
    return back_inserter(c);
  else
    return inserter(c, c.end());
}
```

## この機能が必要になった背景・経緯

Rangeの各要素を要素とするコンテナを構築するには、従来、次のような方法があった。

```cpp example
#include <ranges>
#include <vector>
#include <string>
#include <string_view>
#include <print>
#include <algorithm>

int main() {
  using namespace std;
  using namespace std::literals;
  auto str = "the quick brown fox"sv;
  vector<string> words;
  for(auto&& i : views::split(str, ' ')) {
    words.emplace_back(i.begin(), i.end());
  }
  println("{}", words);
}
```

これを簡潔に書くために、`to`関数が提案された。


## 例
```cpp example
#include <ranges>
#include <vector>
#include <string>
#include <string_view>
#include <print>

int main() {
  using namespace std;
  using namespace std::literals;
  auto str = "the quick brown fox"sv;
  auto words = views::split(str, ' ') | ranges::to<vector<string>>();
  println("{}", words);
}
```
* ranges::to[color ff0000]

### 出力
```
["the", "quick", "brown", "fox"]
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): 19.0 (at least)
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

## 参照

- [26.5.7.2 ranges::to](https://timsong-cpp.github.io/cppwp/range.utility.conv.to)
