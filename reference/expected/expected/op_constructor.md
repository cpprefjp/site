# コンストラクタ
* expected[meta header]
* function[meta id-type]
* std[meta namespace]
* expected[meta class]
* cpp23[meta cpp]

```cpp
constexpr expected();                                   // (1)
constexpr expected(const expected& rhs);                // (2)
constexpr expected(expected&& rhs) noexcept(see below); // (3)

template<class U, class G>
constexpr explicit(see below) expected(const expected<U, G>& rhs); // (4)
template<class U, class G>
constexpr explicit(see below) expected(expected<U, G>&& rhs);      // (5)

template<class U = T>
constexpr explicit(see below) expected(U&& v);      // (6)

template<class G>
constexpr explicit(see below) expected(const unexpected<G>& e); // (7)
template<class G>
constexpr explicit(see below) expected(unexpected<G>&& e);      // (8)

template<class... Args>
constexpr explicit expected(in_place_t, Args&&... args); // (9)
template<class U, class... Args>
constexpr explicit expected(in_place_t, initializer_list<U> il, Args&&... args); // (10)

template<class... Args>
constexpr explicit expected(unexpect_t, Args&&... args); // (11)
template<class U, class... Args>
constexpr explicit expected(unexpect_t, initializer_list<U> il, Args&&... args); // (12)
```
* see below[italic]
* unexpected[link ../unexpected.md]
* unexpect_t[link ../unexpect_t.md]
* initializer_list[link /reference/initializer_list/initializer_list.md]

## 概要
- (1) : 正常値型`T`を値初期化して保持する。
- (2) : コピーコンストラクタ。
- (3) : ムーブコンストラクタ。
- (4) : 変換可能な`expected`オブジェクトからコピー構築する。
- (5) : 変換可能な`expected`オブジェクトからムーブ構築する。
- (6) : 正常値型`T`に変換可能な型`U`の値を正常値として受け取り、コピーまたはムーブして保持する。
- (7) : 変換可能な[`unexpected`](../unexpected.md)オブジェクトかエラー値をコピー構築する。
- (8) : 変換可能な[`unexpected`](../unexpected.md)オブジェクトからエラー値をムーブ構築する。
- (9) : 正常値型`T`のコンストラクタ引数として任意個の引数を受け取って、コンストラクタ内で型`T`のオブジェクトを正常値として生成し、保持する。
- (10) : 正常値型`T`のコンストラクタ引数として初期化子リストと任意個の引数を受け取って、コンストラクタ内で型`T`のオブジェクトを正常値として生成し、保持する。
- (11) : エラー値型`E`のコンストラクタ引数として任意個の引数を受け取って、コンストラクタ内で型`E`のオブジェクトをエラー値として生成し、保持する。
- (12) : エラー値型`E`のコンストラクタ引数として初期化子リストと任意個の引数を受け取って、コンストラクタ内で型`E`のオブジェクトをエラー値として生成し、保持する。


説明用のテンプレート変数`converts-from-any-cvref`を次の通り定義する。

```cpp
template<class T, class W>
constexpr bool converts-from-any-cvref =
  disjunction_v<is_constructible<T, W&>, is_convertible<W&, T>,
                is_constructible<T, W>, is_convertible<W, T>,
                is_constructible<T, const W&>, is_convertible<const W&, T>,
                is_constructible<T, const W>, is_convertible<const W, T>>;
```
* disjunction_v[link /reference/type_traits/disjunction.md]
* is_constructible[link /reference/type_traits/is_constructible.md]
* is_convertible[link /reference/type_traits/is_convertible.md]


