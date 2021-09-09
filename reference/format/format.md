# format

* format[meta header]
* function template[meta id-type]
* std[meta namespace]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class... Args>
  string format(format_string<Args...> fmt, const Args&... args);                      // (1)

  template<class... Args>
  wstring format(wformat_string<Args...> fmt, const Args&... args);                    // (2)

  template<class... Args>
  string format(const locale& loc, format_string<Args...> fmt, const Args&... args);   // (3)

  template<class... Args>
  wstring format(const locale& loc, wformat_string<Args...> fmt, const Args&... args); // (4)
}
```
* string[link /reference/string/basic_string.md]
* wstring[link /reference/string/basic_string.md]
* locale[link /reference/locale/locale.md]
* format_string[italic]
* wformat_string[italic]

## 概要

書式文字列`fmt`に従ったフォーマットで`args...`の文字列表現を文字列オブジェクトで返す。ロケール`loc`が指定された場合は、ロケール依存のフォーマットにおいて使用される。

* (1): マルチバイト文字列版
* (2): ワイド文字列版
* (3): マルチバイト文字列版 (ロケール指定あり)
* (4): ワイド文字列版 (ロケール指定あり)

```cpp
string message = format("The answer is {}.", 42); // => "The answer is 42."
```
* string[link /reference/string/basic_string.md]

書式文字列は定数式でなければならず、その妥当性がコンパイル時にチェックされる。実行時に決まるフォーマット文字列を使用したい場合、[`vformat`](vformat.md)を使用できる。

### 書式文字列

書式文字列中では、`{`と`}`で囲まれた範囲が置換フィールドとなる(エスケープシーケンスは`{{`と`}}`)。

置換フィールドの書式は次の通り(`[]`は省略可の意味)。

```
{ [引数ID] [: オプション] }
```

* 引数IDは0から始まる番号で、何番目の引数で置換するかを指定する。
* 引数IDを一部のフィールドだけに書くことはできない(すべての置換フィールドに指定するか、すべての置換フィールドで指定しないかのどちらかのみ)。違反した場合はコンパイルエラーとなる。
* オプションの書式は引数の型によって異なる。

```cpp
string s0 = format("{} {}",   "a", "b"); // OK
string s1 = format("{1} {0}", "a", "b"); // OK
string s2 = format("{0} {}",  "a", "b"); // コンパイルエラー
string s3 = format("{} {1}",  "a", "b"); // コンパイルエラー
```

### 標準のオプション書式

組み込みの型に対して使える標準のオプション書式は次の通り(`[]`は省略可の意味)。
基本的に`printf`の書式を踏襲しているが、あくまでもオプションであり、省略しても`<iostream>`と同じようにデフォルトの書式が使われる。

```
[[fill] align] [sign] ['#'] ['0'] [width] ['.' precision] [type]
```

* `fill` : アライメントに使う文字 (デフォルト: スペース)
* `align` : アライメント(デフォルトは型による)
    * `>` : 右寄せ
    * `<` : 左寄せ
    * `^` : 中央寄せ
* `sign` : 符号
    * `+` : 正の数でも符号を表示する
    * `-` : 負の数の場合のみ符号を表示する(デフォルト)
    * スペース : 正の数にはスペースを表示する
* `#` : 代替表現(`0x`など形式がわかる表記)を使う
* `0` : 符号を考慮して0で埋める
* `width` : 幅 (省略時は値に応じて幅が決まり、アライメントは機能しない)
    * 置換フィールドを使って変数で指定できる
* `precision` : 精度(浮動小数点数の場合)、使う文字数(文字列の場合)
    * 置換フィールドを使って変数で指定できる
* `type` : 値の表現方法(表を参照)

`printf`との違いとして、デフォルトではロケール非依存(Cロケール固定)である。ロケール依存のフォーマットをするには`n`オプションを使う。
ロケール非依存の場合、算術型の出力は[`to_chars`](/reference/charconv/to_chars.md)と同じになる。

#### 文字列型の場合

| type       | 意味             |
|:-----------|:-----------------|
| s (省略可) | 文字列           |

#### 文字型 / `bool`型 / 整数型の場合

`[first, last)`を[`to_chars`](/reference/charconv/to_chars.md)の結果を格納するのに十分な範囲、`value`をフォーマットする値、`charT`を`char`または`wchar_t`とする。

* 以下の表の通りに[`to_chars`](/reference/charconv/to_chars.md)を呼び出したあと、その結果を出力へコピーするかのような振る舞いをする。ただし、実際に[`to_chars`](/reference/charconv/to_chars.md)を呼び出すかどうかは規定されていない。
* 実際には、出力へコピーする際にパディングなども行われる。

