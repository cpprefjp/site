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

  namespace pmr {
    using stacktrace = basic_stacktrace<polymorphic_allocator<stacktrace_entry>>;
  }
}
```
* allocator[link /reference/memory/allocator.md]
* polymorphic_allocator[link /reference/memory_resource/polymorphic_allocator.md]
* stacktrace_entry[link stacktrace_entry.md]

## 概要
`basic_stacktrace`は、現在位置からその関数がどこで呼び出されたかの履歴を取得するためのクラスである。この機能は、デバッグに役立つ。

プラットフォームごとのデフォルトのアサーション機能は、その失敗時にバグの全体像を説明できないため、問題を特定するために十分な情報を提供しない。このクラスを使用することで、ユーザーはデバッグのために必要十分な情報を任意に取得できる。

このクラスは、アロケータ対応コンテナ、シーケンスコンテナ、逆順コンテナの要件を満たす。ただし、

- `const`修飾されたコンテナに対して定義されたムーブ、代入、swap、および操作のみがサポートされる
- 比較関数のセマンティクスはコンテナのものと異なる


### 備考
- このクラスは、仕様としてシグナル安全ではない
    - 元となった[Boost.Stacktraceライブラリ](https://boost.org/libs/stacktrace)の実装はシグナルハンドラ中でもスタックトレースを出力できる機能を提供するが、標準の本機能はその機能を提供しない
    - そのような機能は一部のプラットフォームでは実装できないためである
    - ただし、実装がシグナル安全である場合がある
        - GCC (libstdc++) が内部で使用している[libbacktrace](https://github.com/ianlancetaylor/libbacktrace)ライブラリは、シグナル安全である。ただしlibstdc++の実装仕様としてシグナル安全であるという明記はない


## メンバ関数
### 構築・破棄

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`(constructor)`](basic_stacktrace/op_constructor.md) | コンストラクタ | C++23 |
| `~basic_stacktrace();` | デストラクタ | C++23 |
| [`operator=`](basic_stacktrace/op_assign.md) | 代入演算子 | C++23 |


### アロケータ

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`get_allocator`](basic_stacktrace/get_allocator.md) | アロケータオブジェクトを取得する | C++23 |


### イテレータ

| 名前 | 説明 | 対応バージョン |
|----------------------------------|---------------------------------------|-------|
| [`begin`](basic_stacktrace/begin.md)     | 先頭の要素を指すイテレータを取得する | C++23 |
| [`end`](basic_stacktrace/end.md)         | 末尾の次を指すイテレータを取得する | C++23 |
| [`cbegin`](basic_stacktrace/cbegin.md)   | 先頭の要素を指す読み取り専用イテレータを取得する | C++23 |
| [`cend`](basic_stacktrace/cend.md)       | 末尾の次を指す読み取り専用イテレータを取得する | C++23 |
| [`rbegin`](basic_stacktrace/rbegin.md)   | 末尾の要素を指す逆順イテレータを取得する | C++23 |
| [`rend`](basic_stacktrace/rend.md)       | 先頭の前を指す逆順イテレータを取得する | C++23 |
| [`crbegin`](basic_stacktrace/crbegin.md) | 末尾の要素を指す読み取り専用逆順イテレータを取得する | C++23 |
| [`crend`](basic_stacktrace/crend.md)     | 先頭の前を指す読み取り専用逆順イテレータを取得する | C++23 |


### 領域

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`size`](basic_stacktrace/size.md)         | スタックトレースの履歴数を取得する | C++23 |
| [`max_size`](basic_stacktrace/max_size.md) | 格納可能な最大の要素数を取得する | C++23 |
| [`empty`](basic_stacktrace/empty.md)       | スタックトレースの履歴が空かどうかを判定する | C++23 |


### 要素アクセス

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator[]`](basic_stacktrace/op_at.md) | 任意の位置の要素を取得する | C++23 |
| [`at`](basic_stacktrace/at.md)            | 任意の位置の要素を取得する | C++23 |


