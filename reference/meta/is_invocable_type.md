# is_invocable_type
* meta[meta header]
* std::meta[meta namespace]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  template <reflection_range R = std::initializer_list<info>>
  consteval bool is_invocable_type(info type, R&& type_args);
}
```
* info[link info.md]
* reflection_range[link reflection_range.md]

## 概要
呼び出し可能な型であるかを判定する。[`std::is_invocable`](/reference/type_traits/is_invocable.md)に対応する。


## 戻り値
`type`が`type_args`で指定された引数型で呼び出し可能な場合に`true`を返す。


## 例外
`type`または`type_args`の各要素が型を表さない場合、[`std::meta::exception`](exception.md)例外を送出する。


## 例
```cpp example
#include <meta>

void f(int, double) {}

int main() {
  static_assert(std::meta::is_invocable_type(^^decltype(f), {^^int, ^^double}));
  static_assert(!std::meta::is_invocable_type(^^decltype(f), {^^int}));
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
- [GCC](/implementation.md#gcc): 16 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`std::is_invocable`](/reference/type_traits/is_invocable.md)


## 参照
- [P2996R13 Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2996r13.html)
