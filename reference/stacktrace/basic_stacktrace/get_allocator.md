# max_size
* stacktrace[meta header]
* std[meta namespace]
* basic_stacktrace[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
allocator_type get_allocator() const noexcept; // (1) C++23
```

## 概要
アロケータオブジェクトを取得する。


## 戻り値
コンストラクタで設定され、保持しているアロケータオブジェクトを返す。


## 例
```cpp example
#include <cassert>
#include <stacktrace>

int main() {
  std::allocator<std::stacktrace_entry> alloc{};
  std::stacktrace trace{alloc};

  assert(trace.get_allocator() == alloc);
}
```
* trace.get_allocator()[color ff0000]
* std::stacktrace_entry[link /reference/stacktrace/stacktrace_entry.md]

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
