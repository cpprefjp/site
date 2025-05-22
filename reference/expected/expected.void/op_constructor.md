# コンストラクタ
* expected[meta header]
* function[meta id-type]
* std[meta namespace]
* expected.void[meta class]
* cpp23[meta cpp]

```cpp
// expected<cv void, E>部分特殊化
constexpr expected();                                   // (1)
constexpr expected(const expected& rhs);                // (2)
constexpr expected(expected&& rhs) noexcept(see below); // (3)

template<class U, class G>
constexpr explicit(see below) expected(const expected<U, G>& rhs); // (4)
template<class U, class G>
constexpr explicit(see below) expected(expected<U, G>&& rhs);      // (5)

template<class G>
constexpr explicit(see below) expected(const unexpected<G>& e); // (6)
template<class G>
constexpr explicit(see below) expected(unexpected<G>&& e);      // (7)

constexpr explicit expected(in_place_t) noexcept; // (8)

template<class... Args>
constexpr explicit expected(unexpect_t, Args&&... args); // (9)
template<class U, class... Args>
constexpr explicit expected(unexpect_t, initializer_list<U> il, Args&&... args); // (10)
```
* see below[italic]
* unexpected[link ../unexpected.md]
* unexpect_t[link ../unexpect_t.md]
* in_place_t[link /reference/utility/in_place_t.md]
* initializer_list[link /reference/initializer_list/initializer_list.md]

## 概要
- (1) : 正常値を保持する。
- (2) : コピーコンストラクタ。
- (3) : ムーブコンストラクタ。
- (4) : 変換可能な`expected<cv void, G>`オブジェクトからコピー構築する。
- (5) : 変換可能な`expected<cv void, G>`オブジェクトからムーブ構築する。
- (6) : 変換可能な[`unexpected`](../unexpected.md)オブジェクトかエラー値をコピー構築する。
- (7) : 変換可能な[`unexpected`](../unexpected.md)オブジェクトからエラー値をムーブ構築する。
- (8) : 正常値を保持する。
- (9) : エラー値型`E`のコンストラクタ引数として任意個の引数を受け取って、コンストラクタ内で型`E`のオブジェクトをエラー値として生成し、保持する。
- (10) : エラー値型`E`のコンストラクタ引数として初期化子リストと任意個の引数を受け取って、コンストラクタ内で型`E`のオブジェクトをエラー値として生成し、保持する。


