# operator<<
* chrono[meta header]
* std::chrono[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  template <class charT, class traits>
  std::basic_ostream<charT, traits>&
    operator<<(std::basic_ostream<charT, traits>& os, const month& m); // (1) C++20
}
```

## 概要
`month`オブジェクトを出力ストリームに出力する。


## 戻り値
便宜上のリテラルキャスト`STATICALLY-WIDEN`を導入する。`STATICALLY-WIDEN<charT>("...")`は、`charT`が`char`である場合は`"..."`、`charT`が`wchar_t`である場合は`L"..."`を意味する。

- (1) : 以下と等価：
    ```cpp
    return os << (m.ok() ?
      format(os.getloc(), STATICALLY-WIDEN<charT>("{:L%b}"), m) :
      format(os.getloc(), STATICALLY-WIDEN<charT>("{} is not a valid month"),
             static_cast<unsigned int>(m)));
    ```
    * format[link /reference/format/format.md]
    * os.getloc()[link /reference/ios/ios_base/getloc.md]


## 備考
- このフォーマットでは、ロケール規定の月の短縮名が出力される。デフォルトのCロケールでは、以下のように出力される：

| 月の定数 | 出力される月名 (Cロケール) |
|----------|----------------------------|
| `January`  | Jan |
| `February` | Feb |
| `March`    | Mar |
| `April`    | Apr |
| `May`      | May |
| `June`     | Jun |
| `July`     | Jul |
| `August`   | Aug |
| `Sptember` | Sep |
| `October`  | Oct |
| `November` | Nov |
| `December` | Dec |


## 例
```cpp example
#include <iostream>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
  chrono::month ar[] = {
    chrono::January,
    chrono::February,
    chrono::March,
    chrono::April,
    chrono::May,
    chrono::June,
    chrono::July,
    chrono::August,
    chrono::September,
    chrono::October,
    chrono::November,
    chrono::December
  };

  for (chrono::month m : ar) {
    std::cout << m << std::endl;
  }
}
```
* chrono::January[link /reference/chrono/month_constants.md]
* chrono::February[link /reference/chrono/month_constants.md]
* chrono::March[link /reference/chrono/month_constants.md]
* chrono::April[link /reference/chrono/month_constants.md]
* chrono::May[link /reference/chrono/month_constants.md]
* chrono::June[link /reference/chrono/month_constants.md]
* chrono::July[link /reference/chrono/month_constants.md]
* chrono::August[link /reference/chrono/month_constants.md]
* chrono::September[link /reference/chrono/month_constants.md]
* chrono::October[link /reference/chrono/month_constants.md]
* chrono::November[link /reference/chrono/month_constants.md]
* chrono::December[link /reference/chrono/month_constants.md]

### 出力
```
Jan
Feb
Mar
Apr
May
Jun
Jul
Aug
Sep
Oct
Nov
Dec
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0 [mark noimpl]
- [GCC](/implementation.md#gcc): 9.2 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]


## 関連項目
- [chronoの`std::format()`](/reference/chrono/format.md) (フォーマットの詳細)


## 参照
- [P2372R1 Fixing locale handling in chrono formatters](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2372r1.html)
    - この提案文書はC++20の策定後に採択されたが、実装が追いついていない時期の採択だったために、C++20の仕様として扱われる
