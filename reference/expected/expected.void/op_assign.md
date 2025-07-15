# operator=
* expected[meta header]
* function[meta id-type]
* std[meta namespace]
* expected.void[meta class]
* cpp23[meta cpp]

```cpp
// expected<cv void, E>部分特殊化
constexpr expected& operator=(const expected& rhs);    // (1)

constexpr expected& operator=(expected&& rhs) noexcept(see below); // (2)

template<class G>
constexpr expected& operator=(const unexpected<G>& e); // (3)

template<class G>
constexpr expected& operator=(unexpected<G>&& e);      // (4)
```
* unexpected[link ../unexpected.md]

## 概要
- (1) : コピー代入。
- (2) : ムーブ代入。
- (3) : 変換可能な[`unexpected`](../unexpected.md)オブジェクトから、エラー値としてコピー代入。
- (4) : 変換可能な[`unexpected`](../unexpected.md)オブジェクトから、エラー値としてムーブ代入。


動作説明用の`expected`クラスメンバ変数として、下記を導入する。

- `unex` : `E`型のエラー値。
- `has_val` : `bool`型のフラグ変数。正常値を保持する場合は`true`に、エラー値を保持する場合は`false`となる。


## テンプレートパラメータ制約
- (3) : 次の制約を全て満たすこと
    - [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<E, const G&> == true`
    - [`is_assignable_v`](/reference/type_traits/is_assignable.md)`<E&, const G&> == true`
- (4) : 次の制約を全て満たすこと
    - [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<E, G> == true`
    - [`is_assignable_v`](/reference/type_traits/is_assignable.md)`<E&, G> == true`


## 効果
- (1) : 次の処理と等価
    - `this`と`rhs`が共に正常値を保持していたら、なにもしない
    - `this`が正常値を保持し、`rhs`がエラー値を保持していたら、[`construct_at`](/reference/memory/construct_at.md)`(`[`addressof`](/reference/memory/addressof.md)`(unex), rhs.unex); has_value = false;`
    - `this`がエラーを保持し、`rhs`が正常値を保持していたら、`unex`を破棄し`has_value = true;`
    - `this`と`rhs`が共にエラー値を保持していたら、`unex = rhs.`[`error()`](error.md)
- (2) : 次の処理と等価
    - `this`と`rhs`が共に正常値を保持していたら、なにもしない
    - `this`が正常値を保持し、`rhs`がエラー値を保持していたら、[`construct_at`](/reference/memory/construct_at.md)`(`[`addressof`](/reference/memory/addressof.md)`(unex),` [`std::move`](/reference/utility/move.md)`(rhs.unex)); has_value = false;`
    - `this`がエラーを保持し、`rhs`が正常値を保持していたら、`unex`を破棄し`has_value = true;`
    - `this`と`rhs`が共にエラー値を保持していたら、`unex =` [`std::move`](/reference/utility/move.md)`(rhs.`[`error()`](error.md)`)`
- (3) : 次の処理と等価
    - `this`が正常値を保持していたら、[`construct_at`](/reference/memory/construct_at.md)`(`[`addressof`](/reference/memory/addressof.md)`(unex), val,` [`std::forward`](/reference/utility/forward.md)`<const G&>(e.`[`error()`](../unexpected/error.md)`));
has_val = false;`
    - `this`がエラー値を保持していたら、`unex =` [`std::forward`](/reference/utility/forward.md)`<const G&>(e.`[`error()`](../unexpected/error.md)`);`
- (4) : 次の処理と等価
    - `this`が正常値を保持していたら、[`construct_at`](/reference/memory/construct_at.md)`(`[`addressof`](/reference/memory/addressof.md)`(unex), val,` [`std::forward`](/reference/utility/forward.md)`<G>(e.`[`error()`](../unexpected/error.md)`));
has_val = false;`
    - `this`がエラー値を保持していたら、`unex =` [`std::forward`](/reference/utility/forward.md)`<G>(e.`[`error()`](../unexpected/error.md)`);`


## 戻り値
`*this`


## 例外
- (2) : ムーブ代入演算子のnoexcept例外指定は、次の式に従う
    [`is_nothrow_move_constructible_v`](/reference/type_traits/is_nothrow_move_constructible.md)`<E> &&` [`is_nothrow_move_assignable_v`](/reference/type_traits/is_nothrow_move_assignable.md)`<E>`


## delete定義される条件
- (1) : 下記いずれか1つでも満たされないとき、コピー代入演算子はdelete定義される。
    - [`is_copy_assignable_v`](/reference/type_traits/is_copy_assignable.md)`<E> == true`
    - [`is_copy_constructible_v`](/reference/type_traits/is_copy_constructible.md)`<E> == true`


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
    std::expected<void, int> srcV;
    std::expected<void, int> dstV;
    dstV = srcV;
    assert(srcV.has_value() && dstV.has_value());

    std::expected<void, int> srcE = std::unexpected{42};
    std::expected<void, int> dstE;
    dstE = srcE;
    assert(!srcE.has_value() && !dstE.has_value());
    assert(srcE.error() == 42 && dstE.error() == 42);
  }

  // (2) ムーブ代入
  {
    std::expected<void, std::string> srcV;
    std::expected<void, std::string> dstV;
    dstV = std::move(srcV);
    assert(srcV.has_value() && dstV.has_value());

    std::expected<void, std::string> srcE = std::unexpected{"Oops"};
    std::expected<void, std::string> dstE;
    dstE = std::move(srcE);
    assert(!srcE.has_value() && !dstE.has_value());
    assert(dstE.error() == "Oops");
    // srcE.error()はstd::stringムーブ後の未規定の値
  }

  // (3) エラー値の変換コピー代入
  {
    std::unexpected<IntPair> src{IntPair{1, 2}};
    std::expected<void, IntTuple> dst;
    dst = src;
    assert(not dst.has_value());
    assert((dst.error() == IntTuple{1, 2}));
  }

  // (4) エラー値の変換ムーブ代入
  {
    std::unexpected<UniquePtr> src{std::make_unique<int>(42)};
    std::expected<void, SharedPtr> dst;
    dst = std::move(src);
    assert(not dst.has_value());
    assert(*dst.error() == 42);
  }
}
```
* has_value[link has_value.md]
* value[link value.md]
* error[link error.md]
* std::unexpected[link ../unexpected.md]
* std::make_unique[link /reference/memory/make_unique.md]

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
