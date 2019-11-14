# year
* chrono[meta header]
* std::chrono[meta namespace]
* class template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  class year;
}
```

## 概要
`year`は、年単体の値を表すカレンダー表現のためクラスである。

値の範囲として`[-32767, 32767]`を扱う。

このクラスは等値比較および大小比較ができ、[EqualityComparable](/reference/concepts/equality_comparable.md)およびLessThanComparableの要件を満たす。

このクラスは、[トリビアルコピー可能](/reference/type_traits/is_trivially_copyable.md)で、かつ[スタンダードレイアウト型](/reference/type_traits/is_standard_layout.md)である。


### 備考
- このクラスは経過時間を表す型ではない。年の経過時間は[`years`](duration_aliases.md)である


## メンバ関数
### 構築／コピー／破棄

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`(constructor)`](year/op_constructor.md) | コンストラクタ | C++20 |
| `year& operator=(const year&) = default;`<br/> `year& operator=(year&&) = default;` | 代入演算子 | C++20 |


### 算術演算

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator+`](year/op_unary_plus.md)    | 正の符号       | C++20 |
| [`operator-`](year/op_unary_minus.md)   | 負の符号 (符号反転する) | C++20 |
| [`operator++`](year/op_increment.md)    | インクリメント | C++20 |
| [`operator-=`](year/op_decrement.md)    | デクリメント   | C++20 |
| [`operator+=`](year/op_plus_assign.md)  | 加算の複合代入 | C++20 |
| [`operator-=`](year/op_minus_assign.md) | 減算の複合代入 | C++20 |


### うるう年

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`is_leap`](year/is_leap.md.nolink.nolink) | うるう年かを判定する | C++20 |


### 変換

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator int`](year/op_int.md) | `int`型への変換演算子 | C++20 |


### 値の範囲

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`ok`](year/ok.md)   | 値が範囲`[min(), max()]`に収まっているか判定する | C++20 |


## 静的メンバ関数
### 値の範囲

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`min`](year/min.md) | 扱える最小値 | C++20 |
| [`max`](year/max.md) | 扱える最大値 | C++20 |


## 非メンバ関数
### 算術演算

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator+`](year/op_plus.md)  | 加算 | C++20 |
| [`operator-`](year/op_minus.md) | 減算 | C++20 |


### 比較演算

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator==`](year/op_equal.md)         | 等値比較を行う | C++20 |
| `bool operator!=(const year&, const year&) noexcept;` | 非等値比較を行う (`==`により使用可能) | C++20 |
| [`operator<=>`](year/op_compare_3way.md) | 三方比較を行う | C++20 |
| `bool operator<(const year&, const year&) noexcept;` | 左辺が右辺より小さいかを判定する (`<=>`により使用可能) | C++20 |
| `bool operator<=(const year&, const year&) noexcept;` | 左辺が右辺以下を判定する (`<=>`により使用可能) | C++20 |
| `bool operator>(const year&, const year&) noexcept;` | 左辺が右辺より大きいかを判定する (`<=>`により使用可能) | C++20 |
| `bool operator>=(const year&, const year&) noexcept;` | 左辺が右辺以上を判定する (`<=>`により使用可能) | C++20 |


### 入出力

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator<<`](year/op_ostream.md)   | 出力ストリームに出力する | C++20 |
| [`from_stream`](year/from_stream.md) | フォーマット指定して入力ストリームから入力する | C++20 |


### リテラル

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`y`](year/op_y.md.nolink) | 年リテラル | C++20 |


## 例
```cpp example
```

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 8.0 (入出力ストリームなし)
- [GCC](/implementation.md#gcc): (9.2時点で実装なし)
- [Visual C++](/implementation.md#visual_cpp): (2019 Update 3時点で実装なし)

