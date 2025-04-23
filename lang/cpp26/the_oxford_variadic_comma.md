# 先行するカンマのない省略記号を非推奨化 [P3176R0]
* cpp26[meta cpp]

<!-- start lang caution -->

このページはC++26に採用される見込みの言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため関連項目を参照してください。

<!-- last lang caution -->

## 概要
C++26では、カンマ後ではない「`...`」の使用を非推奨化する。

```cpp
template <class... Ts>
void a(Ts...);       // OK, 関数テンプレートのパラメータパック

void b(auto...);     // OK, 関数テンプレートのパラメータパック

void c(int, ...);    // OK, Cとの互換性もある
void d(...);         // OK, Cとの互換性もある

void e(int...);      // C++23:OK, C++26:非推奨, C17:不適格
void f(int x...);    // C++23:OK, C++26:非推奨, C17:不適格

void g(int... args); // 不適格、あいまい
```

この構文は、C言語 (C89) の互換性としてC++98で導入されたが、C17では不適格となっている。C言語との互換性としてこの構文を維持する必要がなくなったため、非推奨となった。


## 参照
- [P3176R0 The Oxford variadic comma](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p3176r0.html)
