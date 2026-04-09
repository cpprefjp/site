# unprivileged
* meta[meta header]
* std::meta[meta namespace]
* std::meta::access_context[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
static consteval access_context unprivileged() noexcept;
```

## 概要
`public`メンバのみにアクセス可能なアクセスコンテキストを返す。

呼び出し元のスコープに関係なく、常に`public`メンバのみが取得可能となる。


## 戻り値
`public`メンバのみにアクセス可能な`access_context`オブジェクトを返す。


## 例
```cpp example
#include <meta>
#include <print>

class C {
  int secret = 42;
public:
  int visible = 1;
};

int main() {
  std::println("publicメンバ:");
  template for (constexpr auto m :
      std::meta::nonstatic_data_members_of(
          ^^C, std::meta::access_context::unprivileged())) {
    std::println("  {}", std::meta::identifier_of(m));
  }
}
```
* std::meta::access_context::unprivileged()[color ff0000]
* std::meta::nonstatic_data_members_of[link ../nonstatic_data_members_of.md]
* std::meta::identifier_of[link ../identifier_of.md]

### 出力
```
publicメンバ:
  visible
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
