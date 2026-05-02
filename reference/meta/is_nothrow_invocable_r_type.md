# is_nothrow_invocable_r_type
* meta[meta header]
* std::meta[meta namespace]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  template <reflection_range R = std::initializer_list<info>>
  consteval bool is_nothrow_invocable_r_type(info type_result, info type, R&& type_args);
}
```
* info[link info.md]
* reflection_range[link reflection_range.md]


## 概要
例外を送出せずに呼び出し可能で戻り値が指定型に変換可能かを判定する。[`std::is_nothrow_invocable_r`](/reference/type_traits/is_nothrow_invocable_r.md)に対応する。


## 戻り値
`type`が`type_args`で例外を送出せずに呼び出し可能で、戻り値が`type_result`に変換可能な場合に`true`を返す。


## 例外
`type_result`、`type`、または`type_args`の各要素が型を表さない場合、[`std::meta::exception`](exception.md)例外を送出する。


## 例
```cpp example
#include <meta>

int f(double) noexcept { return 0; }
int g(double) { return 0; }  // noexceptでない

int main() {
  static_assert(std::meta::is_nothrow_invocable_r_type(^^int, ^^decltype(f), {^^double}));
  static_assert(!std::meta::is_nothrow_invocable_r_type(^^int, ^^decltype(g), {^^double}));
}
```
* std::meta::is_nothrow_invocable_r_type[color ff0000]

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
- [`std::is_nothrow_invocable_r`](/reference/type_traits/is_nothrow_invocable_r.md)


## 参照
- [P2996R13 Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2996r13.html)
