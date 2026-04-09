# has_virtual_destructor
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval bool has_virtual_destructor(info r);
}
```
* info[link info.md]

## 概要
仮想デストラクタを持つ型であるかを判定する。[`std::has_virtual_destructor`](/reference/type_traits/has_virtual_destructor.md)に対応する。


## 戻り値
`r`が表す型が仮想デストラクタを持つ場合に`true`を返す。


## 例外
`r`が型を表さない場合、[`std::meta::exception`](exception.md)例外を送出する。


## 例
```cpp example
#include <meta>

struct Base {
  virtual ~Base() = default;
};

struct NonVirtual {
  ~NonVirtual() = default;
};

int main() {
  static_assert(std::meta::has_virtual_destructor(^^Base));
  static_assert(!std::meta::has_virtual_destructor(^^NonVirtual));
  static_assert(!std::meta::has_virtual_destructor(^^int));
}
```
* std::meta::has_virtual_destructor[color ff0000]

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


## 関連項目
- [`std::has_virtual_destructor`](/reference/type_traits/has_virtual_destructor.md)


## 参照
- [P2996R13 Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2996r13.html)
