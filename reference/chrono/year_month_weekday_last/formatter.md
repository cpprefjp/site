# formatter
* chrono[meta header]
* std[meta namespace]
* class[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class charT>
  struct formatter<chrono::year_month_weekday_last, charT>;
}
```

## 概要
`year_month_weekday_last`クラスに対する[`std::formatter`](/reference/format/formatter.md)クラステンプレートの特殊化。

[`month`](/reference/chrono/month/formatter.md)、[`year`](/reference/chrono/year/formatter.md)で利用可能なフォーマットフラグを使用できる。


## 例
```cpp example
#include <iostream>
#include <chrono>
#include <format>

namespace chrono = std::chrono;
using namespace std::chrono_literals;

int main() {
  chrono::year_month_weekday_last date = 2020y/2/chrono::Sunday[chrono::last];

  // デフォルトフォーマットはoperator<<と同じ
  std::cout << std::format("1 : {}", date) << std::endl;

  std::cout << std::format("2 : {:%Y/%b}", date) << std::endl;
  std::cout << std::format("3 : {:%Y年%m月}", date) << std::endl;
}
```
* std::format[link /reference/chrono/format.md]
* 2020y[link /reference/chrono/year/op_y.md]
* chrono::Sunday[link /reference/chrono/weekday_constants.md]
* chrono::last[link /reference/chrono/last_spec.md]

### 出力
```
1 : 2020/Feb/Sun[last]
2 : 2020/Feb
3 : 2020年02月
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0 [mark noimpl]
- [GCC](/implementation.md#gcc): 9.2 [mark noimpl], 15.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]


## 関連項目
- [chronoの`std::format()`](/reference/chrono/format.md) (フォーマットの詳細)
