# via
* meta[meta header]
* std::meta[meta namespace]
* std::meta::access_context[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
consteval access_context via(info cls) const;
```
* info[link ../info.md]

## 概要
指定したクラスを経由したアクセスコンテキストを返す。

継承階層において、派生クラス経由で基底クラスのメンバにアクセスする場合のアクセス制御を再現するために使用する。


## 戻り値
`cls`が表すクラスを経由した新しい`access_context`オブジェクトを返す。


## 例
```cpp example
#include <meta>
#include <print>

class Base {
protected:
  int prot = 1;
public:
  int pub = 2;
};

class Derived : public Base {};

int main() {
  // Derived経由でBaseのメンバにアクセス
  constexpr auto ctx = std::meta::access_context::current().via(^^Derived);
  constexpr auto members = std::meta::nonstatic_data_members_of(^^Base, ctx);
  std::println("Derived経由で見えるメンバ数: {}", members.size());
}
```
* via[color ff0000]
* std::meta::nonstatic_data_members_of[link ../nonstatic_data_members_of.md]

### 出力
```
Derived経由で見えるメンバ数: 2
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
