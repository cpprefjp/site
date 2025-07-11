# 返却された左辺値から暗黙変換された一時オブジェクトが参照に束縛されることを禁止する [P2748R5]
* cpp26[meta cpp]

<!-- start lang caution -->

このページはC++26に採用される見込みの言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため関連項目を参照してください。

<!-- last lang caution -->

## 概要
C++26では、暗黙変換された一時オブジェクトが参照に束縛されることを禁止し、寿命切れした変数を参照し続けることによるバグを防止する。

例として、以下のコードには一時オブジェクトを参照するバグが存在する。

```cpp
struct X {
  const std::map<std::string, int> d_map;
  const std::pair<std::string, int>& d_first;

  X(const std::map<std::string, int>& map)
    : d_map(map), d_first(*d_map.begin()) {}
};
```

ここで、[`std::map`](/reference/map/map.md)の先頭要素を式`d_first(*d_map.begin())`でメンバ変数に保持しようとしているが、先頭要素の実際の型は`std::pair<const std::string, int>`であり、`std::pair<std::string, int>`への暗黙変換によって一時オブジェクトが作られてしまっている。そのため、コンストラクタの終了時にその一時オブジェクトの寿命が終了し、メンバ変数`d_first`は寿命切れした変数を参照してしまっている。

このようなコードは初学者だけでなく経験者も書いてしまい危険であるため、禁止する。


## 仕様
- C++23までの仕様：
    - 「関数のreturn文で返される値に束縛された一時オブジェクトの寿命は延長されない。一時オブジェクトは、return文の完全な式の終了時に破棄される」
- C++26の仕様：
    - 「戻り値の型が参照である関数において、返された参照を一時オブジェクトに束縛するreturn文は不適格である」

    ```cpp
    auto&& f1() {
      return 42;  // C++26: 不適格
    }

    const double& f2() {
      static int x = 42;
      return x;   // C++26: 不適格
    }

    auto&& id(auto&& r) {
      return static_cast<decltype(r)&&>(r);
    }
    auto&& f3() {
      return id(42);  // OKだが、バグの可能性がある
    }
    ```


## 参照
- [P2748R5 Disallow Binding a Returned Glvalue to a Temporary](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2748r5.html)
