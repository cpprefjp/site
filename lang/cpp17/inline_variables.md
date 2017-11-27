# インライン変数
* cpp17[meta cpp]

## 概要

外部リンケージを持つ変数に対しインライン`inline`を指定することで、複数の翻訳単位で同じ変数を宣言できるようになり、変数の実体はただ一つとすることができる。

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

`inline`は関数または変数の宣言、定義に対して指定できる。外部リンケージを持つ関数、変数がどこか一つの翻訳単位で`inline`指定された場合、全ての翻訳単位で`inline`指定されたことになる。`inline`指定された関数、変数は全ての翻訳単位で同じアドレスに配置される。

`inline`ではない変数宣言のあとに`inline`は宣言できず、文法違反となる。

```cpp
int a = 100;

// コンパイルエラー
extern inline int a;
```

`inline`指定した変数は全て同じ定義にすべきである。翻訳単位によって異なる型、初期値で変数を定義したり、`inline`指定を宣言した翻訳単位が出てくる前に別の翻訳単位で同じ変数の定義をしたりすると、プログラムは正常に動作しない。

```cpp
// b.cpp
int hoge = 10;

// a.cpp
inline int hoge = 100;

int main()
{
  // コンパイルエラーにならないかもしれないが、正常に動作しない
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
  // static指定(翻訳単位ごとにアドレスが変わる)
  static inline int static_var = 10;
  static inline int static_func(void) {
    return 20;
  }

  // inline指定(全翻訳単位でアドレスは同一)
  inline int inline_var = 30;
  inline int inline_func(void) {
    return 40;
  }

  // constexprだがinlineは指定されない
  constexpr int constexpr_var = 50;
  // 関数かつconstexprなので
  // 暗黙のうちにinlineが指定される
  constexpr int constexpr_func(void) {
    return 60;
  }
}

struct A {
  // inline指定(全翻訳単位でアドレスは同一)
  static inline int inline_var = 100;
  static inline int inline_func(void) {
    return 200;
  }

  // staticメンバ変数かつconstexprなので
  // 暗黙のうちにinlineが指定される
  static constexpr int constexpr_var = 300;
  // 関数かつconstexprなので
  // 暗黙のうちにinlineが指定される
  static constexpr int constexpr_func(void) {
    return 400;
  }
};

void func(void);


//inline_variable1.cpp

#include <iostream>
#include "inline_variable.hpp"

int main()
{
  std::cout << __func__ << std::endl
    << "  N::static_var    :" << &N::static_var << std::endl
    << "  N::static_func   :" << reinterpret_cast<void *>(N::static_func) << std::endl
    << "  N::inline_var    :" << &N::inline_var << std::endl
    << "  N::inline_func   :" << reinterpret_cast<void *>(N::inline_func) << std::endl
    << "  N::constexpr_var :" << &N::constexpr_var << std::endl
    << "  N::constexpr_func:" << reinterpret_cast<void *>(N::constexpr_func) << std::endl
    << std::endl
    << "  A::inline_var    :" << &A::inline_var << std::endl
    << "  A::inline_func   :" << reinterpret_cast<void *>(A::inline_func) << std::endl
    << "  A::constexpr_var :" << &A::constexpr_var << std::endl
    << "  A::constexpr_func:" << reinterpret_cast<void *>(A::constexpr_func) << std::endl
    << std::endl;

  func();

  return 0;
}


//inline_variable2.cpp

#include <iostream>
#include "inline_variable.hpp"

void func(void)
{
  std::cout << __func__ << std::endl
    << "  N::static_var    :" << &N::static_var << std::endl
    << "  N::static_func   :" << reinterpret_cast<void *>(N::static_func) << std::endl
    << "  N::inline_var    :" << &N::inline_var << std::endl
    << "  N::inline_func   :" << reinterpret_cast<void *>(N::inline_func) << std::endl
    << "  N::constexpr_var :" << &N::constexpr_var << std::endl
    << "  N::constexpr_func:" << reinterpret_cast<void *>(N::constexpr_func) << std::endl
    << std::endl
    << "  A::inline_var    :" << &A::inline_var << std::endl
    << "  A::inline_func   :" << reinterpret_cast<void *>(A::inline_func) << std::endl
    << "  A::constexpr_var :" << &A::constexpr_var << std::endl
    << "  A::constexpr_func:" << reinterpret_cast<void *>(A::constexpr_func) << std::endl
    << std::endl;
}
```

### 出力

clang++ 5.0.0 にて amd64 向けにコンパイル、実行した場合。

```
main
  N::static_var    :0x602060
  N::static_func   :0x400b30
  N::inline_var    :0x602064
  N::inline_func   :0x400b40
  N::constexpr_var :0x400f6c
  N::constexpr_func:0x400b50

  A::inline_var    :0x602068
  A::inline_func   :0x400b60
  A::constexpr_var :0x400f70
  A::constexpr_func:0x400b70

func
  N::static_var    :0x60206c
  N::static_func   :0x400e00
  N::inline_var    :0x602064
  N::inline_func   :0x400b40
  N::constexpr_var :0x400f7c
  N::constexpr_func:0x400b50

  A::inline_var    :0x602068
  A::inline_func   :0x400b60
  A::constexpr_var :0x400f70
  A::constexpr_func:0x400b70
```

表示されるアドレスは環境によって異なる可能性がある。

## 関連項目
- [C++11 constexpr](/lang/cpp11/constexpr.md)

## 参照
- [P0386R2 Inline Variables](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0386r2.pdf)
