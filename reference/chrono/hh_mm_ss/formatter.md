# formatter
* chrono[meta header]
* std[meta namespace]
* class[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class charT>
  struct formatter<chrono::hh_mm_ss, charT>;
}
```

## 概要
`hh_mm_ss`クラスに対する[`std::formatter`](/reference/format/formatter.md)クラステンプレートの特殊化。

フォーマットフラグとしては、以下を使用できる：

| フォーマットフラグ | 説明 |
|--------------------|------|
| `%H`  | 24時間時計での10進数の時 |
| `%I`  | 12時間時計での10進数の時 |
| `%M`  | 10進数での分 |
| `%S`  | 10進数での秒 (秒未満を含む) |
| `%p`  | 12時間時計でのロケール依存の午前・午後の表現 |
| `%R`  | `%H:%M`と等価 |
| `%r`  | 12時間時計でのロケール依存の時間 |
| `%T`  | `%H:%M:%S`と等価 |
| `%X`  | ロケール依存の時間表現 |
| `%EX` | ロケール依存の別な時間表現 |


## 例
```cpp example
#include <iostream>
#include <chrono>
#include <format>

namespace chrono = std::chrono;
using namespace std::chrono_literals;

int main() {
  chrono::hh_mm_ss time{15h + 30min + 20s};

  // デフォルトフォーマットはoperator<<と同じ
  std::cout << std::format("1 : {}", time) << std::endl;

  std::cout << std::format("2 : {:%H時%M分%S秒}", time) << std::endl;
  std::cout << std::format("3 : {:%R}", time) << std::endl;
  std::cout << std::format("4 : {:%T}", time) << std::endl;

  // ロケール依存の出力
  std::cout << std::format(std::locale("ja_JP.UTF-8"), "5 : {:%p%I時%M分%S秒}", time) << std::endl;
  std::cout << std::format(std::locale("ja_JP.UTF-8"), "6 : {:%r}", time) << std::endl;
  std::cout << std::format(std::locale("ja_JP.UTF-8"), "7 : {:%X}", time) << std::endl;
}
```
* std::format[link /reference/chrono/format.md]
* std::locale[link /reference/locale/locale.md]
* 15h[link /reference/chrono/duration/op_h.md]
* 30min[link /reference/chrono/duration/op_min.md]
* 20s[link /reference/chrono/duration/op_s.md]

### 出力
```
1 : 15:30:20
2 : 15時30分20秒
3 : 15:30
4 : 15:30:20
5: 午後03時30分20秒
6: 午後03時30分20秒
7: 15時30分20秒
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
