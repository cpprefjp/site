# utc_time
* chrono[meta header]
* std::chrono[meta namespace]
* type-alias[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  template <class Duration>
  using utc_time = time_point<utc_clock, Duration>;    // (1) C++20

  using utc_seconds = utc_time<seconds>;               // (2) C++20

  template <class charT, class traits, class Duration>
  std::basic_ostream<charT, traits>&
    operator<<(std::basic_ostream<charT, traits>& os,
               const utc_time<Duration>& tp);          // (3) C++20

  template <class charT, class traits, class Duration, class Alloc = std::allocator<charT>>
  std::basic_istream<charT, traits>&
    from_stream(std::basic_istream<charT, traits>& is,
                const charT* fmt,
                utc_time<Duration>& tp,
                std::basic_string<charT, traits, Alloc>* abbrev = nullptr,
                minutes* offset = nullptr);            // (4) C++20
}
```
* time_point[link time_point.md]
* utc_clock[link utc_clock.md]

## 概要
UTC時間の一点を指す[`time_point`](time_point.md)に対する別名。

- (1) : [`utc_clock`](utc_clock.md)の[`time_point`](time_point.md)に対する別名。時間間隔を表す型はパラメータ化されている
- (2) : 秒単位でUTC時間の一点を指す[`time_point`](time_point.md)に対する別名
- (3) : 時間点に含まれる日付と時間を出力ストリームに出力する
- (4) : フォーマット指定して入力ストリームから日付・時間を時間点オブジェクトに入力する


## 効果
便宜上のリテラルキャスト`STATICALLY-WIDEN`を導入する。`STATICALLY-WIDEN<charT>("...")`は、`charT`が`char`である場合は`"..."`、`charT`が`wchar_t`である場合は`L"..."`を意味する。

- (3) : 以下と等価：
    ```cpp
    return os << format(STATICALLY-WIDEN<charT>("{:%F %T}"), tp);
    ```
    * format[link /reference/format/format.md]

    - フォーマットの詳細は[`local_time_format()`](local_time_format.md.nolink)を参照

- (4) :
    - パラメータ`fmt`で指定されたフォーマットフラグを使用して、入力を解析し、`tp`に代入する
    - 有効な日付・時間の解析に失敗した場合、`is.`[`setstate`](/reference/ios/basic_ios/setstate.md)`(`[`ios_base::failbit`](/reference/ios/ios_base/type-iostate.md)`)`が呼び出され、パラメータ`tp`は変更されない
    - タイムゾーンフォーマット`"%Z"`が指定され、解析が成功した場合、パラメータ`abbrev`が非ヌルである場合に`*abbrev`にタイムゾーン名が代入される
    - タイムゾーンとしてUTC時間からのオフセット時間 (日本なら`"+0900"`) を意味するフォーマット`"%z"`が指定され、解析が成功した場合、パラメータ`offset`が非ヌルである場合に`*offset`にその値が代入される
    - さらに、`tp`に日付・時間が代入される前に、解析されたオフセットがタイムスタンプから引かれる
    - `is`を返す


## 備考
- (1) : このバージョンは、関数テンプレートで任意の時間間隔単位の`time_point`を受け取るために使用できる。`utc_clock::time_point`がもつ時間間隔の単位は未規定 (実装定義) であるため、特定の単位に決めることができないため、時間間隔の型のみをパラメータ化して関数テンプレートで受け取ると便利である


## 例
### 基本的な使い方
```cpp example
#include <iostream>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
  // 未規定の時間間隔単位をもつ時間点
  chrono::utc_clock::time_point tp = chrono::utc_clock::now();

  // 秒単位の時間点 (日付と時間が出力される)
  chrono::utc_seconds sec_p = chrono::time_point_cast<chrono::seconds>(tp);
  std::cout << sec_p << std::endl;
}
```
* chrono::utc_seconds[color ff0000]
* chrono::utc_clock[link utc_clock.md]
* now()[link utc_clock/now.md]
* chrono::time_point_cast[link time_point_cast.md]

#### 出力例
```
2019-10-24 11:15:10 UTC
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

    chrono::utc_seconds tp;
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
    ss << "2019-10-24 20:15:10 UTC+0900";

    chrono::utc_seconds tp;
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
2019-10-24 11:15:10 UTC
2019-10-24 11:15:10 UTC
UTC
540
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): (9.0時点で実装なし)
- [GCC](/implementation.md#gcc): (9.2時点で実装なし)
- [Visual C++](/implementation.md#visual_cpp): (2019 Update 3時点で実装なし)


## 関連項目
- [`local_time_format()`](local_time_format.md.nolink) (フォーマットの詳細)
