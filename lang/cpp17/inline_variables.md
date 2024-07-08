# インライン変数 [P0386R2]
* cpp17[meta cpp]

<-- start lang caution -->

このページはC++17に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative_page)を参照してください。

<-- last lang caution -->

## 概要

外部リンケージを持つ変数に対しインライン`inline`を指定することで、複数の翻訳単位で同じ変数を定義できるようになり、変数の実体はただ一つとすることができる。

C++14までは関数のみインライン指定ができたが、C++17では関数、変数ともにインライン指定が可能になった。

これによりヘッダのみで変数の定義を行うことができるようになり、従来のようにヘッダで変数を宣言しソースで変数の実体を定義する必要がなくなった。

```cpp
// C++17以降 -----

// ヘッダ
struct X {
  // ソースで変数fooを定義する必要がない
  static inline int foo;
};


// C++14以前 -----

// ヘッダ
struct X {
  // ヘッダでは変数の宣言のみを行い
  static int foo;
};

// ソース
// 変数fooを定義する
int X::foo;
```

## 仕様

`inline`は関数または変数の宣言、定義に対して指定できる。外部リンケージを持つ関数、変数がどこか一つの翻訳単位で`inline`指定された場合、同名の変数が宣言されている全ての翻訳単位で`inline`指定を行う必要がある。`inline`指定された関数、変数は全ての翻訳単位で同じアドレスに配置される。

変数定義のあとに後付けで初めての`inline`指定を行うのは不適格である。

```cpp
int a = 100;

// 不適格につきコンパイルエラー
extern inline int a;
```

`inline`指定した同名の変数は全て同じ定義にすべきである。翻訳単位によって異なる型、初期値で変数を定義すると、プログラムは正常に動作しない可能性がある (不適格(例外付き診断不要))。

異なる型を指定した場合の例：

```cpp
// b.cpp
// 無名クラスのオブジェクトはそれぞれ異なる型となる
inline struct { int x; } y;

// a.cpp
// 不適格 (診断不要)
// コンパイルエラーにならないかもしれないが、正常に動作しない可能性がある
// (実装によっては、それぞれ異なる実体のオブジェクトとなる場合がある)
inline struct { int x; } y;

int main() {}
```

異なる初期値を指定した場合の例：

```cpp
// b.cpp
inline int hoge = 10;

// a.cpp
inline int hoge = 100;

int main()
{
  // 不適格(診断不要)
  // コンパイルエラーにならないかもしれないが、正常に動作しない可能性がある
  return hoge;
}
```

`constexpr`を指定した関数または静的メンバ変数は、暗黙のうちに`inline`を指定したことになる。逆に言えばグローバルな`constexpr`変数の場合だけ、明示的に`inline`指定する必要がある。

`inline`の文法上の変化としては、C++14では`function-specifier`つまり関数専用のキーワードに属していたが、C++17では関数、変数どちらにも指定できる`decl-specifier`に移動している。

```
//関数の場合
function-definition:
  attribute-specifier-seq opt decl-specifier-seq opt declarator virt-specifier-seq opt function-body

//変数の場合
simple-declaration:
  decl-specifier-seq opt init-declarator-list opt ;
  attribute-specifier-seq decl-specifier-seq opt init-declarator-list ;

member-declaration:
  attribute-specifier-seq opt decl-specifier-seq opt member-declarator-list opt ;

decl-specifier:
  storage-class-specifier
  type-specifier
  function-specifier
  friend
  typedef
  constexpr
  inline  //C++17で追加

function-specifier:
  inline  //C++17で削除
  virtual
  explicit
```


## 例

