# month_day_last
* chrono[meta header]
* std::chrono[meta namespace]
* class[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  class month_day_last;
}
```

## 概要
`month_day_last`は、未規定の年の、月の最終日を表すカレンダー表現のためクラスである。

2月の最終日が年によって異なることもあり、このクラスでは月の最終日が何日なのかは取得できない。そのためには、年情報を付加して[`year_month_day_last`](year_month_day_last.md)クラスに変換する必要がある。

このクラスは等値比較および大小比較ができ、[EqualityComparable](/reference/concepts/equality_comparable.md)およびLessThanComparableの要件を満たす。

このクラスは、[トリビアルコピー可能](/reference/type_traits/is_trivially_copyable.md)で、かつ[スタンダードレイアウト型](/reference/type_traits/is_standard_layout.md)である。


## メンバ関数
### 構築／コピー／破棄

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`(constructor)`](month_day_last/op_constructor.md) | コンストラクタ | C++20 |
| `month_day_last& operator=(const month_day_last&) = default;`<br/> `month_day_last& operator=(month_day_last&&) = default;` | 代入演算子 | C++20 |


### 観測

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`month`](month_day_last/month.md) | 月要素を取得する | C++20 |


### 検証

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`ok`](month_day_last/ok.md) | 値が範囲に収まっているか判定する | C++20 |


## 非メンバ関数
### カレンダー構文演算子

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator/`](month_day_last/op_append.md) | カレンダー要素同士をつなぎ合わせる | C++20 |


### 比較演算

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator==`](month_day_last/op_equal.md) | 等値比較を行う | C++20 |
| `bool operator!=(const month_day_last&, const month_day_last&) noexcept;` | 非等値比較を行う (`==`により使用可能) | C++20 |
| [`operator<=>`](month_day_last/op_compare_3way.md) | 三方比較を行う | C++20 |
| `bool operator<(const month_day_last&, const month_day_last&) noexcept;` | 左辺が右辺より小さいかを判定する (`<=>`により使用可能) | C++20 |
| `bool operator<=(const month_day_last&, const month_day_last&) noexcept;` | 左辺が右辺以下を判定する (`<=>`により使用可能) | C++20 |
| `bool operator>(const month_day_last&, const month_day_last&) noexcept;` | 左辺が右辺より大きいかを判定する (`<=>`により使用可能) | C++20 |
| `bool operator>=(const month_day_last&, const month_day_last&) noexcept;` | 左辺が右辺以上を判定する (`<=>`により使用可能) | C++20 |


### 入出力

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator<<`](month_day_last/op_ostream.md) | 出力ストリームに出力する | C++20 |


## 文字列フォーマットサポート

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`formatter`](month_day_last/formatter.md) | [`std::formatter`](/reference/format/formatter.md)クラスの特殊化 | C++20 |


## ハッシュサポート

| 名前  | 説明               | 対応バージョン |
|-------|--------------------|----------------|
| `template <class T> struct hash;` | `hash`クラスの先行宣言 | C++26 |
| `template<> struct hash<chrono::month_day_last>;` | `hash`クラスの`month_day_last`に対する特殊化 | C++26 |


## 例
```cpp example
#include <iostream>
#include <chrono>

namespace chrono = std::chrono;
using namespace std::chrono_literals;

int main()
{
  // すべて3月の最終日を表す
  chrono::month_day_last date1 = chrono::last/3;
  chrono::month_day_last date2 = chrono::March/chrono::last;

  chrono::month_day_last date3{chrono::March};
  chrono::month_day_last date4{chrono::month{3}};

  std::cout << date1 << std::endl;
  std::cout << date2 << std::endl;
  std::cout << date3 << std::endl;
  std::cout << date4 << std::endl;
}
```
* chrono::March[link month_constants.md]
* chrono::month[link month.md]
* chrono::last[link last_spec.md]

### 出力
```
Mar/last
Mar/last
Mar/last
Mar/last
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
