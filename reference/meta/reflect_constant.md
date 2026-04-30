# reflect_constant
* meta[meta header]
* std::meta[meta namespace]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  template <class T>
  consteval info reflect_constant(const T& value);
}
```
* info[link info.md]

## 概要
値からリフレクションを生成する。


## 戻り値
`value`の値を表すリフレクションを返す。


## 例
```cpp example
#include <meta>

enum class Color { red = 1, green = 2, blue = 3 };

int main() {
  constexpr auto r = std::meta::reflect_constant(42);
  static_assert(std::meta::extract<int>(r) == 42);

  constexpr auto c = std::meta::reflect_constant(Color::green);
  static_assert(std::meta::extract<Color>(c) == Color::green);
}
```
* std::meta::extract[link extract.md]

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
- [`extract`](extract.md)
- [`reflect_object`](reflect_object.md)


## 参照
- [P2996R13 Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2996r13.html)
