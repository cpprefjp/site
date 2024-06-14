# 暗黙のラムダキャプチャを簡略化 [P0588R1]
* cpp20[meta cpp]

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

構造化束縛で導入された名前はラムダ式でキャプチャできない、と明記された。しかしその後、「[構造化束縛を拡張して通常の変数宣言のように使用できるようにする](extending_structured_bindings_to_be_more_like_variable_declarations.md)」の仕様でそれが可能となったため、この仕様変更は打ち消された。


## 関連項目
- [C++17 構造化束縛](/lang/cpp17/structured_bindings.md)
- [C++20 構造化束縛を拡張して通常の変数宣言のように使用できるようにする](extending_structured_bindings_to_be_more_like_variable_declarations.md)

## 参照
- [P0588R1 Simplifying implicit lambda capture](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0588r1.html)

