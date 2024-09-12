# 構造化束縛への属性を許可 [P0609R3]
* cpp26[meta cpp]

<!-- start lang caution -->

このページはC++26に採用される見込みの言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
C++26では、構造化束縛の各要素に対して属性を指定できるようになる。

```cpp
// 構造化束縛した変数bは使わない
auto [a, b [[maybe_unused]], c] = f();
```

構文としては、構造化束縛の要素となる変数名の後ろに属性を指定する。


## <a id="relative-page" href="#relative-page">関連項目</a>
- [C++11 属性構文](/lang/cpp11/attributes.md)
- [C++17 構造化束縛](/lang/cpp17/structured_bindings.md)


## 参照
- [P0609R3 Attributes for Structured Bindings](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p0609r3.pdf)
