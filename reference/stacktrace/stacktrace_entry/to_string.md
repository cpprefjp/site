# to_string
* stacktrace[meta header]
* std[meta namespace]
* stacktrace_entry[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std {
  string to_string(const stacktrace_entry& f);
}
```
* string[link /reference/string/basic_string.md]

## 概要
文字列化する。


## 戻り値
`f`のスタックトレースエントリ情報を説明する文字列を返す。


## 備考
- 実装への推奨として、説明文字列は、[`f.source_file()`](source_file.md)および[`f.source_line()`](source_line.md)の評価を含む情報を提供すべきである


## 例
```cpp example
#include <iostream>
#include <stacktrace>

void g() {
  std::string entry = std::to_string(std::stacktrace::current()[0]);
  std::cout << entry << std::endl;
}

void f() {
  g();
}

int main() {
  f();
}
```
* std::to_string[color ff0000]
* std::stacktrace[link /reference/stacktrace/basic_stacktrace.md]
* current[link /reference/stacktrace/basic_stacktrace/current.md]

### 出力例 (GCC)
```
 g() at /app/example.cpp:5
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 12 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??
