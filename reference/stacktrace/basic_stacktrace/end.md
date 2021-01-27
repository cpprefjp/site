# end
* stacktrace[meta header]
* std[meta namespace]
* basic_stacktrace[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
const_iterator end() const noexcept; // (1) C++23
```

## 概要
末尾の次を指すイテレータを取得する。


## 戻り値
スタックトレース履歴の末尾の次を指すイテレータを返す。


## 例
```cpp example
#include <iostream>
#include <stacktrace>
#include <algorithm>

void g() {
  std::stacktrace st = std::stacktrace::current();
  std::for_each(st.begin(), st.end(), [](const std::stacktrace_entry& x) {
    std::cout << x << std::endl;
  }):
}

void f() {
  g();
}

int main() {
  f();
}
```
* st.end()[color ff0000]
* st.begin()[link begin.md]
* current()[link current.md]
* std::stacktrace_entry[link /reference/stacktrace/stacktrace_entry.md]

### 出力
```
g() at main.cpp:6
f() at main.cpp:13
main at main.cpp:17
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
