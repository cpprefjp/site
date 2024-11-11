# 列挙値から算術型への暗黙変換を非推奨化 [P1120R0]
* cpp20[meta cpp]

<!-- start lang caution -->

このページはC++20に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
[三方比較演算子](consistent_comparison.md)の導入にともない、一方のオペランドが列挙型である場合の算術演算での暗黙の算術変換を非推奨とする。

```cpp
enum E1 { e };
enum E2 { f };

bool b = e <= 3.7; // C++20から非推奨
int k = f - e;     // C++20から非推奨
int x = +f - e;    // OK
```


## 関連項目
- [C++20 `<=>`/`==`による比較演算子の自動定義](consistent_comparison.md)
- [C++26 非推奨となっていた列挙型の算術変換を削除](/lang/cpp26/remove_deprecated_arithmetic_conversion_on_enumerations.md)


## 参照
- [P1120R0 Consistency improvements for `<=>` and other comparison operators](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p1120r0.html)
