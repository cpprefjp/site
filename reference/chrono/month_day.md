# month_day
* chrono[meta header]
* std::chrono[meta namespace]
* class[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  class month_day;
}
```

## 概要
`month_day`は、未規定の年の、月と日を表すカレンダー表現のためクラスである。

このクラスは等値比較および大小比較ができ、[EqualityComparable](/reference/concepts/equality_comparable.md)およびLessThanComparableの要件を満たす。

このクラスは、[トリビアルコピー可能](/reference/type_traits/is_trivially_copyable.md)で、かつ[スタンダードレイアウト型](/reference/type_traits/is_standard_layout.md)である。


## メンバ関数
### 構築／コピー／破棄

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`(constructor)`](month_day/op_constructor.md) | コンストラクタ | C++20 |
| `month_day& operator=(const month_day&) = default;`<br/> `month_day& operator=(month_day&&) = default;` | 代入演算子 | C++20 |


### 観測

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`month`](month_day/month.md) | 月要素を取得する | C++20 |
| [`day`](month_day/day.md)     | 日要素を取得する | C++20 |


### 検証

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`ok`](month_day/ok.md) | 値が範囲に収まっているか判定する | C++20 |


## 非メンバ関数
### カレンダー構文演算子

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator/`](month_day/op_append.md) | カレンダー要素同士をつなぎ合わせる | C++20 |


### 比較演算

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator==`](month_day/op_equal.md) | 等値比較を行う | C++20 |
| `bool operator!=(const month_day&, const month_day&) noexcept;` | 非等値比較を行う (`==`により使用可能) | C++20 |
| [`operator<=>`](month_day/op_compare_3way.md) | 三方比較を行う | C++20 |
| `bool operator<(const month_day&, const month_day&) noexcept;` | 左辺が右辺より小さいかを判定する (`<=>`により使用可能) | C++20 |
| `bool operator<=(const month_day&, const month_day&) noexcept;` | 左辺が右辺以下を判定する (`<=>`により使用可能) | C++20 |
| `bool operator>(const month_day&, const month_day&) noexcept;` | 左辺が右辺より大きいかを判定する (`<=>`により使用可能) | C++20 |
| `bool operator>=(const month_day&, const month_day&) noexcept;` | 左辺が右辺以上を判定する (`<=>`により使用可能) | C++20 |


### 入出力

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator<<`](month_day/op_ostream.md)   | 出力ストリームに出力する | C++20 |
| [`from_stream`](month_day/from_stream.md) | フォーマット指定して入力ストリームから入力する | C++20 |


## 文字列フォーマット

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`formatter`](month_day/formatter.md) | [`std::formatter`](/reference/format/formatter.md)クラスの特殊化 | C++20 |


## 例
```cpp example
#include <iostream>
#include <chrono>

namespace chrono = std::chrono;
using namespace std::chrono_literals;

int main()
{
  // すべて3月1日を表す
  chrono::month_day date1 = 1d/3;
  chrono::month_day date2 = chrono::March/1;
  chrono::month_day date3 = 3/1d;

  // 各カレンダー要素のコンストラクタはexplicitなので、
  // 指定順は月、日で決まっているが、int値は指定できない
  chrono::month_day date4{chrono::March, 1d};
  chrono::month_day date5{chrono::month{3}, chrono::day{1}};

  std::cout << date1 << std::endl;
  std::cout << date2 << std::endl;
  std::cout << date3 << std::endl;
  std::cout << date4 << std::endl;
  std::cout << date5 << std::endl;
}
```
* chrono::March[link month_constants.md]
* 1d[link day/op_d.md]
* chrono::month[link month.md]
* chrono::day[link day.md]

### 出力
```
Mar/01
Mar/01
Mar/01
Mar/01
Mar/01
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 8.0 (入出力ストリームなし) [mark verified]
- [GCC](/implementation.md#gcc): 9.2 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]
