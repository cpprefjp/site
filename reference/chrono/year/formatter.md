# formatter
* chrono[meta header]
* std[meta namespace]
* class[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class charT>
  struct formatter<chrono::year, charT>;
}
```

## 概要
`year`クラスに対する[`std::formatter`](/reference/format/formatter.md)クラステンプレートの特殊化。

フォーマットフラグとしては、以下を使用できる：

| フォーマットフラグ | 説明 |
|--------------------|------|
| `%C`  | 100で切り下げ除算した2桁0埋め10進数の年 (世紀) |
| `$EC` | ロケール依存の世紀の異なる表現 (日本だと元号 `"令和"`) |
| `%g`  | ISOの週ベースのうしろ2桁0埋め10進数の年 |
| `%G`  | ISOの週ベースの4桁0埋め10進数の年 |
| `%y`  | うしろ2桁0埋め10進数の年 |
| `%Ey` | ロケール依存の世紀からのオフセット年 (日本だと元号ベースで`"02年"`) |
| `%Y`  | 4桁0埋め10進数の年 |
| `%EY` | ロケール依存の完全な年 (日本だと元号含めて`"令和02年"`) |


## 例
```cpp example
#include <iostream>
#include <chrono>
#include <format>

namespace chrono = std::chrono;

int main()
{
  // デフォルトフォーマットはoperator<<と同じ
  std::cout << std::format("{}", chrono::year{2020}) << std::endl;

  std::cout << std::format("{:%Y}", chrono::year{2020}) << std::endl; // 4桁の年
  std::cout << std::format("{:%y}", chrono::year{2020}) << std::endl; // うしろ2桁の年

  // ロケール依存の出力
  std::cout << std::format(std::locale("ja_JP.UTF-8"), "{:%EC}", chrono::year{2020}) << std::endl;
  std::cout << std::format(std::locale("ja_JP.UTF-8"), "{:%Ey}", chrono::year{2020}) << std::endl;
  std::cout << std::format(std::locale("ja_JP.UTF-8"), "{:%EY}", chrono::year{2020}) << std::endl;
}
```
- std::format[link /reference/chrono/format.md]

### 出力
```
2020
2020
20
令和
02年
令和02年
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
