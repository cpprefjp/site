# source_line
* stacktrace[meta header]
* std[meta namespace]
* stacktrace_entry[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
uint_least32_t source_line() const; // (1) C++23
```
* uint_least32_t[link /reference/cstdint/uint_least32_t.md]

## 概要
行番号を取得する。


## 戻り値
`*this`で表される評価に字句的に関連する`0`または`1`ベースの行番号を返す。

[`source_file()`](source_file.md)が推定のソースファイル名を返す場合は推定の行番号を返し、[`source_file`](source_file.md)が実際のソースファイル名を返す場合は実際の行番号を返す。


## 例外
内部のデータ構造のメモリ確保ができない場合、[`std::bad_alloc`](/reference/new/bad_alloc.md)例外を送出する。


## 例
```cpp example
#include <iostream>
#include <stacktrace>

void g() {
  std::stacktrace st = std::stacktrace::current();
  std::stacktrace_entry entry = st[0];

  std::cout << entry.source_line() << std::endl;
}

void f() {
  g();
}

int main() {
  f();
}
```
* entry.source_file()[color ff0000]
* std::stacktrace[link /reference/stacktrace/basic_stacktrace.md]
* current[link /reference/stacktrace/basic_stacktrace/current.md]

### 出力例 (GCC)
```
5
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 12
- [Visual C++](/implementation.md#visual_cpp): ??
