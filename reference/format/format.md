# format

* format[meta header]
* function template[meta id-type]
* std[meta namespace]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class... Args>
  string format(format_string<Args...> fmt, Args&&... args);                      // (1)

  template<class... Args>
  wstring format(wformat_string<Args...> fmt, Args&&... args);                    // (2)

  template<class... Args>
  string format(const locale& loc, format_string<Args...> fmt, Args&&... args);   // (3)

  template<class... Args>
  wstring format(const locale& loc, wformat_string<Args...> fmt, Args&&... args); // (4)
}
```
* string[link /reference/string/basic_string.md]
* wstring[link /reference/string/basic_string.md]
* locale[link /reference/locale/locale.md]
* format_string[link basic_format_string.md]
* wformat_string[link basic_format_string.md]

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

C++23以降、書式指定で出力する[`std::print()`](/reference/print/print.md)、[`std::println()`](/reference/print/println.md)関数が定義される。


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

### <a id="std-format-options" href="#std-format-options">標準のオプション書式</a>

組み込みの型に対して使える標準のオプション書式は次の通り(`[]`は省略可の意味)。
基本的に`printf`の書式を踏襲しているが、オプションをすべて省略しても(`{}`だけでも)デフォルトの書式が使われる。

```
[[fill] align] [sign] ['#'] ['0'] [width] ['.' precision] ['L'] [type]
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
* `width` : 幅 (アライメントもしくは0埋めの幅)
    * 置換フィールドを使って変数で指定できる
* `precision` : 精度(浮動小数点数の場合)、使う文字数(文字列の場合)
    * 置換フィールドを使って変数で指定できる
* `L` : ロケールを考慮する
* `type` : 値の表現方法(表を参照)

`printf`との違いとして、デフォルトではロケール非依存(Cロケール固定)である。ロケール依存のフォーマットをするには`L`オプションを使う。
ロケール非依存の場合、算術型の出力は[`to_chars`](/reference/charconv/to_chars.md)と同じになる。

#### 文字列型の場合

| type       | 意味         |効果                                                                             | 対応バージョン |
|:-----------|:-------------|--------------------------------------------------------------------------------------|-------|
| s          | 文字列       | 文字列をそのまま出力                                                                      | C++20 |
| ?          | デバッグ出力 | 文字・文字列を引用符で囲み、エスケープシーケンスをエスケープして出力 (例:`"\n"`は`"\"\n\""`となる) | C++23 |

デフォルトは `s`。

#### 文字型の場合

| type   | 意味                       | 効果                                                                      | 対応バージョン |
|:-------|:---------------------------|:--------------------------------------------------------------------------|----------------|
| c      | 文字として出力             | `static_cast<charT>(value)` (収まらないときは`format_error`)              | C++20 |
| ?      | デバッグ出力               | 文字・文字列を引用符で囲み、エスケープシーケンスをエスケープして出力 (例:`"\n"`は`"\"\\n\""`となる) | C++23 |

デフォルトは `c`。

整数型のオプションも指定できる。その場合は、十分な大きさの符号なし整数型として扱われる。

#### `bool`型の場合

デフォルトまたは `s` を指定すると、 `true` / `false` という文字列を出力する。

整数型のオプションも指定できる。その場合は、`unsigned char` に `static_cast` される。

#### 整数型の場合

イテレータ範囲`[first, last)`を[`to_chars`](/reference/charconv/to_chars.md)の結果を格納するのに十分な範囲、`value`をフォーマットする値、`charT`を`char`または`wchar_t`とする。

* ロケールを考慮しない場合、数値を文字列化する部分は以下の表の通りに[`to_chars`](/reference/charconv/to_chars.md)を呼び出した結果と等しくなる。

| type   | 意味                       | 効果                                                                      | 対応バージョン |
|:-------|:---------------------------|:--------------------------------------------------------------------------|----------------|
| b, B   | 2進数                      | `to_chars(first, last, value, 2)` (代替表現の接頭辞 `0b`)                 | C++20 |
| d      | 10進数                     | `to_chars(first, last, value)`                                            | C++20 |
| o      | 8進数                      | `to_chars(first, last, value, 8)` (代替表現の接頭辞 `0`、ただし値が0のときは接頭辞なし) | C++20 |
| x, X   | 16進数                     | `to_chars(first, last, value, 16)` (代替表現の接頭辞 `0x`)                | C++20 |
| c      | 文字として出力             | `static_cast<charT>(value)` した値を文字として出力 (収まらないときは`format_error`)  | C++20 |

