# and_then
* optional[meta header]
* function template[meta id-type]
* std[meta namespace]
* optional[meta class]
* cpp23[meta cpp]

```cpp
template <class F> constexpr auto and_then(F&& f) &;       // (1)
template <class F> constexpr auto and_then(F&& f) &&;      // (2)
template <class F> constexpr auto and_then(F&& f) const&;  // (3)
template <class F> constexpr auto and_then(F&& f) const&&; // (4)
```

## 概要
有効値を保持していれば、値に対して`f`を適用した結果を`optional`として返す。
有効値を保持していなければ、[`std::nullopt`](../nullopt_t.md)を返す。

実際には複数オーバーロードが提供されるが、大まかには下記シグニチャのようにみなせる。
`and_then`へは、引数リストに1個の`T`型をとり`std::optional<Return>`型を返す関数や関数オブジェクトを与える。

```cpp
template <class T>
class optional {
  template <class Return>
  std::optional<Return> and_then(function<std::optional<Return>(T)> func);
};
```
* function[link /reference/functional/function.md]


## 適格要件
説明用の`U`型を次の通りとする：

- (1), (3) : [`invoke_result_t`](/reference/type_traits/invoke_result.md)`<F, decltype(`[`value()`](value.md)`)>`
- (2), (4) : [`invoke_result_t`](/reference/type_traits/invoke_result.md)`<F, decltype(`[`std::move`](/reference/utility/move.md)`(`[`value()`](value.md)`))>`

[`remove_cvref_t`](/reference/type_traits/remove_cvref.md)`<U>`は`optional`の特殊化であること


## 効果
- (1), (3) : 次と等価

    ```cpp
    if (*this) {
      return invoke(std::forward<F>(f), value());
    } else {
      return remove_cvref_t<U>();
    }
    ```
    * invoke[link /reference/functional/invoke.md]
    * value()[link value.md]

- (2), (4) : 次と等価

    ```cpp
    if (*this) {
      return invoke(std::forward<F>(f), std::move(value()));
    } else {
      return remove_cvref_t<U>();
    }
    ```
    * invoke[link /reference/functional/invoke.md]
    * std::move[link /reference/utility/move.md]
    * value()[link value.md]


## 備考
`and_then`は、メソッドチェーンをサポートするモナド風(monadic)操作として導入された。
関数型プログラミングの文脈における Monadic Bind 操作に対応する。


## 例
```cpp example
#include <cassert>
#include <optional>

// 正数なら2倍／それ以外は無効値を返す関数
std::optional<int> twice(int n)
{
  if (0 < n) {
    return n * 2;
  } else {
    return std::nullopt;
  }
}

int main()
{
  std::optional<int> o1 = 2;
  assert(o1.and_then(twice).value() == 4);

  std::optional<int> o2 = -1;
  assert(not o2.and_then(twice).has_value());

  std::optional<int> o3 = std::nullopt;
  assert(not o3.and_then(twice).has_value());
}
```
* and_then[color ff0000]
* std::nullopt[link ../nullopt_t.md]
* value()[link value.md]
* has_value()[link has_value.md]


### 出力
```
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`transform`](transform.md)
- [`or_else`](or_else.md)


## 参照
- [P0798R8 Monadic operations for std::optional](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p0798r8.html)
