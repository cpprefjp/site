# gps_time
* chrono[meta header]
* std::chrono[meta namespace]
* type-alias[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  template <class Duration>
  using gps_time = time_point<gps_clock, Duration>;    // (1) C++20

  using gps_seconds = gps_time<seconds>;               // (2) C++20

  template <class charT, class traits, class Duration>
  std::basic_ostream<charT, traits>&
    operator<<(std::basic_ostream<charT, traits>& os,
               const gps_time<Duration>& tp);          // (3) C++20

  template <class charT, class traits, class Duration, class Alloc = std::allocator<charT>>
  std::basic_istream<charT, traits>&
    from_stream(std::basic_istream<charT, traits>& is,
                const charT* fmt,
                gps_time<Duration>& tp,
                std::basic_string<charT, traits, Alloc>* abbrev = nullptr,
                minutes* offset = nullptr);            // (4) C++20
}

namespace std {
  template <class Duration, class charT>
  struct formatter<chrono::gps_time<Duration>, charT>; // (5) C++20
}
```
* time_point[link time_point.md]
* gps_clock[link gps_clock.md]

## 概要
GPS時間の一点を指す[`time_point`](time_point.md)に対する別名。

- (1) : [`gps_clock`](gps_clock.md)の[`time_point`](time_point.md)に対する別名。時間間隔を表す型はパラメータ化されている
- (2) : 秒単位でGPS時間の一点を指す[`time_point`](time_point.md)に対する別名
- (3) : 時間点に含まれる日付と時間を出力ストリームに出力する
- (4) : フォーマット指定して入力ストリームから日付・時間を時間点オブジェクトに入力する
- (5) : `gps_time`型に対する[`std::formatter`](/reference/format/formatter.md)クラステンプレートの特殊化


## 効果
便宜上のリテラルキャスト`STATICALLY-WIDEN`を導入する。`STATICALLY-WIDEN<charT>("...")`は、`charT`が`char`である場合は`"..."`、`charT`が`wchar_t`である場合は`L"..."`を意味する。

- (3) : 以下と等価：
    ```cpp
    return os << format(os.getloc(), STATICALLY-WIDEN<charT>("{:L%F %T}"), tp);
    ```
    * format[link format.md]
    * os.getloc()[link /reference/ios/ios_base/getloc.md]

- (4) :
    - パラメータ`fmt`で指定されたフォーマットフラグを使用して、入力を解析し、`tp`に代入する
    - 有効な日付・時間の解析に失敗した場合、`is.`[`setstate`](/reference/ios/basic_ios/setstate.md)`(`[`ios_base::failbit`](/reference/ios/ios_base/type-iostate.md)`)`が呼び出され、パラメータ`tp`は変更されない
    - タイムゾーンフォーマット`"%Z"`が指定され、解析が成功した場合、パラメータ`abbrev`が非ヌルである場合に`*abbrev`にタイムゾーン名が代入される
    - オフセット時間を意味するフォーマット`"%z"`が指定され、解析が成功した場合、パラメータ`offset`が非ヌルである場合に`*offset`にその値が代入される
    - さらに、`tp`に日付・時間が代入される前に、解析されたオフセットがタイムスタンプから引かれる
    - `is`を返す


## 備考
- (1) : このバージョンは、関数テンプレートで任意の時間間隔単位の`time_point`を受け取るために使用できる。`gps_clock::time_point`がもつ時間間隔の単位は未規定 (実装定義) であるため、特定の単位に決めることができないため、時間間隔の型のみをパラメータ化して関数テンプレートで受け取ると便利である
- (5) :
    - `%Z` (タイムゾーンの略称) が指定された場合、`STATICALLY-WIDEN<charT>("GPS")`で置き換えられる
    - `%z`もしくはその改良コマンドが指定された場合、`0`[`min`](duration/op_min.md)が使用される
    - この日付と時間のフォーマットは、`gps_time<Duration>`型変数`tp`を以下のように変換した[`sys_time`](sys_time.md)をフォーマットした場合と等価：
        ```cpp
        sys_time<Duration>{tp.time_since_epoch()} + (sys_days{1980y/January/Sunday[1]} - sys_days{1970y/January/1})
        ```
        * sys_time[link sys_time.md]
        * tp.time_since_epoch()[link time_point/time_since_epoch.md]
        * sys_days[link sys_time.md]
        * 1980y[link year/op_y.md]
        * 1970y[link year/op_y.md]
        * January[link month_constants.md]
        * Sunday[link weekday_constants.md]


## 例
### 基本的な使い方
```cpp example
#include <iostream>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
  // 未規定の時間間隔単位をもつ時間点
  chrono::gps_clock::time_point tp = chrono::gps_clock::now();

  // 秒単位の時間点 (日付と時間が出力される)
  chrono::gps_seconds sec_p = chrono::floor<chrono::seconds>(tp);
  std::cout << sec_p << std::endl;
}
```
* chrono::gps_seconds[color ff0000]
* chrono::gps_clock[link gps_clock.md]
* now()[link gps_clock/now.md]
* chrono::floor[link time_point/floor.md]

#### 出力例
```
2019-10-24 11:15:27
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
    ss << "2019-10-24 20:15:27";

    chrono::gps_seconds tp;
    chrono::from_stream(ss, "%Y-%m-%d %H:%M:%S", tp);

    if (ss) {
      std::cout << tp << std::endl;
    } else {
      std::cout << "解析失敗" << std::endl;
    }
  }

  // タイムゾーンを含む入力
  {
    std::stringstream ss;
    ss << "2019-10-24 20:15:27 GPS";

    chrono::gps_seconds tp;
    std::string abbrev;
    chrono::from_stream(ss, "%Y-%m-%d %H:%M:%S %Z", tp, &abbrev);

    if (ss) {
      std::cout << tp << std::endl;
      std::cout << abbrev << std::endl;
    } else {
      std::cout << "解析失敗" << std::endl;
    }
  }
}
```
* chrono::from_stream[color ff0000]

#### 出力
```
2019-10-24 20:15:45
2019-10-24 20:15:45
GPS
```

### 文字列フォーマットの例
```cpp example
#include <iostream>
#include <chrono>
#include <format>