デフォルトは `d`。

2進数・16進数については、大文字のオプションを指定すると代替表現および数値中のアルファベットが大文字になる。

#### 浮動小数点数型の場合

| type       | 意味                      | 効果                                                                                                                                                                  |
|:-----------|:--------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| f, F       | 指数表記しない            | `to_chars(first, last, value, chars_format::fixed, precision)` (精度が指定されたとき)<br/>`to_chars(first, last, value, chars_format::fixed, 6)` (それ以外)           |
| e, E       | 指数表記する              | `to_chars(first, last, value, chars_format::scientific, precision)` (精度が指定されたとき)<br/>`to_chars(first, last, value, chars_format::scientific, 6)` (それ以外) |
| a, A       | 16進数で指数表記する      | `to_chars(first, last, value, chars_format::hex, precision)` (精度が指定されたとき)<br/>`to_chars(first, last, value, chars_format::hex)` (それ以外)                  |
| g, G       | 値に応じて指数表記を使う  | `to_chars(first, last, value, chars_format::general, precision)` (精度が指定されたとき)<br/>`to_chars(first, last, value, chars_format::general, 6)` (それ以外)       |

デフォルトは `g`。

大文字のオプションを指定すると数値中のアルファベットが大文字になる。

「値に応じて」の詳細や、精度の意味については[`to_chars`](/reference/charconv/to_chars.md)を参照。

代替表現を指定すると、小数点以下が何もなくても小数点記号を出力する。`g`/`G`の場合は、代替表現を指定しないかぎり末尾の0およびそれによって不要になる小数点を出力しない。

#### ポインタの場合

| type | 意味               | 効果                                                                                              | 対応バージョン |
|:-----|:-------------------|:--------------------------------------------------------------------------------------------------|----------------|
| p    | アドレスを出力する | `0x` につづいて、`to_chars(first, last, reinterpret_cast<uintptr_t>(value), 16)` の結果を出力する | C++20 |
| P    | アドレスを出力する | pと基本的に同じだが、9を超える桁を大文字(A～F)にし、先頭に`0X`をつける | C++26 |

デフォルトは `p`。

ポインタは`void*`のみサポートする。それ以外のポインタは、`void*`にキャストしなければ出力できない。

#### アライメントの詳細

指定した幅が必要な幅より小さい場合や、幅を省略している場合はアライメントは無効となる。

アライメントにおいて、一部の文字は大きな幅を持っているとみなされる。

UTF-8・UTF-16・UTF-32の文字のシーケンスの場合、その幅はUnicode標準 UAX #29 で定める拡張書記素クラスタの幅の合計となる。

以下の文字は2文字分の幅を持つ。

- UAX #44 の規定に従って、`East_Asian_Width` が `W` (Wide)または `F` (Fullwidth)であるコードポイント
- `U+4DC0` - `U+4DFF` (Yijing Hexagram Symbols)
- `U+1F300` - `U+1F5FF` (Miscellaneous Symbols and Pictographs)
- `U+1F900` - `U+1F9FF` (Supplemental Symbols and Pictographs)

それ以外のコードポイントの幅は1である。

UTF-8・UTF-16・UTF-32以外の文字のシーケンスの幅は未規定。

アライメントに使用する文字は、常に幅1として扱われる。

```cpp
std::format("{:*>6}", "あ"); // "****あ"
std::format("{:あ>6}", 'x'); // "あああああx"
```

アライメント方向が指定されていると、0埋めは無効となる。

```cpp
// 0埋めは符号を考慮する
std::format("{:05}", 42);    // "00042"
std::format("{:+05}", 42);   // "+0042"
std::format("{: 05}", 42);   // " 0042"

// アライメントは符号を考慮しない
std::format("{:0>5}", 42);   // "00042"
std::format("{:0>+5}", 42);  // "00+42"
std::format("{:0> 5}", 42);  // "00 42"

// 0埋めも指定しているが、アライメント方向が指定されているのでアライメントが優先される
std::format("{:0>05}", -42);  // "00-42"
```

#### <a id="range-format-options" href="#range-format-options">Range・シーケンスコンテナの書式 (C++23)</a>

