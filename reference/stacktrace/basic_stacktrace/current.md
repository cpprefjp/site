# current
* stacktrace[meta header]
* std[meta namespace]
* basic_stacktrace[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
static basic_stacktrace
  current(const allocator_type& alloc = allocator_type()) noexcept; // (1) C++23

static basic_stacktrace
  current(size_type skip,
          const allocator_type& alloc = allocator_type()) noexcept; // (2) C++23

static basic_stacktrace
  current(size_type skip,
          size_type max_depth,
          const allocator_type& alloc = allocator_type()) noexcept; // (3) C++23
```

## 概要
現在位置からのスタックトレースを取得する。

- (1) : 現在位置から現在の実行スレッドの初期関数までの全体のスタックトレースを取得する
- (2) : 現在位置 + `skip`から実行スレッドの初期関数までのスタックトレースを取得する
- (3) : 現在位置 + `skip`から最大で`max_depth`個のスタックトレースを取得する


## 事前条件
- (3) : `skip <= skip + max_depth`であること


## 戻り値
- (1) :
    - 現在の実行スレッドでの、現在の評価のスタックトレースを保持する`basic_stacktrace`オブジェクトを構築する
    - `alloc`は[`stacktrace_entry`](/reference/stacktrace/stacktrace_entry.md)オブジェクトの配列を保持する[`std::vector`](/reference/vector/vector.md)型メンバ変数に渡される
- (2) :
    - `basic_stacktrace::current(alloc)`で構築されたオブジェクト`st`の[`st.size()`](size.md)を`n`として、
    - イテレータ範囲`[st.begin() + min(n, skip), st.end())`と`alloc`を、[`stacktrace_entry`](/reference/stacktrace/stacktrace_entry.md)オブジェクトの配列を保持する[`std::vector`](/reference/vector/vector.md)型メンバ変数として保持する。ただし、その初期化に失敗した場合、`basic_stacktrace`オブジェクトは空になる
- (3) :
    - `basic_stacktrace::current(alloc)`で構築されたオブジェクト`st`の[`st.size()`](size.md)を`n`として、
    - イテレータ範囲`[st.begin() + min(n, skip), st.begin() + min(n, skip + max_depth))`と`alloc`を、[`stacktrace_entry`](/reference/stacktrace/stacktrace_entry.md)オブジェクトの配列を保持する[`std::vector`](/reference/vector/vector.md)型メンバ変数として保持する。ただし、その初期化に失敗した場合、`basic_stacktrace`オブジェクトは空になる


## 備考
- (1) : 正常にスタックトレースを取得できた場合、構築された`basic_stacktrace`型のオブジェクト`st`の先頭要素`st[0]`は、現在の評価を表す[`stacktrace_entry`](/reference/stacktrace/stacktrace_entry.md)オブジェクトであり、末尾要素`st[st.size() - 1]`は現在の実行スレッドの初期関数を表す[`stacktrace_entry`](/reference/stacktrace/stacktrace_entry.md)オブジェクトである


## 例
### 全体のスタックトレースを取得する
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
* current()[color ff0000]

#### 出力例 (GCC)
```
   0#  g() at /app/example.cpp:5
   1#  f() at /app/example.cpp:9
   2# main at /app/example.cpp:13
   3#      at :0
   4# __libc_start_main at :0
   5# _start at :0
   6# 
```

### 現在位置からN個を除いたスタックトレースを取得する
```cpp example
#include <iostream>
#include <stacktrace>

void g() {
  std::cout << std::stacktrace::current(1) << std::endl;
}

void f() {
  g();
}

int main() {
  f();
}
```
* current[color ff0000]

#### 出力例 (GCC)
```
   0#  f() at /app/example.cpp:9
   1# main at /app/example.cpp:13
   2#      at :0
   3# __libc_start_main at :0
   4# _start at :0
   5# 
```

### 指定範囲のスタックトレースを取得する
```cpp example
#include <iostream>
#include <stacktrace>

void g() {
  std::cout << std::stacktrace::current(1, 2) << std::endl;
}

void f() {
  g();
}

int main() {
  f();
}
```
* current[color ff0000]

#### 出力例 (GCC)
```
   0#  f() at /app/example.cpp:9
   1# main at /app/example.cpp:13
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 12
- [Visual C++](/implementation.md#visual_cpp): ??
