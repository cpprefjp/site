# swap
* expected[meta header]
* function[meta id-type]
* std[meta namespace]
* expected[meta class]
* cpp23[meta cpp]

```cpp
constexpr void swap(expected& rhs) noexcept(see below);
```

## 概要
他の`expected`オブジェクトとデータを入れ替える。

動作説明用の`expected`クラスメンバ変数として、下記を導入する。

- `val` : `T`型の正常値。
- `unex` : `E`型のエラー値。
- `has_val` : `bool`型のフラグ変数。正常値を保持する場合は`true`に、エラー値を保持する場合は`false`となる。


## テンプレートパラメータ制約
次の制約を全て満たすこと

- [`is_swappable_v`](/reference/type_traits/is_swappable.md)`<T> == true`
- [`is_swappable_v`](/reference/type_traits/is_swappable.md)`<E> == true`
- `(`[`is_move_constructible_v`](/reference/type_traits/is_move_constructible.md)`<T> &&` [`is_move_constructible_v`](/reference/type_traits/is_move_constructible.md)`<E>) == true`
- `(`[`is_nothrow_move_constructible_v`](/reference/type_traits/is_nothrow_move_constructible.md)`<T> ||` [`is_nothrow_move_constructible_v`](/reference/type_traits/is_nothrow_move_constructible.md)`<E>) == true`


## 効果
`*this`と`rhs`それぞれが正常値／エラー値いずれを保持しているかに応じて、以下の効果を持つ。

- `*this`と`rhs`ともに正常値を保持していれば、次と等価 : `using` [`std::swap`](/reference/utility/swap.md)`; swap(val, rhs.val);`
- `*this`と`rhs`ともにエラー値を保持していれば、次と等価 : `using` [`std::swap`](/reference/utility/swap.md)`; swap(unex, rhs.unex);`
- `*this`がエラー値を`rhs`が正常値を保持していれば、次と等価 : `rhs.swap(*this);`
- `*this`が正常値を`rhs`がエラー値を保持していれば、次と等価 :
    ```cpp
    if constexpr (is_nothrow_move_constructible_v<E>) {
      E tmp(std::move(rhs.unex));
      destroy_at(addressof(rhs.unex));
      try {
        construct_at(addressof(rhs.val), std::move(val));
        destroy_at(addressof(val));
        construct_at(addressof(unex), std::move(tmp));
      } catch(...) {
        construct_at(addressof(rhs.unex), std::move(tmp));
        throw;
      }
    } else {
      T tmp(std::move(val));
      destroy_at(addressof(val));
      try {
        construct_at(addressof(unex), std::move(rhs.unex));
        destroy_at(addressof(rhs.unex));
        construct_at(addressof(rhs.val), std::move(tmp));
      } catch (...) {
        construct_at(addressof(val), std::move(tmp));
        throw;
      }
    }
    has_val = false;
    rhs.has_val = true;
    ```
    * construct_at[link /reference/memory/construct_at.md]
    * destroy_at[link /reference/memory/destroy_at.md]
    * std::move[link /reference/utility/move.md]
    * is_nothrow_move_constructible_v[link /reference/type_traits/is_nothrow_move_constructible.md]


## 戻り値
なし


## 例外
noexcept例外指定は次の式に従う :

[`is_nothrow_move_constructible_v`](/reference/type_traits/is_nothrow_move_constructible.md)`<T> &&` [`is_nothrow_swappable_v`](/reference/type_traits/is_nothrow_swappable.md)`<T> &&` [`is_nothrow_move_constructible_v`](/reference/type_traits/is_nothrow_move_constructible.md)`<E> &&` [`is_nothrow_swappable_v`](/reference/type_traits/is_nothrow_swappable.md)`<E>`

noexcept例外指定が`false`の場合、上記の「効果」による処理からの例外が送出される。


## 例
```cpp example
#include <cassert>
#include <expected>
#include <string>

int main()
{
  std::expected<int, std::string> x = 42;
  std::expected<int, std::string> y = std::unexpected{"ERR"};
  assert(x.value() == 42 && y.error() == "ERR");

  x.swap(y);
  assert(x.error() == "ERR" && y.value() == 42);
}
```
* swap[color ff0000]
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
- [Clang](/implementation.md#clang): 16.0 [mark verified]
- [GCC](/implementation.md#gcc): 12.1 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0323R12 std::expected](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p0323r12.html)