## テンプレートパラメータ制約
- (3) : [`is_move_constructible_v`](/reference/type_traits/is_move_constructible.md)`<E> == true`
- (4) : 次の制約を全て満たすこと
    - [`is_void_v`](/reference/type_traits/is_void.md)`<U> == true`
    - [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<E, const G&> == true`
    - [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<`[`unexpected`](../unexpected.md)`<E>, expected<U, G>&> == false`
    - [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<`[`unexpected`](../unexpected.md)`<E>, expected<U, G>> == false`
    - [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<`[`unexpected`](../unexpected.md)`<E>, const expected<U, G>&> == false`
    - [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<`[`unexpected`](../unexpected.md)`<E>, const expected<U, G>> == false`
- (5) : 次の制約を全て満たすこと
    - [`is_void_v`](/reference/type_traits/is_void.md)`<U> == true`
    - [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<E, G> == true`
    - [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<`[`unexpected`](../unexpected.md)`<E>, expected<U, G>&> == false`
    - [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<`[`unexpected`](../unexpected.md)`<E>, expected<U, G>> == false`
    - [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<`[`unexpected`](../unexpected.md)`<E>, const expected<U, G>&> == false`
    - [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<`[`unexpected`](../unexpected.md)`<E>, const expected<U, G>> == false`
- (6) : [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<E, const G&> == true`
- (7) : [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<E, G> == true`
- (9) : [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<E, Args...> == true`
- (10) : [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<E,` [`initializer_list`](/reference/initializer_list/initializer_list.md)`<U>&, Args...> == true`


## 効果
- (1) : 正常値を保持する。
- (2) : `rhs`がエラー値を保持していれば、`rhs.`[`error()`](error.md)でエラー値を直接非リスト初期化する。
- (3) : `rhs`がエラー値を保持していれば、[`std::move`](/reference/utility/move.md)`(rhs.`[`error()`](error.md)`)`でエラー値を直接非リスト初期化する。
- (4) : `rhs`がエラー値を保持していれば、[`std::forward`](/reference/utility/forward.md)`<const G&>(rhs.`[`error()`](error.md)`)`でエラー値を直接非リスト初期化する。
- (5) : `rhs`がエラー値を保持していれば、[`std::forward`](/reference/utility/forward.md)`<G>(rhs.`[`error()`](error.md)`)`でエラー値を直接非リスト初期化する。
- (6) : [`std::forward`](/reference/utility/forward.md)`<const G&>(e.`[`error()`](../unexpected/error.md)`)`でエラー値を直接非リスト初期化する。
- (7) : [`std::forward`](/reference/utility/forward.md)`<G>(e.`[`error()`](../unexpected/error.md)`)`でエラー値を直接非リスト初期化する。
- (9) : [`std::forward`](/reference/utility/forward.md)`<Args>(args)...`でエラー値を直接非リスト初期化する。
- (10) : `il,` [`std::forward`](/reference/utility/forward.md)`<Args>(args)...`でエラー値を直接非リスト初期化する。


## 事後条件
- (1) : 正常値を保持している。
- (2) : `rhs`が正常値を保持する場合は`*this`も正常値を保持し、`rhs`がエラー値を保持する場合は`*this`もエラー値を保持する。
- (3) : `rhs`が正常値を保持する場合は`*this`も正常値を保持し、`rhs`がエラー値を保持する場合は`*this`もエラー値を保持する。`rhs.`[`has_value()`](has_value.md)は変化しない。
- (4), (5) : `rhs`が正常値を保持する場合は`*this`も正常値を保持し、`rhs`がエラー値を保持する場合は`*this`もエラー値を保持する。`rhs.`[`has_value()`](has_value.md)は変化しない。
- (6), (7) : エラー値を保持している。
- (8) : 正常値を保持している。
- (9), (10) : エラー値を保持している。


## 例外
- (2) : エラー値型の初期化から送出される例外。
- (3) : エラー値型の初期化から送出される例外。
    - [`is_nothrow_move_constructible_v`](/reference/type_traits/is_nothrow_move_constructible.md)`<E>`であれば、ムーブコンストラクタはnoexcept指定される。
- (4), (5) : エラー値型の初期化から送出される例外。
- (6), (7) : エラー値型の初期化から送出される例外。
- (8) : 投げない。
- (9), (10) : エラー値型の初期化から送出される例外。


## delete定義される条件
- (2) : `!`[`is_copy_constructible_v`](/reference/type_traits/is_copy_constructible.md)`<E>`


## トリビアルに定義される条件
- (2) : [`is_trivially_copy_constructible_v`](/reference/type_traits/is_trivially_copy_constructible.md)`<E>`
- (3) : [`is_trivially_move_constructible_v`](/reference/type_traits/is_trivially_move_constructible.md)`<E>`


## explicitになる条件
- (4) : `!`[`is_convertible_v`](/reference/type_traits/is_convertible.md)`<const G&, E>`
- (5) : `!`[`is_convertible_v`](/reference/type_traits/is_convertible.md)`<G, E>`
- (6) : `!`[`is_convertible_v`](/reference/type_traits/is_convertible.md)`<const G&, E>`
- (7) : `!`[`is_convertible_v`](/reference/type_traits/is_convertible.md)`<G, E>`


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
    std::expected<void, int> x;
    assert(x.has_value());
  }

  // (2) コピーコンストラクタ
  {
    std::expected<void, int> srcV;
    std::expected<void, int> dstV = srcV;
    assert(srcV.has_value() && dstV.has_value());

    std::expected<void, int> srcE = std::unexpected{42};
    std::expected<void, int> dstE = srcE;
    assert(!srcE.has_value() && !dstE.has_value());
    assert(srcE.error() == 42 && dstE.error() == 42);
  }

  // (3) ムーブコンストラクタ
  {
    std::expected<void, std::string> srcV;
    std::expected<void, std::string> dstV = std::move(srcV);
    assert(srcV.has_value() && dstV.has_value());

    std::expected<void, std::string> srcE = std::unexpected{"Oops"};
    std::expected<void, std::string> dstE = std::move(srcE);
    assert(!srcE.has_value() && !dstE.has_value());
    assert(dstE.error() == "Oops");
    // srcE.error()はstd::stringムーブ後の未規定の値
  }

  // (4) 変換コピー構築
  {
    std::expected<void, IntPair>  src = std::unexpected{IntPair{1, 2}};
    std::expected<void, IntTuple> dst = src;
    assert(!src.has_value() && !dst.has_value());
    assert((dst.error() == IntTuple{1, 2}));
  }

  // (5) 変換ムーブ構築
  {
    std::expected<void, UniquePtr> src = std::unexpected{std::make_unique<int>(42)};
    std::expected<void, SharedPtr> dst = std::move(src);
    assert(!src.has_value() && !dst.has_value());
    assert(*dst.error() == 42);
    assert(src.error() == nullptr);
    // ムーブ後のstd::unique_ptr型はnullptrが保証される
  }

  // (6), (7) エラー値の変換コピー／ムーブ構築
  {
    std::unexpected<IntPair> src1{std::in_place, 1, 2};
    std::expected<void, IntTuple> dst1 = src1;
    assert(not dst1.has_value());
    assert((dst1.error() == IntTuple{1, 2}));

    UniquePtr src2 = std::make_unique<int>(42);
    std::expected<void, SharedPtr> dst2 = std::unexpected{std::move(src2)};
    assert(not dst2.has_value());
    assert(*dst2.error() == 42);
  }

  // (8) 正常値(void)を直接構築
  {
    std::expected<void, int> x1{std::in_place};
    assert(x1.has_value());
  }

  // (9), (10) 引数リストからエラー値を直接構築
  {
    std::expected<void, ComplexType> x1{std::unexpect, "C++", 1};
    assert(not x1.has_value());
    assert(x1.error().data == "C");
    // "C++"より長さ1の文字列が構築されている

    std::expected<void, ComplexType> x2{std::unexpect, {11, 14, 17, 20, 23}, "C++"};
    assert(not x2.has_value());
    assert(x2.error().data == "C++");
    assert((x2.error().seq == std::vector<int>{11, 14, 17, 20, 23}));
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
