# native_handle
* stacktrace[meta header]
* std[meta namespace]
* stacktrace_entry[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
constexpr native_handle_type native_handle() const noexcept; // (1) C++23
```

## 概要
ハンドルを取得する。


## 戻り値
実装定義のハンドルを返す。


## 備考
- 変更されていない`stacktrace_entry`オブジェクトに対してこの関数を連続して呼び出すと、同じ値が返される
- GCCでは、libstdc++の内部ライブラリ向けのポインタを整数値型[`std::uintptr_t`](/reference/cstdint/uintptr_t.md)の変換した型になっている
    - `__glibcxx_backtrace_pcinfo()`など、内部ライブラリ用であるため、ユーザーがハンドルを便利に使えるようにはなっていない
- MSVCでも内部ライブラリ向けの`void*`型ポインタになっている
    - こちらも内部ライブラリ用であるため、ユーザーがハンドルを便利に使えるようにはなっていない


## 例
```cpp example
#include <iostream>
#include <stacktrace>

void g() {
  std::stacktrace st = std::stacktrace::current();
  std::stacktrace_entry entry = st[0];

  std::cout << entry.native_handle() << std::endl;
}

void f() {
  g();
}

int main() {
  f();
}
```
* entry.native_handle()[color ff0000]
* std::stacktrace[link /reference/stacktrace/basic_stacktrace.md]
* current[link /reference/stacktrace/basic_stacktrace/current.md]

### 出力例 (GCC)
```
4199037
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 12 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??
