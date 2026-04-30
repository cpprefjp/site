# bases_of
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval std::vector<info> bases_of(info type, access_context ctx);
}
```
* info[link info.md]

## 概要
クラスの直接基底クラスのリフレクションを取得する。


## 戻り値
`type`が完全型のクラスを表す場合、アクセスコンテキスト`ctx`でアクセス可能な直接基底クラス関係のリフレクションを格納した[`std::vector`](/reference/vector/vector.md)オブジェクトを返す。


## 例外
`r`が完全型のクラスを表さない場合、[`std::meta::exception`](exception.md)例外を送出する。


## 備考
- C++では多重継承ができるため、基底クラスは複数存在する可能性がある


## 例
```cpp example
#include <meta>
#include <print>

struct A {};
struct B {};
struct C : A, B {};

int main() {
  // クラスCの直接基底クラスを取得して出力
  template for (constexpr auto b :
      std::define_static_array(std::meta::bases_of(^^C, std::meta::access_context::unchecked()))) {
    std::println("{}", std::meta::display_string_of(std::meta::type_of(b)));
  }
}
```
* std::meta::display_string_of[link display_string_of.md]
* std::meta::type_of[link type_of.md]

### 出力
```
A
B
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 16 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`members_of`](members_of.md)
- [`subobjects_of`](subobjects_of.md)
- [`is_base`](is_base.md)


## 参照
- [P2996R13 Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2996r13.html)
- [P3293R3 Splicing a base class subobject](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3293r3.html)
