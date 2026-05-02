# is_defaulted
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval bool is_defaulted(info r);
}
```
* info[link info.md]

## 概要
デフォルト関数（規格上の[defaulted function](https://eel.is/c++draft/dcl.fct.def.default#def:defaulted)）であるかを判定する。

デフォルト関数には、以下が含まれる：

- `= default`を明示的に付加して定義された関数
- 暗黙的に宣言される特殊メンバ関数（デフォルトコンストラクタ、コピー/ムーブコンストラクタ、コピー/ムーブ代入演算子、デストラクタ）
- 暗黙的に宣言される比較演算子


## 戻り値
`r`がデフォルト関数を表す場合に`true`を返す。


## 例
```cpp example
#include <meta>

// すべての特殊メンバ関数が暗黙的に宣言される
struct Implicit {};

// 明示的に= defaultされる
struct Explicit {
  Explicit() = default;
  Explicit(int) {}
};

int main() {
  template for (constexpr auto m :
      std::define_static_array(std::meta::members_of(^^Implicit,
          std::meta::access_context::unchecked()))) {
    // Implicitクラスの暗黙宣言されたデフォルトコンストラクタ等もデフォルト関数となる
    if constexpr (std::meta::is_default_constructor(m)) {
      static_assert(std::meta::is_defaulted(m));
    }
  }

  template for (constexpr auto m :
      std::define_static_array(std::meta::members_of(^^Explicit,
          std::meta::access_context::unchecked()))) {
    if constexpr (std::meta::is_default_constructor(m)) {
      // 明示的な= default指定された関数もデフォルト関数
      static_assert(std::meta::is_defaulted(m));
    }
    if constexpr (std::meta::is_constructor(m)
                  && !std::meta::is_default_constructor(m)
                  && !std::meta::is_copy_constructor(m)
                  && !std::meta::is_move_constructor(m)) {
      // ユーザー定義コンストラクタはデフォルト関数ではない
      static_assert(!std::meta::is_defaulted(m));
    }
  }
}
```
* std::meta::is_defaulted[color ff0000]
* std::meta::is_default_constructor[link is_default_constructor.md]
* std::meta::is_constructor[link is_constructor.md]
* std::meta::is_copy_constructor[link is_copy_constructor.md]
* std::meta::is_move_constructor[link is_move_constructor.md]
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
