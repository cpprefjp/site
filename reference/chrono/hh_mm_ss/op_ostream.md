# operator<<
* chrono[meta header]
* std::chrono[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  template <class charT, class traits, class Duration>
  std::basic_ostream<charT, traits>&
    operator<<(std::basic_ostream<charT, traits>& os, const hh_mm_ss<Duration>& hms); // (1) C++20
}
```

## 概要
`hh_mm_ss`オブジェクトを出力ストリームに出力する。


## 戻り値
便宜上のリテラルキャスト`STATICALLY-WIDEN`を導入する。`STATICALLY-WIDEN<charT>("...")`は、`charT`が`char`である場合は`"..."`、`charT`が`wchar_t`である場合は`L"..."`を意味する。

- (1) : 以下と等価：
    ```cpp
    return os << format(os.getloc(),
                   hms.is_negative() ?
                     STATICALLY-WIDEN<charT>("-{:%T}")
                   : STATICALLY-WIDEN<charT>("{:%T}"),
                   abs(hms.to_duration()));
    ```
    * format[link /reference/format/format.md]
    * hms.is_negative()[link is_negative.md]
    * abs[link /reference/chrono/duration/abs.md]
    * hms.to_dutation()[link to_duration.md]


## 例
```cpp example
#include <iostream>
#include <chrono>

using std::chrono::last;
using namespace std::chrono_literals;

int main()
{
  std::cout << chrono::hh_mm_ss{15h + 30min + 20s} << std::endl;
  std::cout << chrono::hh_mm_ss{-(15h + 30min + 20s)} << std::endl;
  std::cout << chrono::hh_mm_ss{15h + 30min + 20s + 123ms} << std::endl;
}
```
* 15h[link /reference/chrono/duration/op_h.md]
* 30min[link /reference/chrono/duration/op_min.md]
* 20s[link /reference/chrono/duration/op_s.md]
* 123ms[link /reference/chrono/duration/op_ms.md]

### 出力
```
15:30:20
-15:30:20
15:30:20.123
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): (10.0時点で実装なし)
- [GCC](/implementation.md#gcc): (10.1時点で実装なし)
- [Visual C++](/implementation.md#visual_cpp): (2019 Update 3時点で実装なし)


## 関連項目
- [chronoの`std::format()`](/reference/chrono/format.md) (フォーマットの詳細)
