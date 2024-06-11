# operator<<
* chrono[meta header]
* std::chrono[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  template <class charT, class traits>
  std::basic_ostream<charT, traits>&
    operator<<(std::basic_ostream<charT, traits>& os, const weekday_indexed& wdi); // (1) C++20
}
```

## 概要
`weekday_indexed`オブジェクトを出力ストリームに出力する。


## 戻り値
便宜上のリテラルキャスト`STATICALLY-WIDEN`を導入する。`STATICALLY-WIDEN<charT>("...")`は、`charT`が`char`である場合は`"..."`、`charT`が`wchar_t`である場合は`L"..."`を意味する。

- (1) : 以下と等価：
    ```cpp
    auto i = wdi.index();
    return os << (i >= 1 && i <= 5 ?
      format(os.getloc(), STATICALLY-WIDEN<charT>("{:L}[{}]"), wdi.weekday(), i) :
      format(os.getloc(), STATICALLY-WIDEN<charT>("{:L}[{} is not a valid index]"),
             wdi.weekday(), i));
    ```
    * wdi.index()[link index.md]
    * format[link /reference/chrono/format.md]
    * wdi.weekday()[link weekday.md]
    * os.getloc()[link /reference/ios/ios_base/getloc.md]


## 例
```cpp example
#include <iostream>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
  std::cout << chrono::Sunday[1] << std::endl;
}
```
* chrono::Sunday[link /reference/chrono/weekday_constants.md]

### 出力
```
Sun[1]
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

