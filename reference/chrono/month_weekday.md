# month_weekday
* chrono[meta header]
* std::chrono[meta namespace]
* class[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  class month_weekday;
}
```

## 概要
`month_weekday`は、未規定の年の、月の指定したN回目の曜日を表すカレンダー表現のためクラスである。

年が規定されないために、このクラスでは月の指定したN回目の曜日が何日なのかは取得できない。年情報を付加して[`year_month_weekday`](year_month_weekday.md)クラスに変換し、そこからシステム時間もしくはローカル時間に変換するか、そこからさらに[`year_month_day`](year_month_day.md)クラスに変換することで日を取得できる。

このクラスは等値比較ができ、[EqualityComparable](/reference/concepts/equality_comparable.md)の要件を満たす。

このクラスは、[トリビアルコピー可能](/reference/type_traits/is_trivially_copyable.md)で、かつ[スタンダードレイアウト型](/reference/type_traits/is_standard_layout.md)である。


## メンバ関数
### 構築／コピー／破棄

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`(constructor)`](month_weekday/op_constructor.md) | コンストラクタ | C++20 |
| `month_weekday& operator=(const month_weekday&) = default;`<br/> `month_weekday& operator=(month_weekday&&) = default;` | 代入演算子 | C++20 |


### 観測

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`month`](month_weekday/month.md) | 月要素を取得する | C++20 |
| [`weekday_indexed`](month_weekday/weekday_indexed.md) | インデックス付き曜日要素を取得する | C++20 |


### 検証

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`ok`](month_weekday/ok.md) | 値が範囲に収まっているか判定する | C++20 |


## 非メンバ関数
### カレンダー構文演算子

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator/`](month_weekday/op_append.md) | カレンダー要素同士をつなぎ合わせる | C++20 |


### 比較演算

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator==`](month_weekday/op_equal.md) | 等値比較を行う | C++20 |
| `bool operator!=(const month_weekday&, const month_weekday&) noexcept;` | 非等値比較を行う (`==`により使用可能) | C++20 |


### 入出力

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator<<`](month_weekday/op_ostream.md) | 出力ストリームに出力する | C++20 |


## 文字列フォーマットサポート

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`formatter`](month_weekday/formatter.md) | [`std::formatter`](/reference/format/formatter.md)クラスの特殊化 | C++20 |


## ハッシュサポート

| 名前  | 説明               | 対応バージョン |
|-------|--------------------|----------------|
| `template <class T> struct hash;` | `hash`クラスの先行宣言 | C++26 |
| `template<> struct hash<chrono::month_weekday>;` | `hash`クラスの`month_weekday`に対する特殊化 | C++26 |


## 例
```cpp example
#include <iostream>
#include <chrono>

namespace chrono = std::chrono;
using namespace std::chrono_literals;

int main()
{
  // すべて3月の1回目の日曜日を表す
  chrono::month_weekday date1 = chrono::March/chrono::Sunday[1];
  chrono::month_weekday date2 = 3/chrono::Sunday[1];
  chrono::month_weekday date3 = chrono::Sunday[1]/chrono::March;
  chrono::month_weekday date4 = chrono::Sunday[1]/3;

  // 各カレンダー要素のコンストラクタはexplicitなので、
  // 指定順は月、N回目の曜日で決まっているが、int値は指定できない
  chrono::month_weekday date5{chrono::March, chrono::Sunday[1]};
  chrono::month_weekday date6{chrono::month{3}, chrono::weekday_indexed{chrono::Sunday, 1}};

  std::cout << date1 << std::endl;
  std::cout << date2 << std::endl;
  std::cout << date3 << std::endl;
  std::cout << date4 << std::endl;
  std::cout << date5 << std::endl;
  std::cout << date6 << std::endl;

  // 2020年3月の1回目の日曜日が何日かを取得する
  chrono::year_month_weekday ymwd = 2020y/chrono::March/chrono::Sunday[1];
  chrono::year_month_day ymd{static_cast<chrono::sys_days>(ymwd)};
  std::cout << ymd << std::endl;
}
```
* chrono::March[link month_constants.md]
* chrono::Sunday[link weekday_constants.md]
* chrono::month[link month.md]
* chrono::weekday_indexed[link weekday_indexed.md]
* chrono::year_month_weekday[link year_month_weekday.md]
* chrono::sys_days[link sys_time.md]
* chrono::year_month_day[link year_month_day.md]

### 出力
```
Mar/Sun[1]
Mar/Sun[1]
Mar/Sun[1]
Mar/Sun[1]
Mar/Sun[1]
Mar/Sun[1]
2020/03/01
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 8.0 (出力ストリームなし) [mark verified]
- [GCC](/implementation.md#gcc): 11.1 (出力ストリームなし) [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]


## 参照
- [P2592R3 Hashing support for `std::chrono` value classes](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2592r3.html)
    - C++26でハッシュサポートが追加された
