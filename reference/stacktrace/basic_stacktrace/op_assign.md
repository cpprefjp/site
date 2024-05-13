# operator=
* stacktrace[meta header]
* std[meta namespace]
* basic_stacktrace[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
basic_stacktrace& operator=(const basic_stacktrace& other); // (1) C++23

basic_stacktrace& operator=(basic_stacktrace&& other)
  noexcept(
    allocator_traits<Allocator>::propagate_on_container_move_assignment::value ||
    allocator_traits<Allocator>::is_always_equal::value
  );                                                        // (2) C++23
```
* allocator_traits[link /reference/memory/allocator_traits.md]

## 概要
- (1) コピー代入
- (2) ムーブ代入


## 例外
- (1), (2) : 実装は、メモリ確保に失敗した場合に[`empty()`](empty.md)を`true`にすることで例外仕様を強化できる


## 例
```cpp example
#include <iostream>
#include <stacktrace>

void g() {
  std::stacktrace st = std::stacktrace::current();

  // (1) コピー代入
  std::stacktrace st2;
  st2 = st;

  // (2) ムーブ代入
  std::stacktrace st3;
  st3 = std::move(st2);

  std::cout << st3[0] << std::endl;
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
 g() at /app/example.cpp:5
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 12
- [Visual C++](/implementation.md#visual_cpp): ??
