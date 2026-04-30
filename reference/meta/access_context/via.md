# via
* meta[meta header]
* std::meta[meta namespace]
* access_context[meta class]
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
`via()`は、protectedメンバへのアクセス可否を決める「派生クラス経由」の文脈を切り替える。protectedメンバの可視性は、スコープ（呼び出し元）が指定クラスのメンバまたは派生クラスのメンバである場合にのみ許可される。

```cpp example
#include <meta>
#include <print>

class Base {
public:
  int pub = 1;
protected:
  int prot = 2;
};

class Derived : public Base {
public:
  static void check_inside() {
    // スコープはDerivedのメンバ関数 = Derivedの内部からのアクセス
    // via(Derived)によりDerived経由のアクセスとして扱われ、Baseのprotにもアクセス可能
    constexpr auto ctx = std::meta::access_context::current().via(^^Derived);
    constexpr auto count = std::meta::nonstatic_data_members_of(^^Base, ctx).size();
    std::println("Derived内からvia(Derived): {}", count);  // pub と prot の2個
  }
};

int main() {
  // スコープはmain() = Derivedの外部からのアクセス
  // via(Derived)してもmain()はDerivedの一員ではないため、protはアクセス不可
  constexpr auto ctx = std::meta::access_context::current().via(^^Derived);
  constexpr auto count = std::meta::nonstatic_data_members_of(^^Base, ctx).size();
  std::println("main()からvia(Derived): {}", count);  // pubのみの1個

  Derived::check_inside();
}
```
* via[color ff0000]
* std::meta::nonstatic_data_members_of[link ../nonstatic_data_members_of.md]

### 出力
```
main()からvia(Derived): 1
Derived内からvia(Derived): 2
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
