# operator bool
* stacktrace[meta header]
* std[meta namespace]
* stacktrace_entry[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
constexpr explicit operator bool() const noexcept; // (1) C++23
```

## 概要
`stacktrace_entry`が空でないかを判定する。


## 戻り値
`*this`が空である場合のみ`false`を返す。


## 例
```cpp example
#include <iostream>
#include <stacktrace>

void g() {
  std::stacktrace st = std::stacktrace::current();
  std::stacktrace_entry entry = st[0];

  if (entry) {
    std::cout << "not empty" << std::endl;
  }
  else {
    std::cout << "empty" << std::endl;
  }
}

void f() {
  g();
}

int main() {
  f();
}
```
* std::stacktrace[link /reference/stacktrace/basic_stacktrace.md]
* current[link /reference/stacktrace/basic_stacktrace/current.md]

### 出力
```
not empty
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 12 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??
