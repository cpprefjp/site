# designating_class
* meta[meta header]
* std::meta[meta namespace]
* access_context[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
consteval info designating_class() const;
```
* info[link ../info.md]

## 概要
アクセスコンテキストの指定クラス (designating class) のリフレクションを返す。

`via()`で派生クラスを経由するアクセスコンテキストを作った場合、`designating_class()`はその派生クラスを返す。


## 戻り値
このアクセスコンテキストにおいて、メンバアクセスの対象となるクラスのリフレクションを返す。


## 例
```cpp example
#include <meta>
#include <print>

class Base {
protected:
  int prot;
public:
  int pub;
};

class Derived : public Base {};

int main() {
  constexpr auto ctx = std::meta::access_context::current().via(^^Derived);
  std::println("designating class: {}",
    std::meta::display_string_of(ctx.designating_class()));
}
```
* designating_class()[color ff0000]
* std::meta::access_context::current[link current.md]
* via[link via.md]
* std::meta::display_string_of[link ../display_string_of.md]

#### 出力例
```
designating class: Derived
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
