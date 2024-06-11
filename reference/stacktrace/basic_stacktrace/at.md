# at
* stacktrace[meta header]
* std[meta namespace]
* basic_stacktrace[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
const_reference at(size_type frame_no) const; // (1) C++23
```

## 概要
任意の位置の要素を取得する。


## 戻り値
保持しているスタックトレースの履歴の、`frame_no`番目の要素を返す。


## 例外
`frame_no >=` [`size()`](size.md)である場合、[`std::out_of_range`](/reference/stdexcept.md)例外を送出する。


## 例
```cpp example
#include <iostream>
#include <stacktrace>

void g() {
  std::stacktrace st = std::stacktrace::current();
  std::cout << st.at(0) << std::endl;
}

void f() {
  g();
}

int main() {
  f();
}
```
* st.at[color ff0000]
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
- [GCC](/implementation.md#gcc): 12 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??
