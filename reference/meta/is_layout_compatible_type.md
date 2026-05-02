# is_layout_compatible_type
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval bool is_layout_compatible_type(info type1, info type2);
}
```
* info[link info.md]

## 概要
2つの型がレイアウト互換かを判定する。[`std::is_layout_compatible`](/reference/type_traits/is_layout_compatible.md)に対応する。


## 戻り値
`type1`と`type2`がレイアウト互換である場合に`true`を返す。


## 例外
`type1`または`type2`が型を表さない場合、[`std::meta::exception`](exception.md)例外を送出する。


## 例
```cpp example
#include <meta>

struct A { int x; };
struct B { int y; };

int main() {
  static_assert(std::meta::is_layout_compatible_type(^^A, ^^B));
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
- [`std::is_layout_compatible`](/reference/type_traits/is_layout_compatible.md)


## 参照
- [P2996R13 Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2996r13.html)
