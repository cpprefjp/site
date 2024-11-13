# 列挙値から算術型への暗黙変換を非推奨化 [P2864R2]
* cpp26[meta cpp]

<!-- start lang caution -->

このページはC++26に採用される見込みの言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
C++20で非推奨となっていた、一方のオペランドが列挙型である場合の算術演算での暗黙の算術変換を削除する。

```cpp
enum E1 { e };
enum E2 { f };

bool b = e <= 3.7; // C++20から非推奨、C++26で削除
int k = f - e;     // C++20から非推奨、C++26で削除
int x = +f - e;    // OK
```


## <a id="relative-page" href="#relative-page">関連項目</a>
- [C++20 列挙値から算術型への暗黙変換を非推奨化](/lang/cpp20/deprecate_arithmetic_conversion_on_enumerations.md)


## 参照
- [P2864R2 Remove Deprecated Arithmetic Conversion on Enumerations From C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2864r2.pdf)