# swap
* expected[meta header]
* function[meta id-type]
* std[meta namespace]
* expected.void[meta class]
* cpp23[meta cpp]

```cpp
// expected<cv void, E>部分特殊化
constexpr void swap(expected& rhs) noexcept(see below);
```
* see below[italic]

## 概要
他の`expected`オブジェクトとデータを入れ替える。

動作説明用の`expected`クラスメンバ変数として、下記を導入する。

- `unex` : `E`型のエラー値。
- `has_val` : `bool`型のフラグ変数。正常値を保持する場合は`true`に、エラー値を保持する場合は`false`となる。


## テンプレートパラメータ制約
次の制約を全て満たすこと

- [`is_swappable_v`](/reference/type_traits/is_swappable.md)`<E> == true`
- [`is_move_constructible_v`](/reference/type_traits/is_move_constructible.md)`<E> == true`


## 効果
`*this`と`rhs`それぞれが正常値／エラー値いずれを保持しているかに応じて、以下の効果を持つ。

- `*this`と`rhs`ともに正常値を保持していれば、なにもしない
- `*this`と`rhs`ともにエラー値を保持していれば、次と等価 : `using` [`std::swap`](/reference/utility/swap.md)`; swap(unex, rhs.unex);`
- `*this`がエラー値を`rhs`が正常値を保持していれば、次と等価 : `rhs.swap(*this);`
- `*this`が正常値を`rhs`がエラー値を保持していれば、次と等価 :
    ```cpp
    construct_at(addressof(unex), std::move(rhs.unex));
    destroy_at(addressof(rhs.unex));
    has_val = false;
    rhs.has_val = true;
    ```
    * addressof[link /reference/memory/addressof.md]
    * construct_at[link /reference/memory/construct_at.md]
    * destroy_at[link /reference/memory/destroy_at.md]
    * std::move[link /reference/utility/move.md]


## 戻り値
なし


## 例外
noexcept例外指定は次の式に従う :

[`is_nothrow_move_constructible_v`](/reference/type_traits/is_nothrow_move_constructible.md)`<E> &&` [`is_nothrow_swappable_v`](/reference/type_traits/is_nothrow_swappable.md)`<E>`

noexcept例外指定が`false`の場合、上記の「効果」による処理からの例外がスローされる。


## 例
```cpp example
#include <cassert>
#include <expected>

int main()
{
  std::expected<void, int> x;
  std::expected<void, int> y = std::unexpected{42};
  assert(x.has_value() && y.error() == 42);

  x.swap(y);
  assert(x.error() == 42 && y.has_value());
}
```
* swap[color ff0000]
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
- [Clang](/implementation.md#clang): 16.0 [mark verified]
- [GCC](/implementation.md#gcc): 12.1 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0323R12 std::expected](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p0323r12.html)
