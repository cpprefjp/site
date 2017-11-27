# value_or
* optional[meta header]
* std[meta namespace]
* optional[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
template <class U> constexpr T value_or(U&& v) const&; // (1)
template <class U> constexpr T value_or(U&& v) &&;     // (2)
```

## 概要
有効値もしくは指定された無効値を取得する。

この関数は、`*this`が有効値を保持していれば有効値を返し、そうでなければ`v`を返す。


## 要件
- [`is_move_constructible_v`](/reference/type_traits/is_move_constructible.md)`<T> == true`であること
- [`is_convertible_v`](/reference/type_traits/is_convertible.md)`<U&&, T> == true`であること


## 効果
以下の式と同等の効果を持つ：

```cpp
return has_value() ? value() : static_cast<T>(std::forward<U>(v));
```
* has_value()[link has_value.md]
* value()[link value.md]
* std::forward[link /reference/utility/forward.md]


## 例
```cpp example
#include <iostream>
#include <optional>

int main()
{
  std::optional<int> p1 = 3;
  // p1が有効値を持っていればそれが返り、持っていなければ-1が返る
  int result1 = p1.value_or(-1);
  std::cout << result1 << std::endl;

  std::optional<int> p2;
  int result2 = p2.value_or(-1);
  std::cout << result2 << std::endl;
}
```
* value_or[color ff0000]

### 出力
```
3
-1
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang, C++17 mode](/implementation.md#clang): 4.0.1
- [GCC, C++17 mode](/implementation.md#gcc): 7.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`optional::value()`](value.md)
- [`optional::has_value()`](has_value.md)
- [`optional::operator bool()`](op_bool.md)
