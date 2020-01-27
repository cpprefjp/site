# operator<<
* chrono[meta header]
* std::chrono[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  template <class charT, class traits>
  std::basic_ostream<charT, traits>&
    operator<<(std::basic_ostream<charT, traits>& os, const year_month_day& ymd); // (1) C++20
}
```

## 概要
`year_month_day`オブジェクトを出力ストリームに出力する。


## 戻り値
便宜上のリテラル�ャスト`STATICALLY-WIDEN`を導入する。`STATICALLY-WIDEN<charT>("...")`は、`charT`が`char`である場合は`"..."`、`charT`が`wchar_t`である場合は`L"..."`を意味する。

- (1) : 以下と�価：
    ```cpp
    return os << (ymd.ok() ?
      format(STATICALLY-WIDEN<charT>("{:%F}"), ymd) :
      format(STATICALLY-WIDEN<charT>("{:%F} is not a valid date"), ymd));
    ```
    * format[link /reference/format/format.md]


## 備考
- フォーマット指定�`"%F"`は`"%Y-%m-%d"`と�価であり、4桁ゼ�埋め整数値の年、2桁ゼ�埋め整数値の月、2桁ゼ�埋め整数値の日が、ハイフン区切りで出力される


## 例
```cpp example
#include <iostream>
#include <chrono>

using namespace std::chrono_literals;

int main()
{
  std::cout << 2020y/3/1 << std::endl;
}
```
* 2020y[link /reference/chrono/year/op_y.md]

### 出力
```
2020-03-01
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
