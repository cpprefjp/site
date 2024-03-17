# error_or
* expected[meta header]
* function template[meta id-type]
* std[meta namespace]
* expected.void[meta class]
* cpp23[meta cpp]

```cpp
// expected<cv void, E>部分特殊化
template<class G = E> constexpr E error_or(G&& e) const &; // (1)
template<class G = E> constexpr E error_or(G&& e) &&;      // (2)
```

## 概要
エラー値もしくは指定された値を取得する。


## 適格要件
- (1) : [`is_copy_constructible_v`](/reference/type_traits/is_copy_constructible.md)`<E> == true &&` [`is_convertible_v`](/reference/type_traits/is_convertible.md)`<G, E> == true`
- (2) : [`is_move_constructible_v`](/reference/type_traits/is_move_constructible.md)`<E> == true &&` [`is_convertible_v`](/reference/type_traits/is_convertible.md)`<G, E> == true`


## 戻り値
- (1) : [`has_value()`](has_value.md) `?` [`std::forward`](/reference/utility/forward.md)`<G>(e) :` [`error()`](error.md)
- (2) : [`has_value()`](has_value.md) `?` [`std::forward`](/reference/utility/forward.md)`<G>(e) :` [`std::move`](/reference/utility/move.md)`(`[`error()`](error.md)`)`


## 例
```cpp example
#include <expected>
#include <iostream>
#include <string>

int main()
{
  std::expected<void, std::string> x;
  std::cout << x.error_or("-") << std::endl;

  std::expected<void, std::string> y = std::unexpected{"ERR"};
  std::cout << y.error_or("-") << std::endl;
}
```
* error_or[color ff0000]
* std::unexpected[link ../unexpected.md]

### 出力
```
-
ERR
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 13.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`error()`](error.md)


## 参照
- [P0323R12 std::expected](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p0323r12.html)
