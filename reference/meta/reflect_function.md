# reflect_function
* meta[meta header]
* std::meta[meta namespace]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  template <class T>
  consteval info reflect_function(T& fn);
}
```
* info[link info.md]

## 概要
関数からリフレクションを生成する。


## 戻り値
関数`fn`を表すリフレクションを返す。


## 例
```cpp example
#include <meta>

void my_func() {}

int main() {
  constexpr auto r = std::meta::reflect_function(my_func);
  static_assert(std::meta::is_function(r));
}
```
* std::meta::is_function[link is_function.md]

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
- [`reflect_object`](reflect_object.md)
- [`reflect_constant`](reflect_constant.md)


## 参照
- [P2996R13 Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2996r13.html)
