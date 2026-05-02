# reflect_constant_string
* meta[meta header]
* std::meta[meta namespace]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  template <ranges::input_range R>
  consteval info reflect_constant_string(R&& r);
}
```
* info[link info.md]

## 概要
文字のRangeからヌル終端文字配列のリフレクションを生成する。

[`define_static_string()`](define_static_string.md)は`const CharT*`を返すため配列のサイズ情報が失われるが、この関数はサイズ情報を保持した配列のリフレクションを返す。そのため、サイズをテンプレートパラメータとして推論する必要がある型（`FixedString<N>`など）にスプライスで渡すことができる。

また、[`define_static_string()`](define_static_string.md)はこの関数を内部で使用して実装されている。


## 戻り値
`r`の要素をコピーしたヌル終端文字配列`const CharT[sizeof...(V)+1]`のテンプレートパラメータオブジェクトのリフレクションを返す。


## 例
```cpp example
#include <meta>
#include <algorithm>
#include <cstddef>

template <std::size_t N>
struct FixedString {
  char data[N] = {};
  constexpr FixedString(const char (&str)[N]) {
    std::ranges::copy(str, str + N, data);
  }
};

template <FixedString S>
struct Named {};

int main() {
  // define_static_stringはconst char*を返すためFixedStringのサイズを推論できない
  // using Err = Named<std::define_static_string("hello")>;  // エラー

  // reflect_constant_stringはサイズ付き配列のリフレクションを返すため推論できる
  // (テンプレート引数で使うときはスプライスをカッコで囲む必要がある)
  using Ok = Named<([:std::meta::reflect_constant_string("hello"):])>;
}
```
* std::meta::reflect_constant_string[color ff0000]

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
- [`define_static_string`](define_static_string.md)
- [`reflect_constant_array`](reflect_constant_array.md)


## 参照
- [P3491R3 `define_static_{string,object,array}`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3491r3.html)
