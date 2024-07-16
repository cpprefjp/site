# 初期化文での型の別名宣言を許可 [P2360R0]
* cpp23[meta cpp]

<!-- start lang caution -->

このページはC++23に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
`if`文、`switch`文、範囲`for`文で初期化文を指定できるが、C++20までその初期化文では`typedef`による型の別名定義はできたが、`using`による型の別名定義はできなかった。

C++23では`using`による別名定義もまた初期化文でできるようになる。


## 仕様
初期化文 (init-statement) に、別名宣言 (alias-declaration) を追加 (`typedef`はsimple-declarationに含まれる)。

```
init-statement:
    expression-statement
    simple-declaration
    alias-declaration
```

## 例
```cpp example
#include <iostream>

int f() { return 1; }

int main()
{
  // C++20 : OK
  if (typedef int T; T x = f()) {
    std::cout << x << std::endl;
  }

  // C++20 : OK
  // C++23 : OK
  if (using T = int; T x = f()) {
    std::cout << x << std::endl;
  }
}
```

## <a id="relative-page" href="#relative-page">関連項目</a>
- [C++17 if文とswitch文の条件式と初期化を分離](/lang/cpp17/selection_statements_with_initializer.md)
- [C++20 初期化式をともなう範囲for文](/lang/cpp20/range-based_for_statements_with_initializer.md)


## 参照
- [P2360R0 Extend init-statement to allow alias-declaration](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2360r0.html)