# or_else
* expected[meta header]
* function template[meta id-type]
* std[meta namespace]
* expected.void[meta class]
* cpp23[meta cpp]

```cpp
// expected<cv void, E>部分特殊化
template<class F> constexpr auto or_else(F&& f) &;        // (1)
template<class F> constexpr auto or_else(F&& f) const &;  // (2)
template<class F> constexpr auto or_else(F&& f) &&;       // (3)
template<class F> constexpr auto or_else(F&& f) const &&; // (4)
```

## 概要
エラー値を保持していれば、エラー値に対して`f`を適用した結果を`expected`として返す。
正常値を保持していれば、そのまま返す。

実際には複数オーバーロードが提供されるが、大まかには下記シグニチャのようにみなせる。
`or_else`へは、引数リストに1個の`E`型をとり`std::expected<T, Return>`型を返す関数や関数オブジェクトを与える。

```cpp
template <cv void, class E>
class expected {
  template <class Return>
  std::expected<cv void, Return> or_else(function<std::expected<cv void, Return>(E)> func);
};
```
* function[link /reference/functional/function.md]


## 適格要件
- (1), (2) : 型`G`を[`remove_cvref_t`](/reference/type_traits/remove_cvref.md)`<`[`invoke_result_t`](/reference/type_traits/invoke_result.md)`<F, decltype(`[`error()`](error.md)`)>>`としたとき、次を全て満たすこと
    - `G`が`expected`の特殊化である
    - [`is_same_v`](/reference/type_traits/is_same.md)`<G::value_type, T> == true`
- (3), (4) : 型`G`を[`remove_cvref_t`](/reference/type_traits/remove_cvref.md)`<`[`invoke_result_t`](/reference/type_traits/invoke_result.md)`<F, decltype(`[`std::move`](/reference/utility/move.md)`(`[`error()`](error.md)`))>>`としたとき、次を全て満たすこと
    - `G`が`expected`の特殊化である
    - [`is_same_v`](/reference/type_traits/is_same.md)`<G::value_type, T> == true`


## 効果
- (1), (2) : 次の処理と等価
    ```cpp
    if (has_value())
      return G();
    else
      return invoke(std::forward<F>(f), error());
    ```
    * has_value()[link has_value.md]
    * error()[link error.md]
    * invoke[link /reference/functional/invoke.md]

- (3), (4) : 次の処理と等価
    ```cpp
    if (has_value())
      return G();
    else
      return invoke(std::forward<F>(f), std::move(error()));
    ```
    * has_value()[link has_value.md]
    * error()[link error.md]
    * invoke[link /reference/functional/invoke.md]
    * std::move[link /reference/utility/move.md]


## 備考
`or_else`は、メソッドチェーンをサポートするモナド風(monadic)操作として導入された。


## 例
```cpp example
#include <cassert>
#include <expected>
#include <string>

std::expected<void, std::string> validate(int code)
{
  if (0 <= code) {
    return {};
  } else {
    return std::unexpected{"bad code"};
  }
}

int main()
{
  std::expected<void, int> v1;
  assert(v1.or_else(validate).has_value());

  std::expected<void, int> e1 = std::unexpected{42};
  assert(e1.or_else(validate).has_value());

  std::expected<void, int> e2 = std::unexpected{-100};
  assert(e2.or_else(validate).error() == "bad code");
}
```
* or_else[color ff0000]
* has_value()[link has_value.md]
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
- [`and_then()`](and_then.md)
- [`transform()`](transform.md)
- [`transform_error()`](transform_error.md)


## 参照
- [P2505R5 Monadic Functions for `std::expected`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2505r5.html)
