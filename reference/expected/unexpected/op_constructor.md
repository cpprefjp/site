# コンストラクタ
* expected[meta header]
* function[meta id-type]
* std[meta namespace]
* unexpected[meta class]
* cpp23[meta cpp]

```cpp
constexpr unexpected(const unexpected&) = default;  // (1)
constexpr unexpected(unexpected&&) = default;       // (2)

template<class Err = E>
constexpr explicit unexpected(Err&& e);  // (3)

template<class... Args>
constexpr explicit unexpected(in_place_t, Args&&... args);  // (4)
template<class U, class... Args>
constexpr explicit unexpected(in_place_t, initializer_list<U> il, Args&&... args); // (5)
```
* in_place_t[link /reference/utility/in_place_t.md]
* initializer_list[link /reference/initializer_list/initializer_list.md]

## 概要
- (1) : コピーコンストラクタ。
- (2) : ムーブコンストラクタ。
- (3) : 変換可能な`Err`オブジェクトからコピー／ムーブ構築する。
- (4) : コンストラクタ引数として任意個の引数を受け取って、コンストラクタ内で型`E`のオブジェクトを生成し、保持する。
- (5) : コンストラクタ引数として初期化子リストと任意個の引数を受け取って、コンストラクタ内で型`E`のオブジェクトを生成し、保持する。


## テンプレートパラメータ制約
- (3) : 次の制約を全て満たすこと
    - [`is_same_v`](/reference/type_traits/is_same.md)`<`[`remove_cvref_t`](/reference/type_traits/remove_cvref.md)`<Err>, unexpected> == false`
    - [`is_same_v`](/reference/type_traits/is_same.md)`<`[`remove_cvref_t`](/reference/type_traits/remove_cvref.md)`<Err>,` [`in_place_t`](/reference/utility/in_place_t.md)`> == false`
    - [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<E, Err> == true`
- (4) : [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<E, Args...> == true`
- (5) : [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<E,` [`initializer_list`](/reference/initializer_list/initializer_list.md)`<U>&, Args...> == true`


## 効果
- (3) : [`std::forward`](/reference/utility/forward.md)`<Err>(e)`でエラー値を直接非リスト初期化する。
- (4) : [`std::forward`](/reference/utility/forward.md)`<Args>(args)...`でエラー値を直接非リスト初期化する。
- (5) : `il,` [`std::forward`](/reference/utility/forward.md)`<Args>(args)...`でエラー値を直接非リスト初期化する。


## 例外
型`E`の初期化から送出される例外。


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
  // (1) コピーコンストラクタ
  {
    std::unexpected<int> src{42};
    std::unexpected<int> dst = src;
    assert(src.error() == 42 && dst.error() == 42);
  }

  // (2) ムーブコンストラクタ
  {
    std::unexpected<std::string> src{"Oops!"};
    std::unexpected<std::string> dst = std::move(src);
    assert(dst.error() == "Oops!");
    // src.error()はstd::stringムーブ後の未規定の値
  }

  // (3) 変換コピー構築
  {
    IntPair src = {1, 2};
    std::unexpected<IntTuple> dst{src};
    assert((dst.error() == IntTuple{1, 2}));
  }
  // (3) 変換ムーブ構築
  {
    UniquePtr src = std::make_unique<int>(42);
    std::unexpected<SharedPtr> dst{std::move(src)};
    assert(*dst.error() == 42);
    assert(src == nullptr);
    // ムーブ後のstd::unique_ptr型はnullptrが保証される
  }

  // (4),(5) 引数リストから直接構築
  {
    std::unexpected<ComplexType> x1{std::in_place, "C++", 1};
    assert(x1.error().data == "C");
    // "C++"より長さ1の文字列が構築されている

    std::unexpected<ComplexType> x2{std::in_place, {98, 11, 23}, "C++"};
    assert(x2.error().data == "C++");
    assert((x2.error().seq == std::vector<int>{98, 11, 23}));
  }
}
```
* std::unexpected[color ff0000]
* error[link error.md]
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
