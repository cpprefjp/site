# ユーザー定義リテラル
* cpp11[meta cpp]

## 概要
ユーザー定義リテラル(User-defined literals)は、`123`、`3.14`、`"hello"`といったリテラルに対して付けられるサフィックスをオーバー�ードできるようにすることで、ユーザーがリテラルに意味を持たせられるようにする機能である。

これは、リテラルに対して以下のような情報を持たせるために使用できる：

- 単位 : メートル、秒、角度として度数法か弧度法、など
- 型 : `"hello"s`とすることで[`std::string`](/reference/string/basic_string.md)型の文�列リテラル、`1.2i`とすることで[`std::complex<double>`](/reference/complex/complex.md)型のリテラルとするなど

ユーザー定義リテラルは、`operator"" サフィックス名`の演算�をオーバー�ードする。`""`とサフィックス名の間にスペースが必要なので注意（C++14 では空白は必須では無くなった。[リテラル演算�のスペースを省略可能とする](../cpp14/no_whitespace_literal_operators.md)参照）。

```cpp
std::string operator"" s(const char* str, std::size_t length)
{
  return std::string(str, length);
}

auto x = "hello"s; // xの型はstd::string
```

`operator"" サフィックス名`は、「リテラル演算� (literal operator)」という。

ユーザー定義リテラルは、以下の 4 種類が使用できる。

- 整数リテラル
- 浮動小数点リテラル
- 文�列リテラル（通常の文�列、ワイド文�列、`char16_t` 文�列、`char32_t` 文�列）
- 文�リテラル（通常の文�、ワイド文�、`char16_t` 文�、`char32_t` 文�）


## 仕様
### 全般的な仕様
- あるトークンがユーザー定義リテラルと通常のリテラルの両方に解釈可能な場合は、通常のリテラルとみなされる。
	例えば、`100E2` は、通常の浮動小数点リテラル `100.0E+2` と考える事も、整数リテラル `100` にサフィックス `E2` の付いたユーザー定義整数リテラルと考えることもできるが、その場合には浮動小数点リテラルとみなされる。

- リテラル演算�のサフィックス名として、ユニバーサル�ャラクタ名を使用することができる。

    ```cpp
    namespace literals {
      // _ + ギリシャ文�の小文�の pi
      float operator"" _\u03C0(unsigned long long count)
      {
        return 3.141592f * count;
      }
    }

    using namespace literals;

    float x = 2_\u03C0; // OK
    float y = 2_π;     // OK（ただし、π がソースファイル文�として許されている場合のみ）
    ```

- 論理値型に対しては、リテラル演算�を定義できない
- リテラル演算�とリテラル演算�テンプレートは、Cリンケージを持ってはならない
- リテラル演算�とリテラル演算�テンプレートは、`inline`と`constexpr`を付けて宣言できる
- リテラル演算�とリテラル演算�テンプレートは、内部リンケージもしくは外部リンケージを持つ可能性がある
- リテラル演算�がデフォルト引数を持つ場合、プ�グラムは不適格となる


### 整数に対するリテラル演算�
整数に対するリテラル演算�は、以下のいずれかとなる。

1. `unsigned long long` 型のパラメータをひとつだけ持つリテラル演算�  
    ```cpp
    戻り値型 operator"" サフィックス名(unsigned long long 整数リテラル);
    ```

	ここで、`整数リテラル` にはユーザー定義リテラルのサフィックス名を削除した部分が `unsigned long long` 型で渡される。

2. `const char*` 型のパラメータをひとつだけ持つリテラル演算�  
    ```cpp
    戻り値型 operator"" サフィックス名(const char* 整数リテラル);
    ```

	ここで、`整数リテラル` にはユーザー定義リテラルのサフィックス名を削除した部分が `const char*` 型（`'\0'` で終端された C 文�列）で渡される。

3. `char` 型のテンプレートパラメータパックを一つだけ持ち、パラメータの無いリテラル演算�テンプレート  
    ```cpp
    template <char... 整数リテラル>
    戻り値型 operator"" サフィックス名();
    ```

	ここで、`整数リテラル` にはユーザー定義リテラルのサフィックス名を削除した部分の各文�が `char` 型のテンプレートパラメータパックで渡される。

