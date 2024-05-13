# cend
* stacktrace[meta header]
* std[meta namespace]
* basic_stacktrace[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
const_iterator cend() const noexcept; // (1) C++23
```

## 概要
末尾の次を指す読み取り専用イテレータを取得する。


## 戻り値
スタックトレース履歴の末尾の次を指す読み取り専用イテレータを返す。


## 例
```cpp example
#include <iostream>
#include <stacktrace>
#include <algorithm>

void g() {
  std::stacktrace st = std::stacktrace::current();
  std::for_each(st.cbegin(), st.cend(), [](const std::stacktrace_entry& x) {
    std::cout << x << std::endl;
  });
}

void f() {
  g();
}

int main() {
  f();
}
```
* st.cend()[color ff0000]
* st.cbegin()[link cbegin.md]
* current()[link current.md]
* std::stacktrace_entry[link /reference/stacktrace/stacktrace_entry.md]

### 出力例 (GCC)
```
 g() at /app/example.cpp:6
 f() at /app/example.cpp:13
main at /app/example.cpp:17
     at :0
__libc_start_main at :0
_start at :0

```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 12
- [Visual C++](/implementation.md#visual_cpp): ??
