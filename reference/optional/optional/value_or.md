# value_or
* optional[meta header]
* std[meta namespace]
* optional[meta class]
* function template[meta id-type]
* cpp17[meta cpp]

```cpp
// optional<T>版のオーバーロード
template <class U> constexpr T value_or(U&& v) const&; // (1)
template <class U> constexpr T value_or(U&& v) &&;     // (2)

// optional<T&>版のオーバーロード (C++26)
template <class U = remove_cv_t<T>>
constexpr remove_cv_t<T> value_or(U&& u) const;        // (3) C++26
```

## 概要
有効値もしくは指定された無効値を取得する。

- (1) : `*this`が`const`左辺値である場合。有効値を保持していれば有効値を返し、そうでなければ`v`を返す
- (2) : `*this`が右辺値である場合。有効値を保持していれば有効値をムーブして返し、そうでなければ`v`を返す
- (3) : `optional<T&>`の場合。有効値を保持していれば参照先の値を返し、そうでなければ`u`を返す

`optional<T>`では (1), (2) が定義され、`optional<T&>`では (3) のみが定義される。


## 要件
- (1), (2) : [`is_move_constructible_v`](/reference/type_traits/is_move_constructible.md)`<T> == true`であること
- (1), (2) : [`is_convertible_v`](/reference/type_traits/is_convertible.md)`<U&&, T> == true`であること


## 効果
- (1), (2) : 以下の式と等価の効果を持つ：

    ```cpp
    return has_value() ? value() : static_cast<T>(std::forward<U>(v));
    ```
    * has_value()[link has_value.md]
    * value()[link value.md]

- (3) : 以下の式と等価の効果を持つ：

    ```cpp
    return has_value() ? *val : std::forward<U>(u);
    ```


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
- [Clang](/implementation.md#clang): 4.0.1 [mark verified]
- [GCC](/implementation.md#gcc): 7.2 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`optional::value()`](value.md)
- [`optional::has_value()`](has_value.md)
- [`optional::operator bool()`](op_bool.md)


## 参照
- [P2988R12 `std::optional<T&>`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2988r12.pdf)
    - C++26で参照型`T&`に対する部分特殊化を追加
