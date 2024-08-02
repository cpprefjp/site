# weekday_indexed
* chrono[meta header]
* std::chrono[meta namespace]
* class[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  class weekday_indexed;
}
```

## 概要
`weekday_indexed`は、月内でのN回目の指定した曜日を表すクラスである。

Nの妥当な範囲は`[1, 5]`である。0ベースではないことに注意。

このクラスは等値比較ができ、[EqualityComparable](/reference/concepts/equality_comparable.md)の要件を満たす。しかし大小比較はできず、LessThanComparable要件は満たさない。

このクラスは、[トリビアルコピー可能](/reference/type_traits/is_trivially_copyable.md)で、かつ[スタンダードレイアウト型](/reference/type_traits/is_standard_layout.md)である。


## メンバ関数
### 構築／コピー／破棄

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`(constructor)`](weekday_indexed/op_constructor.md) | コンストラクタ | C++20 |
| `weekday_indexed& operator=(const weekday_indexed&) = default;`<br/> `weekday_indexed& operator=(weekday_indexed&&) = default;` | 代入演算子 | C++20 |


### 観測

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`weekday`](weekday_indexed/weekday.md) | 曜日を取得する | C++20 |
| [`index`](weekday_indexed/index.md) | インデックスを取得する | C++20 |
| [`ok`](weekday_indexed/ok.md) | 値が範囲に収まっているか判定する | C++20 |


## 非メンバ関数
### 比較演算

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator==`](weekday_indexed/op_equal.md) | 等値比較を行う | C++20 |
| `bool operator!=(const weekday_indexed&, const weekday_indexed&) noexcept;` | 非等値比較を行う (`==`により使用可能) | C++20 |


### 入出力

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator<<`](weekday_indexed/op_ostream.md) | 出力ストリームに出力する | C++20 |


## 文字列フォーマットサポート

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`formatter`](weekday_indexed/formatter.md) | [`std::formatter`](/reference/format/formatter.md)クラスの特殊化 | C++20 |


## ハッシュサポート

| 名前  | 説明               | 対応バージョン |
|-------|--------------------|----------------|
| `template <class T> struct hash;` | `hash`クラスの先行宣言 | C++26 |
| `template<> struct hash<chrono::weekday_indexed>;` | `hash`クラスの`weekday_indexed`に対する特殊化 | C++26 |


## 例
```cpp example
#include <cassert>
#include <iostream>
#include <chrono>

namespace chrono = std::chrono;
using namespace std::chrono_literals;

int main() {
  // 未規定の年月の、最初の日曜日
  auto wi1 = chrono::Sunday[1];
  chrono::weekday_indexed wi2{chrono::Sunday, 1};
  assert(wi1.weekday() == chrono::Sunday);
  assert(wi1.index() == 1);
  assert(wi1 == wi2);

  // 2020年4月の最初の日曜日を取得する
  chrono::year_month_weekday ymw = 2020y/4/chrono::Sunday[1];
  chrono::sys_days sd{ymw};
  chrono::year_month_day date{sd};
  std::cout << date << std::endl;
}
```
* chrono::weekday_indexed[color ff0000]
* chrono::Sunday[link weekday_constants.md]
* 2020y[link year/op_y.md]
* wi1.weekday()[link weekday_indexed/weekday.md]
* wi1.index()[link weekday_indexed/index.md]
* chrono::year_month_weekday[link year_month_weekday.md]
* chrono::sys_days[link sys_time.md]
* chrono::year_month_day[link year_month_day.md]

### 出力
```
2020-04-05
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 8.0 (入出力ストリームなし) [mark verified]
- [GCC](/implementation.md#gcc): 10.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]


## 参照
- [P2592R3 Hashing support for `std::chrono` value classes](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2592r3.html)
    - C++26でハッシュサポートが追加された
