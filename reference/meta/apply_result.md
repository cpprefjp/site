# apply_result
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval info apply_result(info fn, info tuple);
}
```
* info[link info.md]

## 概要
関数型`fn`に、tuple-like型`tuple`の各要素型を引数として適用したときの結果型のリフレクションを返す。

[`std::apply_result_t`](/reference/type_traits/apply_result.md)に対応する。


## 戻り値
`fn`に`tuple`の各要素型を順に引数として渡したときの結果型のリフレクションを返す。


## 例外
`fn`または`tuple`が型を表さない場合、または[`is_applicable_type()`](is_applicable_type.md)が`false`の場合、[`std::meta::exception`](exception.md)例外を送出する。


## 例
```cpp example
#include <meta>
#include <tuple>

int f(int, double);

int main() {
  static_assert(std::meta::apply_result(
    ^^decltype(f), ^^std::tuple<int, double>) == ^^int);
}
```
* std::meta::apply_result[color ff0000]

### 出力
```
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 16 (`-freflection` オプション指定) [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`is_applicable_type`](is_applicable_type.md)
- [`is_nothrow_applicable_type`](is_nothrow_applicable_type.md)
- [`std::apply()`](/reference/tuple/apply.md)


## 参照
- [P3795R2 Miscellaneous Reflection Cleanup](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3795r2.html)