Range・シーケンスコンテナのフォーマットでは、要素の間に区切り文字を挿入して、全体を囲み文字で囲んで出力する。各要素は再帰的にフォーマットされる。

```cpp
std::format("{}", std::vector<int>{1, 2, 3}); // "[1, 2, 3]"
```

Range・シーケンスコンテナに対して使用できる標準のオプション書式は次の通り(`[]`は省略可の意味)。

```
[[fill] align] [width] [n] [range-type] [: range-underlying-spec]
```

* `fill` : アライメントに使う文字 (デフォルト: スペース)
* `align` : アライメント(デフォルトは型による)
    * `>` : 右寄せ
    * `<` : 左寄せ
    * `^` : 中央寄せ
* `width` : 幅 (省略時は値に応じて幅が決まり、アライメントは機能しない)
    * 置換フィールドを使って変数で指定できる
* `n` : 囲み文字をなくす
* `range-type` : Range・コンテナの表現方法(表を参照)
* `range-underlying-spec` : 要素の書式 (この上にある表を参照)

| range-type | 意味 | 効果 | 対応バージョン |
|------------|------|------|----------------|
| m    | `std::map`出力向けの書式 | 全体の囲み文字を`[ ]`の代わりに`{ }`とする。要素型にも`m`書式を適用する | C++23 |
| s    | 文字列として出力 | 要素型が文字型であること。エスケープ処理しない文字列として書式化する | C++23 |
| ?s   | デバッグ文字列として出力 | 要素型が文字型であること。エスケープした文字列として書式化する | C++23 |
| (なし) | デフォルト | 囲み文字を`[ ]`、区切り文字を`, `として書式化する | C++23 |

- `m`書式は、要素が[`std::pair`](/reference/utility/pair.md)とサイズ2の[`std::tuple`](/reference/tuple/tuple.md)の場合のみ指定できる
- `?s`書式を指定した場合、`n`オプションと、`range-underlying-spec`は指定できない
- コンテナが[`std::vector`](/reference/vector/vector.md)`<bool>`である場合、その要素型は`bool`として処理される
- Range・シーケンスコンテナでは、要素型がデバッグ出力可能である場合、それがデフォルトで有効となる
    - 要素型の書式を指定して、デバッグ出力指定をしなければ、デフォルトで有効になっているデバッグ出力を解除できる
- コンテナアダプタである[`std::queue`](/reference/queue/queue.md)、[`std::priority_queue`](/reference/queue/priority_queue.md)、[`std::stack`](/reference/stack/stack.md)も使用できる
- [`std::basic_string`](/reference/string/basic_string.md)と[`std::basic_string_view`](/reference/string_view/basic_string_view.md)はRangeでもあるが、特殊化の優先順位によって標準のフォーマッターが選択されるため、Rangeとしてフォーマットすることはできない
- デフォルト書式に対応する`type`がないため、明示的に指定することはできない

#### <a id="assoc-format-options" href="#assoc-format-options">連想コンテナの書式 (C++23)</a>

Range・シーケンスコンテナと同じだが、デフォルトで囲み文字を`{ }`とする。

- メンバ型`key_type`を持つ場合、連想コンテナとみなされる
- さらに、メンバ型`mapped_type`を持ち、要素が[`std::pair`](/reference/utility/pair.md)またはサイズ2の[`std::tuple`](/reference/tuple/tuple.md)の場合、`map`互換のコンテナとみなされる。このとき、要素にも`m`書式を用いる

```cpp
std::map<int, std::string> m {{1, "aaa"}, {2, "bbb"}};
std::format("{}", m); // {1: "aaa", 2: "bbb"}
```

#### <a id="tuple-format-options" name="#tuple-format-options">pair、tupleの書式 (C++23)</a>

[`std::pair`](/reference/utility/pair.md)と[`std::tuple`](/reference/tuple/tuple.md)に対して使用できる標準のオプション書式は次の通り(`[]`は省略可の意味)。

```
[[fill] align] [width] [tuple-type]
```

* `fill` : アライメントに使う文字 (デフォルト: スペース)
* `align` : アライメント(デフォルトは型による)
    * `>` : 右寄せ
    * `<` : 左寄せ
    * `^` : 中央寄せ
* `width` : 幅 (省略時は値に応じて幅が決まり、アライメントは機能しない)
    * 置換フィールドを使って変数で指定できる
