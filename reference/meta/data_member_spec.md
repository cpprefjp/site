# data_member_spec
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval info data_member_spec(info type, data_member_options options);
}
```
* info[link info.md]
* data_member_options[link data_member_options.md]

## 概要
データメンバの仕様を作成する。[`define_aggregate()`](define_aggregate.md)で使用するデータメンバの仕様を表すリフレクションを返す。


## 戻り値
指定された型`type`とオプション`options`に基づくデータメンバの仕様を表すリフレクションを返す。


## 例外
以下のすべての条件を満たさない場合、[`std::meta::exception`](exception.md)例外を送出する：

- [`dealias`](dealias.md)`(type)`がオブジェクト型または参照型を表すこと
- `options.name`に値がある場合、それが有効な識別子（トークン）のつづりを含むこと（`u8string`ならUTF-8、`string`なら通常のリテラルエンコーディングで解釈する。ユニバーサルキャラクタ名などの字句構造は処理されない）
- `options.name`に値がない場合、`options.bit_width`に値があり、かつ`options.annotations`が空であること
- `options.bit_width`に値`V`がある場合、次をすべて満たすこと：
    - [`is_integral_type`](is_integral_type.md)`(type) || is_enum_type(type)`が`true`であること
    - `options.alignment`に値がないこと
    - `options.no_unique_address`が`false`であること
    - `V`が負でないこと
    - `V`が`0`の場合、`options.name`に値がないこと
    - `options.name`に値がない場合、[`is_const`](is_const.md)`(type) || is_volatile(type)`が`false`であること
- `options.alignment`に値がある場合、それが[`alignment_of`](alignment_of.md)`(type)`以上のアライメント値であること
- `options.annotations`の各リフレクション`r`について、`has-type(r)`が`true`であり、[`type_of`](type_of.md)`(r)`が非配列オブジェクト型を表し、[`constant_of`](constant_of.md)`(r)`の評価が例外で終了しないこと


## 例
```cpp example
#include <meta>

struct S;

consteval {
  std::meta::define_aggregate(^^S, {
    std::meta::data_member_spec(^^int, {.name = "x"}),
    std::meta::data_member_spec(^^double, {.name = "y"})
  });
}

int main() {
  S s{1, 2.0};
  static_assert(std::meta::is_data_member_spec(
    std::meta::data_member_spec(^^int, {.name = "z"})));
}
```

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
- [`data_member_options`](data_member_options.md)
- [`define_aggregate`](define_aggregate.md)


## 参照
- [P2996R13 Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2996r13.html)
- [LWG Issue 4423. `meta::data_member_spec` allows negative bit-field widths](https://cplusplus.github.io/LWG/issue4423)
    - C++26で、`options.bit_width`の値`V`が負でないことが例外送出条件に追加された。負のビット幅を指定できてしまう問題を防ぐもの
- [LWG Issue 4517. `data_member_spec` should throw for cv-qualified unnamed bit-fields](https://cplusplus.github.io/LWG/issue4517)
    - C++26で、無名ビットフィールド（`options.name`に値がない）に対して`type`がCV修飾されている場合に例外を送出することが規定された。CV修飾された型の無名ビットフィールドを禁止する言語側の規則（CWG 2229）と整合させるもの
