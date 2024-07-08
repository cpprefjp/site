# スコープ付き列挙型のusing宣言 [P1099R5]

* cpp20[meta cpp]

<!-- start lang caution -->

このページはC++20に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative_page)を参照してください。

<!-- last lang caution -->

## 概要

名前空間のように、`using enum EnumType;`もしくは`using EnumType::enumerator`とすることで、列挙値のスコープ指定を省略できる。

## 仕様

以下のusing enum宣言を導入する。
```
using enum EnumType;
```

using enum宣言はトップレベル、ブロック内、クラスメンバの宣言として書くことができる。

using enum宣言した列挙型の列挙値は、そのスコープにおいて、スコープ指定を省略して列挙値の名前のみで参照できる。

```cpp
// P1099R5より引用
enum class rgba_color_channel { red, green, blue, alpha};

std::string_view to_string(rgba_color_channel channel) {
  switch (my_channel) {
    using enum rgba_color_channel;
    case red:   return "red";
    case green: return "green";
    case blue:  return "blue";
    case alpha: return "alpha";
  }
}
```
* P1099R5[link http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1099r5.html]

また、using宣言で列挙値を指定できるようになる。このときは、指定した列挙値だけがスコープ指定を省略できるようになる。

対象とする列挙型はスコープを持つ列挙型でなくても構わない。

```cpp example
namespace ns {
  class foo {
    enum bar {
      A,
      B,
      C
    };
  };
}

using enum ns::foo::bar;
```


## 例
```cpp example
#include <iostream>

enum class Enum1 {
  Value1
};

struct Enum2 {
  enum Enum {
    Value2
  };
};

enum class Enum3 {
  Value3,
  Value4
};

struct Type {
  using enum Enum3;
};

constexpr int Value1 = 1;

int main() {
  using enum Enum1;
  using enum Enum2::Enum;
  using Enum3::Value3;
  std::cout << static_cast<int>(Value1) << std::endl;
  std::cout << ::Value1 << std::endl;
  std::cout << Value2 << std::endl;
  std::cout << static_cast<int>(Value3) << std::endl;
  std::cout << static_cast<int>(Enum3::Value4) << std::endl;
  std::cout << static_cast<int>(Type::Value4) << std::endl;
  std::cout << static_cast<int>(Type().Value4) << std::endl;
}
```

### 出力
```
0
1
0
0
1
1
1
```

## この機能が必要になった背景・経緯

C言語形式の列挙型を改善するために[スコープを持つ列挙型](/lang/cpp11/scoped_enum.md)が導入されたが、スコープを持っているために列挙値を参照するときに必ずスコープ解決演算子を使う必要があり、冗長に感じられる場合もあった。

そこで、列挙型のスコープを名前空間と同じようなものと捉えて、using宣言によって省略できるようにした。

これにより、C言語形式の列挙型をスコープを持つ列挙型へ置き換えるというリファクタリングをする際、(整数との暗黙変換を別とすれば)ソースコードレベルの互換性を保って置き換えることができるようにもなった。

## <a id="relative-page" href="#relative-page">関連項目</a>

- [スコープを持つ列挙型](/lang/cpp11/scoped_enum.md)

## 参照

- [P1099R5 Using Enum](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1099r5.html)