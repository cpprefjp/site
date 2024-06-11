# to_underlying
* utility[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std {
  template <class T>
  constexpr underlying_type_t<T> to_underlying(T value) noexcept; // C++23
}
```
* underlying_type_t[link /reference/type_traits/underlying_type.md]

## 概要
列挙型`T`の値を基底型に変換する。

列挙型は`enum class E : int { … };`のようにコロンのあとに基底型を指定でき、指定しない場合の基底型はすべての列挙値を表現できる整数型となる。この関数では、列挙値を基底型に変換する。


## 戻り値
```cpp
return static_cast<underlying_type_t<T>>(value);
```
* underlying_type_t[link /reference/type_traits/underlying_type.md]


## 例
```cpp example
#include <iostream>
#include <utility>

enum class Color : int {
  Red   = 0xff0000,
  Green = 0x00ff00,
  Blue  = 0x0000ff,
};

void print_color_value(int color) {
  std::cout << std::hex << std::showbase << color << std::endl;
}

int main() {
  print_color_value(std::to_underlying(Color::Blue));
}
```
* std::to_underlying[color ff0000]
* std::hex[link /reference/ios/hex.md]
* std::showbase[link /reference/ios/showbase.md]

### 出力
```
0xff
```


## バージョン
### 言語
- C++23

### 処理系
- [GCC](/implementation.md#gcc): 11.1 [mark verified]
- [Clang](/implementation.md#clang): 13.0 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??

## 参照
- [P1682R2 `std::to_underlying` for enumerations](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p1682r2.html)
