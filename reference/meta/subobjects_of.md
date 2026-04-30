# subobjects_of
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval std::vector<info> subobjects_of(info type, access_context ctx);
}
```
* info[link info.md]
* access_context[link access_context.md]

## 概要
クラスの基底クラスとメンバ変数を統合して取得する。


## 戻り値
`type`が完全型のクラスを表す場合、アクセスコンテキスト`ctx`でアクセス可能な直接基底クラス関係とメンバ変数のリフレクションを格納した[`std::vector`](/reference/vector/vector.md)オブジェクトを返す。基底クラスがメンバ変数より先に配置される。


## 例外
`r`が完全型のクラスを表さない場合、[`std::meta::exception`](exception.md)例外を送出する。


## 例
```cpp example
#include <meta>
#include <print>

struct Base { int b; };
struct Derived : Base { int d; };

int main() {
  static constexpr auto subs = std::define_static_array(
      std::meta::subobjects_of(
          ^^Derived, std::meta::access_context::unchecked()));

  // 基底クラスが先、メンバ変数が後
  template for (constexpr auto s : subs) {
    std::println("{}", std::meta::display_string_of(s));
  }
}
```
* std::meta::access_context[link access_context.md]
* unchecked[link access_context/unchecked.md]
* std::meta::display_string_of[link display_string_of.md]

#### 出力例
```
Base
d
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`bases_of`](bases_of.md)
- [`nonstatic_data_members_of`](nonstatic_data_members_of.md)


## 参照
- [P3293R3 Splicing a base class subobject](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3293r3.html)
