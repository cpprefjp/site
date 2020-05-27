# file_time
* chrono[meta header]
* std::chrono[meta namespace]
* type-alias[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  template <class Duration>
  using file_time = time_point<file_clock, Duration>;    // (1) C++20

  template <class charT, class traits, class Duration>
  std::basic_ostream<charT, traits>&
    operator<<(std::basic_ostream<charT, traits>& os,
               const file_time<Duration>& tp);           // (2) C++20

  template <class charT, class traits, class Duration, class Alloc = std::allocator<charT>>
  std::basic_istream<charT, traits>&
    from_stream(std::basic_istream<charT, traits>& is,
                const charT* fmt,
                file_time<Duration>& tp,
                std::basic_string<charT, traits, Alloc>* abbrev = nullptr,
                minutes* offset = nullptr);              // (3) C++20
}
```
* time_point[link time_point.md]
* file_clock[link file_clock.md]

## 概要
ファイル時間の一点を指す[`time_point`](time_point.md)に対する別名。

- (1) : [`file_clock`](file_clock.md)の[`time_point`](time_point.md)に対する別名。時間間隔を表す型はパラメータ化されている
- (2) : 時間点に含まれる日付と時間を出力ストリームに出力する
- (3) : フォーマット指定して入力ストリームから日付・時間を時間点オブジェクトに入力する


## 効果
便宜上のリテラルキャスト`STATICALLY-WIDEN`を導入する。`STATICALLY-WIDEN<charT>("...")`は、`charT`が`char`である場合は`"..."`、`charT`が`wchar_t`である場合は`L"..."`を意味する。

- (2) : 以下と等価：
    ```cpp
    return os << format(STATICALLY-WIDEN<charT>("{:%F %T}"), tp);
    ```
    * format[link format.md]

- (3) :
    - パラメータ`fmt`で指定されたフォーマットフラグを使用して、入力を解析し、`tp`に代入する
    - 有効な日付・時間の解析に失敗した場合、`is.`[`setstate`](/reference/ios/basic_ios/setstate.md)`(`[`ios_base::failbit`](/reference/ios/ios_base/type-iostate.md)`)`が呼び出され、パラメータ`tp`は変更されない
    - タイムゾーンフォーマット`"%Z"`が指定され、解析が成功した場合、パラメータ`abbrev`が非ヌルである場合に`*abbrev`にタイムゾーン名が代入される
    - タイムゾーンとしてUTC時間からのオフセット時間 (日本なら`"+0900"`) を意味するフォーマット`"%z"`が指定され、解析が成功した場合、パラメータ`offset`が非ヌルである場合に`*offset`にその値が代入される
    - さらに、`tp`に日付・時間が代入される前に、解析されたオフセットがタイムスタンプから引かれる
    - `is`を返す


## 備考
- (1) : このバージョンは、関数テンプレートで任意の時間間隔単位の`time_point`を受け取るために使用できる。`file_clock::time_point`がもつ時間間隔の単位は未規定 (実装定義) であるため、特定の単位に決めることができないため、時間間隔の型のみをパラメータ化して関数テンプレートで受け取ると便利である


## 例
### 基本的な使い方
```cpp example
#include <iostream>
#include <fstream>
#include <filesystem>

namespace chrono = std::chrono;
namespace fs = std::filesystem;

int main()
{
  std::ofstream{"regular.txt"};

  // ファイルの最終更新日時を取得して出力
  fs::file_time_type tp = fs::last_write_time("regulat.txt");
  std::cout << tp << std::endl;
}
```
* fs::file_time_type[link /reference/filesystem/file_time_type.md]
* fs::last_write_time[link /reference/filesystem/last_write_time.md]

#### 出力例
```
2019-10-24 11:15:10 UTC
```

### 入力の例
```cpp example
#include <iostream>
#include <sstream>
#include <chrono>
#include <filesystem>

namespace chrono = std::chrono;
namespace fs = std::filesystem;

int main()
{
  // タイムゾーンとオフセットを含まない入力
  {
    std::stringstream ss;
    ss << "2019-10-24 20:15:10";

    fs::file_time_type tp;
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

    fs::file_time_type tp;
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
- [chronoの`std::format()`](/reference/chrono/format.md) (フォーマットの詳細)


