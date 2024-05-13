# swap (非メンバ関数)
* stacktrace[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std {
  template <class Allocator>
  void swap(basic_stacktrace<Allocator>& a,
            basic_stacktrace<Allocator>& b)
        noexcept(noexcept(a.swap(b)));      // (1) C++23
}
```
* a.swap[link swap.md]

## 概要
2つの`basic_stacktrace`オブジェクトを入れ替える。


## 効果
以下と等価：

```cpp
a.swap(b);
```
* a.swap[link swap.md]


## 例
```cpp example
#include <iostream>
#include <stacktrace>

void g() {
  std::stacktrace a = std::stacktrace::current();
  std::stacktrace b = std::stacktrace::current();
  std::swap(a, b);

  std::cout << a << std::endl; // bで取得したスタックトレースが出力される
}

void f() {
  g();
}

int main() {
  f();
}
```
* std::swap[color ff0000]
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
- [GCC](/implementation.md#gcc): 12
- [Visual C++](/implementation.md#visual_cpp): ??
