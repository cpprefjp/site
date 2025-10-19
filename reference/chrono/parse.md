# parse
* chrono[meta header]
* std::chrono[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  template <class charT, class traits, class Alloc, class Parsable>
  unspecified
    parse(const std::basic_string<charT, traits, Alloc>& fmt,
          Parsable& tp);                                      // (1) C++20

  template <class charT, class traits, class Alloc, class Parsable>
  unspecified
    parse(const std::basic_string<charT, traits, Alloc>& fmt,
          Parsable& tp,
          std::basic_string<charT, traits, Alloc>& abbrev);   // (2) C++20

  template <class charT, class traits, class Alloc, class Parsable>
  unspecified
    parse(const std::basic_string<charT, traits, Alloc>& fmt,
          Parsable& tp,
          minutes& offset);                                   // (3) C++20

  template <class charT, class traits, class Alloc, class Parsable>
  unspecified
    parse(const std::basic_string<charT, traits, Alloc>& fmt,
          Parsable& tp,
          std::basic_string<charT, traits, Alloc>& abbrev,
          minutes& offset);                                   // (4) C++20
}
```
* unspecified[italic]

## 概要
日時文字列を解析する入力マニピュレータ。

- (1) タイムゾーン関係の入力を受け取らない単純な解析を行う
- (2) chronoオブジェクトと、タイムゾーンの略称を解析する
- (3) chronoオブジェクトと、UTCタイムゾーンからのオフセット時間を解析する
- (4) chronoオブジェクトと、タイムゾーンの略称、UTCタイムゾーンからのオフセット時間を解析する

`fmt`パラメータに指定できるフォーマットフラグは、以下である。`N`として10進整数を指定できる場合があり、それを指定することでより多くの文字数を読み込める。

| フォーマットフラグ | 説明 | 例 |
|--------------------|------|----|
| `%a` | ロケール依存の曜日の完全名もしくは略称 (大文字・小文字を区別しない) | `"Sun"`<br/> 日本のロケールでは`"日"` |
| `%A` | `%a`と等価 | |
| `%b` | ロケール依存の月の完全名もしくは略称 (大文字・小文字を区別しない) | `"Apr"`<br/> `"April"`<br/> 日本のロケールでは`"4月"` |
| `%B` | `%b`と等価 | |
| `%c` | ロケール依存の日付・時間の表現。改良コマンド`%Ec`を指定すると、異なる表現になる | `"Fri Apr 24 17:14:44 2020"`<br/> 日本のロケールでは`"2020年04月24日 17時14分44秒"`<br/> `%Ec`では`"令和02年04月24日 17時14分44秒"` |
| `%C` | 世紀の10進数番号。改良コマンド`%NC` (Nは10進整数) によって読み込む最大の文字数を指定できる。Nを指定しない場合、デフォルトは2。先頭の0は許可されるが要求はされない。改良コマンド`%EC`はロケール依存の異なる表現になる | `"21"`<br/> `%EC`では元号`"令和"` |
| `%d` | 10進数の月の日。改良コマンド`%Nd` (Nは10進整数) によって読み込む最大の文字数を指定できる。Nを指定しない場合、デフォルトは2。先頭の0は許可されるが要求はされない。改良コマンド`%Od`はロケール依存の異なる表現になる | `"4"` |
| `%D` | `%m/%d/%y`と等価 | `"04/01/2020"` |
| `%e` | `%d`と等価で、`%d`と同様の改良コマンドが使用できる | |
| `%F` | `%Y-%m-%d`と等価。`%NF` (Nは10進整数) を指定した場合、幅は`%Y`にのみ適用される | `"2020-04-24"` |
| `%g` | ISOの週ベースのうしろ2桁10進数の年。改良コマンド`%Ng` (Nは10進整数) によって読み込む最大の文字数を指定できる。Nを指定しない場合、デフォルトは2。先頭の0は許可されるが要求はされない。 | `"20"` |
| `%G` | ISOの週ベースの10進数の年。改良コマンド`%NG` (Nは10進整数) によって読み込む最大の文字数を指定できる。Nを指定しない場合、デフォルトは4。先頭の0は許可されるが要求はされない。 | `"2020"` |
| `%h` | `%b`と等価 | |
| `%H` | 24時間時計での10進数の時。改良コマンド`%NH` (Nは10進整数) によって読み込む最大の文字数を指定できる。Nを指定しない場合、デフォルトは2。先頭の0は許可されるが要求はされない。改良コマンド`%OH`はロケール依存の異なる表現になる | `"17"` |
| `%I` | 12時間時計での10進数の時。改良コマンド`%NI` (Nは10進整数) によって読み込む最大の文字数を指定できる。Nを指定しない場合、デフォルトは2。先頭の0は許可されるが要求はされない。改良コマンド`%OI`はロケール依存の異なる表現になる | `"05"` |
| `%j` | 10進数での年の日。1月1日は`001`。改良コマンド`%Nj` (Nは10進整数) によって読み込む最大の文字数を指定できる。Nを指定しない場合、デフォルトは3。先頭の0は許可されるが要求はされない。[`duration`](duration.md)の特殊化が与えられた場合、[`days`](duration_aliases.md)の10進数値として解析される | `"115"` |
| `%m` | 10進数での月。1月は`01`。改良コマンド`%Nm` (Nは10進整数) によって読み込む最大の文字数を指定できる。Nを指定しない場合、デフォルトは2。先頭の0は許可されるが要求はされない。改良コマンド`%Om`はロケール依存の異なる表現になる | `"04"` |
| `%M` | 10進数での分。改良コマンド`%NM` (Nは10進整数) によって読み込む最大の文字数を指定できる。Nを指定しない場合、デフォルトは2。先頭の0は許可されるが要求はされない。改良コマンド`%OM`はロケール依存の異なる表現になる | `"14"` |
| `%n` | ひとつのホワイトスペース文字にマッチする。 | |
| `%p` | 12時間時計でのロケール依存の午前・午後の表現 | `"PM"`, `"午後"` |
| `%r` | 12時間時計でのロケール依存の時間 | `"05:14:44 PM"`<br/> `"午後05時14分44秒"` |
| `%R` | `%H:%M`と等価 | `"17:14"` |
| `%S` | 10進数での秒。改良コマンド`%NS` (Nは10進整数) によって読み込む最大の文字数を指定できる。Nが指定されず秒に変換可能な精度である場合、デフォルトは2。秒に変可能な精度でない場合は、デフォルトの幅は入力の10進精度によって決まり、フィールドは固定フォーマットの`long double`として解釈される。小数点はロケールによって決まる。先頭の0は許可されるが要求はされない。改良コマンド`%OS`はロケール依存の異なる表現になる。 | `"44"`<br/> `"44.123"` |
| `%t` | ゼロ個もしくはひとつのホワイトスペース文字にマッチする | |
| `%T` | `%H:%M:%S`と等価 | `"17:14:44.123"` |
| `%u` | 10進数での月曜を1とするISO曜日番号 (1-7)。改良コマンド`%Nu` (Nは10進整数) によって読み込む最大の文字数を指定できる。Nを指定しない場合、デフォルトは1。先頭の0は許可されるが要求はされない。改良コマンド`%Ou`はロケール依存の異なる表現になる | `"5"` |
| `%U` | 10進数での年の週番号。年の最初の日曜日が最初の曜日であるとして`01`、同年のそれより前の日は`00`となる。改良コマンド`%NU` (Nは10進整数) によって読み込む最大の文字数を指定できる。Nを指定しない場合、デフォルトは2。先頭の0は許可されるが要求はされない。 | `"16"` |
| `%V` | 10進数でのISO週ベースの週番号。改良コマンド`%NV` (Nは10進整数) によって読み込む最大の文字数を指定できる。Nを指定しない場合、デフォルトは2。先頭の0は許可されるが要求はされない。 | `"17"` |
| `%w` | 10進数での日曜を0とする曜日番号 (0-6)。改良コマンド`%Nw` (Nは10進整数) によって読み込む最大の文字数を指定できる。Nを指定しない場合、デフォルトは1。先頭の0は許可されるが要求はされない。改良コマンド`%Ow`はロケール依存の異なる表現になる | `"5"` |
| `%W` | 10進数での年の週番号。年の最初の月曜日が最初の曜日であるとして`01`、同年のそれより前の日は`00`となる。改良コマンド`%NW` (Nは10進整数) によって読み込む最大の文字数を指定できる。Nを指定しない場合、デフォルトは2。先頭の0は許可されるが要求はされない。改良コマンド`%OW`を指定はロケール依存の異なる表現になる | `"16"` |
| `%x` | ロケール依存の日付表現。改良コマンド`%Ex`はロケール依存の異なる表現になる| `"04/24/20"`<br/> `"2020年04月24日"`<br/> `%Ex`では`"令和02年04月24日"` |
| `%X` | ロケール依存の時間表現。改良コマンド`%EX`はロケール依存の異なる表現になる | `"17:14:44"`<br/> `"17時14分44秒"` |
| `%y` | 10進数での年のうしろ2桁。世紀が (`%C`などで) 指定されない場合、範囲`[69, 99]`は1969年から1999年を参照し、範囲`[00, 68]`は2000年から2068年を参照する。改良コマンド`%Ny` (Nは10進整数) によって読み込む最大の文字数を指定できる。Nを指定しない場合、デフォルトは2。先頭の0は許可されるが要求はされない。改良コマンド`%Ey`または`%Oy`はロケール依存の異なる表現になる。 | `"20"`<br/> `%Ey`では (元号ベースの下2桁年) `"02"` |
| `%Y` | 10進数での年。改良コマンド`%NY` (Nは10進整数) によって読み込む最大の文字数を指定できる。Nを指定しない場合、デフォルトは4。先頭の0は許可されるが要求はされない。改良コマンド`%EY`はロケール依存の異なる表現になる | `"2020"`<br/> `%EY`では`"令和02年"` |
| `%z` | `[+|-]hh[mm]`フォーマットでのUTCタイムゾーンからのオフセット時間 (`[ ]`カッコ内は省略可能)。例として`-0430`はUTCから4時間30分遅れていることを表す。 改良コマンド`%Ez`と`%Oz`は、時と分の間にコロン (`:`) が要求され、時の先頭のゼロは省略できる`[+|-]h[h][:mm]`フォーマットとなる。 | `"+0900"`<br/>`%Ez`では`"9"` |
| `%Z` | タイムゾーンの略称。単一の単語を解析する。この単語に含めることができるのは、基本文字集合の英数字または`'_'`, `'/'`, `'-'`, `'+'`の文字のみ。 | `"JST"`<br/> `"JST+0900"` |
| `%%` | 文字`%`を抽出する | `"%"` |


## テンプレートパラメータ制約
- (1) : `from_stream(`[`declval`](/reference/utility/declval.md)`<basic_istream<charT, traits>&>(), fmt.`[`c_str()`](/reference/string/basic_string/c_str.md)`, tp)`が評価されないオペランドとして扱われた場合に適格な式であること
- (2) : `from_stream(`[`declval`](/reference/utility/declval.md)`<basic_istream<charT, traits>&>(), fmt.`[`c_str()`](/reference/string/basic_string/c_str.md)`, tp,` [`addressof`](/reference/memory/addressof.md)`(abbrev))`が評価されないオペランドとして扱われた場合に適格な式であること
- (3) : 式`from_stream(`[`declval`](/reference/utility/declval.md)`<basic_istream<charT, traits>&>(), fmt.`[`c_str()`](/reference/string/basic_string/c_str.md)`, tp,` [`declval`](/reference/utility/declval.md)`<`[`basic_string`](/reference/string/basic_string.md)`<charT, traits, Alloc>*>(), &offset)`が評価されないオペランドとして扱われた場合に適格な式であること
- (4) : `from_stream(`[`declval`](/reference/utility/declval.md)`<basic_istream<charT, traits>&>(), fmt.`[`c_str()`](/reference/string/basic_string/c_str.md)`, tp,` [`addressof`](/reference/memory/addressof.md)`(abbrev), &offset)`が評価されないオペランドとして扱われた場合に適格な式であること


## 戻り値
- (1) : このマニピュレータは、[`basic_istream`](/reference/istream/basic_istream.md)`<charT, traits>`型オブジェクト`is`に対して`from_stream(is, fmt.`[`c_str()`](/reference/string/basic_string/c_str.md)`, tp)`を呼び出した結果の`is`を返す
- (2) : このマニピュレータは、[`basic_istream`](/reference/istream/basic_istream.md)`<charT, traits>`型オブジェクト`is`に対して`from_stream(is, fmt.`[`c_str()`](/reference/string/basic_string/c_str.md)`, tp,` [`addressof`](/reference/memory/addressof.md)`(abbrev))`を呼び出した結果の`is`を返す
- (3) : このマニピュレータは、[`basic_istream`](/reference/istream/basic_istream.md)`<charT, traits>`型オブジェクト`is`に対して`from_stream(is, fmt.`[`c_str()`](/reference/string/basic_string/c_str.md)`, tp, static_cast<`[`basic_string`](/reference/string/basic_string.md)`<charT, traits, Alloc>*>(nullptr), &offset)`を呼び出した結果の`is`を返す
- (4) : このマニピュレータは、[`basic_istream`](/reference/istream/basic_istream.md)`<charT, traits>`型オブジェクト`is`に対して`from_stream(is, fmt.`[`c_str()`](/reference/string/basic_string/c_str.md)`, tp,` [`addressof`](/reference/memory/addressof.md)`(abbrev), &offset)`を呼び出した結果の`is`を返す

以下、オーバーロード全体について、

- これらの関数をADL (引数依存の名前探索、argument dependent lookup) で呼び出すために、`from_stream`を修飾せずに呼び出している
- これらの関数は書式化されていない入力関数として動作するが ([`std::boolalpha`](/reference/ios/boolalpha.md), [`std::quoted`](/reference/iomanip/quoted.md)などの影響を受けない)、後続で呼び出された[`std::basic_istream`](/reference/istream/basic_istream.md)`<>::`[`gcount()`](/reference/istream/basic_istream/gcount.md)の戻り値に未規定の影響がある
- 概要欄に示したフォーマットフラグに含まれておらず、スペースを除くフォーマット文字列のすべての文字は、ストリームから変更されずに解析される
- スペース文字は、入力ストリーム内の「ゼロ個以上のスペース文字」と合致する
- 解析する`tp`の型が、フォーマットフラグの情報を表現できない場合、`is.`[`setstate`](/reference/ios/basic_ios/setstate.md)`(`[`ios_base::failbit`](/reference/ios/ios_base/type-iostate.md)`)`が呼び出される
    - 例として、[`duration`](duration.md)は[`weekday`](weekday.md)を表現できない
    - ただし、フォーマットフラグが時刻を表すものである場合 (`"%H"`, `"%I"`, `"%p"`など)、[`duration`](duration.md)の特殊化は、その日の深夜0時からの経過時間だと見なして読み込む
- フォーマット文字列で指定されたいずれの解析にも失敗した場合、もしくは完全な`duration`、時間点、カレンダーデータ構造を指定するために十分な情報が解析されなかった場合、`is.`[`setstate`](/reference/ios/basic_ios/setstate.md)`(`[`ios_base::failbit`](/reference/ios/ios_base/type-iostate.md)`)`が呼び出される


## 例
```cpp example
#include <iostream>
#include <sstream>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
  // タイムゾーン情報を含まない日時の解析
  {
    std::stringstream ss;
    ss << "2019-10-24 20:15:10";

    chrono::sys_seconds tp;
    ss >> chrono::parse("%Y-%m-%d %H:%M:%S", tp);

    if (ss) {
      std::cout << tp << std::endl;
    }
    else {
      std::cout << "解析失敗" << std::endl;
    }
  }

  // タイムゾーン情報を含む日時の解析
  {
    std::stringstream ss;
    ss << "2019-10-24 20:15:10 JST +0900";

    chrono::sys_seconds tp;
    std::string abbrev;
    chrono::minutes offset;
    ss >> chrono::parse("%Y-%m-%d %H:%M:%S %Z %z", tp, abbrev, offset);

    if (ss) {
      std::cout << tp << std::endl;
      std::cout << abbrev << std::endl;
      std::cout << chrono::floor<chrono::hours>(offset) << std::endl;
    }
    else {
      std::cout << "解析失敗" << std::endl;
    }
  }
}
```
* chrono::parse[color ff0000]
* chrono::sys_seconds[link sys_time.md]
* chrono::floor[link duration/floor.md]

### 出力
```
2019-10-24 20:15:10
2019-10-24 11:15:10
JST
9h
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0 [mark noimpl]
- [GCC](/implementation.md#gcc): 9.2 [mark noimpl], 15.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]


## 参照
- [LWG Issue 3131. `addressof` all the things](https://wg21.cmeerw.net/lwg/issue3131)
- [LWG Issue 3218. Modifier for `%d` parse flag does not match POSIX and format specification](https://wg21.cmeerw.net/lwg/issue3218)
- [LWG Issue 3235. `parse` manipulator without abbreviation is not callable](https://wg21.cmeerw.net/lwg/issue3235)
- [LWG Issue 3245. Unnecessary restriction on `'%p'` parse specifier](https://wg21.cmeerw.net/lwg/issue3245)
- [LWG Issue 3269. Parse manipulators do not specify the result of the extraction from stream](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p2117r0.html#3269)
- [LWG Issue 3270. Parsing and formatting `%j` with `duration`s](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p2117r0.html#3270)
- [LWG Issue 3272. `%I%p` should `parse`/`format` `duration` since midnight](https://wg21.cmeerw.net/lwg/issue3272)
