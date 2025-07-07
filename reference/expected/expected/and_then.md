# and_then
* expected[meta header]
* function template[meta id-type]
* std[meta namespace]
* expected[meta class]
* cpp23[meta cpp]

```cpp
template<class F> constexpr auto and_then(F&& f) &;        // (1)
template<class F> constexpr auto and_then(F&& f) const &;  // (2)
template<class F> constexpr auto and_then(F&& f) &&;       // (3)
template<class F> constexpr auto and_then(F&& f) const &&; // (4)
```

## 概要
正常値を保持していれば、正常値に対して`f`を適用した結果を`expected`として返す。
エラー値を保持していれば、そのまま返す。

実際には複数オーバーロードが提供されるが、大まかには下記シグニチャのようにみなせる。
`and_then`へは、引数リストに1個の`T`型をとり`std::expected<Return, E>`型を返す関数や関数オブジェクトを与える。

```cpp
template <class T, class E>
class expected {
  template <class Return>
  std::expected<Return, E> and_then(function<std::expected<Return, E>(T)> func);
};
```
* function[link /reference/functional/function.md]


## テンプレートパラメータ制約
- (1), (2) : [`is_copy_constructible_v`](/reference/type_traits/is_copy_constructible.md)`<E> == true`
- (3), (4) : [`is_move_constructible_v`](/reference/type_traits/is_move_constructible.md)`<E> == true`


## 適格要件
- (1), (2) : 型`U`を[`remove_cvref_t`](/reference/type_traits/remove_cvref.md)`<`[`invoke_result_t`](/reference/type_traits/invoke_result.md)`<F, decltype(`[`value()`](value.md)`)>>`としたとき、次を全て満たすこと
    - `U`が`expected`の特殊化である
    - [`is_same_v`](/reference/type_traits/is_same.md)`<U::error_type, E> == true`
- (3), (4) : 型`U`を[`remove_cvref_t`](/reference/type_traits/remove_cvref.md)`<`[`invoke_result_t`](/reference/type_traits/invoke_result.md)`<F, decltype(`[`std::move`](/reference/utility/move.md)`(`[`value()`](value.md)`))>>`としたとき、次を全て満たすこと
    - `U`が`expected`の特殊化である
    - [`is_same_v`](/reference/type_traits/is_same.md)`<U::error_type, E> == true`


## 効果
- (1), (2) : 次の処理と等価
    ```cpp
    if (has_value())
      return invoke(std::forward<F>(f), value());
    else
      return U(unexpect, error());
    ```
    * has_value[link has_value.md]
    * value()[link value.md]
    * error()[link error.md]
    * unexpect[link ../unexpect_t.md]
    * invoke[link /reference/functional/invoke.md]

- (3), (4) : 次の処理と等価
    ```cpp
    if (has_value())
      return invoke(std::forward<F>(f), std::move(value()));
    else
      return U(unexpect, std::move(error()));
    ```
    * has_value[link has_value.md]
    * value()[link value.md]
    * error()[link error.md]
    * unexpect[link ../unexpect_t.md]
    * invoke[link /reference/functional/invoke.md]
    * std::move[link /reference/utility/move.md]


## 備考
`and_then`は、メソッドチェーンをサポートするモナド風(monadic)操作として導入された。


## 例
```cpp example
#include <cassert>
#include <expected>
#include <string>

// 正数なら2倍／それ以外はエラー値を返す関数
std::expected<int, std::string> twice(int n)
{
  if (0 < n) {
    return n * 2;
  } else {
    return std::unexpected{"out of domain"};
  }
}

int main()
{
  std::expected<int, std::string> v1 = 1;
  assert(v1.and_then(twice).value() == 2);

  std::expected<int, std::string> v2 = 0;
  assert(v2.and_then(twice).error() == "out of domain");

  std::expected<int, std::string> e1 = std::unexpected{"NaN"};
  assert(e1.and_then(twice).error() == "NaN");
}
```
* and_then[color ff0000]
* value()[link value.md]
* error()[link error.md]
* std::unexpected[link ../unexpected.md]

### 出力
```
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 13.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`or_else()`](or_else.md)
- [`transform()`](transform.md)
- [`transform_error()`](transform_error.md)


## 参照
- [P2505R5 Monadic Functions for `std::expected`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2505r5.html)
