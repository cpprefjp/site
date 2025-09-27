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
                        STATICALLY-WIDEN<charT>("{:L%T}"),
                        hms);
    ```
    * format[link /reference/format/format.md]
    * os.getloc()[link /reference/ios/ios_base/getloc.md]


## 備考
- このクラスのオブジェクトを文字列フォーマットする場合、負数には先頭に`-` (マイナス) がつく


## 例
```cpp example
#include <iostream>
#include <chrono>

namespace chrono = std::chrono;
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
- [Clang](/implementation.md#clang): 10.0 [mark noimpl]
- [GCC](/implementation.md#gcc): 10.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]


## 関連項目
- [chronoの`std::format()`](/reference/chrono/format.md) (フォーマットの詳細)


## 参照
- [LWG Issue 3262. Formatting of negative durations is not specified](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p2117r0.html#3262)
- [P2372R1 Fixing locale handling in chrono formatters](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2372r1.html)
    - この提案文書はC++20の策定後に採択されたが、実装が追いついていない時期の採択だったために、C++20の仕様として扱われる
