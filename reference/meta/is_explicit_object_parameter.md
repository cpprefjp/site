# is_explicit_object_parameter
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval bool is_explicit_object_parameter(info r);
}
```
* info[link info.md]

## 概要
関数パラメータが明示的オブジェクトパラメータ（`this`引数）であるかを判定する。


## 戻り値
`r`が関数パラメータを表し、かつ明示的オブジェクトパラメータ（`this`引数）である場合に`true`を返す。そうでなければ`false`を返す。


## 例
```cpp example
#include <meta>

struct S {
  void f(this S& self) {}  // 明示的オブジェクトパラメータ
  void g(int x) {}         // 通常のパラメータ
};

consteval bool check() {
  auto f_params = std::meta::parameters_of(^^S::f);
  auto g_params = std::meta::parameters_of(^^S::g);
  return std::meta::is_explicit_object_parameter(f_params[0])
      && !std::meta::is_explicit_object_parameter(g_params[0]);
}

int main() {
  static_assert(check());
}
```
* std::meta::parameters_of[link parameters_of.md]

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
- [P3096R12 Function Parameter Reflection in Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3096r12.pdf)