| type       | 意味                            | 効果                                                                      |
|:-----------|:--------------------------------|:--------------------------------------------------------------------------|
| b          | 2進数(小文字)                   | `to_chars(first, last, value, 2)` (代替表現の接頭辞 `0b`)                 |
| B          | 2進数(大文字)                   | `b`の大文字版 (代替表現の接頭辞 `0B`)                                     |
| c          | 文字として出力                  | `static_cast<charT>(value)` (収まらないときは`format_error`)              |
| d          | 10進数                          | `to_chars(first, last, value)`                                            |
| n          | 10進数(ロケールを考慮する)      | ロケール依存の桁区切りを使った`d`                                         |
| o          | 8進数                           | `to_chars(first, last, value, 8)` (代替表現の接頭辞 `0`、ただし値が0のときは接頭辞なし) |
| x          | 16進数(小文字)                  | `to_chars(first, last, value, 16)` (代替表現の接頭辞 `0x`)                |
| X          | 16進数(大文字)                  | `x`の大文字版 (代替表現の接頭辞 `0X`)                                     |
| (なし)     | デフォルト                      | `d` (整数型の場合)<br/>`c` (文字型の場合)<br/>`"true"`/`"false"`を出力(`bool`型の場合) |

#### 浮動小数点数型の場合

| type       | 意味                             | 効果                                                                                                                                                                  |
|:-----------|:---------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| f,F        | 指数表記しない                   | `to_chars(first, last, value, chars_format::fixed, precision)` (精度が指定されたとき)<br/>`to_chars(first, last, value, chars_format::fixed, 6)` (それ以外)            |
| e          | 指数表記(小文字)                 | `to_chars(first, last, value, chars_format::scientific, precision)` (精度が指定されたとき)<br/>`to_chars(first, last, value, chars_format::scientific, 6)` (それ以外)  |
| E          | 指数表記(大文字)                 | `e`の大文字版                                                                                                                                                         |
| a          | 16進指数表記(小文字)             | `to_chars(first, last, value, chars_format::hex, precision)` (精度が指定されたとき)<br/>`to_chars(first, last, value, chars_format::hex)` (それ以外)                   |
| A          | 16進指数表記(大文字)             | `a`の大文字版                                                                                                                                                         |
| g          | 値に応じた表記(小文字)           | `to_chars(first, last, value, chars_format::general, precision)` (精度が指定されたとき)<br/>`to_chars(first, last, value, chars_format::general, 6)` (それ以外) |
| G          | 値に応じた表記(大文字)           | `g`の大文字版                                                                                                                                                         |
| n          | ロケールを考慮した値に応じた表記 | ロケールを考慮した`g`                                                                                                                                                 |
| (なし)     | デフォルト                       | `to_chars(first, last, value, chars_format::fixed, general, precision)` (精度が指定されたとき)<br/>`to_chars(first, last, value)` (それ以外)                           |

#### ポインタの場合

| type       | 意味               | 効果                                                                                                            |
|:-----------|:-------------------|:----------------------------------------------------------------------------------------------------------------|
| p (省略可) | アドレスを出力する | `"0x" + to_chars(first, last, reinterpret_cast<uintptr_t>(value), 16)`  |

### 例(N4861より)

```cpp
char c = 120;
format("{:6}", 42);      // "    42"
format("{:6}", 'x');     // "x     "
format("{:*<6}", 'x');   // "x*****"
format("{:*>6}", 'x');   // "*****x"
format("{:*^6}", 'x');   // "**x***"
format("{:6d}", c);      // "   120"
format("{:6}", true);    // "true  "
```

```cpp
double inf = numeric_limits<double>::infinity();
double nan = numeric_limits<double>::quiet_NaN();
format("{0:},{0:+},{0:-},{0: }", 1);   // "1,+1,1, 1"
format("{0:},{0:+},{0:-},{0: }", -1);  // "-1,-1,-1,-1"
format("{0:},{0:+},{0:-},{0: }", inf); // "inf,+inf,inf, inf"
format("{0:},{0:+},{0:-},{0: }", nan); // "nan,+nan,nan, nan"
```
* numeric_limits[link /reference/limits/numeric_limits.md]
* infinity()[link /reference/limits/numeric_limits/infinity.md]
* quiet_NaN()[link /reference/limits/numeric_limits/quiet_nan.md]

```cpp
char c = 120;
format("{:+06d}", c);   // "+00120"
format("{:#06x}", 0xa); // "0x000a"
format("{:<06}", -42);  // "-42   "
```

```cpp
format("{}", 42);                      // "42"
format("{0:b} {0:d} {0:o} {0:x}", 42); // "101010 42 52 2a"
format("{0:#x} {0:#X}", 42);           // "0x2a 0X2A"
format("{:n}", 1234);                  // "1,234" (ロケールによる)
```

