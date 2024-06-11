# operator==
* stacktrace[meta header]
* std[meta namespace]
* stacktrace_entry[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
friend bool operator==(const stacktrace_entry& x,
                       const stacktrace_entry& y) noexcept;
```

## 概要
`stacktrace_entry`同士の等値比較を行う。


## 戻り値
`x`と`y`が同じスタックトレースエントリを表すか、両方が空の場合のみ`true`を返す。


## 備考
- この演算子により、`operator!=`が使用可能になる


## 例
```cpp example
#include <cassert>
#include <stacktrace>

void g() {
  std::stacktrace st = std::stacktrace::current();
  std::stacktrace_entry a = st[0];
  std::stacktrace_entry b = st[0];
  std::stacktrace_entry c = st[1];

  assert(a == b);
  assert(a != c);
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
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 12 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [Hidden Friends](/article/lib/hidden_friends.md)
