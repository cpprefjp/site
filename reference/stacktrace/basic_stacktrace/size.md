# size
* stacktrace[meta header]
* std[meta namespace]
* basic_stacktrace[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
size_type size() const noexcept; // (1) C++23
```

## 概要
スタックトレースの履歴数を取得する。


## 戻り値
保持しているスタックトレースの履歴の、要素数を返す。


## 例
### 全体のスタックトレースの要素数
```cpp example
#include <iostream>
#include <stacktrace>

void g() {
  auto trace = std::stacktrace::current();
  std::cout << trace.size() << std::endl;
  std::cout << trace << std::endl;
}

void f() {
  g();
}

int main() {
  f();
}
```
* trace.size()[color ff0000]
* current()[link current.md]

#### 出力例 (GCC)
```
7
   0#  g() at /app/example.cpp:5
   1#  f() at /app/example.cpp:11
   2# main at /app/example.cpp:15
   3#      at :0
   4#      at :0
   5# _start at :0
   6# 
```


### 指定範囲のスタックトレースの要素数
```cpp example
#include <iostream>
#include <stacktrace>

void g() {
  auto trace = std::stacktrace::current(1, 1);
  std::cout << trace.size() << std::endl;
  std::cout << trace << std::endl;
}

void f() {
  g();
}

int main() {
  f();
}
```
* trace.size()[color ff0000]
* current[link current.md]

#### 出力例 (GCC)
```
1
   0#  f() at /app/example.cpp:11
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 12
- [Visual C++](/implementation.md#visual_cpp): ??
