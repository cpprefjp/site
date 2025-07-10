# 型の文脈でtypenameの省略を許可 [P0634R3]

* cpp20[meta cpp]

<!-- start lang caution -->

このページはC++20に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要

型しか現れない文脈では、依存名を解決するための`typename`キーワードを省略できるようにする。

## 仕様

修飾名は、以下の条件を満たすときに型名とみなされる。

* 型しか現れない文脈にある
    * new演算子に指定する型名
    * [エイリアス宣言またはエイリアステンプレート宣言](/lang/cpp11/alias_templates.md)に現れる型名
    * [後置の戻り値型](/lang/cpp11/trailing_return_types.md)
    * テンプレート型引数のデフォルト引数
    * `static_cast`、`const_cast`、`reinterpret_cast`、`dynamic_cast`の型名
* 以下の宣言における型指定子である
    * 名前空間スコープの単純宣言(≒変数宣言または構造化束縛宣言)または関数定義
    * メンバ宣言
    * メンバ宣言の中の引数宣言(デフォルト引数に現れる場合を除く)
    * 識別子が修飾名である関数または関数テンプレートの引数宣言(デフォルト引数に現れる場合を除く)
    * [ラムダ式](/lang/cpp11/lambda_expressions.md)または[requires式](./concepts.md)の引数宣言(デフォルト引数に現れる場合を除く)
    * 非型テンプレートパラメーターの宣言

```cpp
// P0634R3より引用
template<class T> T::R f();     // OK, グローバルスコープにおける関数の戻り値
template<class T> void f(T::R); // Ill-formed, void型の変数テンプレートの宣言

template<class T> struct S {
  // クラススコープ
  using Ptr = PtrTraits<T>::Ptr; // OK, エイリアス宣言
  T::R f(T::P p) {               // OK, メンバ宣言、およびメンバ宣言における仮引数宣言
    return static_cast<T::R>(p); // OK, static_castの型名
  }
  auto g() -> S<T*>::Ptr;        // OK, 後置戻り値型
};

template<typename T> void f() {
  // ブロックスコープ
  void (*pf)(T::X); // T::Xで初期化されるvoid*型の変数pf
  void g(T::X);     // エラー: void型の変数宣言
}
```
* P0634R3[link http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0634r3.html]

## 例
```cpp example
#include <iostream>
#include <vector>

template<typename T>
auto Begin(const T& t) -> T::const_iterator {
  return t.begin();
}

int main()
{
  std::vector v = {1, 2, 3, 4, 5};
  std::cout << *Begin(v) << std::endl;
}
```

### 出力
```
1
```

## この機能が必要になった背景・経緯

以前から基底クラスの指定では`typename`を省略することができた。

```cpp
template<class T>
struct Derived: T::Base // typename不要
{};
```

しかし、他にも型しか現れない文脈は存在するので、それらでも`typename`を省略できるようになった。

## 参照

- [P0634R3 Down with `typename`!](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0634r3.html)
