# month_weekday_last
* chrono[meta header]
* std::chrono[meta namespace]
* class[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  class month_weekday_last;
}
```

## 概要
`month_weekday_last`は、未規定の年の、月の指定した最終回目の曜日を表すカレンダー表現のためクラスである。

年が規定されないために、このクラスでは月の指定した最終回目の曜日が何日なのかは取得できない。年情報を付加して[`year_month_weekday_last`](year_month_weekday_last.md)クラスに変換し、そこからシステム時間もしくはローカル時間に変換するか、そこからさらに[`year_month_day`](year_month_day.md)クラスに変換することで日を取得できる。

このクラスは等値比較ができ、[EqualityComparable](/reference/concepts/equality_comparable.md)の要件を満たす。

このクラスは、[トリビアルコピー可能](/reference/type_traits/is_trivially_copyable.md)で、かつ[スタンダードレイアウト型](/reference/type_traits/is_standard_layout.md)である。


## メンバ関数
### 構築／コピー／破棄

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`(constructor)`](month_weekday_last/op_constructor.md) | コンストラクタ | C++20 |
| `month_weekday_last& operator=(const month_weekday_last&) = default;`<br/> `month_weekday_last& operator=(month_weekday_last&&) = default;` | 代入演算子 | C++20 |


### 観測

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`month`](month_weekday_last/month.md) | 月要素を取得する | C++20 |
| [`weekday_last`](month_weekday_last/weekday_last.md) | 最終曜日要素を取得する | C++20 |


### 検証

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`ok`](month_weekday_last/ok.md) | 値が範囲に収まっているか判定する | C++20 |


## 非メンバ関数
### カレンダー構文演算子

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator/`](month_weekday_last/op_append.md) | カレンダー要素同士をつなぎ合わせる | C++20 |


### 比較演算

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator==`](month_weekday_last/op_equal.md) | 等値比較を行う | C++20 |
| `bool operator!=(const month_weekday_last&, const month_weekday_last&) noexcept;` | 非等値比較を行う (`==`により使用可能) | C++20 |


### 入出力

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator<<`](month_weekday_last/op_ostream.md) | 出力ストリームに出力する | C++20 |


## 文字列フォーマットサポート

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`formatter`](month_weekday_last/formatter.md) | [`std::formatter`](/reference/format/formatter.md)クラスの特殊化 | C++20 |


## ハッシュサポート

| 名前  | 説明               | 対応バージョン |
|-------|--------------------|----------------|
| `template <class T> struct hash;` | `hash`クラスの先行宣言 | C++26 |
| `template<> struct hash<chrono::month_weekday_last>;` | `hash`クラスの`month_weekday_last`に対する特殊化 | C++26 |


## 例
```cpp example
#include <iostream>
#include <chrono>

using namespace std::chrono;

int main()
{
  // すべて3月の最終回目の日曜日を表す
  month_weekday_last date1 = March/Sunday[last];
  month_weekday_last date2 = 3/Sunday[last];
  month_weekday_last date3 = Sunday[last]/March;
  month_weekday_last date4 = Sunday[last]/3;

  // 各カレンダー要素のコンストラクタはexplicitなので、
  // 指定順は月、最終曜日で決まっているが、int値は指定できない
  month_weekday_last date5{March, Sunday[last]};
  month_weekday_last date6{month{3}, weekday_last{Sunday}};

  std::cout << date1 << std::endl;
  std::cout << date2 << std::endl;
  std::cout << date3 << std::endl;
  std::cout << date4 << std::endl;
  std::cout << date5 << std::endl;
  std::cout << date6 << std::endl;

  // 2020年3月の最終回目の日曜日が何日かを取得する
  year_month_weekday_last ymwdl = 2020y/March/Sunday[last];
  year_month_day ymd{static_cast<sys_days>(ymwdl)};
  std::cout << ymd << std::endl;
}
```
* March[link month_constants.md]
* Sunday[link weekday_constants.md]
* last[link last_spec.md]
* month[link month.md]
* weekday_last[link weekday_last.md]
* year_month_weekday_last[link year_month_weekday_last.md]
* sys_days[link sys_time.md]
* year_month_day[link year_month_day.md]

### 出力
```
Mar/Sun[last]
Mar/Sun[last]
Mar/Sun[last]
Mar/Sun[last]
Mar/Sun[last]
Mar/Sun[last]
2020/03/29
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
