# formatter
* chrono[meta header]
* std[meta namespace]
* class[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class charT>
  struct formatter<chrono::month, charT>;
}
```

## 概要
`month`クラスに対する[`std::formatter`](/reference/format/formatter.md)クラステンプレートの特殊化。

フォーマットフラグとしては、以下を使用できる：

| フォーマットフラグ | 説明 |
|--------------------|------|
| `%b` | ロケール依存の月の略称 |
| `%B` | ロケール依存の月の完全名 |
| `%h` | `%b`と等価 |
| `%m` | 10進数での月。2桁0埋め |


## 例
```cpp example
#include <iostream>
#include <chrono>
#include <format>

namespace chrono = std::chrono;

int main()
{
  // デフォルトフォーマットはoperator<<と同じ
  std::cout << std::format("{}", chrono::April) << std::endl;

  std::cout << std::format("{:%b}", chrono::April) << std::endl; // 略称
  std::cout << std::format("{:%B}", chrono::April) << std::endl; // 完全名
  std::cout << std::format("{:%m}", chrono::April) << std::endl; // 完全名

  // ロケール依存の出力
  std::cout << std::format(std::locale("ja_JP.UTF-8"), "{:%b}", chrono::April) << std::endl;
  std::cout << std::format(std::locale("ja_JP.UTF-8"), "{:%B}", chrono::April) << std::endl;
}
```
* std::format[link /reference/chrono/format.md]
* chrono::April[link /reference/chrono/month_constants.md]
* std::locale[link /reference/locale/locale.md]

### 出力
```
Apr
Apr
April
04
4月
4月
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
