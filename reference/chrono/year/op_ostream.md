# operator<<
* chrono[meta header]
* std::chrono[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  template <class charT, class traits>
  std::basic_ostream<charT, traits>&
    operator<<(std::basic_ostream<charT, traits>& os, const year& y); // (1) C++20
}
```

## 概要
`year`オブジェクトを出力ストリームに出力する。


## 戻り値
便宜上のリテラル�ャスト`STATICALLY-WIDEN`を導入する。`STATICALLY-WIDEN<charT>("...")`は、`charT`が`char`である場合は`"..."`、`charT`が`wchar_t`である場合は`L"..."`を意味する。

- (1) : 以下と�価：
    ```cpp
    return os << (y.ok() ?
      format(STATICALLY-WIDEN<charT>("{:%Y}"), y) :
      format(STATICALLY-WIDEN<charT>("{:%Y} is not a valid year"), y));
    ```
    * format[link /reference/format/format.md]


## 備考
- このフォーマットでは、4桁ゼ�埋めで年の整数値が出力される。3桁の日を出力する場合、`0123`のように先�にゼ�がつく


## 例
```cpp example
#include <iostream>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
  std::cout << chrono::year{2020} << std::endl;
}
```

### 出力
```
2020
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
