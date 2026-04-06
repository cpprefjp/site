# `constexpr`仮想継承を許可 [P3533R2]
* cpp26[meta cpp]

<!-- start lang caution -->

このページはC++26に採用される見込みの言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
C++26では、`constexpr`の文脈で仮想継承が許可される。

これまで、`constexpr`コンストラクタおよびデストラクタを持つクラスは仮想基底クラスを持つことができなかった。C++26ではこの制限が撤廃され、仮想継承を含むクラス階層でもコンパイル時の定数評価が可能になる。

```cpp
struct Base {
  constexpr virtual ~Base() = default;
};

struct Derived : virtual Base {
  constexpr Derived() = default;  // C++26: OK (C++23以前: 不適格)
  constexpr ~Derived() = default; // C++26: OK (C++23以前: 不適格)
};

constexpr Derived d{}; // OK
```


## 仕様
`constexpr`宣言の仕様にあった以下の制約が削除される:

- (`constexpr`指定された対象が) コンストラクタまたはデストラクタである場合、そのクラスは仮想基底クラスを持たないこと

これにより、仮想基底クラスを持つクラスのコンストラクタおよびデストラクタに`constexpr`を指定できるようになる。


## 例
```cpp example
#include <cassert>

struct Common {
  unsigned counter{0};
  constexpr virtual ~Common() = default;
};

struct Left : virtual Common {
  constexpr const unsigned& get_counter() const {
    return counter;
  }
};

struct Right : virtual Common {
  constexpr const unsigned& get_counter() const {
    return counter;
  }
};

struct Child : Left, Right {};

int main() {
  constexpr auto ch = Child{};
  // 菱形継承でも仮想基底クラスのメンバは共有される
  static_assert(&ch.Left::get_counter() == &ch.Right::get_counter());
}
```

### 出力
```
```


## この機能が必要になった背景・経緯
C++の`constexpr`機能は段階的に拡張されてきたが、仮想継承を含むクラスのコンストラクタ・デストラクタを`constexpr`にすることは禁止されたままだった。これは`constexpr`の文脈で許可されない最後の構文上の制限であった。

この制限は、標準ライブラリの`constexpr`化を妨げる障害にもなっていた。特に、[`std::stringstream`](/reference/sstream/basic_stringstream.md)などのストリームユーティリティは仮想継承を使用しており、この制限によりコンパイル時に使用できなかった。また、[`<chrono>`](/reference/chrono.md)の例外型（[`chrono::nonexistent_local_time`](/reference/chrono/nonexistent_local_time.md)など）の`constexpr`化も阻害されていた。


## <a id="relative-page" href="#relative-page">関連項目</a>
- [C++11 `constexpr`](/lang/cpp11/constexpr.md)
- [C++20 定数式からの仮想関数の呼び出しを許可](/lang/cpp20/allow_virtual_function_calls_in_constant_expressions.md)
- [C++26 定数評価での例外送出を許可](/lang/cpp26/allowing_exception_throwing_in_constant-evaluation.md)


## 参照
- [P3533R2 constexpr virtual inheritance](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3533r2.html)
