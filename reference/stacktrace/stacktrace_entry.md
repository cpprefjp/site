# stacktrace_entry
* stacktrace[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std {
  class stacktrace_entry;
}
```

## 概要
`stacktrace_entry`は、スタックトレースの各エントリ (行) を表すクラスであり、各エントリの情報を問い合せる操作を提供する。

このクラスは、[`regular`](/reference/concepts/regular.md)および[`three_way_comparable`](/reference/compare/three_way_comparable.md)`<`[`strong_ordering`](/reference/compare/strong_ordering.md)`>`のモデルである。


## メンバ関数
### 構築・破棄

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`(constructor)`](stacktrace_entry/op_constructor.md) | コンストラクタ | C++23 |
| `~stacktrace_entry();` | デストラクタ | C++23 |
| `constexpr stacktrace_entry& operator=(const stacktrace_entry& other) noexcept;` | 代入演算子 | C++23 |


### 観測

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`native_handle`](stacktrace_entry/native_handle.md) | ハンドルを取得する | C++23 |
| [`operator bool`](stacktrace_entry/op_bool.md) | 空でないかを判定する | C++23 |


### 照会

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`description`](stacktrace_entry/description.md) | このオブジェクトを説明する文字列を取得する | C++23 |
| [`source_file`](stacktrace_entry/source_file.md) | ソースファイル名を取得する | C++23 |
| [`source_line`](stacktrace_entry/source_line.md) | 行番号を取得する | C++23 |


## メンバ型

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `native_handle_type` | 実装依存のハンドル型 | C++23 |


## 非メンバ関数
### 入出力

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator<<`](stacktrace_entry/op_ostream.md) | 出力ストリームに出力する | C++23 |


### 文字列への変換

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`to_string`](stacktrace_entry/to_string.md) | 文字列に変換する | C++23 |


### 比較演算子

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator==`](stacktrace_entry/op_equal.md) | 等値比較を行う | C++23 |
| `bool operator!=(const stacktrace_entry&, const stacktrace_entry&) noexcept;` | 非等値比較を行う (`==`により使用可能) | C++23 |
| `friend constexpr strong_ordering operator<=>(const stacktrace_entry& x, const stacktrace_entry& y) noexcept;` | 三方比較を行う | C++23 |
| `strong_ordering operator<(const stacktrace_entry&, const stacktrace_entry&) noexcept;` | 左辺が右辺より小さいかを判定する (`<=>`により使用可能) | C++23 |
| `strong_ordering operator<=(const stacktrace_entry&, const stacktrace_entry&) noexcept;` | 左辺が右辺以下かを判定する (`<=>`により使用可能) | C++23 |
| `strong_ordering operator>(const stacktrace_entry&, const stacktrace_entry&) noexcept;` | 左辺が右辺より大きいかを判定する (`<=>`により使用可能) | C++23 |
| `strong_ordering operator>=(const stacktrace_entry&, const stacktrace_entry&) noexcept;` | 左辺が右辺以上かを判定する (`<=>`により使用可能) | C++23 |


## ハッシュサポート

| 名前 | 説明 | 対応バージョン |
|------------------------------------------------|----------------------------------------|-------|
| `template <class T> struct hash;`              | `hash`クラスの先行宣言                 | C++23 |
| `template <>`<br/> `struct hash<stacktrace_entry>;` | `hash`クラスの`stacktrace_entry`に対する特殊化 | C++23 |


## 文字列フォーマットサポート

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`formatter`](stacktrace_entry/formatter.md) | [`std::formatter`](/reference/format/formatter.md)クラスの特殊化 | C++23 |


## 例
```cpp example
#include <iostream>
#include <stacktrace>

void g() {
  std::stacktrace st = std::stacktrace::current(0, 1);
  std::stacktrace_entry entry = st[0];

  std::cout << entry.description() << std::endl;
  std::cout << entry.source_file() << std::endl;
  std::cout << entry.source_line() << std::endl;
}

void f() {
  g();
}

int main() {
  f();
}
```
* std::stacktrace_entry[color ff0000]
* std::stacktrace[link basic_stacktrace.md]
* current[link basic_stacktrace/current.md]
* entry.description()[link stacktrace_entry/description.md]
* entry.source_file()[link stacktrace_entry/source_file.md]
* entry.source_line()[link stacktrace_entry/source_line.md]

### 出力例 (GCC)
```
g()
/app/example.cpp
5
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 12 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??
