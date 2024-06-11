# value
* chrono[meta header]
* std::chrono[meta namespace]
* leap_second[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr seconds value() const noexcept; // (1) C++20
```

## 概要
挿入されたうるう秒の値を取得する。


## 戻り値
`+`[`1s`](/reference/chrono/duration/op_s.md)は正のうるう秒、`-`[`1s`](/reference/chrono/duration/op_s.md)は負のうるう秒を表す。


## 備考
- 2019年までに挿入されたすべてのうるう秒は、正のうるう秒だった


## 例
```cpp example
#include <cassert>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
  for (const chrono::leap_seconds date : chrono::get_tzdb().leap_seconds) {
    chrono::seconds value = date.value();
    std::cout << date.date() << << ": " << value << std::endl;
  }
}
```
* value()[color ff0000]
* chrono::get_tzdb()[link /reference/chrono/get_tzdb.md]
* date.date()[link date.md]

### 出力例
```
1972-07-01 00:00:00: 1s
1973-01-01 00:00:00: 1s
1974-01-01 00:00:00: 1s
1975-01-01 00:00:00: 1s
1976-01-01 00:00:00: 1s
1977-01-01 00:00:00: 1s
1978-01-01 00:00:00: 1s
1979-01-01 00:00:00: 1s
1980-01-01 00:00:00: 1s
1981-07-01 00:00:00: 1s
1982-07-01 00:00:00: 1s
1983-07-01 00:00:00: 1s
1985-07-01 00:00:00: 1s
1988-01-01 00:00:00: 1s
1990-01-01 00:00:00: 1s
1991-01-01 00:00:00: 1s
1992-07-01 00:00:00: 1s
1993-07-01 00:00:00: 1s
1994-07-01 00:00:00: 1s
1996-01-01 00:00:00: 1s
1997-07-01 00:00:00: 1s
1999-01-01 00:00:00: 1s
2006-01-01 00:00:00: 1s
2009-01-01 00:00:00: 1s
2012-07-01 00:00:00: 1s
2015-07-01 00:00:00: 1s
2017-01-01 00:00:00: 1s
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0 [mark noimpl]
- [GCC](/implementation.md#gcc): 9.2 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]


## 参照
- [LWG Issue 3359. `<chrono>` leap second support should allow for negative leap seconds](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p2117r0.html#3359)
