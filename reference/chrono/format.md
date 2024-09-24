# format
* chrono[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  // 追加宣言なし
}
```

## 概要
chronoライブラリのクラスオブジェクトに対する文字列フォーマット。

ここでは宣言はとくにないが、[`std::format()`](/reference/format/format.md)に対してchronoライブラリの各クラスオブジェクトを出力できるよう[`std::formatter`](/reference/format/formatter.md)クラスが各クラスで特殊化されている。


## フォーマット構文
```
chrono-format-spec:
  fill-and-align(opt) width(opt) precision(opt) L(opt) chrono-specs(opt)
```

- `fill` (省略可) : アライメントに使う文字 (デフォルト：スペース)
- `align` (省略可) : アライメント
    - `>` : 右寄せ
    - `<` : 左寄せ
    - `^` : 中央寄せ
- `width` (省略可) : 幅 (省略時は値に応じて幅が決まり、アライメントは機能しない)
- `precision` (省略可) : 精度(浮動小数点数の場合)、使う文字数(文字列の場合)
- `L` (省略可) : この関数に指定されたロケールを使用し、指定されなければグローバルロケールを使用する。省略された場合はCロケールを使用する


### chronoライブラリでのフォーマットフラグ

[`std::format()`](/reference/format/format.md)関数の通常の指定では、置換フィールド`{}`内に基数、精度、0埋め指定、アライメントなどを指定する。

chronoライブラリではこれに加え、たとえばデフォルトでは年・月・日を出力する[`year_month_day`](year_month_day.md)クラスに対して「`"年/月"`」というフォーマットで出力するよう`"{%Y/%m}"`のように指定することでデフォルトとは異なる出力をさせることができる。

| フォーマットフラグ | 説明 | 例 |
|--------------------|------|----|
| `%a` | ロケール依存の曜日の略称。<br/> 値に有効な曜日が含まれていない場合、[`std::format_error`](/reference/format/format_error.md)例外を送出する | `"Fri"`, `"金"` |
| `%A` | ロケール依存の曜日の完全名。<br/> 値に有効な曜日が含まれていない場合、[`std::format_error`](/reference/format/format_error.md)例外を送出する | `"Friday"`, `"金曜日"` |
| `%b` | ロケール依存の月の略称。<br/> 値に有効な月が含まれていない場合、[`std::format_error`](/reference/format/format_error.md)例外を送出する | `"Apr"`, `"4月"` |
| `%B` | ロケール依存の月の完全名。<br/> 値に有効な月が含まれていない場合、[`std::format_error`](/reference/format/format_error.md)例外を送出する | `"April"`, `"4月"` |
| `%c` | ロケール依存の日付・時間の表現。改良コマンド`%Ec`を指定すると、異なる表現を出力する | `"Fri Apr 24 17:14:44 2020"`<br/> `"2020年04月24日 17時14分44秒"` |
| `%C` | 100で切り下げ除算した年 (世紀)。結果が10進数で1桁の場合、先頭に`0`がつく。改良コマンド`%EC`を指定すると、ロケール依存の世紀の異なる表現を出力する | 2020年では`"20"`) |
| `%d` | 10進数での月の日。結果が10進数で1桁の場合、先頭に`0`がつく。改良コマンド`%Od`を指定すると、ロケール依存の異なる表現を出力する | `"24"` |
| `%D` | `%m/%d/%y`と等価 | `"04/24/20"` |
| `%e` | 10進数での月の日。結果が10進数で1桁の場合、先頭にスペースがつく。改良コマンド`%Oe`を指定すると、ロケール依存の異なる表現を出力する | `" 1"` |
| `%F` | `%Y-%m-%d`と等価 | `"2020-04-24"` |
| `%g` | ISOの週ベースのうしろ2桁10進数の年。結果が1桁の場合、先頭に`0`がつく | `"20"` |
| `%G` | ISOの週ベースの10進数の年。結果が4桁未満の場合、4桁になるよう左が`0`で埋められる | `"2020"` |
| `%h` | `%b`と等価 | `"Jan"`, `"4月"` |
| `%H` | 24時間時計での10進数の時。結果が1桁の場合、先頭に`0`がつく。改良コマンド`%OH`を指定知ると、ロケール依存の異なる表現を出力する | `"17"` |
| `%I` | 12時間時計での10進数の時。結果が1桁の場合、先頭に`0`がつく。改良コマンド`%OI`を指定知ると、ロケール依存の異なる表現を出力する | `"05"` |
| `%j` | 10進数での年の日。1月1日は`001`が出力される。結果が3桁未満の場合、3桁になるよう左が`0`で埋められる。[`duration`](duration.md)の特殊化が与えられた場合、[`days`](duration_aliases.md)の10進数値として0埋めなしで書式化される | `"115"` |
| `%m` | 10進数での月。1月は`01`が出力される。結果が1桁の場合、先頭に`0`がつく。改良コマンド`%Om`を指定すると、ロケール依存の異なる表現を出力する | `"04"` |
| `%M` | 10進数での分。結果が1桁の場合、先頭に`0`がつく。改良コマンド`%OM`を指定すると、ロケール依存の異なる表現を出力する | `"14"` |
| `%n` | 改行文字 | |
| `%p` | 12時間時計でのロケール依存の午前・午後の表現 | `"PM"`, `"午後"` |
| `%q` | [`duration`](duration.md)単位ごとのサフィックス。[`duration`](duration.md)の[`operator<<`](duration/op_ostream.md)で出力されるサフィックスと等価 | `"s"` |
| `%Q` | [`duration`](duration.md)の数値。[`.count()`](duration/count.md)で取得した値 | `"44"` |
| `%r` | 12時間時計でのロケール依存の時間 | `"05:14:44 PM"`<br/> `"午後05時14分44秒"` |
| `%R` | `%H:%M`と等価 | `"17:14"` |
| `%S` | 10進数での秒。10秒未満の場合、先頭に`0`がつく。入力が秒の精度と正確に一致しない場合、浮動小数点フォーマットで出力される。10進数の浮動小数点数で小数点以下18桁以内で表現できない場合、マイクロ秒で出力される。改良コマンド`%OS`を指定すると、ロケール依存の異なる表現を出力する | `"44"`<br/> `"44.123"` |
| `%t` | 水平タブ文字 | |
| `%T` | `%H:%M:%S`と等価 | `"17:14:44.123"` |
| `%u` | 10進数での月曜を1とするISO曜日番号 (1-7)。改良コマンド`%Ou`を指定すると、ロケール依存の異なる表現を出力する | `"5"` |
| `%U` | 10進数での年の週番号。年の最初の日曜日が最初の曜日であるとして`01`、同年のそれより前の日は`00`となる。結果が1桁の場合、先頭に`0`がつく。改良コマンド`%OU`を指定すると、ロケール依存の異なる表現を出力する | `"16"` |
| `%V` | 10進数でのISO週ベースの週番号。結果が1桁の場合、先頭に`0`がつく。改良コマンド`%OV`を指定すると、ロケール依存の異なる表現を出力する | `"17"` |
| `%w` | 10進数での日曜を0とする曜日番号 (0-6)。改良コマンド`%Ow`を指定すると、ロケール依存の異なる表現を出力する | `"5"` |
| `%W` | 10進数での年の週番号。年の最初の月曜日が最初の曜日であるとして`01`、同年のそれより前の日は`00`となる。結果が1桁の場合、先頭に`0`がつく。改良コマンド`%OW`を指定すると、ロケール依存の異なる表現を出力する | `"16"` |
| `%x` | ロケール依存の日付表現。改良コマンド`%Ex`を指定すると、ロケール依存の異なる表現が出力される | `"04/24/20"` |
| `%X` | ロケール依存の時間表現。改良コマンド`%EX`を指定すると、ロケール依存の異なる表現が出力される | `"17:14:44"`<br/> `"17時14分44秒"` |
| `%y` | 10進数での年のうしろ2桁。結果が1桁の場合、先頭に`0`がつく。改良コマンド`%Oy`を指定すると、ロケール依存の異なる表現を出力する。改良コマンド`%Ey`を指定すると、`%EC`からのオフセットとしてロケール依存の異なる表現を出力する。 | `"20"`<br/> `%Ey`では`"02"` |
| `%Y` | 10進数での年。結果が4桁未満の場合、4桁になるよう左が`0`で埋められる。改良コマンド`%EY`を指定すると、ロケール依存の異なる表現の完全な年を出力する | `"2020"` |
| `%z` | ISO 8601フォーマットでのUTCからのオフセット。例として`-0430`はUTCから4時間30分遅れていることを表す。オフセットがゼロの場合は`+0000`が使用される。改良コマンド`%Ez`と`%Oz`を指定すると、時と分の間にコロン (`:`) が挿入される。オフセット情報が利用可能でない場合、[`std::format_error`](/reference/format/format_error.md)例外を送出する | `"+0900"`<br/>`%Ez`では`"+09:00"` |
| `%Z` | タイムゾーンの略称。タイムゾーンの略称が利用可能でない場合、[`std::format_error`](/reference/format/format_error.md)例外を送出する | `"JST"` |
| `%%` | 文字`%` | `"%"` |

- 便宜上のリテラルキャスト`STATICALLY-WIDEN`を導入する。`STATICALLY-WIDEN<charT>("...")`は、`charT`が`char`である場合は`"..."`、`charT`が`wchar_t`である場合は`L"..."`を意味する。
- [`hh_mm_ss`](hh_mm_ss.md)オブジェクトの[`is_negative()`](hh_mm_ss/is_negative.md)が`true`である場合、出力される文字列の先頭に`STATICALLY-WIDEN<charT>("-")`が挿入される

## 例外
- 指定されたフォーマットフラグに必要な情報が含まれていない場合、[`format_error`](/reference/format/format_error.md)例外が送出される (例として、[`duration`](duration.md)には曜日をフォーマットするために必要な情報が含まれていない)
    - ただし、フラグが時刻に関するもの (`%H`, `%I`, `%p`など) である場合、`duration`の特殊化は深夜0時からの経過した時刻として解釈する


## 例
```cpp example
#include <iostream>
#include <format>
#include <chrono>