```cpp example
//inline_variable.hpp
#include <iostream>

namespace N {

  // 外部リンケージ & 非インライン
  // →ODR違反により不適格
  /*
  int var = 0;
  int func() {
    return 0;
  }
  */

  // 外部リンケージ & インライン(inline指定)
  // →全翻訳単位でアドレスは同一
  inline int inline_var = 10;
  inline int inline_func() {
    return 20;
  }

  // 内部リンケージ(static指定) & 非インライン
  // →翻訳単位毎に異なるアドレス
  static int static_var = 30;
  static int static_func() {
    return 40;
  }

  // 内部リンケージ(static指定) & インライン(inline指定)
  // →外部リンケージではないのでインライン指定はアドレスに影響しない。
  //   static のみ指定したときと同様に、翻訳単位毎に異なるアドレスになる。
  static inline int static_inline_var = 50;
  static inline int static_inline_func() {
    return 60;
  }

  // 外部リンケージ & 非インライン(constexpr変数は暗黙にinlineにはならない)
  constexpr int constexpr_var = 70;
  // 外部リンケージ & インライン(constexpr関数は暗黙にinlineとなる)
  constexpr int constexpr_func() {
    return 80;
  }
}

struct A {
  // inline指定(全翻訳単位でアドレスは同一)
  static inline int inline_var = 100;
  static inline int inline_func() {
    return 200;
  }

  // staticメンバ変数かつconstexprなので
  // 暗黙のうちにinlineが指定される
  static constexpr int constexpr_var = 300;
  // 関数かつconstexprなので
  // 暗黙のうちにinlineが指定される
  static constexpr int constexpr_func() {
    return 400;
  }
};

void func();


//inline_variable1.cpp

#include <iostream>
#include "inline_variable.hpp"

int main()
{
  std::cout << __func__ << std::endl
    << "  N::inline_var        :" << &N::inline_var << std::endl
    << "  N::inline_func       :" << reinterpret_cast<void *>(N::inline_func) << std::endl
    << "  N::static_var        :" << &N::static_var << std::endl
    << "  N::static_func       :" << reinterpret_cast<void *>(N::static_func) << std::endl
    << "  N::static_inline_var :" << &N::static_inline_var << std::endl
    << "  N::static_inline_func:" << reinterpret_cast<void *>(N::static_inline_func) << std::endl
    << "  N::constexpr_var     :" << &N::constexpr_var << std::endl
    << "  N::constexpr_func    :" << reinterpret_cast<void *>(N::constexpr_func) << std::endl
    << std::endl
    << "  A::inline_var        :" << &A::inline_var << std::endl
    << "  A::inline_func       :" << reinterpret_cast<void *>(A::inline_func) << std::endl
    << "  A::constexpr_var     :" << &A::constexpr_var << std::endl
    << "  A::constexpr_func    :" << reinterpret_cast<void *>(A::constexpr_func) << std::endl
    << std::endl;

  func();

  return 0;
}


//inline_variable2.cpp

#include <iostream>
#include "inline_variable.hpp"

void func()
{
  std::cout << __func__ << std::endl
    << "  N::inline_var        :" << &N::inline_var << std::endl
    << "  N::inline_func       :" << reinterpret_cast<void *>(N::inline_func) << std::endl
    << "  N::static_var        :" << &N::static_var << std::endl
    << "  N::static_func       :" << reinterpret_cast<void *>(N::static_func) << std::endl
    << "  N::static_inline_var :" << &N::static_inline_var << std::endl
    << "  N::static_inline_func:" << reinterpret_cast<void *>(N::static_inline_func) << std::endl
    << "  N::constexpr_var     :" << &N::constexpr_var << std::endl
    << "  N::constexpr_func    :" << reinterpret_cast<void *>(N::constexpr_func) << std::endl
    << std::endl
    << "  A::inline_var        :" << &A::inline_var << std::endl
    << "  A::inline_func       :" << reinterpret_cast<void *>(A::inline_func) << std::endl
    << "  A::constexpr_var     :" << &A::constexpr_var << std::endl
    << "  A::constexpr_func    :" << reinterpret_cast<void *>(A::constexpr_func) << std::endl
    << std::endl;
}
```

### 出力

clang++ 14.0.0 (Fedora 14.0.0-1.fc36) にて amd64 向けにコンパイル、実行した場合。

```
main
  N::inline_var        :0x404054
  N::inline_func       :0x401550
  N::static_var        :0x404058
  N::static_func       :0x401530
  N::static_inline_var :0x40405c
  N::static_inline_func:0x401540
  N::constexpr_var     :0x402144
  N::constexpr_func    :0x401560

  A::inline_var        :0x404060
  A::inline_func       :0x401570
  A::constexpr_var     :0x402148
  A::constexpr_func    :0x401580

func
  N::inline_var        :0x404054
  N::inline_func       :0x401550
  N::static_var        :0x404064
  N::static_func       :0x401870
  N::static_inline_var :0x404068
  N::static_inline_func:0x401880
  N::constexpr_var     :0x402154
  N::constexpr_func    :0x401560

  A::inline_var        :0x404060
  A::inline_func       :0x401570
  A::constexpr_var     :0x402148
  A::constexpr_func    :0x401580

```

表示されるアドレスは環境によって異なる可能性がある。

## <a id="relative-page" href="#relative-page">関連項目</a>
- [C++11 constexpr](/lang/cpp11/constexpr.md)

## 参照
- [N4147 - Inline variables, or encapsulated expressions?](https://isocpp.org/files/papers/n4147.pdf), 2014-09-25
- [N4424 - Inline Variables](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/n4424.pdf), 2015-04-07
- [P0386R0 - Inline Variables](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0386r0.pdf), 2016-05-30
- [P0386R2 - Inline Variables](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0386r2.pdf), 2016-06-24
- [P0607R0 - Inline Variables for the Standard Library](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0607r0.html), 2017-02-27
- [C++1z インライン変数 - Faith and Brave - C++で遊ぼう](https://faithandbrave.hateblo.jp/entry/2016/11/11/172954)
- [インライン変数が翻訳単位毎に別々の実体となってしまう - Stackoverflow](https://ja.stackoverflow.com/questions/93046/)