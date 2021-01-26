# basic_stacktrace
* stacktrace[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std {
  template <class Allocator>
  class basic_stacktrace;

  using stacktrace = basic_stacktrace<allocator<stacktrace_entry>>;
}
```
* allocator[link /reference/memory/allocator.md]
* stacktrace_entry[link stacktrace_entry.md.nolink]

## 概要


## メンバ関数
### 構築・破棄

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`(constructor)`](basic_stacktrace/op_constructor.md.nolink) | コンストラクタ | C++23 |
| [`(destructor)`](basic_stacktrace/op_destructor.md.nolink)   | デストラクタ | C++23 |
| [`operator=`](basic_stacktrace/op_assign.md.nolink) | 代入演算子 | C++23 |


### アロケータ

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`get_allocator`](basic_stacktrace/get_allocator.md.nolink) | アロケータオブジェクトを取得する | C++23 |


### イテレータ

| 名前 | 説明 | 対応バージョン |
|----------------------------------|---------------------------------------|-------|
| [`begin`](basic_stacktrace/begin.md.nolink)     | 先頭の要素を指すイテレータを取得する | C++23 |
| [`end`](basic_stacktrace/end.md.nolink)         | 末尾の次を指すイテレータを取得する | C++23 |
| [`cbegin`](basic_stacktrace/cbegin.md.nolink)   | 先頭の要素を指す読み取り専用イテレータを取得する | C++23 |
| [`cend`](basic_stacktrace/cend.md.nolink)       | 末尾の次を指す読み取り専用イテレータを取得する | C++23 |
| [`rbegin`](basic_stacktrace/rbegin.md.nolink)   | 末尾を指す逆イテレータを取得する | C++23 |
| [`rend`](basic_stacktrace/rend.md.nolink)       | 先頭の前を指す逆イテレータを取得する | C++23 |
| [`crbegin`](basic_stacktrace/crbegin.md.nolink) | 末尾を指す読み取り専用逆イテレータを取得する | C++23 |
| [`crend`](basic_stacktrace/crend.md.nolink)     | 先頭の前を指す読み取り専用逆イテレータを取得する | C++23 |


### 領域

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`size`](basic_stacktrace/size.md.nolink)         | 要素数を取得する | C++23 |
| [`max_size`](basic_stacktrace/max_size.md.nolink) | 格納可能な最大の要素数を取得する | C++23 |
| [`empty`](basic_stacktrace/empty.md.nolink)       | 空かどうかを判定する | C++23 |


### 要素アクセス

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator[]`](basic_stacktrace/op_at.md.nolink) | 要素アクセス | C++23 |
| [`at`](basic_stacktrace/at.md.nolink)            | 要素アクセス | C++23 |


### 変更

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`swap`](basic_stacktrace/swap.md.nolink) | 他の`basic_stacktrace`オブジェクトとデータを入れ替える | C++23 |


### 静的メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`current`](basic_stacktrace/current.md.nolink) | 現在位置のスタックトレースを取得する | C++23 |


## メンバ型

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `value_type`       | 要素型 [`stacktrace_entry`](stacktrace_entry.md.nolink) | C++23 |
| `const_reference`  | `const`参照型 `const value_type&` | C++23 |
| `reference`        | 参照型 `value_type&` | C++23 |
| `const_iterator`   | 読み取り専用イテレータ型。実装定義 | C++23 |
| `iterator`         | イテレータ型 `const_iterator` | C++23 |
| `reverse_iterator` | 逆順イテレータ型 [`reverse_iterator`](/reference/iterator/reverse_iterator.md)`<iterator>` | C++23 |
| `const_reverse_iterator` | 読み取り専用逆順イテレータ型 [`reverse_iterator`](/reference/iterator/reverse_iterator.md)`<const_iterator>` | C++23 |
| `diferrence_type`  | イテレータの差を表す型。実装定義 | C++23 |
| `size_type`        | 要素数を表す型。実装定義 | C++23 |
| `allocator_type`   | アロケータ型 `allocator` | C++23 |


## 非メンバ関数
### 値の入れ替え

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`swap`](basic_stacktrace/swap_free.md.nolink) | 2つの`basic_stacktrace`オブジェクトを入れ替える | C++23 |


### 入出力

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator<<`](basic_stacktrace/op_ostream.md) | 出力ストリームに出力する | C++23 |


### 文字列への変換

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`to_string`](basic_stacktrace/to_string.md) | 文字列に変換する | C++23 |


### 比較演算子

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator==`](basic_stacktrace/op_equal.md.nolink) | 等値比較を行う | C++23 |
| `template <class Allocator2>`<br/> `bool operator!=(const basic_stacktrace&, const basic_stacktrace<Allocator2>&) noexcept;` | 非等値比較を行う (`==`により使用可能) | C++23 |
| [`operator<=>`](basic_stacktrace/op_compare_3way.md.nolink) | 三方比較を行う | C++23 |
| `template <class Allocator2>`<br/> `strong_ordering operator<(const basic_stacktrace&, const basic_stacktrace<Allocator2>&) noexcept;` | 左辺が右辺より小さいかを判定する (`<=>`により使用可能) | C++23 |
| `template <class Allocator2>`<br/> `strong_ordering operator<=(const basic_stacktrace&, const basic_stacktrace<Allocator2>&) noexcept;` | 左辺が右辺以下かを判定する (`<=>`により使用可能) | C++23 |
| `template <class Allocator2>`<br/> `strong_ordering operator>(const basic_stacktrace&, const basic_stacktrace<Allocator2>&) noexcept;` | 左辺が右辺より大きいかを判定する (`<=>`により使用可能) | C++23 |
| `template <class Allocator2>`<br/> `strong_ordering operator>=(const basic_stacktrace&, const basic_stacktrace<Allocator2>&) noexcept;` | 左辺が右辺以上かを判定する (`<=>`により使用可能) | C++23 |


## ハッシュサポート

| 名前 | 説明 | 対応バージョン |
|------------------------------------------------|----------------------------------------|-------|
| `template <class T> struct hash;`              | `hash`クラスの先行宣言                 | C++23 |
| `template <class Allocator>`<br/> `struct hash<basic_stacktrace<Allocator>>;` | `hash`クラスの`basic_stacktrace`に対する特殊化 | C++23 |


## 例
### 基本的な使い方
```cpp example
#include <iostream>
#include <stacktrace>

void g() {
  std::cout << std::stacktrace::current() << std::endl;
}

void f() {
  g();
}

int main() {
  f();
}
```
* current()[link basic_stacktrace/current.md.nolink]

#### 出力例
```
 0# g() at main.cpp:5
 1# f() at main.cpp:9
 2# main at main.cpp:13
```

### スタックトレースを出力するアサーションマクロを作る
```cpp example
#include <iostream>
#include <cstdint>
#include <stacktrace>

void assertion_failed(char const* expr) {
  auto st = std::stacktrace::current(1, 1);
  std::stacktrace_entry info = st[0];
  std::cerr << "Expression '" << expr << "' is false in " << info << std::endl;
  std::abort();
}

#define MY_ASSERT(expr) if (!(expr)) assertion_failed(#expr)

void f(int i) {
  MY_ASSERT(i >= 0);
}

int main() {
  f(-1);
}
```
* current[basic_stacktrace/current.md.nolink]
* std::stacktrace_entry[link stacktrace_entry.md.nolink]
* std::abort()[link /reference/cstdlib/abort.md]

#### 出力例
```
Expression 'i >= 0' is false in f() at main.cpp:15
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??