# description
* stacktrace[meta header]
* std[meta namespace]
* stacktrace_entry[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
string description() const; // (1) C++23
```
* string[link /reference/string/basic_string.md]

## 概要
このオブジェクトを説明する文字列を取得する。


## 戻り値
`*this`で表される評価の説明、または空文字列を返す。


## 例外
内部のデータ構造、または結果文字列のためのメモリ確保ができない場合、[`std::bad_alloc`](/reference/new/bad_alloc.md)例外を送出する。


## 例
```cpp example
#include <iostream>
#include <stacktrace>

void g() {
  std::stacktrace st = std::stacktrace::current();
  std::stacktrace_entry entry = st[0];

  std::cout << entry.description() << std::endl;
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
g()
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 12
- [Visual C++](/implementation.md#visual_cpp): ??
