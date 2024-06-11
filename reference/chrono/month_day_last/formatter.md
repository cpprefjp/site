# formatter
* chrono[meta header]
* std[meta namespace]
* class[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class charT>
  struct formatter<chrono::month_day_last, charT>;
}
```

## 概要
`month_day_last`クラスに対する[`std::formatter`](/reference/format/formatter.md)クラステンプレートの特殊化。

フォーマットフラグとしては、[`month`](/reference/chrono/month/formatter.md)で利用可能なフォーマットフラグを使用できる。


## 例
```cpp example
#include <iostream>
#include <chrono>
#include <format>

namespace chrono = std::chrono;

int main() {
  chrono::month_day_last date = chrono::March/chrono::last;

  // デフォルトフォーマットはoperator<<と同じ
  std::cout << std::format("1 : {}", date) << std::endl;

  std::cout << std::format("2 : {:%B}", date) << std::endl;
  std::cout << std::format("3 : {:%m}", date) << std::endl;
  std::cout << std::format("4 : {:%m月}", date) << std::endl;

  // ロケール依存の出力
  std::cout << std::format(std::locale("ja_JP.UTF-8"), "5 : {:%b}", date) << std::endl;
}
```
* std::format[link /reference/chrono/format.md]
* std::locale[link /reference/locale/locale.md]
* chrono::March[link /reference/chrono/month_constants.md]

### 出力
```
1 : Mar/last
2 : March
3 : 03
4 : 03月
5 : 3月
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
