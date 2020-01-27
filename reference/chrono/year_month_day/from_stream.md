# from_stream
* chrono[meta header]
* std::chrono[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  template <class charT, class traits, class Alloc = std::allocator<charT>>
  std::basic_istream<charT, traits>&
    from_stream(std::basic_istream<charT, traits>& is,
                const charT* fmt,
                year_month_day& ymd,
                basic_string<charT, traits, Alloc>* abbrev = nullptr,
                minutes* offset = nullptr);   // (1) C++20
}
```

## 概要
フォーマット指定して入力ストリームから`year_month_day`オブジェクトに入力する。


## 効果
- パラメータ`fmt`で指定されたフォーマットフラグを使用して、入力を解析し、`ymd`に代入する
- 有効な年の解析に失敗した場合、`is.`[`setstate`](/reference/ios/basic_ios/setstate.md)`(`[`ios_base::failbit`](/reference/ios/ios_base/type-iostate.md)`)`が呼び出され、パラメータ`ymd`は変更されない
- タイムゾーンフォーマット`"%Z"`が指定され、解析が成功した場合、パラメータ`abbrev`が非ヌルである場合に`*abbrev`にタイムゾーン名が代入される
- タイムゾーンとしてUTC時間からのオフセット時間 (日本なら`"+0900"`) を意味するフォーマット`"%z"`が指定され、解析が成功した場合、パラメータ`offset`が非ヌルである場合に`*offset`にその値が代入される


## 戻り値
`is`を返す


## 備考
- この解析においては、`year_month_day`のフォーマットは、デフォルトで`"%F"`が使用される。これは`"%Y-%m-%d"`と�価であり、ハイフン区切りで年、月、日を整数値として解析する


## 例
```cpp example
#include <cassert>
#include <sstream>
#include <chrono>

namespace chrono = std::chrono;
using namespace std::chrono_literals;

int main()
{
  {
    std::stringstream ss;
    ss << "2020-03-01";

    chrono::year_month_day ymd;
    chrono::from_stream(ss, ymd, "%F");
    assert(ymd == 2020y/3/1);
  }
  {
    std::stringstream ss;
    ss << "2020-03-01";

    chrono::year_month_day ymd;
    chrono::from_stream(ss, ymd, "%04F"); // 年の桁数を指定する
    assert(ymd == 2020y/3/1);
  }
}
```
* chrono::from_stream[color ff0000]
* 2020y[link /reference/chrono/year/op_y.md]

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): (9.0時点で実装なし)
- [GCC](/implementation.md#gcc): (9.2時点で実装なし)
- [Visual C++](/implementation.md#visual_cpp): (2019 Update 3時点で実装なし)


## 関連項目
- [`local_time_format()`](/reference/chrono/local_time_format.md.nolink) (フォーマットの詳細)
