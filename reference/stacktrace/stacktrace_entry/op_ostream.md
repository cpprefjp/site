# operator<<
* stacktrace[meta header]
* std[meta namespace]
* stacktrace_entry[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std {
  ostream& operator<<(ostream& os, const stacktrace_entry& f);
}
```

## 概要
出力ストリームに出力する。


## 効果
以下と等価：

```cpp
return os << to_string(f);
```
* to_string[link to_string.md]


## 例
```cpp example
#include <iostream>
#include <stacktrace>

void g() {
  std::cout << std::stacktrace::current()[0] << std::endl;
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


## 参照
- [LWG Issue 3515. `[stacktrace.basic.nonmem]`: `operator<<` should be less templatized](https://cplusplus.github.io/LWG/issue3515)
    - C++23で、`operator<<`が`charT`/`traits`でテンプレート化された`basic_ostream<charT, traits>`ではなく、非テンプレートの`ostream`を受け取り返すよう変更された
