# year_month
* chrono[meta header]
* std::chrono[meta namespace]
* class[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  class year_month;
}
```

## 概要
`year_month`は、年と月を表すカレンダー表現のためクラスである。

このクラスは、年、および月に関する演算に対応している。

このクラスは等値比較および大小比較ができ、[EqualityComparable](/reference/concepts/equality_comparable.md)およびLessThanComparableの要件を満たす。

このクラスは、[トリビアルコピー可能](/reference/type_traits/is_trivially_copyable.md)で、かつ[スタンダードレイアウト型](/reference/type_traits/is_standard_layout.md)である。


## メンバ関数
### 構築／コピー／破棄

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`(constructor)`](year_month/op_constructor.md) | コンストラクタ | C++20 |
| `year_month& operator=(const year_month&) = default;`<br/> `year_month& operator=(year_month&&) = default;` | 代入演算子 | C++20 |


### 算術演算

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator+=`](year_month/op_plus_assign.md)  | 加算の複合代入 | C++20 |
| [`operator-=`](year_month/op_minus_assign.md) | 減算の複合代入 | C++20 |


### 観測

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`year`](year_month/year.md)   | 年要素を取得する | C++20 |
| [`month`](year_month/month.md) | 月要素を取得する | C++20 |


### 検証

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`ok`](year_month/ok.md) | 値が範囲に収まっているか判定する | C++20 |


## 非メンバ関数
### カレンダー構文演算子

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator/`](month_day/op_append.md) | カレンダー要素同士をつなぎ合わせる | C++20 |


### 算術演算

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator+`](year_month/op_plus.md)  | 加算 | C++20 |
| [`operator-`](year_month/op_minus.md) | 減算 | C++20 |


### 比較演算

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator==`](year_month/op_equal.md) | 等値比較を行う | C++20 |
| `bool operator!=(const year_month&, const year_month&) noexcept;` | 非等値比較を行う (`==`により使用可能) | C++20 |
| [`operator<=>`](year_month/op_compare_3way.md) | 三方比較を行う | C++20 |
| `bool operator<(const year_month&, const year_month&) noexcept;` | 左辺が右辺より小さいかを判定する (`<=>`により使用可能) | C++20 |
| `bool operator<=(const year_month&, const year_month&) noexcept;` | 左辺が右辺以下を判定する (`<=>`により使用可能) | C++20 |
| `bool operator>(const year_month&, const year_month&) noexcept;` | 左辺が右辺より大きいかを判定する (`<=>`により使用可能) | C++20 |
| `bool operator>=(const year_month&, const year_month&) noexcept;` | 左辺が右辺以上を判定する (`<=>`により使用可能) | C++20 |


### 入出力

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator<<`](year_month/op_ostream.md)   | 出力ストリームに出力する | C++20 |
| [`from_stream`](year_month/from_stream.md) | フォーマット指定して入力ストリームから入力する | C++20 |


## 文字列フォーマット

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`formatter`](year_month/formatter.md) | [`std::formatter`](/reference/format/formatter.md)クラスの特殊化 | C++20 |


## 例
```cpp example
#include <iostream>
#include <chrono>

namespace chrono = std::chrono;
using namespace std::chrono_literals;

int main()
{
  // すべて2020年3月を表す
  chrono::year_month date1 = 2020y/3;
  chrono::year_month date2 = 2020y/chrono::March;

  // 各カレンダー要素のコンストラクタはexplicitなので、
  // 指定順は年、月で決まっているが、int値は指定できない
  chrono::year_month date3{2020y, chrono::March};
  chrono::year_month date4{chrono::year{2020}, chrono::month{3}};

  std::cout << date1 << std::endl;
  std::cout << date2 << std::endl;
  std::cout << date3 << std::endl;
  std::cout << date4 << std::endl;
}
```
* 2020y[link year/op_y.md]
* chrono::March[link month_constants.md]
* chrono::year[link year.md]
* chrono::month[link month.md]

### 出力
```
2020/Mar
2020/Mar
2020/Mar
2020/Mar
```


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 8.0 (入出力ストリームなし) [mark verified]
- [GCC](/implementation.md#gcc): 11.1 (入出力ストリームなし) [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]
