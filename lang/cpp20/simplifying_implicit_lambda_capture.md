# 暗黙のラムダキャプチャを簡略化 [P0588R1]
* cpp20[meta cpp]

<!-- start lang caution -->

このページはC++20に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
ここでは、ラムダ式での暗黙のキャプチャについて、以下の問題を解決する：

1. ラムダ式内での`decltype((x))`の使用
2. ラムダ式での構造化束縛のキャプチャ

ラムダ式でコピーキャプチャした変数を、評価されない文脈のみで使用した場合に、その変数はクロージャオブジェクトのメンバ変数になることを仮定していた。この変更ではその仮定をやめ、式の型のみを規定するようになった。

```cpp
void f() {
  float x, &r = x;
  [=] {
    decltype(x) y1;        // y1はfloat型をもつ
    decltype((x)) y2 = y1; // y2はconst float&型をもつ。ラムダ式がmutableではなくxが左辺値であるため
    decltype(r) r1 = y1;   // r1はfloat&型をもつ
    decltype((r)) r2 = y2; // r2はconst float&型をもつ
  };
}
```

本提案では一旦、構造化束縛で導入された名前はラムダ式でキャプチャできない、と明記された。その後、「[構造化束縛を拡張して通常の変数宣言のように使用できるようにする](extending_structured_bindings_to_be_more_like_variable_declarations.md)」の仕様でそれが可能となったため、この部分は打ち消された。

## 仕様

odr-usable(=ある名前の定義がその場所で見つかるか)という用語を導入して、lamda式でキャプチャできるものの増加に対して、規格文面の整理が行われた。

ローカル変数のように、ローカルでodr-usedされる時に、その場所ではodr-usableでないとき、そのプログラムは適格ではない。

```cpp
void f(int n) {
  [] { n = 1; };                // error: nが使われようとしているのはlambda式の中なので、odr-usableではない
  struct A {
    void f() { n = 2; }         // error: nが使われようとしているのは関数定義スコープの中なので、odr-usableではない
  };
  void g(int = n);              // error: nが使われようとしているのはlambda式以外の関数引数スコープの中なので、odr-usableではない
  [=](int k = n) {};            // error: n is not odr-usable due to being
                                // outside the block scope of the lambda-expression
  [&] { [n]{ return n; }; };    // OK
}
```

## <a id="relative-page" href="#relative-page">関連項目</a>
- [C++17 構造化束縛](/lang/cpp17/structured_bindings.md)
- [C++20 構造化束縛を拡張して通常の変数宣言のように使用できるようにする](extending_structured_bindings_to_be_more_like_variable_declarations.md)
- [C++20 構造化束縛した変数の参照キャプチャを許可](reference_capture_of_structured_bindings.md)

## 参照
- [P0588R1 Simplifying implicit lambda capture](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0588r1.html)
