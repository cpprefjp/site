# is_constructor_template
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval bool is_constructor_template(info r);
}
```
* info[link info.md]

## 概要
コンストラクタテンプレートであるかを判定する。コンストラクタテンプレートとは、テンプレート化されたコンストラクタ（`template <class T> S(T)`のような形式）のことである。


## 戻り値
`r`がコンストラクタテンプレートを表す場合に`true`を返す。


## 例
```cpp example
#include <meta>

struct S {
  S() = default;              // コンストラクタ（テンプレートではない）
  template <class T>
  S(T) {}                     // コンストラクタテンプレート
};

int main() {
  template for (constexpr auto m :
      std::define_static_array(std::meta::members_of(^^S, std::meta::access_context::unchecked()))) {
    if constexpr (std::meta::is_constructor_template(m)) {
      // template <class T> S(T) のみがここに到達する
      static_assert(std::meta::is_template(m));
      static_assert(!std::meta::is_default_constructor(m));
    }
  }
}
```
* std::meta::is_constructor_template[color ff0000]
* std::meta::is_template[link is_template.md]
* std::meta::is_default_constructor[link is_default_constructor.md]
* std::meta::members_of[link members_of.md]
* std::meta::access_context[link access_context.md]
* unchecked[link access_context/unchecked.md]

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


## 参照
- [P2996R13 Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2996r13.html)
