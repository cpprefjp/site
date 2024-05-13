# empty
* stacktrace[meta header]
* std[meta namespace]
* basic_stacktrace[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
[[nodiscard]] bool empty() const noexcept; // (1) C++23
```

## 概要
スタックトレースの履歴数が空かどうかを判定する。


## 戻り値
保持しているスタックトレースの履歴が空であれば`true`、そうでなければ`false`を返す。


## 例
```cpp example
#include <cassert>
#include <stacktrace>

void g() {
  auto trace = std::stacktrace::current(0, 0);
  assert(trace.empty());
}

void f() {
  g();
}

int main() {
  f();

  std::stacktrace trace{};
  assert(trace.empty());
}
```
* trace.empty()[color ff0000]
* current[link current.md]

### 出力
```
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 12
- [Visual C++](/implementation.md#visual_cpp): ??