これらが複数見つかった場合、1 があれば 1 が、1 が無ければ 2 か 3 が使用される。1 が無く 2 と 3 の両方があった場合にはプ�グラムは不適格となる。  
1 は引数が `unsigned long long` であるため、リテラル部分が `unsigned long long` を超えたユーザリテラルを使用する事はできないが、2 と 3 の形式の場合はリテラル部分が文�列として引き渡されるため、`unsigned long long` の範囲を超えたユーザー定義リテラルを使用する事が可能となる。  
なお、1 は整数リテラルにしか使用する事ができないが、2 と 3 は浮動小数点リテラルに対しても使用する事ができてしまうため、注意が必要である。  
（引数として渡された文�列が整数リテラルであるという仮定をしないでリテラル演算�を定義したほうが良いだろう）

```cpp
namespace unit_literals {
  // intの大きさを持ち、km (kiro-meter, ��メートル)単位を表すリテラル演算�
  // 上記 1 のバージョン
  int operator"" _kmi(unsigned long long x)
  {
    return x * 1000;
  }

  // 上記 2 のバージョン
  int operator"" _kmj(const char* s)
  {
    return std::strtoull(s, nullptr, 10) * 1000;
  }

  // 上記 3 のバージョン
  template<char... S>
  int operator"" _kmk()
  {
    using CSTR = const char[];
    return operator"" _kmj(CSTR{ S..., '\0' });
  }
}

using namespace unit_literals;

// 123km (123,000m)
int distance1 = 123_kmi;
// 456km (456,000m)
int distance2 = 456_kmj;
// 789km (789,000m)
int distance3 = 789_kmk;
```

整数リテラルの前にマイナス記号（`-`）を付けて記述した場合でも、リテラル演算�には�数部分のみが渡される（通常の数値と同様、マイナス記号はリテラルの一部とはみなされない）。  
マイナス記号は、リテラル演算�によって返された値に対して単項マイナス演算�として適用される。

```cpp
// _kmiリテラル演算�に渡されるのは整数値123LL
int minus_distance = -123_kmi;
```


### 浮動小数点数に対するリテラル演算�
浮動小数点数に対するリテラル演算�は、以下のいずれかとなる。

1. `long double` 型のパラメータをひとつだけ持つリテラル演算�  
    ```cpp
    戻り値型 operator"" サフィックス名(long double 浮動小数点リテラル);
    ```

	ここで、`浮動小数点リテラル` にはユーザー定義リテラルのサフィックス名を削除した部分が `long double` 型で渡される。

2. `const char*` 型のパラメータをひとつだけ持つリテラル演算�  
    ```cpp
    戻り値型 operator"" サフィックス名(const char* 浮動小数点リテラル);
    ```

	ここで、`浮動小数点リテラル` にはユーザー定義リテラルのサフィックス名を削除した部分が `const char*` 型（`'\0'` で終端された C 文�列）で渡される。

3. `char` 型のテンプレートパラメータパックを一つだけ持ち、パラメータの無いリテラル演算�テンプレート  
    ```cpp
    template <char... 浮動小数点リテラル>
    戻り値型 operator"" サフィックス名();
    ```

	ここで、`浮動小数点リテラル` にはユーザー定義リテラルのサフィックス名を削除した部分の各文�が `char` 型のテンプレートパラメータパックで渡される。

これらが複数見つかった場合、1 があれば 1 が、1 が無ければ 2 か 3 が使用される。1 が無く 2 と 3 の両方があった場合にはプ�グラムは不適格となる。
1 は引数が `long double` であるため、リテラル部分が `long double` を超えたユーザリテラルを使用する事はできないが、2 と 3 の形式の場合はリテラル部分が文�列として引き渡されるため、`long double` の範囲を超えたユーザー定義リテラルを使用する事が可能となる。  
なお、1 は浮動小数点リテラルにしか使用する事ができないが、2 と 3 は整数リテラルに対しても使用する事ができてしまうため、注意が必要である。  
（引数として渡された文�列が浮動小数点リテラルであるという仮定をしないでリテラル演算�を定義したほうが良いだろう）

```cpp
namespace unit_literals {
  // floatの大きさを持ち、km (kiro-meter, ��メートル)単位を表すリテラル演算�
  // 上記 1 のバージョン
  float operator"" _kmf(long double x)
  {
    return x * 1000.0f;
  }

  // 上記 2 のバージョン
  float operator"" _kmg(const char* s)
  {
    return std::stold(s, nullptr) * 1000.0f;
  }

  // 上記 3 のバージョン
  template<char... S>
  float operator"" _kmh()
  {
    using CSTR = const char[];
    return operator"" _kmg(CSTR{ S..., '\0' });
  }
}

using namespace unit_literals;

// 123km (123,000m)
float distance1 = 123.0_kmf;
// 456km (456,000m)
float distance2 = 456.0_kmg;
// 789km (789,000m)
float distance3 = 789.0_kmh;
```
* std::stold[link /reference/string/stold.md]

