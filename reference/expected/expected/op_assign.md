# operator=
* expected[meta header]
* function[meta id-type]
* std[meta namespace]
* expected[meta class]
* cpp23[meta cpp]

```cpp
constexpr expected& operator=(const expected&);      // (1)

constexpr expected& operator=(expected&&) noexcept(see below); // (2)

template<class U = T>
constexpr expected& operator=(U&&);                  // (3)

template<class G>
constexpr expected& operator=(const unexpected<G>&); // (4)

template<class G>
constexpr expected& operator=(unexpected<G>&&);      // (5)
```
* see below[italic]
* unexpected[link ../unexpected.md]

## 概要
- (1) : コピー代入。
- (2) : ムーブ代入。
- (3) : 要素型`T`に変換可能な値を、正常値としてコピー代入またはムーブ代入。
- (4) : 変換可能な[`unexpected`](../unexpected.md)オブジェクトから、エラー値としてコピー代入。
- (5) : 変換可能な[`unexpected`](../unexpected.md)オブジェクトから、エラー値としてムーブ代入。


動作説明用の`expected`クラスメンバ変数として、下記を導入する。

- `val` : `T`型の正常値。
- `unex` : `E`型のエラー値。
- `has_val` : `bool`型のフラグ変数。正常値を保持する場合は`true`に、エラー値を保持する場合は`false`となる。

また、説明用のテンプレート関数`reinit-expected`を次の通り定義する。

```cpp
template<class T, class U, class... Args>
constexpr void reinit-expected(T& newval, U& oldval, Args&&... args) {
  if constexpr (is_nothrow_constructible_v<T, Args...>) {
    destroy_at(addressof(oldval));
    construct_at(addressof(newval), std::forward<Args>(args)...);
  } else if constexpr (is_nothrow_move_constructible_v<T>) {
    T tmp(std::forward<Args>(args)...);
    destroy_at(addressof(oldval));
    construct_at(addressof(newval), std::move(tmp));
  } else {
    U tmp(std::move(oldval));
    destroy_at(addressof(oldval));
    try {
      construct_at(addressof(newval), std::forward<Args>(args)...);
    } catch (...) {
      construct_at(addressof(oldval), std::move(tmp));
      throw;
    }
  }
}
```
* addressof[link /reference/memory/addressof.md]
* construct_at[link /reference/memory/construct_at.md]
* destroy_at[link /reference/memory/destroy_at.md]
* is_nothrow_constructible_v[link /reference/type_traits/is_nothrow_constructible.md]
* is_nothrow_move_constructible_v[link /reference/type_traits/is_nothrow_move_constructible.md]


## テンプレートパラメータ制約
- (2) : 下記を全て満たすこと
    - [`is_move_constructible_v`](/reference/type_traits/is_move_constructible.md)`<T> == true`
    - [`is_move_assignable_v`](/reference/type_traits/is_move_assignable.md)`<T> == true`
    - [`is_move_constructible_v`](/reference/type_traits/is_move_constructible.md)`<E> == true`
    - [`is_move_assignable_v`](/reference/type_traits/is_move_assignable.md)`<E> == true`
    - `(`[`is_nothrow_move_constructible_v`](/reference/type_traits/is_nothrow_move_constructible.md)`<T> ||` [`is_nothrow_move_constructible_v`](/reference/type_traits/is_nothrow_move_constructible.md)`<E>) == true`
