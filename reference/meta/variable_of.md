# variable_of
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval info variable_of(info r);
}
```
* info[link info.md]

## 概要
関数パラメータに対応するパラメータ変数のリフレクションを取得する。


## 戻り値
`r`が関数パラメータを表す場合、そのパラメータ変数のリフレクションを返す。


## 備考
この関数は、関数の定義内でのみ使用可能である。関数の宣言のみでは、パラメータ変数が存在しないため使用できない。


## 例外
`r`が関数パラメータを表さない場合、または関数定義のスコープ外で呼ばれた場合、[`std::meta::exception`](exception.md)例外を送出する。


## 例
```cpp example
#include <meta>
#include <print>

void func(int x, double y) {
  // 関数定義内でvariable_of()を使用してパラメータ変数にアクセス
  template for (constexpr auto p : std::define_static_array(std::meta::parameters_of(^^func))) {
    std::println("{} = {}", std::meta::identifier_of(p),
                            [:std::meta::variable_of(p):]);
  }
}

int main() {
  func(42, 3.14);
}
```
* std::meta::parameters_of[link parameters_of.md]
* std::meta::identifier_of[link identifier_of.md]

### 出力
```
x = 42
y = 3.14
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P3096R12 Function Parameter Reflection in Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3096r12.pdf)
