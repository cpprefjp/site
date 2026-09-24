# is_within_lifetime
* type_traits[meta header]
* function[meta id-type]
* std[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std {
  template<class U=void, class T>
  consteval bool is_within_lifetime(const T* p) noexcept; // (1) C++26
}
```

## 概要

定数式において、`p`に配置されているオブジェクトが有効期間内にあり、かつ`const U*`のポインタへキャスト可能かどうかを判定する。

### 共用体のアクティブメンバ判定

この関数は主に、共用体の指定されたメンバがアクティブかを定数式中で判定するためのものである。定数式では非アクティブな共用体メンバへのアクセスができないため、以下のような非アクティブなメンバの値を使用してアクティブメンバを判定する方法が使用できない。

```cpp
struct OptBool {
  union { bool b; char c; };

  OptBool() : c(2) { }
  OptBool(bool b) : b(b) { }

  auto has_value() const -> bool {
    return c != 2;
  }

  auto operator*() -> bool& {
    return b;
  }
};
```

この関数を使用することで、コンパイル時に指定メンバがアクティブかを判定することができる。

### ダウンキャスト可能かどうかの判定

第一テンプレートパラメータ`U`は`T`のポインタを`U`のポインタへキャスト可能かどうかを判定するためのもので、主に`T`から`U`へのダウンキャストが定数式中で可能かどうかを判定するために使用する。

```cpp
struct Base {};
struct Derived : public Base {};

consteval void f() {
  Base b{};
  Derived d{};
  Base* d_ptr = &d;

  // d_ptrはDerivedのポインタにダウンキャスト可能
  assert(std::is_within_lifetime<Derived>(d_ptr));
  // &bはDerivedにダウンキャスト不可
  assert(std::is_within_lifetime<Derived>(&b) == false);
}
```

## 適格要件
`static_cast<const volatile U*>(p)`が適格であること。


## 戻り値
`p`が有効期間内にあるオブジェクトへのポインタかつ`static_cast<const volatile U*>(p)`が定数部分式であれば`true`、そうでなければ`false`を返す。


## 備考
- 式`E`を定数式として評価する際、`p`が定数式で使用可能なオブジェクトを指しているか、そのオブジェクトの完全な有効期間が`E`内で始まっていない限り、この関数の呼び出しは不適格となる


## 例
```cpp example
#include <type_traits>

struct OptBool {
  union { bool b; char c; };

  constexpr OptBool() : c(2) { }
  constexpr OptBool(bool b) : b(b) { }

  constexpr auto has_value() const -> bool {
    if consteval {
      return std::is_within_lifetime(&b);   // 定数式評価中は、cを読み取ることはできない
    } else {
      return c != 2;                        // 実行時評価中は、cを読み取らないといけない
    }
  }

  constexpr auto operator*() const -> const bool& {
    return b;
  }
};

int main() {
  constexpr OptBool disengaged;
  constexpr OptBool engaged(true);
  static_assert(!disengaged.has_value());
  static_assert(engaged.has_value());
  static_assert(*engaged);
}
```
* is_within_lifetime[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 24 [mark verified]
- [GCC](/implementation.md#gcc): 17 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 6 [mark noimpl]

## 参照
- [P2641R4 Checking if a `union` alternative is active](http://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2641r4.html)
- [P3450R1 Extend `std::is_within_lifetime`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3450r1.html)
