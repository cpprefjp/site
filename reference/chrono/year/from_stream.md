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
                year& y,
                basic_string<charT, traits, Alloc>* abbrev = nullptr,
                minutes* offset = nullptr);   // (1) C++20
}
```

## 概要
フォーマット指定して入力ストリームから`year`オブジェクトに入力する。


## 効果
- パラメータ`fmt`で指定されたフォーマットフラグを使用して、入力を解析し、`y`に代入する
- 有効な年の解析に失敗した場合、`is.`[`setstate`](/reference/ios/basic_ios/setstate.md)`(`[`ios_base::failbit`](/reference/ios/ios_base/type-iostate.md)`)`が呼び出され、パラメータ`y`は変更されない
- タイムゾーンフォーマット`"%Z"`が指定され、解析が成功した場合、パラメータ`abbrev`が非ヌルである場合に`*abbrev`にタイムゾーン名が代入される
- タイムゾーンとしてUTC時間からのオフセット時間 (日本なら`"+0900"`) を意味するフォーマット`"%z"`が指定され、解析が成功した場合、パラメータ`offset`が非ヌルである場合に`*offset`にその値が代入される


## 戻り値
`is`を返す


## 備考
- この解析においては、日のフォーマットは、デフォルトで4桁ゼロ埋めの日を意味する`%Y`が使用される。3桁の年として123年を表すために`0123`および`123`のどちらでも入力できる。4桁の未満の場合、ゼロ埋めは必須ではない。ゼロ埋めの桁数を指定する`%NY`も指定できる


## 例
```cpp example
#include <cassert>
#include <sstream>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
  {
    std::stringstream ss;
    ss << "2020";

    chrono::year y;
    chrono::from_stream(ss, y, "%y");
    assert(y == chrono::year{2020});
  }
  {
    std::stringstream ss;
    ss << "0123";

    chrono::year y;
    chrono::from_stream(ss, y, "%4Y");
    assert(y == chrono::year{123});
  }
}
```
* chrono::from_stream[color ff0000]

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
