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
構造的型の要素を持つRangeから、静的配列のリフレクションを生成する。

[`define_static_array()`](define_static_array.md)は[`span`](/reference/span/span.md)を返すため実行時のアクセスには便利だが、`span`は構造化束縛によるパック展開ができない。この関数は配列のリフレクションを返すため、スプライスして構造化束縛でパック展開する用途に使用できる。

また、[`define_static_array()`](define_static_array.md)はこの関数を内部で使用して実装されている。


## 戻り値
`r`の要素をコピーした`const T[N]`のテンプレートパラメータオブジェクトのリフレクションを返す。


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
- [GCC](/implementation.md#gcc): 16 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`define_static_array`](define_static_array.md)
- [`reflect_constant_string`](reflect_constant_string.md)


## 参照
- [P3491R3 `define_static_{string,object,array}`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3491r3.html)