浮動小数点リテラルの前にマイナス記号（`-`）を付けて記述した場合でも、リテラル演算�には�数部分のみが渡される（通常の数値と同様、マイナス記号はリテラルの一部とはみなされない）。  
マイナス記号は、リテラル演算�によって返された値に対して単項マイナス演算�として適用される。

```cpp
// _kmfリテラル演算�に渡されるのは浮動小数点数の値123.0L
float minus_distance = -123.0_kmf;
```


### 文�列に対するリテラル演算�
文�列に対するリテラル演算�は、文�列リテラルの型によって以下のいずれかとなる。

```cpp
// 通常の文�列リテラルの場合
戻り値型 operator"" サフィックス名(const char* 文�列リテラル, std::size_t 文�列リテラル長);

// ワイド文�列リテラルの場合
戻り値型 operator"" サフィックス名(const wchar_t* 文�列リテラル, std::size_t 文�列リテラル長);

// char16_t 文�列リテラルの場合
戻り値型 operator"" サフィックス名(const char16_t* 文�列リテラル, std::size_t 文�列リテラル長);

// char32_t 文�列リテラルの場合
戻り値型 operator"" サフィックス名(const char32_t* 文�列リテラル, std::size_t 文�列リテラル長);
```

ここで、`文�列リテラル` にはユーザー定義リテラルのサフィックス名を削除した文�列部分の先�を指すポインタが、`文�列リテラル長` には当該文�列の長さが渡される。  
なお、`文�列リテラル長` には終端文�（ヌル文�）は含まれない。

```cpp
namespace literals {
  std::u32string operator"" _s(const char32_t* str, std::size_t length)
  {
    return std::u32string(str, length);
  }
}

using namespace literals;
auto str = UR"(こんにちは"世界")"_s;
assert(str.size() == 9);
```
* str.size()[link /reference/string/basic_string/size.md]


### 文�に対するリテラル演算�
文�に対するリテラル演算�は、文�リテラルの型によって以下のいずれかとなる。

```cpp
// 通常の文�リテラルの場合
戻り値型 operator"" サフィックス名(char 文�リテラル);

// ワイド文�リテラルの場合
戻り値型 operator"" サフィックス名(wchar_t 文�リテラル);

// char16_t 文�リテラルの場合
戻り値型 operator"" サフィックス名(char16_t 文�リテラル);

// char32_t 文�リテラルの場合
戻り値型 operator"" サフィックス名(char32_t 文�リテラル);
```


### ユーザー定義文�列リテラルの結合
通常の文�列リテラルと同様、隣接したユーザー定義文�列リテラルはプリプ�セス時に結合される。  
結合は、サフィックス名を無視して通常の文�列リテラルとして行われ、リテラル演算�は結合後の文�列に対して呼び出される。  
なお、結合前の各ユーザー定義文�列リテラルのサフィックス名は一致していなければならない。  
しかし、ユーザ定義文�列リテラルと通常の文�列リテラルは結合可能である。その場合、結合後の文�列リテラルはユーザ定義文�列リテラルとなる。


```cpp
std::string operator"" _s(const char* s, std::size_t l)
{
  return { s, l };
}

std::u32string operator"" _t(const char32_t* s, std::size_t l)
{
  return { s, l };
}

auto s1 = "hello, "_s "world"_s;            // operator"" _s は いずれのケースでも
auto s2 = "hello, "_s "world"  ;            // "hello, world" に対して
auto s3 = "hello, "   "world"_s;            // 1 度だけ呼び出される。

auto t1 = U"Bjarne "_t U"Stroustrup"_t;     // operator"" _t はいずれのケースでも
auto t2 =  "Bjarne "_t U"Stroustrup"  ;     // U"Bjarne Stroustrup" に対して
auto t3 = U"Bjarne "_t  "Stroustrup"  ;     // 1 度だけ呼び出される。
auto t4 =  "Bjarne "   U"Stroustrup"_t;

//auto u = "hello, "_s "Bjarne"_t;          // サフィックス名が異なるためエラー
```


### サフィックス名の規約
アンダースコアで始まらないユーザー定義リテラルのサフィックス名は、標準C++の将来の拡張のために予約されている。  
このため、ユーザー定義リテラルを定義する場合、サフィックス名はアンダースコア `_` で始める必要がある。  
なお、アンダースコア＋大文�で始まる�別�、および、連続した 2 つ以上のアンダースコアを含む�別�は、ユーザー定義リテラルのサフィックス名に限らず標準C++の規約で予約されているため、注意が必要である。  


