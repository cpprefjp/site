# sys_time
* chrono[meta header]
* std::chrono[meta namespace]
* type-alias[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  template <class Duration>
  using sys_time = time_point<system_clock, Duration>; // (1) C++20

  using sys_seconds = sys_time<seconds>;               // (2) C++20
  using sys_days    = sys_time<days>;                  // (3) C++20

  template <class charT, class traits, class Duration>
  std::basic_ostream<charT, traits>&
    operator<<(std::basic_ostream<charT, traits>& os,
               const sys_time<Duration>& tp);          // (4) C++20

  template <class charT, class traits>
  std::basic_ostream<charT, traits>&
    operator<<(std::basic_ostream<charT, traits>& os,
               const sys_days& dp);                    // (5) C++20

  template <class charT, class traits, class Duration, class Alloc = std::allocator<charT>>
  std::basic_istream<charT, traits>&
    from_stream(std::basic_istream<charT, traits>& is,
                const charT* fmt,
                sys_time<Duration>& tp,
                std::basic_string<charT, traits, Alloc>* abbrev = nullptr,
                minutes* offset = nullptr);            // (6) C++20
}

namespace std {
  template <class Duration, class charT>
  struct formatter<chrono::sys_time<Duration>, charT>; // (7) C++20
}
```
* time_point[link time_point.md]
* system_clock[link system_clock.md]

## 概要
システム時間の一点を指す[`time_point`](time_point.md)に対する別名。

- (1) : [`system_clock`](system_clock.md)の[`time_point`](time_point.md)に対する別名。時間間隔を表す型はパラメータ化されている
- (2) : 秒単位でシステム時間の一点を指す[`time_point`](time_point.md)に対する別名
- (3) : 日単位でシステム時間の一点を指す[`time_point`](time_point.md)に対する別名
- (4) : 時間点に含まれる日付と時間を出力ストリームに出力する
- (5) : 時間点に含まれる日付を出力ストリームに出力する
- (6) : フォーマット指定して入力ストリームから日付・時間を時間点オブジェクトに入力する
- (7) : `sys_time`型に対する[`std::formatter`](/reference/format/formatter.md)クラステンプレートの特殊化


## テンプレートパラメータ制約
- (4) : [`treat_as_floating_point_v`](treat_as_floating_point.md)`<typename Duration::rep> == false`かつ`Duration{1} <` [`days`](duration_aliases.md)`{1}`であること


## 効果
便宜上のリテラルキャスト`STATICALLY-WIDEN`を導入する。`STATICALLY-WIDEN<charT>("...")`は、`charT`が`char`である場合は`"..."`、`charT`が`wchar_t`である場合は`L"..."`を意味する。

- (4) : 以下と等価：
    ```cpp
    auto const dp = floor<days>(tp);
    return os << format(os.getloc(), STATICALLY-WIDEN<charT>("{:L} {:L}"),
                        year_month_day{dp}, hh_mm_ss{tp - dp});
    ```
    * floor[link time_point/floor.md]
    * format[link /reference/format/format.md]
    * os.getloc()[link /reference/ios/ios_base/getloc.md]
    * year_month_day[link year_month_day.md]
    * hh_mm_ss[link hh_mm_ss.md]

- (5) : 以下と等価：
    ```cpp
    return os << year_month_day{dp};
    ```
    * year_month_day[link year_month_day.md]

- (6) :
    - パラメータ`fmt`で指定されたフォーマットフラグを使用して、入力を解析し、`tp`に代入する
    - 有効な日付・時間の解析に失敗した場合、`is.`[`setstate`](/reference/ios/basic_ios/setstate.md)`(`[`ios_base::failbit`](/reference/ios/ios_base/type-iostate.md)`)`が呼び出され、パラメータ`tp`は変更されない
    - タイムゾーンフォーマット`"%Z"`が指定され、解析が成功した場合、パラメータ`abbrev`が非ヌルである場合に`*abbrev`にタイムゾーン名が代入される
    - タイムゾーンとしてUTC時間からのオフセット時間 (日本なら`"+0900"`) を意味するフォーマット`"%z"`が指定され、解析が成功した場合、パラメータ`offset`が非ヌルである場合に`*offset`にその値が代入される
    - さらに、`tp`に日付・時間が代入される前に、解析されたオフセットがタイムスタンプから引かれる
    - `is`を返す


## 備考
- (1) : このバージョンは、関数テンプレートで任意の時間間隔単位の`time_point`を受け取るために使用できる。`system_clock::time_point`がもつ時間間隔の単位は未規定 (実装定義) であり、特定の単位に決めることができないため、時間間隔の型のみをパラメータ化して関数テンプレートで受け取ると便利である
- [`year`](year.md)クラスの制限により、年の値としては`[-32767, 32767]`の範囲までしか入出力できないことに注意 (その範囲外は未規定の値となる)
- (4), (5) : 出力ストリームの演算子は、ローカルのタイムゾーンへの変換を行わない。そのため、システム時間をそのまま出力すると、デフォルトではUTCタイムゾーンの日時が出力される。日本のタイムゾーンで出力したい場合は、[`zoned_time`](zoned_time.md)クラスを介して出力するか、9時間を加算して出力すること
- (7) :
    - `%Z` (タイムゾーンの略称) が指定された場合、`STATICALLY-WIDEN<charT>("UTC")`で置き換えられる
    - `%z`もしくはその改良コマンドが指定された場合、`0`[`min`](duration/op_min.md)が使用される


## 例
### 基本的な使い方
```cpp example
#include <iostream>
#include <chrono>

