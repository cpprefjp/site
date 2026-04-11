# scope
* meta[meta header]
* std::meta[meta namespace]
* access_context[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
consteval info scope() const;
```
* info[link ../info.md]

## 概要
アクセスコンテキストのスコープのリフレクションを返す。


## 戻り値
このアクセスコンテキストが関連付けられているスコープのリフレクションを返す。


## 例
```cpp example
#include <meta>
#include <print>

class C {
  int secret;
public:
  int visible;

  static void inspect() {
    constexpr auto ctx = std::meta::access_context::current();
    // C内部からcurrent()を呼んだので、スコープはC
    std::println("scope: {}", std::meta::display_string_of(ctx.scope()));
  }
};

int main() {
  C::inspect();
}
```
* scope()[color ff0000]
* std::meta::access_context::current[link current.md]
* std::meta::display_string_of[link ../display_string_of.md]

#### 出力例
```
scope: C
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
