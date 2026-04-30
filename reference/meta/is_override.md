# is_override
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval bool is_override(info r);
}
```
* info[link info.md]

## 概要
基底クラスの仮想関数をオーバーライドしているメンバ関数であるかを判定する。`override`キーワードの有無に関係なく、意味的にオーバーライドしていれば`true`を返す。


## 戻り値
`r`が別のメンバ関数をオーバーライドしているメンバ関数を表す場合に`true`を返す。


## 例
```cpp example
#include <meta>

struct Base {
  virtual void f() {}
  virtual void g() {}
};

struct Derived : Base {
  void f() override {}  // overrideキーワードあり
  void g() {}           // overrideキーワードなしだが、オーバーライドしている
};

int main() {
  // 基底クラスの仮想関数はオーバーライドではない
  static_assert(!std::meta::is_override(^^Base::f));

  // overrideキーワードの有無に関係なく、オーバーライドしていればtrue
  static_assert(std::meta::is_override(^^Derived::f));
  static_assert(std::meta::is_override(^^Derived::g));
}
```
* std::meta::is_override[color ff0000]

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
