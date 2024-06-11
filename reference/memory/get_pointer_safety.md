# get_pointer_safety
* memory[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]
* cpp23removed[meta cpp]

```cpp
namespace std {
  pointer_safety get_pointer_safety() noexcept;
}
```
* pointer_safety[link /reference/memory/pointer_safety.md]

この関数はC++23で削除された。

## 概要
ポインタの安全性が、使用している処理系においてどのように実装されているかを確認する。


## 戻り値
[`pointer_safety`](/reference/memory/pointer_safety.md)型の列挙値のうち、いずれかが返却される。

返される値は処理系依存。


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc):
- [ICC](/implementation.md#icc):
- [Visual C++](/implementation.md#visual_cpp): 2010 [mark verified], 2012 [mark verified], 2013 [mark verified]


## 参照
- [P2186R2 Removing Garbage Collection Support](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2186r2.html)
