# operator<<
* stacktrace[meta header]
* std[meta namespace]
* basic_stacktrace[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std {
  template <class charT, class traits, class Allocator>
  basic_ostream<charT, traits>&
    operator<<(basic_ostream<charT, traits>& os,
               const basic_stacktrace<Allocator>& st);
```

## 概要
出力ストリームに出力する。


## 効果
以下と等価：

```cpp
return os << to_string(st);
```
* to_string[link to_string.md]


## 例
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
* current()[link current.md]

### 出力例 (GCC)
```
   0#  g() at /app/example.cpp:5
   1#  f() at /app/example.cpp:9
   2# main at /app/example.cpp:13
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
- [GCC](/implementation.md#gcc): 12
- [Visual C++](/implementation.md#visual_cpp): ??
