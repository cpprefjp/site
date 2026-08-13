# reflect_constant_array
* meta[meta header]
* std::meta[meta namespace]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  template <ranges::input_range R>
  consteval info reflect_constant_array(R&& r);
}
```
* info[link info.md]

## 概要
構造的型または配列型の要素を持つRangeから、静的配列のリフレクションを生成する。

[`define_static_array()`](define_static_array.md)は[`span`](/reference/span/span.md)を返すため実行時のアクセスには便利だが、`span`は構造化束縛によるパック展開ができない。この関数は配列のリフレクションを返すため、スプライスして構造化束縛でパック展開する用途に使用できる。

また、[`define_static_array()`](define_static_array.md)はこの関数を内部で使用して実装されている。


## 適格要件
説明用に、`U`を[`ranges::range_value_t`](/reference/ranges/range_value_t.md)`<R>`、`T`を[`remove_all_extents_t`](/reference/type_traits/remove_all_extents.md)`<U>`とする。以下をすべて満たすこと：

- `T`が構造的型（*structural type*）であること
- `T`が[`copy_constructible`](/reference/concepts/copy_constructible.md)を満たすこと
- `U`が配列型でない場合、[`is_constructible_v`](/reference/type_traits/is_constructible.md)`<T, `[`ranges::range_reference_t`](/reference/ranges/range_reference_t.md)`<R>>`が`true`であること


## 備考
- 要素の型が配列型である場合、その各要素に対して再帰的にこの関数が適用される。これにより、多次元配列のリフレクションを生成できる（配列型は構造的型ではないため、この再帰的な扱いがなければ多次元配列は扱えない）
- 各要素は、範囲の対応する要素を間接参照して`T`型へ`static_cast`した値（`static_cast<T>(*it)`）で直接初期化される（コピー初期化ではない）。これにより、一時的なプロキシ参照を返す範囲（`views`のアダプタなど）に対しても正しく動作する


## 戻り値
`r`の要素をコピーした`const T[N]`のテンプレートパラメータオブジェクトのリフレクションを返す。


## 例外
以下のいずれかを送出する：

- `r`、または`r`を参照するイテレータ・番兵に対する任意の操作が送出する例外
- [`reflect_constant`](reflect_constant.md)の引数の評価、またはこの関数（`reflect_constant_array`）の評価が送出する例外
- `reflect_constant`のいずれかの呼び出しが例外で終了する場合、[`std::meta::exception`](exception.md)例外


## 例
```cpp example
#include <meta>
#include <array>

// 構造化束縛のパック展開はテンプレート文脈で使用する必要がある
template <int>
consteval int sum() {
  // 配列のリフレクションをスプライスし、構造化束縛でパック展開
  constexpr auto [...elems] =
      [:std::meta::reflect_constant_array(std::array{1, 2, 3}):];
  return (... + elems);
}

int main() {
  static_assert(sum<0>() == 6);
}
```
* std::meta::reflect_constant_array[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 16 (`-freflection` オプション指定) [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`define_static_array`](define_static_array.md)
- [`reflect_constant_string`](reflect_constant_string.md)


## 参照
- [P3491R3 `define_static_{string,object,array}`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3491r3.html)
- [LWG Issue 4432. Clarify element initialization for `meta::reflect_constant_array`](https://cplusplus.github.io/LWG/issue4432)
    - C++26で、各要素が`static_cast<T>(*it)`の値で直接初期化されることが明確化された。一時的なプロキシ参照を返す範囲アダプタに対する曖昧さを解消するもの
- [LWG Issue 4483. Multidimensional arrays are not supported by `meta::reflect_constant_array` and related functions](https://cplusplus.github.io/LWG/issue4483)
    - C++26で、配列型の要素に対して再帰的にこの関数を適用することで、多次元配列がサポートされた
