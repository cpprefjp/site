# formatter
* stacktrace[meta header]
* std[meta namespace]
* class[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std {
  struct formatter<stacktrace_entry>;
}
```

## 概要
`stacktrace_entry`クラスに対する[`std::formatter`](/reference/format/formatter.md)クラステンプレートの特殊化。

フォーマットフラグとしては、以下を使用できる：

```
[[fill] [align] [width]]
```


## 例
```cpp example
#include <print>
#include <stacktrace>

void g() {
  std::stacktrace st = std::stacktrace::current(0, 1);
  std::stacktrace_entry entry = st[0];

  std::println("{}", entry);
  std::println("{: >30}", entry);
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
 g() at /app/example.cpp:5
     g() at /app/example.cpp:5
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 14
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`std::format()`](/reference/format/format.md) (フォーマットの詳細)


## 参照
- [P2693R1 Formatting `thread::id` and `stacktrace`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2693r1.pdf)
