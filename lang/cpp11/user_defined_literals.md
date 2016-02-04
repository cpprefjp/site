#ユーザー定義リテラル
* cpp11[meta cpp]

##概要
ユーザー定義リテラル(User-defined literals)は、`123`、`3.14`、`"hello"`といったリテラルに対して付けられるサフィックスをオーバーロードできるようにすることで、ユーザーがリテラルに意味を持たせられるようにする機能である。

これは、リテラルに対して以下のような情報を持たせるために使用できる：

- 単位 : メートル、秒、角度として度数法か弧度法、など
- 型 : `"hello"s`とすることで[`std::string`](/reference/string/basic_string.md)型の文字列リテラル、`1.2i`とすることで[`std::complex<double>`](/reference/complex/complex.md)型のリテラルとするなど

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

文字リテラルの場合には、`char`、`wchar_t`、[`char16_t`](char16_32.md)、[`char32_t`](char16_32.md)のいずれかの文字型のパラメータをひとつ受け取るようにする。


##仕様
###リテラル演算子の規約
注意事項としては、標準C++の規約で、リテラル演算子をユーザーがオーバーロードする場合には以下のことが要求される：

- 非グローバル名前空間にリテラル演算子を定義すること
- リテラル演算子の名前は、アンダースコア `_` で始めること

アンダースコアで始まらないリテラル演算子は、標準C++の将来の拡張のために予約される。


##参照
- [N1511 Literals for user-defined types](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2003/n1511.pdf)
- [N1892 Extensible Literals](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2005/n1892.pdf)
- [N2282 Extensible Literals](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2282.pdf)
- [N2378 User-defined literals](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2378.pdf)
- [N2750 User-defined Literals (aka. Extensible Literals (revision 4))](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2750.pdf)
- [N2765 User-defined Literals (aka. Extensible Literals (revision 5))](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2765.pdf)

