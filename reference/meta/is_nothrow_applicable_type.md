# is_nothrow_applicable_type
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval bool is_nothrow_applicable_type(info fn, info tuple);
}
```
* info[link info.md]

## 概要
関数型`fn`が、tuple-like型`tuple`の各要素型を引数として例外を送出せずに呼び出し可能かを判定する。

[`is_applicable_type()`](is_applicable_type.md)に加えて、その呼び出しが`noexcept`であることを要求する。


## 戻り値
`fn`が`tuple`の各要素型を順に引数として渡したときに、例外を送出せずに呼び出し可能な場合に`true`を返す。


## 例外
`fn`または`tuple`が型を表さない場合、[`std::meta::exception`](exception.md)例外を送出する。


## 例
```cpp example
#include <meta>
#include <tuple>

void f(int, double) noexcept;
void g(int, double);

int main() {
  static_assert(std::meta::is_nothrow_applicable_type(
    ^^decltype(f), ^^std::tuple<int, double>));
  static_assert(!std::meta::is_nothrow_applicable_type(
    ^^decltype(g), ^^std::tuple<int, double>));
}
```
* std::meta::is_nothrow_applicable_type[color ff0000]

### 出力
```
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 16 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`is_applicable_type`](is_applicable_type.md)
- [`apply_result`](apply_result.md)
- [`std::apply()`](/reference/tuple/apply.md)


## 参照
- [P3795R2 Miscellaneous Reflection Cleanup](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3795r2.html)