- (3) : 下記を全て満たすこと
    - [`is_same_v`](/reference/type_traits/is_same.md)`<expected,` [`remove_cvref_t`](/reference/type_traits/remove_cvref.md)`<U>> == false`
    - [`remove_cvref_t`](/reference/type_traits/remove_cvref.md)`<U>`が[`unexpected`](../unexpected.md)の特殊化ではない
    - [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<T, U> == true`
    - [`is_assignable_v`](/reference/type_traits/is_assignable.md)`<T&, U> == true`
    - `(`[`is_nothrow_constructible_v`](/reference/type_traits/is_nothrow_constructible.md)`<T, U> ||` [`is_nothrow_move_constructible_v`](/reference/type_traits/is_nothrow_move_constructible.md)`<T> ||` [`is_nothrow_move_constructible_v`](/reference/type_traits/is_nothrow_move_constructible.md)`<E>) == true`
- (4) : 下記を全て満たすこと
    - [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<E, const G&> == true`
    - [`is_assignable_v`](/reference/type_traits/is_assignable.md)`<E&, const G&> == true`
    - `(`[`is_nothrow_constructible_v`](/reference/type_traits/is_nothrow_constructible.md)`<E, const G&> ||` [`is_nothrow_move_constructible_v`](/reference/type_traits/is_nothrow_move_constructible.md)`<T> ||
`[`is_nothrow_move_constructible_v`](/reference/type_traits/is_nothrow_move_constructible.md)`<E>) == true`
- (5) : 下記を全て満たすこと
    - [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<E, G> == true`
    - [`is_assignable_v`](/reference/type_traits/is_assignable.md)`<E&, G> == true`
    - `(`[`is_nothrow_constructible_v`](/reference/type_traits/is_nothrow_constructible.md)`<E, G> ||` [`is_nothrow_move_constructible_v`](/reference/type_traits/is_nothrow_move_constructible.md)`<T> ||` [`is_nothrow_move_constructible_v`](/reference/type_traits/is_nothrow_move_constructible.md)`<E>) == true`


## 効果
- (1) : 次の処理を行ったのち、例外が送出されなければ、`has_val = rhs.`[`has_value()`](has_value.md.nolink)`; return *this;`
    - `this`と`rhs`が共に正常値を保持していたら、`val = *rhs`
    - `this`が正常値を保持し、`rhs`がエラー値を保持していたら、`reinit-expected(unex, val, rhs.`[`error()`](error.md.nolink)`)`
    - `this`がエラーを保持し、`rhs`が正常値を保持していたら、`reinit-expected(val, unex, *rhs)`
    - `this`と`rhs`が共にエラー値を保持していたら、`unex = rhs.`[`error()`](error.md.nolink)
- (2) : 次の処理を行ったのち、例外が送出されなければ、`has_val = rhs.`[`has_value()`](has_value.md.nolink)`; return *this;`
    - `this`と`rhs`が共に正常値を保持していたら、`val = std::move(*rhs)`
    - `this`が正常値を保持し、`rhs`がエラー値を保持していたら、`reinit-expected(unex, val, std::move(rhs.`[`error()`](error.md.nolink)`))`
    - `this`がエラーを保持し、`rhs`が正常値を保持していたら、`reinit-expected(val, unex, std::move(*rhs))`
    - `this`と`rhs`が共にエラー値を保持していたら、`unex = std::move(rhs.`[`error()`](error.md.nolink)`)`
- (3) : 次の処理と等価
    - `this`が正常値を保持していたら、`val = std::forward<U>(v)`
    - `this`がエラー値を保持していたら、`reinit-expected(val, unex, std::forward<U>(v)); has_val = true;`
- (4) : 次の処理と等価
    - `this`が正常値を保持していたら、`reinit-expected(unex, val, std::forward<const G&>(e.`[`error()`](error.md.nolink)`));
has_val = false;`
    - `this`がエラー値を保持していたら、`unex = std::forward<const G&>(e.`[`error()`](error.md.nolink)`);`
- (5) : 次の処理と等価
    - `this`が正常値を保持していたら、`reinit-expected(unex, val, std::forward<G>(e.`[`error()`](error.md.nolink)`));
has_val = false;`
    - `this`がエラー値を保持していたら、`unex = std::forward<G>(e.`[`error()`](error.md.nolink)`);`


## 戻り値
`*this`


## 例外
- (2) : ムーブ代入演算子のnoexcept例外指定は、次の式に従う
    - [`is_nothrow_move_assignable_v`](/reference/type_traits/is_nothrow_move_assignable.md)`<T> &&` [`is_nothrow_move_constructible_v`](/reference/type_traits/is_nothrow_move_constructible.md)`<T> &&` [`is_nothrow_move_assignable_v`](/reference/type_traits/is_nothrow_move_assignable.md)`<E> &&` [`is_nothrow_move_constructible_v`](/reference/type_traits/is_nothrow_move_constructible.md)`<E>`


## delete定義される条件
- (1) : 下記いずれか1つでも満たされないとき、コピー代入演算子はdelete定義される。
    - [`is_copy_assignable_v`](/reference/type_traits/is_copy_assignable.md)`<T> == true`
    - [`is_copy_constructible_v`](/reference/type_traits/is_copy_constructible.md)`<T> == true`
    - [`is_copy_assignable_v`](/reference/type_traits/is_copy_assignable.md)`<E> == true`
    - [`is_copy_constructible_v`](/reference/type_traits/is_copy_constructible.md)`<E> == true`
    - `(`[`is_nothrow_move_constructible_v`](/reference/type_traits/is_nothrow_move_constructible.md)`<T> ||` [`is_nothrow_move_constructible_v`](/reference/type_traits/is_nothrow_move_constructible.md)`<E>) == true`


## 例
```cpp example
#include <cassert>
#include <expected>
#include <memory>
#include <string>
#include <tuple>
#include <utility>

// std::pair型から2要素std::tuple型へはコピー代入可能
using IntPair  = std::pair<int, int>;
using IntTuple = std::tuple<int, int>;

// std::unique_ptr型からstd::shared_ptr型へはムーブ代入可能
using UniquePtr = std::unique_ptr<int>;
using SharedPtr = std::shared_ptr<int>;

int main()
{
  // (1) コピー代入
  {
    std::expected<int, std::string> srcV = 42;
    std::expected<int, std::string> dstV;
    dstV = srcV;
    assert(srcV.has_value() && dstV.has_value());
    assert(srcV.value() == 42 && dstV.value() == 42);

    std::expected<int, std::string> srcE = std::unexpected{"Oops"};
    std::expected<int, std::string> dstE;
    dstE = srcE;
    assert(!srcE.has_value() && !dstE.has_value());
    assert(srcE.error() == "Oops" && dstE.error() == "Oops");
  }

  // (2) ムーブ代入
  {
    std::expected<std::string, int> srcV = "ok";
    std::expected<std::string, int> dstV;
    dstV = std::move(srcV);
    assert(srcV.has_value() && dstV.has_value());
    assert(dstV.value() == "ok");
    // srcV.value()はstd::stringムーブ後の未規定の値

    std::expected<int, std::string> srcE = std::unexpected{"ng"};
    std::expected<int, std::string> dstE;
    dstE = std::move(srcE);
    assert(!srcE.has_value() && !dstE.has_value());
    assert(dstE.error() == "ng");
    // srcE.error()はstd::stringムーブ後の未規定の値
  }

  // (3) 正常値の変換コピー代入
  {
    IntPair src = IntPair{1, 2};
    std::expected<IntTuple, int> dst;
    dst = src;
    assert(dst.has_value());
    assert((dst.value() == IntTuple{1, 2}));
  }
  // (3) 正常値の変換ムーブ代入
  {
    UniquePtr src = std::make_unique<int>(42);
    std::expected<SharedPtr, int> dst;
    dst = std::move(src);
    assert(dst.has_value());
    assert(*dst.value() == 42);
  }

  // (4) エラー値の変換コピー代入
  {
    std::unexpected<IntPair> src{IntPair{1, 2}};
    std::expected<int, IntTuple> dst;
    dst = src;
    assert(not dst.has_value());
    assert((dst.error() == IntTuple{1, 2}));
  }

  // (5) エラー値の変換ムーブ代入
  {
    std::unexpected<UniquePtr> src{std::make_unique<int>(42)};
    std::expected<int, SharedPtr> dst;
    dst = std::move(src);
    assert(not dst.has_value());
    assert(*dst.error() == 42);
  }
}
```
* has_value[link has_value.md.nolink]
* value[link value.md.nolink]
* error[link error.md.nolink]
* std::unexpected[link ../unexpected.md]

### 出力
```
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): 16.0
- [GCC](/implementation.md#gcc): 12.1
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0323R12 std::expected](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p0323r12.html)