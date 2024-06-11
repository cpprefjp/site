# weekday_last
* chrono[meta header]
* std::chrono[meta namespace]
* class[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  class weekday_last;
}
```

## 概要
`weekday_last`は、月内での指定した最終曜日を表すクラスである。

このクラスは等値比較ができ、[EqualityComparable](/reference/concepts/equality_comparable.md)の要件を満たす。しかし大小比較はできず、LessThanComparable要件は満たさない。

このクラスは、[トリビアルコピー可能](/reference/type_traits/is_trivially_copyable.md)で、かつ[スタンダードレイアウト型](/reference/type_traits/is_standard_layout.md)である。


## メンバ関数
### 構築／コピー／破棄

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`(constructor)`](weekday_last/op_constructor.md) | コンストラクタ | C++20 |
| `weekday_last& operator=(const weekday_last&) = default;`<br/> `weekday_last& operator=(weekday_last&&) = default;` | 代入演算子 | C++20 |


### 観測

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`weekday`](weekday_last/weekday.md) | 曜日を取得する | C++20 |
| [`ok`](weekday_last/ok.md) | 値が範囲に収まっているか判定する | C++20 |


## 非メンバ関数
### 比較演算

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator==`](weekday_last/op_equal.md) | 等値比較を行う | C++20 |
| `bool operator!=(const weekday_last&, const weekday_last&) noexcept;` | 非等値比較を行う (`==`により使用可能) | C++20 |


### 入出力

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator<<`](weekday_last/op_ostream.md) | 出力ストリームに出力する | C++20 |


## 文字列フォーマット

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`formatter`](weekday_last/formatter.md) | [`std::formatter`](/reference/format/formatter.md)クラスの特殊化 | C++20 |


## 例
```cpp example
#include <cassert>
#include <iostream>
#include <chrono>

namespace chrono = std::chrono;
using namespace std::chrono_literals;

int main() {
  // 未規定の年月の、最後の日曜日
  auto wl1 = chrono::Sunday[chrono::last];
  chrono::weekday_last wl2{chrono::Sunday};
  assert(wl1.weekday() == chrono::Sunday);
  assert(wl1 == wl2);

  // 2020年4月の最後の日曜日を取得する
  chrono::year_month_weekday_last ymwl = 2020y/4/chrono::Sunday[chrono::last];
  chrono::sys_days sd{ymwl};
  chrono::year_month_day date{sd};
  std::cout << date << std::endl;
}
```
* chrono::weekday_last[color ff0000]
* chrono::Sunday[link weekday_constants.md]
* chrono::last[link last_spec.md]
* 2020y[link year/op_y.md]
* wl1.weekday()[link weekday_indexed/weekday.md]
* chrono::year_month_weekday_last[link year_month_weekday_last.md]
* chrono::sys_days[link sys_time.md]
* chrono::year_month_day[link year_month_day.md]

### 出力
```
2020-04-26
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 8.0 (入出力ストリームなし) [mark verified]
- [GCC](/implementation.md#gcc): 10.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]

