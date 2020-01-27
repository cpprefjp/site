# 集成体初期化の拡張

* cpp17[meta cpp]

## 概要

C++17 から集成体初期化が拡張され、基底クラスを持つ型の初期化が簡潔に記述できるようになった。

## 仕様

集成体初期化において基底クラスの初期化についても集成体初期化 `{ parameter1, parameter2, ... }` の様式で同様に入れ�にして記述する。

## 例
```cpp example
#include <iostream>
#include <vector>
#include <string>

struct base_a { std::string s; };
struct base_b { double d; std::vector< int > vi; };
struct delived: base_a, base_b { char c; };

int main()
{
  // このような初期化を C++17 以降は本機能により使用できるようになった
  // この初期化は C++14 以前では基底クラスの初期化として扱えず翻訳に失敗してしまう
  delived o
  { { // base_a; 本機能により基底クラスの初期化を { } で記述できる
      "abc" // base_a::s
    }
  , { // base_b; 本機能により基底クラスの初期化を { } で記述できる
      12.345 // base_b::d
    , { 1, 2, 3} // base_b::v
    }
  , 'd' // delived::c
  };
  
  std::cout 
    << "o.s = " << o.s << '\n'
    << "o.d = " << o.d << '\n'
    << "o.vi = "
    ;
  
  {
    using namespace std::literals::string_literals;
    auto separator = ""s;
    std:: cout << "[ ";
    for ( const auto& i : o.vi )
    {
      std::cout << separator << i;
      separator = ", "s;
    }
    std:: cout << " ]\n";
  }
  
  std::cout << "o.c = " << o.c << std::endl;
}
```

### 出力
```
o.s = abc
o.d = 12.345
o.vi = [ 1, 2, 3 ]
o.c = d
```

## この機能が必要になった背景・経緯
この機能が無い C++14 までは、同様の事をしたい場合には基底クラスの初期化も含めたい派生型へ、基底クラスの初期化も行う構築�を記述する必要があった。

```cpp example
// C++14 までの旧い仕様で同様の事をできるようにするために必要だった記述
#include <iostream>

struct legacy_base
{
  // いちいち書かなければならないのは面倒くさい
  legacy_base( int a_ ): a( a_ ) { }
  int a;
};
struct legacy_delived: legacy_base
{
  // いちいち書かなければならないのは面倒くさい
  legacy_delived( int a_, int b_ ): legacy_base( a_ ), b( b_ ) { }
  int b;
};

int main()
{
  // 初期化を簡潔に記述するためには legacy_delived, legacy_base の構築�に仕込みが必要だった
  legacy_delived o{ 123, 456 };
  std::cout
    << "o.a = " << o.a << '\n'
    << "o.b = " << o.b << '\n'
    ;
}
```

このような面倒を本機能により簡潔に記述できるようにしたかった。

```cpp example
// C++17 以降は本機能により C++14 までのように仕込みを行わずとも簡潔に基底クラスの初期化を記述できるようになった
#include <iostream>

struct legacy_base { int a; };
struct legacy_delived: legacy_base { int b; };

int main()
{
  legacy_delived o{ { 123 }, 456 };
  std::cout
    << "o.a = " << o.a << '\n'
    << "o.b = " << o.b << '\n'
    ;
}
```

この機能により C++17 以降では記述が簡潔になり、実装労力の低減、ソースコードの可�性の向上が図られた。

## 関連項目

1. [C++14 / 宣言時のメンバ初期化を持つ型の集成体初期化を許可](../cpp14/brace_elision_in_array_temporary_initialization.md)


## 参照

1. [P0017R1 Extension to aggregate initialization](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0017r1.html)