* `n` : 囲み文字をなくす
* `tuple-type` : `pair`と`tuple`の表現方法(表を参照)

| type   | 意味 | 効果 | 対応バージョン |
|--------|------|------|----------------|
| m      | `std::map`出力向けの`pair`書式 | `pair{1, 2}`を`1: 2`のように囲み文字なし、区切り文字列を`": "`となる。要素数が2であること | C++23 |
| n      | 囲み文字をなくす | `tuple{3, 1.23, "hello"}`は`3, 1.23, "hello"`となる | C++23 |
| (なし) | デフォルト | `tuple{3, 1.23, "hello"}`は`(3, 1.23, "hello")`となる | C++23 |

- 要素型ごとに個別に書式を指定することはできない
- デバッグ出力可能な要素型の場合、デバッグ出力は常に有効
- デフォルト書式に対応する`type`がないため、明示的に指定することはできない

### 書式例

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
format("{:L}", 1234.5678);             // "1,234.5678" (ロケールによる)
```

### コンパイル時の書式文字列チェック

書式文字列は、[`basic_format_string`](basic_format_string.md)クラスによってコンパイル時にチェックされる。

[`basic_format_string`](basic_format_string.md) のコンストラクタは[即時関数](/lang/cpp20/immediate_functions.md)であり、書式文字列が正しい場合にのみ定数式として評価できるように実装される。即時関数であるため、定数式として評価できない場合はエラーとなる。

書式文字列チェックをエラーがあった場合に例外を投げるような実装をすれば、`throw`は定数式として評価できないため、コンパイルエラーとすることが可能である。


## 適格要件

* 書式文字列は定数式であり、[`string_view`](/reference/string_view/basic_string_view.md)(ワイド文字列版は[`wstring_view`](/reference/string_view/basic_string_view.md))に暗黙変換できること。
* 書式文字列にエラーがないこと。例えば、
    * 閉じていないカッコなどの構文エラーがないこと。
    * 実際に渡している引数の型が、書式文字列中の置換フィールドに要求される型と合うこと。

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
    * ユーザー定義フォーマッターで拡張することは可能。ただし、ユーザー定義の名前に依存しない特殊化は`std`名前空間に追加できない。
* `format`の結果は一部[`to_chars`](/reference/charconv/to_chars.md)によって定義されているが、[`to_chars`](/reference/charconv/to_chars.md)自体はワイド文字列に対応していない。
    * もし何らかの手段でマルチバイト文字列に変換すれば、[`to_chars`](/reference/charconv/to_chars.md)に一致する、と解釈できる。

## 例
### 基本的な使い方 (C++20)
```cpp example
#include <iostream>
#include <format>

int main()
{
  std::cout << std::format("The answer is {}.", 42) << std::endl;
}
```

#### 出力
```
The answer is 42.
```

### 文字・文字列を出力する (C++23)
```cpp example
#include <iostream>
#include <format>

int main() {
  // デフォルトの文字列出力。
  // 引用符で囲まれず「hello」が出力される
  std::cout << std::format("0. {}", "hello") << std::endl;

  // デバッグ出力 (C++23)。
  // 引用符で囲まれ「"hello"」が出力される
  std::cout << std::format("1. {:?}", "hello") << std::endl;

  // エスケープシーケンスを含む文字列をデフォルト出力。
  // エスケープシーケンスが処理され、以下のように出力される：
  // hello
  // world
  std::cout << std::format("2. {}", "hello\nworld") << std::endl;

  // エスケープシーケンスを含む文字列をデバッグ出力 (C++23)。
  // エスケープシーケンスがエスケープされて以下のように出力される：
  // "hello\nworld"
  std::cout << std::format("3. {:?}", "hello\nworld") << std::endl;
}
```

#### 出力
```
0. hello
1. "hello"
2. hello
world
3. "hello\nworld"
```

### コンテナ・Rangeを出力する (C++23)
```cpp example
#include <iostream>
#include <format>
#include <vector>
#include <map>
#include <set>
#include <ranges>