namespace chrono = std::chrono;
using namespace std::chrono_literals;

int main()
{
  // 未規定の時間間隔単位をもつ時間点
  chrono::system_clock::time_point now = chrono::system_clock::now();

  // 秒単位の時間点 (UTCタイムゾーンで日付と時間が出力される)
  chrono::sys_seconds sec_tp = chrono::floor<chrono::seconds>(now);
  std::cout << sec_tp << std::endl;

  // 日単位の時間点 (UTCタイムゾーンで日付が出力される)
  chrono::sys_days day_tp = chrono::floor<chrono::days>(now);
  std::cout << day_tp << std::endl;

  // 以下は、日本のタイムゾーンで日時を出力する方法：
  // 1. コンピュータに設定されたタイムゾーンで日時を出力
  std::cout << chrono::zoned_time{chrono::current_zone(), now} << std::endl;
  // 2. 日本のタイムゾーン (UTC + 9時間) で日時を出力
  std::cout << chrono::zoned_time{"Asia/Tokyo", now} << std::endl;

  // year_month_dayオブジェクトからシステム時間を構築
  chrono::sys_days sd{2020y/3/1};
  std::cout << sd << std::endl;

  // sys_daysに時・分などを加算すると、それらの分解能を扱えるsys_time<Duration>に変換される
  chrono::sys_time<chrono::minutes> sm = chrono::sys_days{2020y/3/1} + 15h + 30min;
  std::cout << sm << std::endl;
}
```
* chrono::sys_seconds[color ff0000]
* chrono::sys_days[color ff0000]
* chrono::sys_time[color ff0000]
* chrono::system_clock[link system_clock.md]
* now()[link system_clock/now.md]
* chrono::floor[link time_point/floor.md]
* chrono::zoned_time[link zoned_time.md]
* chrono::current_zone()[link current_zone.md]
* 2020y[link year/op_y.md]
* 15h[link duration/op_h.md]
* 30min[link duration/op_min.md]

#### 出力例
```
2019-10-24 11:15:10
2019-10-24
2019-10-24 20:15:10.330140 JST
2019-10-24 20:15:10.330140 JST
2020-03-01
2020-03-01 15:30:00
```

### 入力の例
```cpp example
#include <iostream>
#include <sstream>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
  // タイムゾーンとオフセットを含まない入力
  {
    std::stringstream ss;
    ss << "2019-10-24 20:15:10";

    chrono::sys_seconds tp;
    chrono::from_stream(ss, "%Y-%m-%d %H:%M:%S", tp);

    if (ss) {
      std::cout << tp << std::endl;
    }
    else {
      std::cout << "解析失敗" << std::endl;
    }
  }

  // タイムゾーンとオフセットを含む入力
  {
    std::stringstream ss;
    ss << "2019-10-24 20:15:10 JST+0900";

    chrono::sys_seconds tp;
    std::string abbrev;
    chrono::minutes offset{0};
    chrono::from_stream(ss, "%Y-%m-%d %H:%M:%S %Z%z", tp, &abbrev, &offset);

    std::cout << tp << std::endl;
    std::cout << abbrev << std::endl;
    std::cout << offset.count() << std::endl;
  }
}
```
* chrono::from_stream[color ff0000]
* offset.count()[link duration/count.md]

#### 出力例
```
2019-10-24 20:15:10
2019-10-24 11:15:10
JST
540
```

### 文字列フォーマットの例
```cpp example
#include <iostream>
#include <chrono>
#include <format>

namespace chrono = std::chrono;

int main()
{
  chrono::system_clock::time_point now = chrono::system_clock::now();
  chrono::sys_seconds now_sec = chrono::floor<chrono::seconds>(now);

  // デフォルトフォーマット
  std::cout << std::format("1 : {}", now_sec) << std::endl;

  // 「年月日 時分秒」のフォーマット
  std::cout << std::format("2 : {:%Y年%m月%d日 %H時%M分%S秒}", now_sec) << std::endl;

  // 日付を / (スラッシュ) 区切り、時間を : (コロン) 区切り、タイムゾーンの略称付き
  std::cout << std::format("3 : {0:%Y/%m/%d %H:%M:%S %Z}", now_sec) << std::endl;

  // 日付だけ出力
  std::cout << std::format("4 : {:%Y年%m月%d日}", now_sec) << std::endl;
  std::cout << std::format("5 : {:%F}", now_sec) << std::endl;

  // 時間だけ出力
  std::cout << std::format("6 : {:%H時%M分%S秒}", now_sec) << std::endl;
  std::cout << std::format("7 : {:%T}", now_sec) << std::endl;
}
```
* chrono::system_clock[link system_clock.md]
* now()[link system_clock/now.md]
* chrono::floor[link time_point/floor.md]
* std::format[link format.md]

#### 出力例
```
1 : 2019-12-20 10:05:05 UTC
2 : 2019年12月20日 10時05分05秒
3 : 2019/12/20 10:05:05 UTC
4 : 2019年12月20日
5 : 2019-12-20
6 : 10時05分05秒
7 : 10:05:05
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 8.0 (入出力ストリームなし) [mark verified]
- [GCC](/implementation.md#gcc): 9.2 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]


## 関連項目
- [chronoの`std::format()`](/reference/chrono/format.md) (出力フォーマットの詳細)
- [chronoの`parse()`](/reference/chrono/parse.md) (入力フォーマットの詳細)


## 参照
- [P2372R1 Fixing locale handling in chrono formatters](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2372r1.html)
    - この提案文書はC++20の策定後に採択されたが、実装が追いついていない時期の採択だったために、C++20の仕様として扱われる
