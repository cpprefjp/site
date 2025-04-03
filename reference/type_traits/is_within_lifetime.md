# is_within_lifetime
* type_traits[meta header]
* function[meta id-type]
* std[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std {
  template<class T>
  consteval bool is_within_lifetime(const T* p) noexcept; // (1) C++26
}
```

## 概要
共用体の指定されたメンバがアクティブかを定数式で判定する。

定数式では非アクティブな共用体メンバへのアクセスができないため、以下のような非アクティブなメンバの値を使用してアクティブメンバを判定する方法が使用できない。

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


## 戻り値
`p`が有効期間内にあるオブジェクトへのポインタであれば`true`、そうでなければ`false`を返す。


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

  constexpr auto operator*() -> bool& {
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
- [Clang](/implementation.md#clang): 20 [mark noimpl]
- [GCC](/implementation.md#gcc): 14 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 10 [mark noimpl]

## 参照
- [P2641R4 Checking if a `union` alternative is active](http://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2641r4.html)
