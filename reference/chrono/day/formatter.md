# formatter
* chrono[meta header]
* std[meta namespace]
* class[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class charT>
  struct formatter<chrono::day, charT>;
}
```

## 概要
`day`クラスに対する[`std::formatter`](/reference/format/formatter.md)クラステンプレートの特殊化。


## 例
```cpp example
#include <iostream>
#include <chrono>
#include <format>

namespace chrono = std::chrono;

int main()
{
  // デフォルトフォーマットはoperator<<と同じ
  std::cout << std::format("{}", chrono::day{3}) << std::endl;

  std::cout << std::format("{:%d}", chrono::day{3}) << std::endl;
  std::cout << std::format("{:%e}", chrono::day{3}) << std::endl;
}
```
* std::format[link /reference/chrono/format.md]

### 出力
```
03
03
 3
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
