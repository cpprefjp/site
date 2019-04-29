# operator=
* variant[meta header]
* std[meta namespace]
* variant[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
constexpr variant& operator=(const variant& rhs);                // (1)
constexpr variant& operator=(variant&& rhs) noexcept(see below); // (2)

template <class T>
variant& operator=(T&& rhs) noexcept(see below);                 // (3)
```

## 概要
`variant`オブジェクトもしくは候補型の値を代入する。

- (1) : コピー代入演算子
- (2) : ムーブ代入演算子
- (3) : クラスのテンプレート引数で指定した候補型のうち、いずれかの型の値を代入する


## 効果
- (1) :
    - `*this`と`rhs`がどちらも値を保持していない場合、なにもしない
    - `*this`が値を保持し、`rhs`が保持していない場合、`*this`が値を保持していない状態にする
    - [`index()`](index.md) `== rhs.`[`index()`](index.md)である場合、`rhs`が保持している値を`*this`が保持する値としてコピー代入する (型の切り替えを行わない)
    - `rhs.`[`index()`](index.md)を`j`、`Types...`の`j`番目の型を`Tj`として、[`is_nothrow_copy_constructible_v`](/reference/type_traits/is_nothrow_copy_constructible.md)`<Tj> == true`もしくは[`is_nothrow_move_constructible_v`](/reference/type_traits/is_nothrow_move_constructible.md)`<Tj> == false`である場合、[`emplace`](emplace.md.nolink)`<j>(`[`get`](get.md)`<j>(rhs))`と等価
    - いずれにも当てはまらない場合、`operator=(variant(rhs))`と等価
- (2) :
    - `*this`と`rhs`がどちらも値を保持していない場合、なにもしない
    - `*this`が値を保持し、`rhs`が保持していない場合、`*this`が値を保持していない状態にする
    - [`index()`](index.md) `== rhs.`[`index()`](index.md)である場合、`rhs`が保持している値を`*this`が保持する値としてムーブ代入する (型の切り替えを行わない)
    - いずれにも当てはまらない場合、`rhs.`[`index()`](index.md)を`j`として、[`emplace`](emplace.md.nolink)`<j>(`[`get`](get.md)`<j>(`[`std::move`](/reference/utility/move.md)`(rhs)))`と等価
- (3) : TODO


## 戻り値
`*this`


## 事後条件
- (1), (2) : [`index()`](index.md) `== rhs.`[`index()`](index.md)


## 例外


## 備考
- (1) :
    - `Types...`のすべての型`Ti`について、[`is_copy_constructible_v`](/reference/type_traits/is_copy_constructible.md)`<Ti> &&` [`is_copy_assignable_v`](/reference/type_traits/is_copy_assignable.md)`<Ti>`が`true`でない場合、この演算子は`delete`定義される
    - `Types...`のすべての型`Ti`について、[`is_trivially_copy_constructible_v`](/reference/type_traits/is_trivially_copy_constructible.md)`<Ti> &&` [`is_trivially_copy_assignable_v`](/reference/type_traits/is_trivially_copy_assignable.md)`<Ti> &&` [`is_trivially_destructible_v`](/reference/type_traits/is_trivially_destructible.md)`<Ti>`が`true`である場合、この演算子は自明となる
- (2) :
    - `Types...`のすべての型`Ti`について、[`is_move_constructible_v`](/reference/type_traits/is_move_constructible.md)`<Ti> &&` [`is_move_assignable_v`](/reference/type_traits/is_move_assignable.md)`<Ti>`が`true`でない場合、この演算子はオーバーロード解決の候補から除外される
    - `Types...`のすべての型`Ti`について、[`is_trivially_move_constructible_v`](/reference/type_traits/is_trivially_move_constructible.md)`<Ti> &&` [`is_trivially_move_assignable_v`](/reference/type_traits/is_trivially_move_assignable.md)`<Ti> &&` [`is_trivially_destructible_v`](/reference/type_traits/is_trivially_destructible.md)`<Ti>`が`true`である場合、この演算子は自明となる
    - `noexcept`演算子内部の式は、以下と等価となる：
        - `Types...`のすべての型`Ti`について、[`is_nothrow_move_constructible_v`](/reference/type_traits/is_nothrow_move_constructible.md)`<Ti> &&` [`is_nothrow_move_assignable_v`](/reference/type_traits/is_nothrow_move_assignable.md)`<Ti>`
    - `rhs.`[`index()`](index.md)を`j`、`Types...`の`j`番目の型を`Tj`として、型`Tj`のムーブ構築中に例外が発生した場合、その`variant`オブジェクトは値を保持しない状態になる
    - `rhs.`[`index()`](index.md)を`j`、`Types...`の`j`番目の型を`Tj`として、型`Tj`のムーブ代入中に例外が発生した場合、型`Tj`のムーブ代入演算子が保証する例外安全性が定義する値の保持状態となり、`*this`の[`index()`](index.md)は`j`となる


## 例
```cpp example
#include <cassert>
#include <variant>

int main()
{
}
```

### 出力
```
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 4.0.1
- [GCC](/implementation.md#gcc): 7.3
- [Visual C++](/implementation.md#visual_cpp): ??
