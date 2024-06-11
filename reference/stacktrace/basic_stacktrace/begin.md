# begin
* stacktrace[meta header]
* std[meta namespace]
* basic_stacktrace[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
const_iterator begin() const noexcept; // (1) C++23
```

## 概要
先頭の要素を指すイテレータを取得する。


## 戻り値
スタックトレース履歴の先頭要素を指すイテレータを返す。ただし、[`empty()`](empty.md)が`true`である場合、[`end()`](end.md)と同じ値を返す。


## 例
```cpp example
#include <iostream>
#include <stacktrace>
#include <algorithm>

void g() {
  std::stacktrace st = std::stacktrace::current();
  std::for_each(st.begin(), st.end(), [](const std::stacktrace_entry& x) {
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
* st.begin()[color ff0000]
* st.end()[link end.md]
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
- [GCC](/implementation.md#gcc): 12 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??
