# day
* chrono[meta header]
* std::chrono[meta namespace]
* class[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  class day;
}
```

## 概要
`day`は、特定の月に属するわけではない、日単体の値を表すカレンダー表現のためクラスである。

通常は値の範囲として`[1, 31]`を扱うが、このクラスではその範囲外の値として`[0, 255]`まで扱える。

このクラスは等値比較および大小比較ができ、[EqualityComparable](/reference/concepts/equality_comparable.md)およびLessThanComparableの要件を満たす。

このクラスは、[トリビアルコピー可能](/reference/type_traits/is_trivially_copyable.md)で、かつ[スタンダードレイアウト型](/reference/type_traits/is_standard_layout.md)である。


### 備考
- このクラスは時間間隔を表す型ではない。日の時間間隔は[`days`](duration_aliases.md)である
- 加算と減算は、[`month`](month.md)や[`weekday`](weekday.md)と違い、`[1, 31]`の範囲では循環しない


## メンバ関数
### 構築／コピー／破棄

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`(constructor)`](day/op_constructor.md) | コンストラクタ | C++20 |
| `day& operator=(const day&) = default;`<br/> `day& operator=(day&&) = default;` | 代入演算子 | C++20 |


### 算術演算

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator++`](day/op_increment.md)    | インクリメント | C++20 |
| [`operator--`](day/op_decrement.md)    | デクリメント   | C++20 |
| [`operator+=`](day/op_plus_assign.md)  | 加算の複合代入 | C++20 |
| [`operator-=`](day/op_minus_assign.md) | 減算の複合代入 | C++20 |


### 変換

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator unsigned int`](day/op_unsigned_int.md) | `unsigned int`型への変換演算子 | C++20 |


### 検証

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`ok`](day/ok.md) | 値が範囲`[1, 31]`に収まっているか判定する | C++20 |


## 非メンバ関数
### 算術演算

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator+`](day/op_plus.md)  | 加算 | C++20 |
| [`operator-`](day/op_minus.md) | 減算 | C++20 |


### カレンダー構文演算子

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator/`](day/op_append.md) | カレンダー要素同士をつなぎ合わせる | C++20 |


### 比較演算

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator==`](day/op_equal.md)         | 等値比較を行う | C++20 |
| `bool operator!=(const day&, const day&) noexcept;` | 非等値比較を行う (`==`により使用可能) | C++20 |
| [`operator<=>`](day/op_compare_3way.md) | 三方比較を行う | C++20 |
| `bool operator<(const day&, const day&) noexcept;` | 左辺が右辺より小さいかを判定する (`<=>`により使用可能) | C++20 |
| `bool operator<=(const day&, const day&) noexcept;` | 左辺が右辺以下を判定する (`<=>`により使用可能) | C++20 |
| `bool operator>(const day&, const day&) noexcept;` | 左辺が右辺より大きいかを判定する (`<=>`により使用可能) | C++20 |
| `bool operator>=(const day&, const day&) noexcept;` | 左辺が右辺以上を判定する (`<=>`により使用可能) | C++20 |


### 入出力

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator<<`](day/op_ostream.md)   | 出力ストリームに出力する | C++20 |
| [`from_stream`](day/from_stream.md) | フォーマット指定して入力ストリームから入力する | C++20 |


### リテラル

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`d`](day/op_d.md) | 日リテラル | C++20 |


## 文字列フォーマット

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`formatter`](day/formatter.md) | [`std::formatter`](/reference/format/formatter.md)クラスの特殊化 | C++20 |


## 例
```cpp example
#include <iostream>
#include <chrono>

namespace chrono = std::chrono;

int main() {
  chrono::day d{1};
  ++d;
  std::cout << d << std::endl;

  chrono::day e{15};
  e += chrono::days{3};
  std::cout << e << std::endl;

  using namespace std::chrono_literals;
  chrono::month_day date = 3/1d; // 年の情報をもたない「3月1日」
  std::cout << date << std::endl;
}
```
* chrono::day[color ff0000]
* 1d[link day/op_d.md]
* month_day[link month_day.md]

### 出力
```
02
18
Mar/01
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 8.0 (入出力ストリームなし) [mark verified]
- [GCC](/implementation.md#gcc): 9.2 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]

