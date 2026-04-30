# is_nothrow_destructible_type
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval bool is_nothrow_destructible_type(info type);
}
```
* info[link info.md]

## 概要
例外を送出せずに破棄可能型であるかを判定する。[`std::is_nothrow_destructible`](/reference/type_traits/is_nothrow_destructible.md)に対応する。


## 戻り値
`type`が表す型が例外を送出せずに破棄可能型である場合に`true`を返す。


## 例外
`type`が型を表さない場合、[`std::meta::exception`](exception.md)例外を送出する。


## 例
```cpp example
#include <meta>

struct Throwing {
  ~Throwing() noexcept(false) {}
};

int main() {
  static_assert(std::meta::is_nothrow_destructible_type(^^int));
  static_assert(!std::meta::is_nothrow_destructible_type(^^Throwing));
}
```
* std::meta::is_nothrow_destructible_type[color ff0000]

### 出力
```
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 16 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`std::is_nothrow_destructible`](/reference/type_traits/is_nothrow_destructible.md)


## 参照
- [P2996R13 Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2996r13.html)
