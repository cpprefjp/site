# formatter
* chrono[meta header]
* std[meta namespace]
* class[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class charT>
  struct formatter<chrono::weekday_indexed, charT>;
}
```

## 概要
`weekday_indexed`クラスに対する[`std::formatter`](/reference/format/formatter.md)クラステンプレートの特殊化。

フォーマットフラグとしては、以下を使用できる：

| フォーマットフラグ | 説明 |
|--------------------|------|
| `%a` | ロケール依存の曜日の略称 |
| `%A` | ロケール依存の曜日の完全名 |
| `%u` | 10進数での月曜を1とするISO曜日番号 (1-7) |
| `%Ou` | ロケール依存の`%u`の異なる表現 |
| `%w` | 10進数での日曜を0とするISO曜日番号 (0-6) |


## 例
```cpp example
#include <iostream>
#include <chrono>
#include <format>

namespace chrono = std::chrono;

int main()
{
  // デフォルトフォーマットはoperator<<と同じ
  std::cout << std::format("{}", chrono::Sunday[1]) << std::endl;

  std::cout << std::format("{:%a}", chrono::Sunday[1]) << std::endl; // 曜日の略称
  std::cout << std::format("{:%A}", chrono::Sunday[1]) << std::endl; // 曜日の完全名

  // ロケール依存の出力
  std::cout << std::format(std::locale("ja_JP.UTF-8"), "{}", chrono::Sunday[1]) << std::endl;
  std::cout << std::format(std::locale("ja_JP.UTF-8"), "{:%a}", chrono::Sunday[1]) << std::endl;
  std::cout << std::format(std::locale("ja_JP.UTF-8"), "{:%A}", chrono::Sunday[1]) << std::endl;
}
```
* std::format[link /reference/chrono/format.md]
* chrono::Sunday[link /reference/chrono/weekday_constants.md]
* std::locale[link /reference/locale/locale.md]

### 出力
```
Sun[1]
Sun
Sunday
日[1]
日
日曜日
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
