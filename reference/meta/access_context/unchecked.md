# unchecked
* meta[meta header]
* std::meta[meta namespace]
* access_context[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
static consteval access_context unchecked() noexcept;
```

## 概要
アクセス制限なしですべてのメンバにアクセス可能なアクセスコンテキストを返す。

`private`/`protected`メンバを含むすべてのメンバが取得可能となる。シリアライズやデバッグなど、アクセス制御を無視してすべてのメンバを列挙する必要がある場面で使用する。


## 戻り値
すべてのメンバにアクセス可能な`access_context`オブジェクトを返す。


## 例
```cpp example
#include <meta>
#include <print>

class C {
  int secret = 42;
protected:
  int prot = 2;
public:
  int visible = 1;
};

int main() {
  std::println("全メンバ:");
  template for (constexpr auto m :
      std::meta::nonstatic_data_members_of(
          ^^C, std::meta::access_context::unchecked())) {
    std::println("  {}", std::meta::identifier_of(m));
  }
}
```
* std::meta::access_context::unchecked()[color ff0000]
* std::meta::nonstatic_data_members_of[link ../nonstatic_data_members_of.md]
* std::meta::identifier_of[link ../identifier_of.md]

### 出力
```
全メンバ:
  secret
  prot
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
