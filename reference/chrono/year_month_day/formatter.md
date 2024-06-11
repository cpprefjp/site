# formatter
* chrono[meta header]
* std[meta namespace]
* class[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class charT>
  struct formatter<chrono::year_month_day, charT>;
}
```

## 概要
`year_month_day`クラスに対する[`std::formatter`](/reference/format/formatter.md)クラステンプレートの特殊化。

フォーマットフラグとしては、以下を使用できる：

| フォーマットフラグ | 説明 |
|--------------------|------|
| `%D` | `%m/%d/%y`と等価 |
| `%F` | `%Y-%m-%d`と等価 |
| `%j` | 年の日 (1月1日を`001`とした経過日) |
| `%x` | ロケール依存の日付表現 |
| `%Ex` | `%x`の異なる表現 |

その他、[`day`](/reference/chrono/day/formatter.md)、[`month`](/reference/chrono/month/formatter.md)、[`year`](/reference/chrono/year/formatter.md)で利用可能なフォーマットフラグを使用できる。


## 例
```cpp example
#include <iostream>
#include <chrono>
#include <format>

namespace chrono = std::chrono;
using namespace std::chrono_literals;

int main() {
  chrono::year_month_day date = 2020y/3/1;

  // デフォルトフォーマットはoperator<<と同じ
  std::cout << std::format("1 : {}", date) << std::endl;

  std::cout << std::format("2 : {:%D}", date) << std::endl;
  std::cout << std::format("3 : {:%F}", date) << std::endl;
  std::cout << std::format("4 : {:%x}", date) << std::endl;
  std::cout << std::format("5 : {:%Y年%m月%d日}", date) << std::endl;

  // ロケール依存の出力
  std::cout << std::format(std::locale("ja_JP.UTF-8"), "6 : {:%x}", date) << std::endl;
  std::cout << std::format(std::locale("ja_JP.UTF-8"), "7 : {:%Ex}", date) << std::endl;
}
```
* std::format[link /reference/chrono/format.md]
* std::locale[link /reference/locale/locale.md]
* 2020y[link /reference/chrono/year/op_y.md]

### 出力
```
1 : 2020-03-01
2 : Mar/01/2020
3 : 2020-03-01
4 : 03/01/20
5 : 2020年03月01日
6 : 2020年03月01日
7 : 令和02年03月01日
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