### 変更

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`swap`](basic_stacktrace/swap.md) | 他の`basic_stacktrace`オブジェクトとデータを入れ替える | C++23 |


### 静的メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`current`](basic_stacktrace/current.md) | 現在位置からのスタックトレースを取得する | C++23 |


## メンバ型

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `value_type`       | 要素型 [`stacktrace_entry`](stacktrace_entry.md) | C++23 |
| `const_reference`  | `const`参照型 `const value_type&` | C++23 |
| `reference`        | 参照型 `value_type&` | C++23 |
| `const_iterator`   | 読み取り専用イテレータ型。実装定義のランダムアクセスイテレータ | C++23 |
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
| [`swap`](basic_stacktrace/swap_free.md) | 2つの`basic_stacktrace`オブジェクトを入れ替える | C++23 |


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
| [`operator==`](basic_stacktrace/op_equal.md) | 等値比較を行う | C++23 |
| `template <class Allocator2>`<br/> `bool operator!=(const basic_stacktrace&, const basic_stacktrace<Allocator2>&) noexcept;` | 非等値比較を行う (`==`により使用可能) | C++23 |
| [`operator<=>`](basic_stacktrace/op_compare_3way.md) | 三方比較を行う | C++23 |
| `template <class Allocator2>`<br/> `strong_ordering operator<(const basic_stacktrace&, const basic_stacktrace<Allocator2>&) noexcept;` | 左辺が右辺より小さいかを判定する (`<=>`により使用可能) | C++23 |
| `template <class Allocator2>`<br/> `strong_ordering operator<=(const basic_stacktrace&, const basic_stacktrace<Allocator2>&) noexcept;` | 左辺が右辺以下かを判定する (`<=>`により使用可能) | C++23 |
| `template <class Allocator2>`<br/> `strong_ordering operator>(const basic_stacktrace&, const basic_stacktrace<Allocator2>&) noexcept;` | 左辺が右辺より大きいかを判定する (`<=>`により使用可能) | C++23 |
| `template <class Allocator2>`<br/> `strong_ordering operator>=(const basic_stacktrace&, const basic_stacktrace<Allocator2>&) noexcept;` | 左辺が右辺以上かを判定する (`<=>`により使用可能) | C++23 |


## ハッシュサポート

| 名前 | 説明 | 対応バージョン |
|------------------------------------------------|----------------------------------------|-------|
| `template <class T> struct hash;`              | `hash`クラスの先行宣言                 | C++23 |
| `template <class Allocator>`<br/> `struct hash<basic_stacktrace<Allocator>>;` | `hash`クラスの`basic_stacktrace`に対する特殊化 | C++23 |


### 文字列フォーマットサポート

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `template <class Allocator>`<br/> `struct formatter<basic_stacktrace<Allocator>>;` | [`formatter`](/reference/format/formatter.md)の特殊化 | C++23 |


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
* current()[link basic_stacktrace/current.md]

#### 出力例 (GCC)
```
   0#  g() at /app/example.cpp:5
   1#  f() at /app/example.cpp:10
   2# main at /app/example.cpp:14
   3#      at :0
   4# __libc_start_main at :0
   5# _start at :0
   6# 
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
* current[link basic_stacktrace/current.md]
* std::stacktrace_entry[link stacktrace_entry.md]
* std::abort()[link /reference/cstdlib/abort.md]
* std::cerr[link /reference/iostream/cerr.md]

#### 出力例 (GCC)
```
Expression 'i >= 0' is false in f(int) at /app/example.cpp:15
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): 18 [mark noimpl]
- [GCC](/implementation.md#gcc): 12 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 4 [mark impl]


### 備考
- GCCでは、以下のコンパイルオプションを追加で指定する必要がある：
    - 13まで : `-lstdc++_libbacktrace`
    - 14以降 : `-lstdc++exp`


## 参照
- [P2693R1 Formatting `thread::id` and `stacktrace`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2693r1.pdf)
- [P2301R1 Add a `pmr` alias for `std::stacktrace`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2301r1.html)
