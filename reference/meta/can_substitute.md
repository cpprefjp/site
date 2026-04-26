# can_substitute
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  template <reflection_range R = std::initializer_list<info>>
  consteval bool can_substitute(info templ, R&& arguments);
}
```
* info[link info.md]
* reflection_range[link reflection_range.md]

## 概要
テンプレートにテンプレート引数を置換可能かを判定する。


## 戻り値
テンプレート`templ`に`arguments`を置換した結果が妥当である場合に`true`を返す。そうでなければ`false`を返す。


## 例外
`templ`がテンプレートを表さない場合、または`arguments`の要素がテンプレート引数として使用可能な構成要素を表さない場合、[`std::meta::exception`](exception.md)例外を送出する。


## 例
```cpp example
#include <meta>
#include <vector>

int main() {
  static_assert(std::meta::can_substitute(^^std::vector, {^^int}));
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
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`substitute`](substitute.md)


## 参照
- [P2996R13 Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2996r13.html)
