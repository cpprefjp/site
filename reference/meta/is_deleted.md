# is_deleted
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval bool is_deleted(info r);
}
```
* info[link info.md]

## 概要
削除関数（規格上の[deleted function](https://eel.is/c++draft/dcl.fct.def.delete#def:function,deleted)）であるかを判定する。

削除関数には、以下が含まれる：

- `= delete`を明示的に付加して宣言された関数
- 暗黙的にdeleteされる関数（例えば、deleteされた基底クラスの特殊メンバ関数によって、派生クラスで暗黙的に対応する特殊メンバ関数がdeleteされる場合）
- `= default`を明示的に付加して宣言されたが、結果としてdeleteされる関数（例えば、基底クラスのムーブコンストラクタがdeleteされている状態で、派生クラスで`= default`指定されたムーブコンストラクタ）


## 戻り値
`r`が削除関数を表す場合に`true`を返す。


## 例
```cpp example
#include <meta>

struct B {
  B(const B&) = delete;
  B(B&&) = delete;
};

struct S : B {
  S() = delete;     // 明示的にdelete宣言された関数: 削除関数
  // S(const S&);   // 暗黙的に宣言されるが基底のdeleteにより削除関数とみなされる
  S(S&&) = default; // 明示的にdefault宣言だが、基底クラスのdeleteにより削除関数とみなされる
};

int main() {
  template for (constexpr auto m :
      std::define_static_array(std::meta::members_of(^^S,
          std::meta::access_context::unchecked()))) {
    // S()、S(const S&)、S(S&&)はいずれも削除関数
    if constexpr (std::meta::is_constructor(m)) {
      static_assert(std::meta::is_deleted(m));
    }
  }
}
```
* std::meta::is_deleted[color ff0000]
* std::meta::is_constructor[link is_constructor.md]
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
