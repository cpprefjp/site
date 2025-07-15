# format_kind
* format[meta header]
* std[meta namespace]
* variable[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std {
  template <class R>
  constexpr unspecified format_kind = unspecified;   // (1) C++23

  template <ranges::input_range R>
    requires same_as<R, remove_cvref_t<R>>
  constexpr range_format format_kind<R> = see below; // (2) C++23
}
```
* unspecified[italic]
* range_format[link range_format.md]
* ranges::input_range[link /reference/ranges/input_range.md]

## 概要
Rangeの書式種別を取得する変数テンプレート。

- (1) プライマリテンプレート。これがインスタンス化されたらプログラムは不適格となる
- (2) 入力Rangeの型`R`に応じて、書式種別を取得する


## テンプレートパラメータ制約
- (2) : 入力Rangeの型`R`は、const/volatileおよび参照で修飾されていないこと


## 効果
以下、(2)について記載する。

- [`same_as`](/reference/concepts/same_as.md)`<`[`remove_cvref_t`](/reference/type_traits/remove_cvref.md)`<`[`ranges::range_reference_t`](/reference/ranges/range_reference_t.md)`<R>>, R>`が`true`である場合、値[`range_format::disabled`](range_format.md)をもつ
    - 例として、[`std::filesystem::path`](/reference/filesystem/path.md)のような再帰的な型がこれに相当する
- `R::key_type`が有効な式である場合 ([`std::map`](/reference/map/map.md)や[`std::set`](/reference/set/set.md)が相当する)、
    - `R::mapped_type`が有効な式であり、[`remove_cvref_t`](/reference/type_traits/remove_cvref.md)`<`[`ranges::range_reference_t`](/reference/ranges/range_reference_t.md)`<R>>`を`U`として、`U`が[`std::pair`](/reference/utility/pair.md)の特殊化もしくは`U`が[`std::tuple`](/reference/tuple/tuple.md)の特殊化で要素数が2の場合、値[`range_format::map`](range_format.md)をもつ
    - そうでない場合、値[`range_format::set`](range_format.md)をもつ
- そうでない場合、値[`range_format::sequence`](range_format.md)をもつ


## 備考
- ユーザーは、この型の特殊化を定義できる
    - ただし、その特殊化は定数式であり、型として`const` [`range_format`](range_format.md)をもつこと


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`range_format`](range_format.md)
- [`formatter`](formatter.md)


## 参照
- [P2286R8 Formatting Ranges](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2286r8.html)
- [P2585R1 Improve default container formatting](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2585r1.html)
