# value_or
* expected[meta header]
* function template[meta id-type]
* std[meta namespace]
* expected[meta class]
* cpp23[meta cpp]

```cpp
template<class U> constexpr T value_or(U&& v) const &; // (1)
template<class U> constexpr T value_or(U&& v) &&;      // (2)
```

## 概要
正常値もしくは指定された値を取得する。


## 適格要件
- (1) : [`is_copy_constructible_v`](/reference/type_traits/is_copy_constructible.md)`<T> == true &&` [`is_convertible_v`](/reference/type_traits/is_convertible.md)`<U, T> == true`
- (2) : [`is_move_constructible_v`](/reference/type_traits/is_move_constructible.md)`<T> == true &&` [`is_convertible_v`](/reference/type_traits/is_convertible.md)`<U, T> == true`


## 戻り値
- (1) : [`has_value()`](has_value.md) `?` [`**this`](op_deref.md) `: static_cast<T>(`[`std::forward`](/reference/utility/forward.md)`<U>(v))`
- (2) : [`has_value()`](has_value.md) `?` [`std::move`](/reference/utility/move.md)`(`[`**this`](op_deref.md)`) : static_cast<T>(`[`std::forward`](/reference/utility/forward.md)`<U>(v))`


## 例
```cpp example
#include <expected>
#include <iostream>
#include <string>

int main()
{
  std::expected<int, std::string> x = 42;
  std::cout << x.value_or(0) << std::endl;

  std::expected<int, std::string> y = std::unexpected{"ERR"};
  std::cout << y.value_or(0) << std::endl;
}
```
* value_or[color ff0000]
* std::unexpected[link ../unexpected.md]

### 出力
```
42
0
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): 16.0 [mark verified]
- [GCC](/implementation.md#gcc): 12.1 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`operator->`](op_arrow.md)
- [`operator*`](op_deref.md)
- [`value()`](value.md)


## 参照
- [P0323R12 std::expected](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p0323r12.html)