int main() {
  std::vector<int> vi = {1, 2, 3};
  std::vector<std::string> vs = {"aaa", "bbb", "ccc"};
  std::map<int, std::string> m {{1, "aaa"}, {2, "bbb"}};
  std::set<int> s = {1, 2, 3};
  auto r = std::ranges::views::iota(1, 5);

  std::cout << std::format("0. {}", vi) << std::endl;
  std::cout << std::format("1. {}", vs) << std::endl;
  std::cout << std::format("2. {}", m) << std::endl;
  std::cout << std::format("3. {}", s) << std::endl;
  std::cout << std::format("4. {}", r) << std::endl;

  // Rangeの書式指定のあと、:で区切って要素に対する書式指定ができる (ここでは16進数出力)
  std::vector<int> vx = {0xf, 0x1e, 0x3c};
  std::cout << std::format("5. {::#x}", vx) << std::endl;

  // vector<vector<T>>の場合は、:で区切られた要素の書式がRangeの書式となり、
  // さらに :で区切って要素の書式指定をする
  std::vector<std::vector<int>> vvx = {{0xf, 0x1e}, {0x3c}};
  std::cout << std::format("6. {:::#x}", vvx) << std::endl;

  // コンテナの要素型が文字・文字列型の場合はデフォルトでデバッグ出力 (?) が適用されるが、
  // 要素への書式指定として ? を指定しなければ、デバッグ出力が解除される
  std::vector<std::string> vt = {"h\tello", "w\norld", "C++"};
  std::cout << std::format("7. {:}", vt) << std::endl;
  std::cout << std::format("8. {::}", vt) << std::endl;

  // 文字を要素とするコンテナは文字列として出力させることもできる
  std::vector<char> vc = {'h', '\n', 'e', 'l', 'l', 'o'};
  std::cout << std::format("9. {:s}", vc) << std::endl;
  std::cout << std::format("10. {:?s}", vc) << std::endl;
}
```
* std::ranges::views::iota[link /reference/ranges/iota_view.md]

#### 出力
```
0. [1, 2, 3]
1. ["abc", "bbb", "ccc"]
2. {1: "aaa", 2: "bbb"}
3. {1, 2, 3}
4. [1, 2, 3, 4]
5. [0xf, 0x1e, 0x3c]
6. [[0xf, 0x1e], [0x3c]]
7. ["h\tello", "w\norld", "C++"]
8. [h    ello, w
orld, C++]
9. h
ello
10. "h\nello"
```

### pair、tupleを出力する (C++23)
```cpp example
#include <iostream>
#include <format>
#include <utility>
#include <tuple>

int main()
{
  std::cout << std::format("{}", std::tuple{3, 1.23, "hello"}) << std::endl;
  std::cout << std::format("{}", std::pair{3, "hello"}) << std::endl;
}
```

#### 出力
```
(3, 1.23, "hello")
(3, "hello")
```

### コンテナアダプタを出力する (C++23)
```cpp example
#include <iostream>
#include <format>
#include <queue>
#include <stack>
#include <flat_map>
#include <flat_set>

int main()
{
  std::queue<int> que;
  que.push(1);
  que.push(2);
  que.push(3);

  std::priority_queue<int> pque;
  pque.push(1);
  pque.push(2);
  pque.push(3);

  std::stack<int> st;
  st.push(1);
  st.push(2);
  st.push(3);

  std::flat_map<int, std::string> m {{1, "aaa"}, {2, "bbb"}};
  std::flat_set<int> s = {1, 2, 3};

  // queue/priority_queue/stackは、内部で使用しているコンテナと同じ扱い
  std::cout << std::format("queue: {}", que) << std::endl;
  std::cout << std::format("priority_queue: {}", pque) << std::endl;
  std::cout << std::format("stack: {}", st) << std::endl;

  // flat_map/flat_setはmap/setと同じ扱い
  std::cout << std::format("flat_map: {}", m) << std::endl;
  std::cout << std::format("flat_set: {}", s) << std::endl;
}
```
* std::queue[link /reference/queue/queue.md]
* que.push[link /reference/queue/queue/push.md]
* std::priority_queue[link /reference/queue/priority_queue.md]
* pque.push[link /reference/queue/priority_queue/push.md]
* std::stack[link /reference/stack/stack.md]
* st.push[link /reference/stack/stack/push.md]
* std::flat_map[link /reference/flat_map/flat_map.md]
* std::flat_set[link /reference/flat_set/flat_set.md]

#### 出力
```
[1, 2, 3]
[3, 2, 1]
[1, 2, 3]
{1: "aaa", 2: "bbb"}
{1, 2, 3}
```

### `vector<bool>`を出力する (C++23)
```cpp example
#include <iostream>
#include <format>
#include <vector>

