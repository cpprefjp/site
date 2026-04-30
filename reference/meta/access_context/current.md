# current
* meta[meta header]
* std::meta[meta namespace]
* access_context[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
static consteval access_context current() noexcept;
```

## 概要
呼び出し元のスコープにおけるアクセス権に従うアクセスコンテキストを返す。

呼び出し元がクラスのメンバ関数やフレンド関数内であれば、そのクラスの`private`/`protected`メンバにもアクセス可能なコンテキストとなる。


## 戻り値
呼び出し元のアクセス権を反映した`access_context`オブジェクトを返す。


## 例
```cpp example
#include <meta>
#include <print>

class C {
  int secret = 42;
public:
  int visible = 1;

  static void inspect() {
    // current()はC内部からの呼び出しなのでprivateメンバも見える
    std::println("C内部から見えるメンバ:");
    template for (constexpr auto m :
        std::define_static_array(std::meta::nonstatic_data_members_of(
            ^^C, std::meta::access_context::current()))) {
      std::println("  {}", std::meta::identifier_of(m));
    }
  }
};

int main() {
  C::inspect();

  // current()はmain関数からの呼び出しなのでpublicのみ
  std::println("外部から見えるメンバ:");
  template for (constexpr auto m :
      std::define_static_array(std::meta::nonstatic_data_members_of(
          ^^C, std::meta::access_context::current()))) {
    std::println("  {}", std::meta::identifier_of(m));
  }
}
```
* std::meta::access_context::current()[color ff0000]
* std::meta::nonstatic_data_members_of[link ../nonstatic_data_members_of.md]
* std::meta::identifier_of[link ../identifier_of.md]

### 出力
```
C内部から見えるメンバ:
  secret
  visible
外部から見えるメンバ:
  visible
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
