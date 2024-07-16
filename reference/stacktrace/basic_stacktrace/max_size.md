# max_size
* stacktrace[meta header]
* std[meta namespace]
* basic_stacktrace[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
size_type max_size() const noexcept; // (1) C++23
```

## 概要
格納可能な最大の要素数を取得する。


## 戻り値
保持している[`std::vector`](/reference/vector/vector.md)`<`[`std::stacktrace_entry`](/reference/stacktrace/stacktrace_entry.md)`>`型スタックトレースの履歴の、[`max_size()`](/reference/vector/vector/max_size.md)を返す。


## 例
```cpp example
#include <iostream>
#include <stacktrace>

int main() {
  std::stacktrace trace{};
  std::cout << trace.max_size() << std::endl;
}
```
* trace.max_size()[color ff0000]

### 出力例
```
288230376151711743
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

### 備考
- GCCでは14時点でコンパイルエラーになる
    - [Bug 115063 - compilation error: `std::basic_stracktrace::max_size()`](https://gcc.gnu.org/bugzilla/show_bug.cgi?id=115063)
