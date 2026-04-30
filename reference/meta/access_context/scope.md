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

[`access_context::current()`](current.md)で取得したコンテキストの場合、`current()`を呼び出した時点で囲んでいる関数や名前空間などのスコープが返される。


## 例
```cpp example
#include <meta>
#include <print>

class C {
public:
  static void inspect() {
    // current()はinspect()関数内で呼ばれたので、スコープはinspect()関数
    constexpr auto ctx = std::meta::access_context::current();
    std::println("inspect()のスコープ: {}",
                 std::meta::display_string_of(ctx.scope()));
  }
};

void free_function() {
  // current()はfree_function()内で呼ばれたので、スコープはfree_function()
  constexpr auto ctx = std::meta::access_context::current();
  std::println("free_function()のスコープ: {}",
               std::meta::display_string_of(ctx.scope()));
}

int main() {
  // current()はmain()内で呼ばれたので、スコープはmain()
  constexpr auto ctx = std::meta::access_context::current();
  std::println("main()のスコープ: {}",
               std::meta::display_string_of(ctx.scope()));

  C::inspect();
  free_function();
}
```
* scope()[color ff0000]
* std::meta::access_context::current[link current.md]
* std::meta::display_string_of[link ../display_string_of.md]

#### 出力例
```
main()のスコープ: int main()
inspect()のスコープ: static void C::inspect()
free_function()のスコープ: void free_function()
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