## テンプレートパラメータ制約
- (1) : [`is_default_constructible_v`](/reference/type_traits/is_default_constructible.md)`<T> == true`
- (3) : [`is_move_constructible_v`](/reference/type_traits/is_move_constructible.md)`<T> == true &&` [`is_move_constructible_v`](/reference/type_traits/is_move_constructible.md)`<E> == true`
- (4) : 次の制約を全て満たすこと
    - [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<T, const U&> == true`
    - [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<E, const G&> == true`
    - `converts-from-any-cvref<T, expected<U, G>> == false`
    - [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<`[`unexpected`](../unexpected.md)`<E>, expected<U, G>&> == false`
    - [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<`[`unexpected`](../unexpected.md)`<E>, expected<U, G>> == false`
    - [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<`[`unexpected`](../unexpected.md)`<E>, const expected<U, G>&> == false`
    - [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<`[`unexpected`](../unexpected.md)`<E>, const expected<U, G>> == false`
- (5) : 次の制約を全て満たすこと
    - [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<T, U> == true`
    - [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<E, G> == true`
    - `converts-from-any-cvref<T, expected<U, G>> == false`
    - [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<`[`unexpected`](../unexpected.md)`<E>, expected<U, G>&> == false`
    - [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<`[`unexpected`](../unexpected.md)`<E>, expected<U, G>> == false`
    - [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<`[`unexpected`](../unexpected.md)`<E>, const expected<U, G>&> == false`
    - [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<`[`unexpected`](../unexpected.md)`<E>, const expected<U, G>> == false`
- (6) : 次の制約を全て満たすこと
    - [`is_same_v`](/reference/type_traits/is_same.md)`<`[`remove_cvref_t`](/reference/type_traits/remove_cvref.md)`<U>,` [`in_place_t`](/reference/utility/in_place_t.md)`> == false`
    - [`is_same_v`](/reference/type_traits/is_same.md)`<expected,` [`remove_cvref_t`](/reference/type_traits/remove_cvref.md)`<U>> == false`
    - [`remove_cvref_t`](/reference/type_traits/remove_cvref.md)`<U>`は[`unexpected`](../unexpected.md)の特殊化でない
    - [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<T, U> == true`
- (7) : [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<E, const G&> == true`
- (8) : [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<E, G> == true`
- (9) : [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<T, Args...> == true`
- (10) : [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<T,` [`initializer_list`](/reference/initializer_list/initializer_list.md)`<U>&, Args...> == true`
- (11) : [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<E, Args...> == true`
- (12) : [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<E,` [`initializer_list`](/reference/initializer_list/initializer_list.md)`<U>&, Args...> == true`


## 効果
- (1) : 正常値を値初期化して保持する。
- (2) : `rhs`が正常値を保持していれば、[`*rhs`](op_deref.md)で正常値を直接非リスト初期化する。そうでなければ、`rhs.`[`error()`](error.md)でエラー値を直接非リスト初期化する。
- (3) : `rhs`が正常値を保持していれば、[`std::move`](/reference/utility/move.md)`(`[`*rhs`](op_deref.md)`)`で正常値を直接非リスト初期化する。そうでなければ、[`std::move`](/reference/utility/move.md)`(rhs.`[`error()`](error.md)`)`でエラー値を直接非リスト初期化する。
- (4) : `rhs`が正常値を保持していれば、[`std::forward`](/reference/utility/forward.md)`<const U&>(`[`*rhs`](op_deref.md)`)`で正常値を直接非リスト初期化する。そうでなければ、[`std::forward`](/reference/utility/forward.md)`<const G&>(rhs.`[`error()`](error.md)`)`でエラー値を直接非リスト初期化する。
- (5) : `rhs`が正常値を保持していれば、[`std::forward`](/reference/utility/forward.md)`<U>(`[`*rhs`](op_deref.md)`)`で正常値を直接非リスト初期化する。そうでなければ、[`std::forward`](/reference/utility/forward.md)`<G>(rhs.`[`error()`](error.md)`)`でエラー値を直接非リスト初期化する。
- (6) : [`std::forward`](/reference/utility/forward.md)`<U>(v)`で正常値を直接非リスト初期化する。
- (7) : [`std::forward`](/reference/utility/forward.md)`<const G&>(e.`[`error()`](../unexpected/error.md)`)`でエラー値を直接非リスト初期化する。
- (8) : [`std::forward`](/reference/utility/forward.md)`<G>(e.`[`error()`](../unexpected/error.md)`)`でエラー値を直接非リスト初期化する。
- (9) : [`std::forward`](/reference/utility/forward.md)`<Args>(args)...`で正常値を直接非リスト初期化する。
- (10) : `il,` [`std::forward`](/reference/utility/forward.md)`<Args>(args)...`で正常値を直接非リスト初期化する。
- (11) : [`std::forward`](/reference/utility/forward.md)`<Args>(args)...`でエラー値を直接非リスト初期化する。
- (12) : `il,` [`std::forward`](/reference/utility/forward.md)`<Args>(args)...`でエラー値を直接非リスト初期化する。


## 事後条件
- (1) : 正常値を保持している。
- (2) : `rhs`が正常値を保持する場合は`*this`も正常値を保持し、`rhs`がエラー値を保持する場合は`*this`もエラー値を保持する。
- (3) : `rhs`が正常値を保持する場合は`*this`も正常値を保持し、`rhs`がエラー値を保持する場合は`*this`もエラー値を保持する。`rhs.`[`has_value()`](has_value.md)は変化しない。
- (4), (5) : `rhs`が正常値を保持する場合は`*this`も正常値を保持し、`rhs`がエラー値を保持する場合は`*this`もエラー値を保持する。`rhs.`[`has_value()`](has_value.md)は変化しない。
- (6) : 正常値を保持している。
- (7), (8) : エラー値を保持している。
- (9), (10) : 正常値を保持している。
- (11), (12) : エラー値を保持している。


## 例外
- (1) : 正常値型の初期化から送出される例外。
- (2) : 正常値型またはエラー値型の初期化から送出される例外。
- (3) : 正常値型またはエラー値型の初期化から送出される例外。
    - [`is_nothrow_move_constructible_v`](/reference/type_traits/is_nothrow_move_constructible.md)`<T>`かつ[`is_nothrow_move_constructible_v`](/reference/type_traits/is_nothrow_move_constructible.md)`<E>`であれば、ムーブコンストラクタはnoexcept指定される。
- (4), (5) : 正常値型またはエラー値型の初期化から送出される例外。
- (6) : 正常値型の初期化から送出される例外。
- (7), (8) : エラー値型の初期化から送出される例外。
- (9), (10) : 正常値型の初期化から送出される例外。
- (11), (12) : エラー値型の初期化から送出される例外。


## delete定義される条件
- (2) : `!`[`is_copy_constructible_v`](/reference/type_traits/is_copy_constructible.md)`<T> || !`[`is_copy_constructible_v`](/reference/type_traits/is_copy_constructible.md)`<E>`


## トリビアルに定義される条件
- (2) : [`is_trivially_copy_constructible_v`](/reference/type_traits/is_trivially_copy_constructible.md)`<T> &&` [`is_trivially_copy_constructible_v`](/reference/type_traits/is_trivially_copy_constructible.md)`<E>`
- (3) : [`is_trivially_move_constructible_v`](/reference/type_traits/is_trivially_move_constructible.md)`<T> &&` [`is_trivially_move_constructible_v`](/reference/type_traits/is_trivially_move_constructible.md)`<E>`


## explicitになる条件
- (4) : `!`[`is_convertible_v`](/reference/type_traits/is_convertible.md)`<const U&, T> || !`[`is_convertible_v`](/reference/type_traits/is_convertible.md)`<const G&, E>`
- (5) : `!`[`is_convertible_v`](/reference/type_traits/is_convertible.md)`<U, T> || !`[`is_convertible_v`](/reference/type_traits/is_convertible.md)`<G, E>`
- (6) : `!`[`is_convertible_v`](/reference/type_traits/is_convertible.md)`<U, T>`
- (7) : `!`[`is_convertible_v`](/reference/type_traits/is_convertible.md)`<const G&, E>`
- (8) : `!`[`is_convertible_v`](/reference/type_traits/is_convertible.md)`<G, E>`


## 例
```cpp example
#include <cassert>
#include <expected>
#include <memory>
#include <string>
#include <string_view>
#include <tuple>
#include <utility>
#include <vector>

// std::pair型から2要素std::tuple型へはコピー変換可能
using IntPair  = std::pair<int, int>;
using IntTuple = std::tuple<int, int>;

// std::unique_ptr型からstd::shared_ptr型へはムーブ変換可能
using UniquePtr = std::unique_ptr<int>;
using SharedPtr = std::shared_ptr<int>;

// 引数リスト または 初期化子リスト＋引数リスト から構築可能な型
struct ComplexType {
  std::string data;
  std::vector<int> seq;

  ComplexType(const char* ptr, size_t len)
    : data(ptr, len) {}
  ComplexType(std::initializer_list<int> il, std::string_view sv)
    : data(sv), seq(il) {} 
};

int main()
{
  // (1) デフォルトコンストラクタ
  {
    std::expected<int, std::string> x;
    assert(x.has_value());
    assert(x.value() == 0);
    // int型の値初期化{}は値0
  }

  // (2) コピーコンストラクタ
  {
    std::expected<int, std::string> srcV = 42;
    std::expected<int, std::string> dstV = srcV;
    assert(srcV.has_value() && dstV.has_value());
    assert(srcV.value() == 42 && dstV.value() == 42);

    std::expected<int, std::string> srcE = std::unexpected{"Oops"};
    std::expected<int, std::string> dstE = srcE;
    assert(!srcE.has_value() && !dstE.has_value());
    assert(srcE.error() == "Oops" && dstE.error() == "Oops");
  }

  // (3) ムーブコンストラクタ
  {
    std::expected<std::string, int> srcV = "ok";
    std::expected<std::string, int> dstV = std::move(srcV);
    assert(srcV.has_value() && dstV.has_value());
    assert(dstV.value() == "ok");
    // srcV.value()はstd::stringムーブ後の未規定の値

    std::expected<int, std::string> srcE = std::unexpected{"ng"};
    std::expected<int, std::string> dstE = std::move(srcE);
    assert(!srcE.has_value() && !dstE.has_value());
    assert(dstE.error() == "ng");
    // srcE.error()はstd::stringムーブ後の未規定の値
  }

  // (4) 変換コピー構築
  {
    std::expected<IntPair,  int> src = IntPair{1, 2};
    std::expected<IntTuple, int> dst = src;
    assert(src.has_value() && dst.has_value());
    assert((dst.value() == IntTuple{1, 2}));
  }

  // (5) 変換ムーブ構築
  {
    std::expected<UniquePtr, int> src = std::make_unique<int>(42);
    std::expected<SharedPtr, int> dst = std::move(src);
    assert(src.has_value() && dst.has_value());
    assert(*dst.value() == 42);
    assert(src.value() == nullptr);
    // ムーブ後のstd::unique_ptr型はnullptrが保証される
  }

  // (6) 正常値の変換コピー／ムーブ構築
  {
    IntPair src1{1, 2};
    std::expected<IntTuple, int> dst1 = src1;
    assert(dst1.has_value());
    assert((dst1.value() == IntTuple{1, 2}));

    UniquePtr src2 = std::make_unique<int>(42);
    std::expected<SharedPtr, int> dst2 = std::move(src2);
    assert(dst2.has_value());
    assert(*dst2.value() == 42);
  }

  // (7), (8) エラー値の変換コピー／ムーブ構築
  {
    std::unexpected<IntPair> src1{std::in_place, 1, 2};
    std::expected<int, IntTuple> dst1 = src1;
    assert(not dst1.has_value());
    assert((dst1.error() == IntTuple{1, 2}));

    UniquePtr src2 = std::make_unique<int>(42);
    std::expected<int, SharedPtr> dst2 = std::unexpected{std::move(src2)};
    assert(not dst2.has_value());
    assert(*dst2.error() == 42);
  }

  // (9), (10) 引数リストから正常値を直接構築
  {
    std::expected<ComplexType, int> x1{std::in_place, "C++", 1};
    assert(x1.has_value());
    assert(x1.value().data == "C");
    // "C++"より長さ1の文字列が構築されている

    std::expected<ComplexType, int> x2{std::in_place, {5, 6, 7, 8}, "Steps"};
    assert(x2.has_value());
    assert(x2.value().data == "Steps");
    assert((x2.value().seq == std::vector<int>{5, 6, 7, 8}));
  }

  // (11), (12) 引数リストからエラー値を直接構築
  {
    std::expected<int, ComplexType> x1{std::unexpect, "Hello!", 4};
    assert(not x1.has_value());
    assert(x1.error().data == "Hell");
    // "Hello!"より長さ4の文字列が構築されている

    std::expected<int, ComplexType> x2{std::unexpect, {1, 2, 3}, "Lotus"};
    assert(not x2.has_value());
    assert(x2.error().data == "Lotus");
    assert((x2.error().seq == std::vector<int>{1, 2, 3}));
  }
}
```
* has_value()[link has_value.md]
* value()[link value.md]
* error()[link error.md]
* std::unexpected[link ../unexpected.md]
* std::unexpect[link ../unexpect_t.md]
* std::in_place[link /reference/utility/in_place_t.md]
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
