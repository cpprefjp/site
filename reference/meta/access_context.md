# access_context
* meta[meta header]
* std::meta[meta namespace]
* class[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  struct access_context;
}
```

## 概要
`access_context`は、[`members_of()`](members_of.md)や[`bases_of()`](bases_of.md)などのメンバ取得関数で、アクセス制御のコンテキストを指定するためのクラスである。

## 静的メンバ関数

| 名前 | 説明 |
|------|------|
| [`current`](access_context/current.md) | 呼び出し元のアクセス権に従うコンテキストを返す |
| [`unprivileged`](access_context/unprivileged.md) | `public`メンバのみにアクセス可能なコンテキストを返す |
| [`unchecked`](access_context/unchecked.md) | すべてのメンバにアクセス制限なしでアクセス可能なコンテキストを返す |

## メンバ関数

| 名前 | 説明 |
|------|------|
| [`scope`](access_context/scope.md) | アクセスコンテキストのスコープのリフレクションを返す |
| [`designating_class`](access_context/designating_class.md) | 指定クラスのリフレクションを返す |
| [`via`](access_context/via.md) | 指定したクラスを経由したアクセスコンテキストを返す |

## 例
```cpp example
#include <meta>
#include <print>

class MyClass {
  int secret = 42;
public:
  int visible = 1;
};

int main() {
  // unchecked: すべてのメンバにアクセス
  std::println("unchecked:");
  template for (constexpr auto m :
      std::define_static_array(std::meta::nonstatic_data_members_of(
          ^^MyClass, std::meta::access_context::unchecked()))) {
    std::println("  {}", std::meta::identifier_of(m));
  }

  // unprivileged: publicのみ
  std::println("unprivileged:");
  template for (constexpr auto m :
      std::define_static_array(std::meta::nonstatic_data_members_of(
          ^^MyClass, std::meta::access_context::unprivileged()))) {
    std::println("  {}", std::meta::identifier_of(m));
  }
}
```
* std::meta::nonstatic_data_members_of[link nonstatic_data_members_of.md]
* std::meta::identifier_of[link identifier_of.md]
* unchecked[link access_context/unchecked.md]
* unprivileged[link access_context/unprivileged.md]

### 出力
```
unchecked:
  secret
  visible
unprivileged:
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
