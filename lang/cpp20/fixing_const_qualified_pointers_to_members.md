# const修飾されたメンバポインタの制限を修正 [P0704R1]
* cpp20[meta cpp]

<-- start lang caution -->

このページはC++20に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative_page)を参照してください。

<-- last lang caution -->

## 概要
C++11で[メンバ関数を左辺値／右辺値修飾](/lang/cpp11/ref_qualifier_for_this.md)する機能が導入された。その際、以下の例において、同じ関数を呼び出す場合でも、メンバ関数ポインタを介した方だけが不適格となっていた：

```cpp
struct X { void foo() const&; };

X{}.foo();        // OK
(X{}.*&X::foo)(); // コンパイルエラー！
```

これは、「`.*`式において、右辺値オブジェクトに対して左辺値修飾されたメンバ関数ポインタを呼び出すことは不適格となる」という仕様によるものであった。

C++20ではこの式が許可され、仕様としては以下のように`const`メンバ関数の呼び出しを許可するようになった：

「`.*`式において、右辺値オブジェクトに対して左辺値修飾された非`const`のメンバ関数ポインタを呼び出すことは不適格となる」


## <a id="relative-page" href="#relative-page">関連項目</a>
- [C++11 メンバ関数の左辺値／右辺値修飾](/lang/cpp11/ref_qualifier_for_this.md)


## 参照
- [P0704R1 Fixing const-qualified pointers to members](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0704r1.html)