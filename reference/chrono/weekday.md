# weekday
* chrono[meta header]
* std::chrono[meta namespace]
* class[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  class weekday;
}
```

## 概要
`weekday`は、曜日を表すカレンダー表現のためクラスである。

日曜日から土曜日までを値の範囲`[0, 6]`として扱うが、このクラスではその範囲外の非負の値を扱える。

このクラスは�値比較ができ、[EqualityComparable](/reference/concepts/equality_comparable.md)の要件を満たす。しかし、週の最初の曜日について (日曜日か月曜日か) 合意が得られないため大小比較はできず、LessThanComparable要件は満たさない。

このクラスは、[トリビアルコピー可能](/reference/type_traits/is_trivially_copyable.md)で、かつ[スタンダードレイアウト型](/reference/type_traits/is_standard_layout.md)である。


## メンバ関数
### 構築／コピー／破棄

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`(constructor)`](weekday/op_constructor.md) | コンストラクタ | C++20 |
| `weekday& operator=(const weekday&) = default;`<br/> `weekday& operator=(weekday&&) = default;` | 代入演算� | C++20 |


### 算術演算

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator++`](weekday/op_increment.md)    | インクリメント | C++20 |
| [`operator-=`](weekday/op_decrement.md)    | デクリメント   | C++20 |
| [`operator+=`](weekday/op_plus_assign.md)  | 加算の複合代入 | C++20 |
| [`operator-=`](weekday/op_minus_assign.md) | 減算の複合代入 | C++20 |


### 変換

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`c_encoding`](weekday/c_encoding.md) | C / C++仕様に基づいた曜日の整数値を取得する | C++20 |
| [`iso_encoding`](weekday/iso_encoding.md) | ISO 8601に基づいた曜日の整数値を取得する | C++20 |


### 検証

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`ok`](weekday/ok.md) | 値が範囲に収まっているか判定する | C++20 |


### 月のN回目の曜日

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator[]`](weekday/op_at.md) | 月のN回目の指定した曜日を取得する | C++20 |


## 非メンバ関数
### 算術演算

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator+`](weekday/op_plus.md)  | 加算 | C++20 |
| [`operator-`](weekday/op_minus.md) | 減算 | C++20 |


### 比較演算

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator==`](weekday/op_equal.md) | �値比較を行う | C++20 |
| `bool operator!=(const weekday&, const weekday&) noexcept;` | 非�値比較を行う (`==`により使用可能) | C++20 |


### 入出力

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator<<`](weekday/op_ostream.md)   | 出力ストリームに出力する | C++20 |
| [`from_stream`](weekday/from_stream.md) | フォーマット指定して入力ストリームから入力する | C++20 |


## 例
```cpp example
#include <cassert>
#include <iostream>
#include <chrono>

namespace chrono = std::chrono;

int main() {
  chrono::weekday w = chrono::Sunday;
  ++w;
  std::cout << w << std::endl;

  chrono::weekday v = chrono::Wednesday;
  v += chrono::days{3};
  std::cout << v << std::endl;

  // 曜日は循環する
  chrono::weekday u = chrono::Saturday;
  v += chrono::days{2};
  assert(v == chrono::Monday);
}
```
* chrono::weekday[color ff0000]
* chrono::Sunday[link weekday_constants.md]
* chrono::Wednesday[link weekday_constants.md]
* chrono::Saturday[link weekday_constants.md]
* chrono::Monday[link weekday_constants.md]

### 出力
```
Mon
Sat
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 8.0 (入出力ストリームなし)
- [GCC](/implementation.md#gcc): (9.2時点で実装なし)
- [Visual C++](/implementation.md#visual_cpp): (2019 Update 3時点で実装なし)


## 関連項目
- [曜日の定数](weekday_constants.md)