## 例
```cpp example
#include <iostream>
#include <string>

namespace my_namespace {
inline namespace literals {
  std::string operator"" _s(const char* str, std::size_t length)
  {
    return std::string(str, length);
  }
}}

int main()
{
  using namespace my_namespace::literals;

  auto x = "hello"_s; // xの型はstd::string
  std::cout << x << std::endl;
}
```

### 出力
```
hello
```


## この機能が必要になった背景・経緯
ユーザー定義リテラルが最初に提案された際の動機は、「`complex<double>(1.1, 1.2)`のようなコンストラクタ呼び出しがあった場合に、それを組み込み型のリテラルと同様にコンパイル時定数としたい」というものだった。この問題に対する解決は[`constexpr`](constexpr.md)機能によって行われたが、ユーザー定義型のためのリテラルを定義できるようにする提案は、動機を変えて残った。

ユーザー定義型に関して、C++には基本的な�計原則がある：

1. ユーザー定義型は、組み込み型と同じ�備(facilities)をサポートできること。C++03では、組み込み型がもつ「リテラル」という機能を、ユーザー定義型に持たせることができなかった
2. C言語との互換性を�持する必要があるが、C99が持つ複素数リテラルを受け入れるための機能がない

ユーザー定義型に対してリテラルを定義できるようにすることで、ユーザー定義型で可能な�計の範囲が増え、C言語が持つ複素数リテラルをC++の機能のなかで実現できるようになる。


## 検討されたほかの選択肢
ユーザー定義型に対するリテラルのサポートをする方法は、いくつか段階的に提案された。

まず、リテラルのための特殊なコンストラクタを用意する案：

```cpp
class DecimalFloat {
public:
  DecimalFloat(const char* literalString, double "df", "DF") { … }
};

DecimalFloat f = 12.34df;
```

この案では、先�のパラメータ`literalString`に`12.34`のようなリテラルの値が文�列として代入され、リテラルに入力される文�を`double`に属する値に限定し、サフィックスとして使用できる文�列として`"df"`と`"DF"`を許可する、というような形式となっていた。

その後の案では、コンストラクタではなく演算�をオーバー�ードする形式となった。当時は`DecimalFloat operator"df"(const char*)`のように、サフィックスの名称をダブルクォーテーション内に書くようになっていた。

リテラル名がサフィックスであることを明示的にするために、今日の`DecimalFloat operator"" df(long double)`という形式になった。


## 関連項目
- [C++14 リテラル演算�のスペースを省略可能とする](/lang/cpp14/no_whitespace_literal_operators.md)
- [`std::basic_string`の文�列リテラル`s`](/reference/string/basic_string/op_s.md)
- [`std::complex<float>`の浮動小数点数リテラル`if`](/reference/complex/complex/op_if.md)
- [`std::complex<double>`の浮動小数点数リテラル`i`](/reference/complex/complex/op_i.md)
- [`std::complex<long double>`の浮動小数点数リテラル`il`](/reference/complex/complex/op_il.md)
- [`std::chrono::nanoseconds`の数値リテラル`ns`](/reference/chrono/duration/op_ns.md)
- [`std::chrono::microseconds`の数値リテラル`us`](/reference/chrono/duration/op_us.md)
- [`std::chrono::milliseconds`の数値リテラル`ms`](/reference/chrono/duration/op_ms.md)
- [`std::chrono::seconds`の数値リテラル`s`](/reference/chrono/duration/op_s.md)
- [`std::chrono::minutes`の数値リテラル`min`](/reference/chrono/duration/op_min.md)
- [`std::chrono::hours`の数値リテラル`h`](/reference/chrono/duration/op_h.md)


## 参照
- [N1511 Literals for user-defined types](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2003/n1511.pdf)
- [N1892 Extensible Literals](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2005/n1892.pdf)
- [N2282 Extensible Literals (revision 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2282.pdf)
- [N2378 User-defined literals (aka. Extensible Literals (revision 3))](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2378.pdf)
- [N2750 User-defined Literals (aka. Extensible Literals (revision 4))](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2750.pdf)
- [N2765 User-defined Literals (aka. Extensible Literals (revision 5))](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2765.pdf)
- [CWG Issue 935. Missing overloads for character types for user-defined literals](http://www.open-std.org/jtc1/sc22/wg21/docs/cwg_defects.html#935)
- [CWG Issue 1479. Literal operators and default arguments](http://www.open-std.org/jtc1/sc22/wg21/docs/cwg_defects.html#1479)

