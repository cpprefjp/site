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
便宜上のリテラルキャスト`STATICALLY-WIDEN`を導入する。`STATICALLY-WIDEN<charT>("...")`は、`charT`が`char`である場合は`"..."`、`charT`が`wchar_t`である場合は`L"..."`を意味する。

- (1) : 以下と等価：
    ```cpp
    return os << (m.ok() ?
      format(os.getloc(), STATICALLY-WIDEN<charT>("{:L%a}"), m) :
      format(os.getloc(), STATICALLY-WIDEN<charT>("{} is not a valid weekday"),
             static_cast<unsigned int>(m)));
    ```
    * format[link /reference/format/format.md]
    * os.getloc()[link /reference/ios/ios_base/getloc.md]


## 備考
- このフォーマットでは、ロケール規定の曜日の短縮名が出力される。デフォルトのCロケールでは、以下のように出力される：

| 曜日の定数  | 出力される曜日名 (Cロケール) |
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
* chrono::Sunday[link /reference/chrono/weekday_constants.md]
* chrono::Monday[link /reference/chrono/weekday_constants.md]
* chrono::Tuesday[link /reference/chrono/weekday_constants.md]
* chrono::Wednesday[link /reference/chrono/weekday_constants.md]
* chrono::Thursday[link /reference/chrono/weekday_constants.md]
* chrono::Friday[link /reference/chrono/weekday_constants.md]
* chrono::Saturday[link /reference/chrono/weekday_constants.md]

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
- [Clang](/implementation.md#clang): 9.0 [mark noimpl]
- [GCC](/implementation.md#gcc): 9.2 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]


## 関連項目
- [chronoの`std::format()`](/reference/chrono/format.md) (フォーマットの詳細)


## 参照
- [P2372R1 Fixing locale handling in chrono formatters](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2372r1.html)
    - この提案文書はC++20の策定後に採択されたが、実装が追いついていない時期の採択だったために、C++20の仕様として扱われる
