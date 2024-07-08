# コード内容の仮定をコンパイラに伝える`assume`属性 [P1774R8]
* cpp23[meta cpp]

<!-- start lang caution -->

このページはC++23に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative_page)を参照してください。

<!-- last lang caution -->

## 概要
あるコード地点において実行時に満たすべき仮定(assumption)を、C++コンパイラへ最適化ヒントとして与える属性である。
`assume`属性を適切に用いると、C++コンパイラはより高速に動作し、サイズの小さいプログラムを生成する可能性がある。


## 仕様
`[[assume(expr)]]`属性は、空文(null statement)に対して指定できる。

式`expr`の評価結果は`bool`型に変換され、その結果が`true`であるとみなされるが、`assume`属性中の式は効果を持たない。
式`expr`が`false`になる場合は、未定義の動作を引き起こす。

式`expr`には、構文要素 _conditional-expression_ を指定する。
トップレベルのコンマ演算子`,`や代入演算子`=`は指定できない。

```cpp
[[assume(expr1, expr2)]];  // Error
[[assume((expr, expr2))]]; // OK（expr2==trueのみ考慮される）
[[assume(x = 1)]];   // Error
[[assume((x = 1))]]; // OK（効果を持たない）
```

式`expr`が`true`に評価される場合、`[[assume(expr)]]`属性を指定した空文をコア定数式とみなせる。


## 例
```cpp
int divide_by_32(int x)
{
  [[assume(x >= 0)]];
  // 引数 x は必ず正の値を取ると仮定できるため
  // C++コンパイラによるアセンブリコード生成時に、
  // 非正値を考慮しない最適コードを生成できる可能性がある。
  return x / 32;
}
// asssume属性による仮定がfalseとなる関数呼び出し、
// 例えば divide_by_32(-100) は未定義動作を引き起こす。
```
* assume[color ff0000]

```cpp
int f(int y)
{
  // 効果を持たないため変数 y の値は変化しない。
  [[assume(++y == 43)]];
  // 最適化により return 42; へと置換される可能性がある。
  return y;
}
```
* assume[color ff0000]


## この機能が必要になった背景・経緯
主要C++コンパイラでは独自拡張として同等機能を提供しており、高パフォーマンスや低レイテンシなアプリ開発向けでは有用であるため、C++標準の属性として採用された。


## <a id="relative-page" href="#relative-page">関連項目</a>
- [C++20 `[[likely]]`, `[[unlikely]]`属性](/lang/cpp20/likely_and_unlikely_attributes.md)


## 参照
- [Clang Builtin Functions `__builtin_assume`](https://clang.llvm.org/docs/LanguageExtensions.html)
- [MSVC Compiler intrinsics `__assume`](https://learn.microsoft.com/en-us/cpp/intrinsics/assume)
- [P1774R8 Portable assumptions](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p1774r8.pdf)