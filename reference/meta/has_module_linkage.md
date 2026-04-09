# has_module_linkage
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval bool has_module_linkage(info r);
}
```
* info[link info.md]

## 概要
モジュールリンケージを持つかを判定する。


## 戻り値
`r`がモジュールリンケージを持つエンティティを表す場合に`true`を返す。


## 例
```cpp example
// モジュール内でのモジュールリンケージの例
export module mymodule;

import std;

// exportされていないモジュールスコープの宣言はモジュールリンケージを持つ
void internal_func() {}

// exportされた宣言は外部リンケージを持つ
export void public_func() {
  static_assert(std::meta::has_module_linkage(^^internal_func));
  static_assert(!std::meta::has_module_linkage(^^public_func));
  static_assert(std::meta::has_external_linkage(^^public_func));
}
```
* std::meta::has_module_linkage[color ff0000]

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
