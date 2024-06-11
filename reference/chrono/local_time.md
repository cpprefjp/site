# local_time
* chrono[meta header]
* std::chrono[meta namespace]
* type-alias[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  struct local_t {};                                   // (1) C++20

  template <class Duration>
  using local_time = time_point<local_t, Duration>;    // (2) C++20

  using local_seconds = local_time<seconds>;           // (3) C++20
  using local_days    = local_time<days>;              // (4) C++20

  template <class charT, class traits, class Duration>
  std::basic_ostream<charT, traits>&
    operator<<(std::basic_ostream<charT, traits>& os,
               const local_time<Duration>& tp);        // (5) C++20

  template <class charT, class traits, class Duration, class Alloc = std::allocator<charT>>
  std::basic_istream<charT, traits>&
    from_stream(std::basic_istream<charT, traits>& is,
                const charT* fmt,
                local_time<Duration>& tp,
                std::basic_string<charT, traits, Alloc>* abbrev = nullptr,
                minutes* offset = nullptr);            // (6) C++20
}

namespace std {
  template <class Duration, class charT>
  struct formatter<chrono::local_time<Duration>, charT>; // (7) C++20
}
```
* time_point[link time_point.md]

## 概要
ローカル時間の一点を指す[`time_point`](time_point.md)に対する別名。

`local_t`は擬似的なクロックであるため、現在日時を取得する`now()`関数は持っていない。しかし、それによってパラメータ化された`local_time`は、まだタイムゾーンを指定されていないローカル時間を表す役割を持つ。

ローカル時間とは、コンピュータに設定されたローカルのタイムゾーンを表す時間点ではないことに注意。システム時間のエポックからの経過時間からローカル時間に変換した場合、それはUTCタイムゾーンをもつことになる。

- (1) : ローカル時間の擬似的なクロック
- (2) : `local_t`の[`time_point`](time_point.md)に対する別名。時間間隔を表す型はパラメータ化されている
- (3) : 秒単位でローカル時間の一点を指す[`time_point`](time_point.md)に対する別名
- (4) : 日単位でローカル時間の一点を指す[`time_point`](time_point.md)に対する別名
- (5) : 時間点に含まれる日付と時間を出力ストリームに出力する
- (6) : フォーマット指定して入力ストリームから日付・時間を時間点オブジェクトに入力する
- (7) : `local_time`型に対する[`std::formatter`](/reference/format/formatter.md)クラステンプレートの特殊化


## 効果
- (5) : 以下と等価：
    ```cpp
    return os << sys_time<Duration>{tp.time_since_epoch()};
    ```
    * sys_time[link sys_time.md]
    * tp.time_since_epoch()[link time_point/time_since_epoch.md]

- (6) :
    - パラメータ`fmt`で指定されたフォーマットフラグを使用して、入力を解析し、`tp`に代入する
    - 有効な日付・時間の解析に失敗した場合、`is.`[`setstate`](/reference/ios/basic_ios/setstate.md)`(`[`ios_base::failbit`](/reference/ios/ios_base/type-iostate.md)`)`が呼び出され、パラメータ`tp`は変更されない
    - タイムゾーンフォーマット`"%Z"`が指定され、解析が成功した場合、パラメータ`abbrev`が非ヌルである場合に`*abbrev`にタイムゾーン名が代入される
    - タイムゾーンとしてUTC時間からのオフセット時間 (日本なら`"+0900"`) を意味するフォーマット`"%z"`が指定され、解析が成功した場合、パラメータ`offset`が非ヌルである場合に`*offset`にその値が代入される
    - `is`を返す


## 備考
- (2) : このバージョンは、関数テンプレートで任意の時間間隔単位の`time_point`を受け取るために使用できる。`local_time`がもつ時間間隔の単位は未規定 (実装定義) であり、特定の単位に決めることができないため、時間間隔の型のみをパラメータ化して関数テンプレートで受け取ると便利である
- [`year`](year.md)クラスの制限により、年の値としては`[-32767, 32767]`の範囲までしか入出力できないことに注意 (その範囲外は未規定の値となる)
- (5) : 出力ストリームの演算子は、ローカルのタイムゾーンへの変換を行わない。そのため、システム時間から変換したローカル時間をそのまま出力すると、デフォルトではUTCタイムゾーンの日時が出力される。日本のタイムゾーンで出力したい場合は、[`zoned_time`](zoned_time.md)クラスを介して出力するか、9時間を加算して出力すること
- (7) : `%Z` (タイムゾーンの略称), `%z` (UTCタイムゾーンからのオフセット時間) もしくはその改良コマンドが指定された場合、[`std::format_error`](/reference/format/format_error.md)例外が送出される


## 例
### 基本的な使い方
```cpp example
#include <iostream>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
  // local_timeは、システム時間のエポックからの経過時間によって構築できる
  chrono::local_time<chrono::system_clock::duration> now {chrono::system_clock::now().time_since_epoch()};

  // 秒単位の時間点 (日付と時間が出力される)
  chrono::local_seconds sec_tp = chrono::floor<chrono::seconds>(now);
  std::cout << sec_tp << std::endl;

  // 日単位の時間点 (日付と、値ゼロの時間が出力される。sys_timeとは挙動が違うので注意)
  chrono::local_days day_tp = chrono::floor<chrono::days>(now);
  std::cout << day_tp << std::endl;

  // 以下は、日本のタイムゾーンで日時を出力する方法：
  // 1. コンピュータに設定されたタイムゾーンとして日時を出力
  std::cout << chrono::zoned_time{chrono::current_zone(), now} << std::endl;
  // 2. 日本のタイムゾーンとして日時を出力
  std::cout << chrono::zoned_time{"Asia/Tokyo", now} << std::endl;

  // year_month_dayオブジェクトからローカル時間を構築
  chrono::local_days ld{2020y/3/1};
  std::cout << ld << std::endl;

  // local_daysに時・分などを加算すると、それらの分解能を扱えるlocal_time<Duration>に変換される
  chrono::local_time<chrono::minutes> lm = chrono::local_days{2020y/3/1} + 15h + 30min;
  std::cout << lm << std::endl;
}
```
* chrono::local_time[color ff0000]
* chrono::local_seconds[color ff0000]
* chrono::local_days[color ff0000]
* chrono::system_clock[link system_clock.md]
* now()[link system_clock/now.md]
* time_since_epoch()[link time_point/time_since_epoch.md]
* chrono::floor[link time_point/floor.md]
* sys_time[link sys_time.md]
* chrono::zoned_time[link zoned_time.md]
* chrono::current_zone()[link current_zone.md]
* 2020y[link year/op_y.md]
* 15h[link duration/op_h.md]
* 30min[link duration/op_min.md]

#### 出力例
```
2019-10-24 11:15:10
2019-10-24 00:00:00
2019-10-24 20:15:10.330140 JST
2019-10-24 20:15:10.330140 JST
2020-03-01 00:00:00
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

    chrono::local_seconds tp;
    chrono::from_stream(ss, "%Y-%m-%d %H:%M:%S", tp);

    if (ss) {
      std::cout << tp << std::endl;
    }
    else {
      std::cout << "解析失敗" << std::endl;
    }
  }
}
```
* chrono::from_stream[color ff0000]

#### 出力例
```
2019-10-24 20:15:10
```

### 文字列フォーマットの例
```cpp example
#include <iostream>
#include <chrono>
#include <format>

