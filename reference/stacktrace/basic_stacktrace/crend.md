# crend
* stacktrace[meta header]
* std[meta namespace]
* basic_stacktrace[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
const_reverse_iterator crend() const noexcept; // (1) C++23
```

## 概要
先頭の前を指す読み取り専用逆順イテレータを取得する。


## 戻り値
```cpp
return reverse_iterator(cbegin());
```
* cbegin()[link cbegin.md]


## 例
```cpp example
#include <iostream>
#include <stacktrace>
#include <algorithm>

void g() {
  std::stacktrace st = std::stacktrace::current();
  std::for_each(st.crbegin(), st.crend(), [](const std::stacktrace_entry& x) {
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
* st.crend()[color ff0000]
* st.crbegin()[link crbegin.md]
* current()[link current.md]
* std::stacktrace_entry[link /reference/stacktrace/stacktrace_entry.md]

### 出力例 (GCC)
```

_start at :0
__libc_start_main at :0
     at :0
main at /app/example.cpp:17
 f() at /app/example.cpp:13
 g() at /app/example.cpp:6
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 12
- [Visual C++](/implementation.md#visual_cpp): ??