### コンパイル時の書式文字列チェック

_`format_string`_ および _`basic_format_string`_ は次のように定義される。ただし、クラス名は規定されない。

```cpp
namespace std {
  template<class charT, class... Args> struct basic_format_string { // exposition only
  private:
    basic_string_view<charT> str; // exposition only

  public:
    template<class T> consteval basic_format_string(const T& s): str(s) {
      /*何らかのコンパイル時書式文字列チェック*/
    }
  };

  template<class... Args> using format_string
    = basic_format_string<char, type_identity_t<Args>...>; // exposition only

  template<class... Args> using wformat_string
    = basic_format_string<wchar_t, type_identity_t<Args>...>; // exposition only
```
* consteval[link /lang/cpp20/immediate_functions.md]

_`basic_format_string`_ のコンストラクタは[即時関数](/lang/cpp20/immediate_functions.md)であり、書式文字列が正しい場合にのみ定数式として評価できるように実装される。即時関数であるため、定数式として評価できない場合はエラーとなる。

書式文字列チェックをエラーがあった場合に例外を投げるような実装をすれば、`throw`は定数式として評価できないため、コンパイルエラーとすることが可能である。

## 適格要件

* 書式文字列は定数式であり、[`string_view`](/reference/string_view/basic_string_view.md)(ワイド文字列版は[`wstring_view`](/reference/string_view/basic_string_view.md))に暗黙変換できること。
* 書式文字列にエラーがないこと。例えば、
    * 閉じていないカッコなどの構文エラーがないこと。
    * 実際に渡している引数の型が書式文字列中の置換フィールドが要求する型に合うこと。

## 効果

以下のコードと等しい。

```cpp
return vformat(fmt.str, make_format_args(args...));  // (1)
return vformat(fmt.str, make_wformat_args(args...)); // (2)
return vformat(loc, fmt.str, make_format_args(args...)); // (3)
return vformat(loc, fmt.str, make_wformat_args(args...)); // (4)
```
* vformat[link vformat.md]
* make_format_args[link make_format_args.md]
* make_wformat_args[link make_format_args.md]
* str[italic]

## 戻り値

`args...`の文字列表現を保持する文字列

## 例外

フォーマット実行時に失敗した場合、[`format_error`](format_error.md)を投げる。ただし、書式文字列に問題がある場合はコンパイルエラーとなる。

## 備考

* マルチバイト文字列、ワイド文字列の区別は、可変長引数部分で受け取れる文字列の型にも適用される。
    * 例えば、フォーマット文字列がマルチバイトの場合、引数にワイド文字列を渡すことは標準ではできない。
    * ユーザー定義フォーマッターで拡張することは可能。
* [`to_chars`](/reference/charconv/to_chars.md)はワイド文字列に対応していない。
    * ワイド文字列版のときはマルチバイト文字列から変換すると考えられる。
    * あるいは、`to_wchars`のようなものを作り、それを使うことも考えられる。

## 例
```cpp example
#include <iostream>
#include <format>

int main()
{
  std::cout << std::format("The answer is {}.", 42) << std::endl;
}
```

### 出力
```
The answer is 42.
```

## 実装例
```cpp
template<class... Args>
string format(format_string<Args...> fmt, const Args&... args)
{
  return vformat(fmt.str, make_format_args(args...));
}

template<class... Args>
wstring format(wformat_string<Args...> fmt, const Args&... args)
{
  return vformat(fmt.str, make_wformat_args(args...));
}

template<class... Args>
string format(const locale& loc, format_string<Args...> fmt, const Args&... args)
{
  return vformat(loc, fmt.str, make_format_args(args...));
}

template<class... Args>
wstring format(const locale& loc, wformat_string<Args...> fmt, const Args&... args)
{
  return vformat(loc, fmt.str, make_wformat_args(args...));
}
```
* string[link /reference/string/basic_string.md]
* wstring[link /reference/string/basic_string.md]
* format_string[italic]
* wformat_string[italic]
* str[italic]
* vformat[link vformat.md]
* make_format_args[link make_format_args.md]
* make_wformat_args[link make_format_args.md]
* locale[link /reference/locale/locale.md]

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

## 参照

* [Working Draft, Standard for Programming Language C++ [format]](https://timsong-cpp.github.io/cppwp/format)
* [P0645R10 Text Formatting](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0645r10.html)
* [P1652R1 Printf corner cases in std::format](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1652r1.html)
* [P2216R3 std::format improvements](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2216r3.html)
* [［C++］ std::formatあるいは{fmt}のコンパイル時フォーマット文字列チェックの魔術 - 地面を見下ろす少年の足蹴にされる私](https://onihusube.hatenablog.com/entry/2021/07/01/195912)
