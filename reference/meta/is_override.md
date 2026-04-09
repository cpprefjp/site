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
`override`指定されているかを判定する。


## 戻り値
`r`が`override`指定されたメンバ関数を表す場合に`true`を返す。


## 例
```cpp example
#include <meta>

struct Base {
  virtual void f() {}
};

struct Derived : Base {
  void f() override {}
};

int main() {
  static_assert(!std::meta::is_override(^^Base::f));
  static_assert(std::meta::is_override(^^Derived::f));
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


## 参照
- [P2996R13 Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2996r13.html)
