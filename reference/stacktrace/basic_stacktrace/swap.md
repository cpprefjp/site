# swap
* stacktrace[meta header]
* std[meta namespace]
* basic_stacktrace[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
void swap(basic_stacktrace& other)
        noexcept(
          allocator_traits<Allocator>::propagate_on_container_swap::value ||
          allocator_traits<Allocator>::is_always_equal::value
        );                           // (1) C++23
```
* allocator_traits[link /reference/memory/allocator_traits.md]

## 概要
他の`basic_stacktrace`オブジェクトとデータを入れ替える。


## 効果
`*this`と`other`の内容を交換する。


## 例
```cpp example
#include <iostream>
#include <stacktrace>

void g() {
  std::stacktrace a = std::stacktrace::current();
  std::stacktrace b = std::stacktrace::current();
  a.swap(b);

  std::cout << a << std::endl; // bで取得したスタックトレースが出力される
}

void f() {
  g();
}

int main() {
  f();
}
```
* a.swap[color ff0000]
* current()[link current.md]

### 出力例 (GCC)
```
   0#  g() at /app/example.cpp:6
   1#  f() at /app/example.cpp:13
   2# main at /app/example.cpp:17
   3#      at :0
   4#      at :0
   5# _start at :0
   6# 
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 12 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??
