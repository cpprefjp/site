# formatter

* format[meta header]
* class template[meta id-type]
* std[meta namespace]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class T, class U>
  struct formatter;
}
```

## 概要
フォーマット引数の個々の型に対応する書式文�列の解析と値のフォーマットを担うクラス。

`charT`を`char`または`wchar_t`とすると、標準で次の特殊化が有効である。

1. 以下のもの。
```cpp
template<> struct formatter<charT, charT>;

template<> struct formatter<char, wchar_t>;

template<> struct formatter<charT*, charT>;

template<> struct formatter<const charT*, charT>;

template<size_t N> struct formatter<const charT[N], charT>;

template<class traits, class Allocator>
struct formatter<basic_string<charT, traits, Allocator>, charT>;

template<class traits>
struct formatter<basic_string_view<charT, traits>, charT>;
```
* basic_string[link /reference/string/basic_string.md]
* basic_string_view[link /reference/string_view/basic_string_view.md]

2. 第1テンプレート引数が`nullptr_t`, `void*`, `const void*`, `bool`, すべてのCV修飾されない標準の整数型, 拡張整数型, 浮動小数点数型であり、第2テンプレート引数が`charT`であるもの。

さらに、ユーザーが`formatter`を特殊化した場合、それも有効である。

標準でもユーザー定義でも特殊化されない場合、その型に対する`formatter`は無効であり、そのような型はフォーマット関数の引数にできない。

ワイド文�列とマルチバイト文�列を相互に変換するような特殊化は意図的に用意されていないが、ユーザーが用意することは禁�していない。

## Formatter要件

`formatter`の有効な特殊化はFormatter要件を満たす必要がある。

型`F`がFormatter要件を満たすとは、次のことをいう。

* `F`は`Cpp17DefaultConstructible`、`Cpp17CopyConstructible`、`Cpp17CopyAssignable`、`Cpp17Destructible`であること (注: ここはC++20の�定までにコンセプトで書き換えられるかもしれない)

さらに、

1. 式 `f.parse(pc)` が有効であり、
    * 戻り値の型が`PC::iterator`である
    * `[pc.begin(), pc.end())`の範囲を解析して`format_error`を投げるか、解析が終わった位置を指すイテレーターを返す
2. 式 `f.format(t, fc)` が有効であり、
    * 戻り値の型が`FC::iterator`である
    * フォーマット結果を`fc.out()`へ出力し、出力後のイテレーターを返す
    * 出力は`t`、グ�ーバル�ケール、最後に呼び出された`f.parse(pc)`の`[pc.begin(), pc.end())`の範囲以外に依�しない
3. 式 `f.format(u, fc)` が有効であり、
    * 戻り値が`FC::iterator`である
    * フォーマット結果を`fc.out()`へ出力し、出力後のイテレーターを返す
    * 出力は`t`、グ�ーバル�ケール、最後に呼び出された`f.parse(pc)`の`[pc.begin(), pc.end())`の範囲以外に依�しない
    * `u`を変更しない

ただし、

* 文�の型を`charT`
* 出力イテレーターの型を`Out`
* フォーマット引数の型を`T`
* `f`を`F`のオブジェクト
* `u`を`T`のlvalue
* `t`を`T`または`const T`へ変換できる型のオブジェクト
* `PC`を`basic_format_parse_context<charT>`
* `FC`を`basic_format_context<Out, charT>`
* `pc`を`PC`のlvalue
* `fc`を`FC`のlvalue
* `pc.begin()`は書式文�列�の対応する置換フィールドのオプションの先�を指す
* オプションが空なら、`pc.begin() == pc.end()`または`*pc.begin() == '}'`である

とする。

## 例
```cpp example
#include <iostream>
#include <format>

enum color { red, green, blue };

const char* color_names[] = { "red", "green", "blue" };

template<> struct std::formatter<color> : std::formatter<const char*> {
  auto format(color c, format_context& ctx) {
    return formatter<const char*>::format(color_names[c], ctx);
  }
};

int main()
{
  int variable = 0;
  std::cout << std::format("{}", red) << std::endl;
}
```

### 出力
```
red
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

## 参照

* [P0645R10 Text Formatting](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0645r10.html)
* [{fmt}](https://github.com/fmtlib/fmt)
