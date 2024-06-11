# formatter
* chrono[meta header]
* std[meta namespace]
* class[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class charT>
  struct formatter<chrono::sys_info, charT>;
}
```

## 概要
`sys_info`クラスに対する[`std::formatter`](/reference/format/formatter.md)クラステンプレートの特殊化。

フォーマットフラグとしては、以下を使用できる：

| フォーマットフラグ | 説明 |
|--------------------|------|
| `%z`  | ISO 8601フォーマットでのUTCからのオフセット (日本だと`"+0900"`) |
| `%Ez` | オフセットの時と分の間にコロン (:) が挿入される (日本だと`"+09:00"`) |
| `%Oz` | `%Ez`と等価 |
| `%Z`  | タイムゾーンの略称 (日本だと`"JST"`) |


## 例
```cpp example
#include <iostream>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
  auto now = chrono::system_clock::now();

  // 日本のタイムゾーン
  const chrono::time_zone* tz = chrono::locate_zone("Asia/Tokyo");
  chrono::sys_info si = tz->get_info(now);

  // デフォルトフォーマットはoperator<<と同じ (フォーマット未規定)
  std::cout << std::format("{}", si) << std::endl;

  std::cout << std::format("{:%z}", si) << std::endl; // オフセット時間
  std::cout << std::format("{:%Z}", si) << std::endl; // タイムゾーンの略称
}
```
* chrono::system_clock[link /reference/chrono/system_clock.md]
* now()[link /reference/chrono/system_clock/now.md]
* chrono::time_zone[link /reference/chrono/time_zone.md]
* chrono::locate_zone[link /reference/chrono/locate_zone.md]
* std::format[link /reference/chrono/format.md]

### 出力例
```
(未検証の行)
+0900
JST
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0 [mark noimpl]
- [GCC](/implementation.md#gcc): 9.2 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]

