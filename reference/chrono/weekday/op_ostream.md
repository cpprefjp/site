# operator<<
* chrono[meta header]
* std::chrono[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  template <class charT, class traits>
  std::basic_ostream<charT, traits>&
    operator<<(std::basic_ostream<charT, traits>& os, const weekday& wd); // (1) C++20
}
```

## 概要
`weekday`オブジェクトを出力ストリームに出力する。


## 戻り値
便宜上のリテラル�ャスト`STATICALLY-WIDEN`を導入する。`STATICALLY-WIDEN<charT>("...")`は、`charT`が`char`である場合は`"..."`、`charT`が`wchar_t`である場合は`L"..."`を意味する。

- (1) : 以下と�価：
    ```cpp
    return os << (m.ok() ?
      format(os.getloc(), STATICALLY-WIDEN<charT>("{:%a}"), m) :
      format(os.getloc(), STATICALLY-WIDEN<charT>("{} is not a valid weekday"),
             static_cast<unsigned int>(m)));
    ```
    * format[link /reference/format/format.md]
    * os.getloc()[link /reference/ios/ios_base/getloc.md]


## 備考
- このフォーマットでは、�ケール規定の曜日の�縮名が出力される。デフォルトのC�ケールでは、以下のように出力される：

| 曜日の定数  | 出力される曜日名 (C�ケール) |
|-------------|------------------------------|
| `Sunday`    | Sun |
| `Monday`    | Mon |
| `Tuesday`   | Tue |
| `Wednesday` | Wed |
| `Thursday`  | Thu |
| `Friday`    | Fri |
| `Saturday`  | Sat |


## 例
```cpp example
#include <iostream>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
  chrono::weekday ar[] = {
    chrono::Sunday,
    chrono::Monday,
    chrono::Tuesday,
    chrono::Wednesday,
    chrono::Thursday,
    chrono::Friday,
    chrono::Saturday
  };

  for (chrono::weekday wd : ar) {
    std::cout << wd << std::endl;
  }
}
```
- chrono::Sunday[link /reference/chrono/weekday_constants.md]
- chrono::Monday[link /reference/chrono/weekday_constants.md]
- chrono::Tuesday[link /reference/chrono/weekday_constants.md]
- chrono::Wednesday[link /reference/chrono/weekday_constants.md]
- chrono::Thursday[link /reference/chrono/weekday_constants.md]
- chrono::Friday[link /reference/chrono/weekday_constants.md]
- chrono::Saturday[link /reference/chrono/weekday_constants.md]

### 出力
```
Sun
Mon
Tue
Wed
Thu
Fri
Sat
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