int main()
{
  auto now = std::chrono::system_clock::now(); // UTC時間の現在日時

  // 日付を出力
  std::cout << std::format("1. {:%Y年%m月%d日}", now) << std::endl;

  // 時間を出力。
  // 秒単位のtime_pointに変換しないと、小数点以下の秒も出力される
  auto now_sec = std::chrono::time_point_cast<std::chrono::seconds>(now);
  std::cout << std::format("2. {:%H時%M分%S秒}", now) << std::endl;
  std::cout << std::format("3. {:%H時%M分%S秒}", now_sec) << std::endl;
  std::cout << std::format("4. {:%p %I時%M分%S秒}", now_sec) << std::endl;
  std::cout << std::format("4. {:%p %I時%M分%S秒}", now_sec) << std::endl;

  // その他要素
  std::cout << std::format("6. {:%C}", now) << std::endl; // 世紀 (100で割って切り下げた値)
  std::cout << std::format("7. {:%a}", now) << std::endl; // 曜日の略称
  std::cout << std::format("8. {:%A}", now) << std::endl; // 曜日の完全名
}
```
* std::chrono::system_clock[link /reference/chrono/system_clock.md]
* now()[link /reference/chrono/system_clock/now.md]
* std::chrono::time_point_cast[link /reference/chrono/time_point_cast.md]

### 出力例
```
1. 2024年09月24日
2. 08時27分28.1822610秒
3. 08時27分28秒
4. AM 08時27分28秒
6. 20
7. Tue
8. Tuesday
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 17 [mark mark verified]
- [GCC](/implementation.md#gcc): 13 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]


## 参照
- [P1361R2 Integration of chrono with text formatting](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1361r2.pdf)
- [LWG Issue 3262. Formatting of negative durations is not specified](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p2117r0.html#3262)
- [LWG Issue 3230. Format specifier `%y`/`%Y` is missing locale alternative versions](https://wg21.cmeerw.net/lwg/issue3230)
- [LWG Issue 3262. Formatting of negative durations is not specified](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p2117r0.html#3262)
- [LWG Issue 3270. Parsing and formatting `%j` with `duration`s](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p2117r0.html#3270)
- [LWG Issue 3272. `%I``%p` should `parse`/`format` `duration` since midnight](https://wg21.cmeerw.net/lwg/issue3272)
- [P2372R1 Fixing locale handling in chrono formatters](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2372r1.html)
    - この提案文書はC++20の策定後に採択されたが、実装が追いついていない時期の採択だったために、C++20の仕様として扱われる