namespace chrono = std::chrono;

int main()
{
  chrono::gps_clock::time_point now = chrono::gps_clock::now();
  chrono::gps_seconds now_sec = chrono::floor<chrono::seconds>(now);

  // デフォルトフォーマット
  std::cout << std::format("1 : {}", now_sec) << std::endl;

  // 「年月日 時分秒」のフォーマット
  std::cout << std::format("2 : {:%Y年%m月%d日 %H時%M分%S秒}", now_sec) << std::endl;

  // 日付を / (スラッシュ) 区切り、時間を : (コロン) 区切り、タイムゾーンの略称付き
  std::cout << std::format("3 : {:%Y/%m/%d %H:%M:%S %Z}", now_sec) << std::endl;

  // 日付だけ出力
  std::cout << std::format("4 : {:%Y年%m月%d日}", now_sec) << std::endl;
  std::cout << std::format("5 : {:%F}", now_sec) << std::endl;

  // 時間だけ出力
  std::cout << std::format("6 : {:%H時%M分%S秒}", now_sec) << std::endl;
  std::cout << std::format("7 : {:%T}", now_sec) << std::endl;
}
```
* chrono::gps_clock[link gps_clock.md]
* now()[link gps_clock/now.md]
* chrono::floor[link time_point/floor.md]
* std::format[link format.md]

#### 出力
```
1 : 2019-12-20 10:05:05
2 : 2019年12月20日 10時05分05秒
3 : 2019/12/20 10:05:05 GPS
4 : 2019年12月20日
5 : 2019-12-20
6 : 10時05分05秒
7 : 10:05:05
```


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0 [mark noimpl]
- [GCC](/implementation.md#gcc): 9.2 [mark noimpl], 14.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]


## 関連項目
- [chronoの`std::format()`](/reference/chrono/format.md) (出力フォーマットの詳細)
- [chronoの`parse()`](/reference/chrono/parse.md) (入力フォーマットの詳細)


## 参照
- [P2372R1 Fixing locale handling in chrono formatters](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2372r1.html)
    - この提案文書はC++20の策定後に採択されたが、実装が追いついていない時期の採択だったために、C++20の仕様として扱われる