namespace chrono = std::chrono;

int main()
{
  // システム時間はUTCタイムゾーンをもつ
  auto now = chrono::system_clock::now();
  chrono::sys_seconds now_sec = chrono::floor<chrono::seconds>(now); // 秒単位

  chrono::zoned_seconds zt{"Asia/Tokyo", now_sec};
  chrono::local_seconds lt = zt.get_local_time();

  // デフォルトフォーマット
  std::cout << std::format("1 : {}", lt) << std::endl;

  // 「年月日 時分秒」のフォーマット
  std::cout << std::format("2 : {:%Y年%m月%d日 %H時%M分%S秒}", lt) << std::endl;

  // 日付を / (スラッシュ) 区切り、時間を : (コロン) 区切り
  std::cout << std::format("3 : {0:%Y/%m/%d %H:%M:%S}", lt) << std::endl;

  // 日付だけ出力
  std::cout << std::format("4 : %Y年%m月%d日", lt) << std::endl;
  std::cout << std::format("5 : %F", lt) << std::endl;

  // 時間だけ出力
  std::cout << std::format("6 : %H時%M分%S秒", lt) << std::endl;
  std::cout << std::format("7 : %T", lt) << std::endl;

  // 12時間時計で出力
  // (%pでロケール固有の「午前」「午後」を出力するには、日本のロケールを指定する必要がある)
  std::cout << std::format(std::locale("ja_JP.UTF-8"),
                           "8 : %Y年%m月%d日 %p %I時%M分%S秒",
                           lt) << std::endl;
}
```
* chrono::system_clock[link system_clock.md]
* now()[link system_clock/now.md]
* chrono::zoned_seconds[link zoned_time.md]
* std::format[link format.md]
* std::locale[link /reference/locale/locale.md]

#### 出力例
```
1 : 2019-12-20 19:05:05 JST
2 : 2019年12月20日 19時05分05秒
3 : 2019/12/20 19:05:05
4 : 2019年12月20日
5 : 2019-12-20
6 : 19時05分05秒
7 : 19:05:05
8 : 2019年12月20日 午後 07時05分05秒
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
