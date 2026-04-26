# has_thread_storage_duration
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval bool has_thread_storage_duration(info r);
}
```
* info[link info.md]

## 概要
スレッド記憶域期間を持つかを判定する。


## 戻り値
`r`がスレッド記憶域期間（`thread_local`）を持つ変数を表す場合に`true`を返す。


## 例
```cpp example
#include <meta>

thread_local int tls_var;
int normal_var;

int main() {
  static_assert(std::meta::has_thread_storage_duration(^^tls_var));
  static_assert(!std::meta::has_thread_storage_duration(^^normal_var));
}
```

### 出力
```
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P2996R13 Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2996r13.html)