int main()
{
  // vector<bool>は1要素あたり1bitのみ領域を使用するよう特殊化されている。
  // しかし、出力としては通常のbool配列と同様になるようformatterが特殊化されている
  std::vector<bool> v = {true, false, true};

  std::cout << std::format("{}", v) << std::endl;
}
```

#### 出力
```
[true, false, true]
```


### ログ出力の例 (C++23)
```cpp
#include <iostream>
#include <format>
#include <chrono>

// コンパイルフラグによって無効化できるログ出力関数
template <typename... Args>
void debug_log(std::format_string<Args...> s, Args&&... args) {
#if defined(DISABLE_DEBUG_LOG)
    return;
#else
  namespace chrono = std::chrono;
  auto now = chrono::floor<chrono::seconds>(chrono::system_clock::now());
  std::cout << std::format("{}: {}",
    chrono::zoned_time{"Asia/Tokyo", now},
    std::format(s, std::forward<Args>(args)...)
  ) << std::endl;
#endif
}

int main()
{
  debug_log("Hello {} World", 42);
}
```
* std::format_string[link /reference/format/basic_format_string.md]
* chrono::system_clock[link /reference/chrono/system_clock.md]
* now[link /reference/chrono/system_clock/now.md]
* chrono::floor[link /reference/chrono/time_point/floor.md]
* chrono::seconds[link /reference/chrono/duration_aliases.md]
* chrono::zoned_time[link /reference/chrono/zoned_time.md]
* std::forward[link /reference/utility/forward.md]

#### 出力
```
2023-02-06 10:46:53: Hello 42 World
```


### 実行時文字列を書式文字列として使用する (C++26)
```cpp example
#include <iostream>
#include <format>

int main()
{
  std::string fmt = "{}";
  std::string s = std::format(std::runtime_format(fmt), "Hello");

  std::cout << s << std::endl;
}
```
* std::runtime_format[link runtime_format.md]

#### 出力
```
Hello
```


## 実装例
```cpp
template<class... Args>
string format(format_string<Args...> fmt, const Args&... args)
{
  return vformat(fmt.get(), make_format_args(args...));
}

template<class... Args>
wstring format(wformat_string<Args...> fmt, const Args&... args)
{
  return vformat(fmt.get(), make_wformat_args(args...));
}

template<class... Args>
string format(const locale& loc, format_string<Args...> fmt, const Args&... args)
{
  return vformat(loc, fmt.get(), make_format_args(args...));
}

template<class... Args>
wstring format(const locale& loc, wformat_string<Args...> fmt, const Args&... args)
{
  return vformat(loc, fmt.get(), make_wformat_args(args...));
}
```
* string[link /reference/string/basic_string.md]
* wstring[link /reference/string/basic_string.md]
* format_string[link basic_format_string.md]
* wformat_string[link basic_format_string.md]
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
- [GCC](/implementation.md#gcc): 13 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`<print>`](/reference/print.md)
    - [`std::print()`](/reference/print/print.md)
    - [`std::println()`](/reference/print/println.md)
- [`<ostream>`](/reference/ostream.md)
    - [`std::print()`](/reference/ostream/print.md)
    - [`std::println()`](/reference/ostream/println.md)
- [`std::runtime_format()`](runtime_format.md)


## 参照
- [Working Draft, Standard for Programming Language C++ [format]](https://timsong-cpp.github.io/cppwp/format)
- [P0645R10 Text Formatting](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0645r10.html)
- [P1652R1 Printf corner cases in std::format](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1652r1.html)
- [P2216R3 std::format improvements](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2216r3.html)
- [［C++］ std::formatあるいは{fmt}のコンパイル時フォーマット文字列チェックの魔術 - 地面を見下ろす少年の足蹴にされる私](https://onihusube.hatenablog.com/entry/2021/07/01/195912)
- [P2286R8 Formatting Ranges](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2286r8.html)
    - C++23から、Range・コンテナ、`pair`、`tuple`のフォーマット出力、および文字・文字列のデバッグ指定 (`"?"`) が追加された
- [P2418R2 Add support for `std::generator`-like types to `std::format`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2418r2.html)
- [P2510R3 Formatting pointers](https://open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2510r3.pdf)
    - C++26から、ポインタ値を大文字で出力する`P`オプションが追加された
