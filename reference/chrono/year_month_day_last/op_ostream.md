# operator<<
* chrono[meta header]
* std::chrono[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  template <class charT, class traits>
  std::basic_ostream<charT, traits>&
    operator<<(std::basic_ostream<charT, traits>& os, const year_month_day_last& ymdl); // (1) C++20
}
```

## 概要
`year_month_day_last`オブジェクトを出力ストリームに出力する。


## 戻り値
便宜上のリテラルキャスト`STATICALLY-WIDEN`を導入する。`STATICALLY-WIDEN<charT>("...")`は、`charT`が`char`である場合は`"..."`、`charT`が`wchar_t`である場合は`L"..."`を意味する。

- (1) : 以下と等価：
    ```cpp
    return os << format(os.getloc(), STATICALLY-WIDEN<charT>("{:L}/{:L}"),
                        ymdl.year(), ymdl.month_day_last());
    ```
    * format[link /reference/format/format.md]
    * os.getloc()[link /reference/ios/ios_base/getloc.md]
    * ymdl.year()[link year.md]
    * ymdl.month_day_last()[link month_day_last.md]


## 例
```cpp example
#include <iostream>
#include <chrono>

using std::chrono::last;
using namespace std::chrono_literals;

int main()
{
  std::cout << 2020y/2/last << std::endl;
}
```
* 2020y[link /reference/chrono/year/op_y.md]
* last[link /reference/chrono/last_spec.md]

### 出力
```
2020/Feb/last
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

