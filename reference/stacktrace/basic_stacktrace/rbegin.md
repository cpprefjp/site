# rbegin
* stacktrace[meta header]
* std[meta namespace]
* basic_stacktrace[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
const_reverse_iterator rbegin() const noexcept; // (1) C++23
```

## 概要
末尾の要素を指す逆順イテレータを取得する。


## 戻り値
```cpp
return reverse_iterator(cend());
```
* cend()[link cend.md]


## 例
```cpp example
#include <iostream>
#include <stacktrace>
#include <algorithm>

void g() {
  std::stacktrace st = std::stacktrace::current();
  std::for_each(st.rbegin(), st.rend(), [](const std::stacktrace_entry& x) {
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
* st.rbegin()[color ff0000]
* st.rend()[link rend.md]
* current()[link current.md]
* std::stacktrace_entry[link /reference/stacktrace/stacktrace_entry.md]

### 出力例 (GCC)
```

_start at :0
     at :0
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
- [GCC](/implementation.md#gcc): 12 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??
