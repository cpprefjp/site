#ユーザー定義リテラル
* cpp11[meta cpp]

##概要
ユーザー定義リテラル(User-defined literals)は、`123`、`3.14`、`"hello"`といったリテラルに対して付けられるサフィックスをオーバーロードできるようにすることで、ユーザーがリテラルに意味を持たせられるようにする機能である。

これは、リテラルに対して以下のような情報を持たせるために使用できる：

- 単位 : メートル、秒、角度として度数法か弧度法、など
- 型 : `"hello"s`とすることで[`std::string`](/reference/string/basic_string.md)型の文字列リテラル、`1.2i`とすることで[`std::complex<double>`](/reference/complex.md)型のリテラルとするなど

ユーザー定義リテラルは、`operator "" サフィックス名`の演算子をオーバーロードする。`""`とサフィックス名の間にスペースが必要なので注意。

```cpp
std::string operator"" s(const char* str, std::size_t length)
{
  return std::string(str, length);
}

auto x = "hello"s; // xの型はstd::string
```
* std::string[link /reference/string/basic_string.md]
* std::size_t[link /reference/cstddef/size_t.md]

`operator ""`は、「リテラル演算子 (literal operator)」という。

ここでは`char`配列の文字列リテラルに対するサフィックスを定義しているが、パラメータの型を`wchar_t`、[`char16_t`](char16_32.md)、[`char32_t`](char16_32.md)とすることで、それらの文字型の文字列に対しても、サフィックスを定義できる。

整数リテラルの場合には、[`unsigned long long`](long_long_type.md)型のパラメータをひとつ受け取るようにする。負数は、演算子のなかでは扱えず、演算子によって返された値を符号反転することで負数が表現される。

浮動小数点数リテラルの場合には、`long double`型のパラメータをひとつ受け取るようにする。


##仕様
###全般的な仕様
- ユーザー定義リテラルのサフィックスと組み込みリテラルのサフィックスが一致した場合でも、組み込みリテラルのサフィックスと型が一致しない場合には、ユーザー定義リテラルが使用される。たとえば、浮動小数点数のユーザー定義リテラルとして`LL`を定義した場合でも、整数リテラルに対して`LL`サフィックスを付けた場合には、組み込みの`LL`サフィックスが使用される：

    ```cpp
std::string operator"" LL(long double x)
{
  return std::to_string(x);
}

long long   a = 123LL;     // 組み込みの整数リテラル
std::string b = 123.456LL; // ユーザー定義リテラル
```
* std::string[link /reference/string/basic_string.md]

- リテラル演算子の名前として、ユニバーサルキャラクタ名を使用することが許可される：

    ```cpp
namespace literals {
  // _ + 小文字のpi (π)
  float operator"" _\u03C0(unsigned long long count)
  {
    return 3.141592f * count;
  }
}

using namespace literals;

float x = 2_\u03C0; // OK
float y = 2_π;     // OK
```

- 文字型と論理値型に対しては、リテラル演算子を定義できない

(執筆中)


###整数に対するリテラル演算子
整数に対するリテラル演算子は、`unsigned long long`型のパラメータをひとつだけ持つこと。

```cpp
namespace unit_literals {
  // intの大きさを持ち、
  // km (kiro-meter, キロメートル)単位を表すリテラル演算子
  int operator"" _kmi(unsigned long long x)
  {
    return x * 1000;
  }
}

using namespace unit_literals;

// 123km (123,000m)
int distance = 123_kmi;
```

整数リテラルとして負数を記述した場合、リテラル演算子には正数部分のみが渡される。リテラル演算子によって返された値を符号反転することで、負数が表現される：

```cpp
// _kmiリテラル演算子に渡されるのは整数値123LL
int minus_distance = -123_kmi;
```


###浮動小数点数に対するリテラル演算子
浮動小数点数に対するリテラル演算子は、`long double`型のパラメータをひとつだけ持つこと。

```cpp
namespace unit_literals {
  // floatの大きさを持ち、
  // km (kiro-meter, キロメートル)単位を表すリテラル演算子
  float operator"" _kmf(long double x)
  {
    return x * 1000.0f;
  }
}

using namespace unit_literals;

// 123km (123,000m)
float distance = 123.0_kmf;
```

浮動小数点数リテラルとして負数を記述した場合、リテラル演算子には正数部分のみが渡される。リテラル演算子によって返された値を符号反転することで、負数が表現される：

```cpp
// _kmiリテラル演算子に渡されるのは浮動小数点数の値123.0L
float minus_distance = -123.0_kmf;
```


###文字列に対するリテラル演算子
文字列に対するリテラル演算子は、以下のいずれかのパラメータを持つこと：

- `const char*`
- `const char*, std::size_t`
- `const wchar_t*, std::size_t`
- `const char16_t*, std::size_t`
- `const char32_t*, std::size_t`

第1パラメータには文字列リテラルの先頭を指すポインタ、第2パラメータには文字列リテラルの文字配列の要素数が渡される。

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
* std::u32string[link /reference/string/basic_string.md]
* str.size()[link /reference/string/basic_string/size.md]
* std::size_t[link /reference/cstddef/size_t.md]
* assert[link /reference/cassert/assert.md.nolink]


###リテラル演算子テンプレート
(執筆中)


###リテラル演算子の規約
注意事項としては、標準C++の規約で、リテラル演算子をユーザーがオーバーロードする場合には以下のことが要求される：

- 非グローバル名前空間にリテラル演算子を定義すること
- リテラル演算子の名前は、アンダースコア `_` で始めること

アンダースコアで始まらないリテラル演算子は、標準C++の将来の拡張のために予約される。


##例
(執筆中)


##この機能が必要になった背景・経緯
(執筆中)


##検討されたほかの選択肢
(執筆中)


##参照
- [N1511 Literals for user-defined types](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2003/n1511.pdf)
- [N1892 Extensible Literals](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2005/n1892.pdf)
- [N2282 Extensible Literals](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2282.pdf)
- [N2378 User-defined literals](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2378.pdf)
- [N2750 User-defined Literals (aka. Extensible Literals (revision 4))](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2750.pdf)
- [N2765 User-defined Literals (aka. Extensible Literals (revision 5))](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2765.pdf)

