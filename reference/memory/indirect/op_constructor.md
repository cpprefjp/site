# コンストラクタ
* memory[meta header]
* std[meta namespace]
* indirect[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
explicit constexpr
  indirect();                          // (1)

explicit constexpr
  indirect(allocator_arg_t,
           const Allocator& a);        // (2)

constexpr
  indirect(const indirect& other);     // (3)

constexpr
  indirect(allocator_arg_t,
           const Allocator& a,
           const indirect& other);     // (4)

constexpr
  indirect(indirect&& other) noexcept; // (5)

constexpr
  indirect(allocator_arg_t,
           const Allocator& a,
           indirect&& other) noexcept(see below); // (6)

template <class U = T>
explicit constexpr
  indirect(U&& u);                     // (7)

template <class U = T>
explicit constexpr
  indirect(allocator_arg_t,
           const Allocator& a, U&& u); // (8)

template <class... Us>
explicit constexpr
  indirect(in_place_t,
           Us&&... us);                // (9)

template <class... Us>
explicit constexpr
  indirect(allocator_arg_t,
           const Allocator& a,
           in_place_t,
           Us&&... us);                // (10)

template <class I, class... Us>
explicit constexpr
  indirect(in_place_t,
           initializer_list<I> ilist,
           Us&&... us);                // (11)

template <class I, class... Us>
explicit constexpr
  indirect(allocator_arg_t,
           const Allocator& a,
           in_place_t,
           initializer_list<I> ilist,
           Us&&... us);                // (12)
```
* allocator_arg_t[link /reference/memory/allocator_arg_t.md]
* in_place_t[link /reference/utility/in_place_t.md]
* initializer_list[link /reference/initializer_list/initializer_list.md]

## 概要
`indirect`オブジェクトを構築する。`allocator_arg_t`を第1引数に取るオーバーロードは、使用するアロケータ`a`を明示的に指定する。

- (1), (2) : デフォルトコンストラクタ。`T`をデフォルト構築して所有する。
- (3), (4) : コピーコンストラクタ。`other`が所有するオブジェクトをディープコピーして所有する。`other`が無効値状態の場合、構築されるオブジェクトも無効値状態となる。
- (5), (6) : ムーブコンストラクタ。`other`が所有するオブジェクトの所有権を移す。ムーブ後の`other`は無効値状態となる。
- (7), (8) : 単一の引数`u`から`T`を構築して所有する。
- (9), (10) : `in_place_t`をマーカーとして、引数`us...`から`T`を直接構築して所有する。
- (11), (12) : `in_place_t`をマーカーとして、初期化子リストと引数`us...`から`T`を直接構築して所有する。


## テンプレートパラメータ制約
- (7), (8) : [`remove_cvref_t`](/reference/type_traits/remove_cvref.md)`<U>`が`indirect`でも`in_place_t`でもなく、かつ[`is_constructible_v`](/reference/type_traits/is_constructible.md)`<T, U>`が`true`であること。(7)はさらに[`is_default_constructible_v`](/reference/type_traits/is_default_constructible.md)`<Allocator>`が`true`であること。
- (9), (10) : [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<T, Us...>`が`true`であること。(9)はさらに[`is_default_constructible_v`](/reference/type_traits/is_default_constructible.md)`<Allocator>`が`true`であること。
- (11), (12) : [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<T, initializer_list<I>&, Us...>`が`true`であること。(11)はさらに[`is_default_constructible_v`](/reference/type_traits/is_default_constructible.md)`<Allocator>`が`true`であること。


## 適格要件
- (1), (2) : [`is_default_constructible_v`](/reference/type_traits/is_default_constructible.md)`<T>`が`true`であること。
- (3), (4) : [`is_copy_constructible_v`](/reference/type_traits/is_copy_constructible.md)`<T>`が`true`であること。
- (6) : [`allocator_traits`](/reference/memory/allocator_traits.md)`<Allocator>::is_always_equal::value`が`false`の場合、`T`が完全型であること。


## 例外
- すべてのオーバーロード : [`allocator_traits`](/reference/memory/allocator_traits.md)`<Allocator>::allocate()`または[`allocator_traits`](/reference/memory/allocator_traits.md)`<Allocator>::construct()`が例外を送出した場合を除いて、例外を送出しない。
- (6) : 以下と等価な`noexcept`指定を持つ：
```cpp
noexcept(allocator_traits<Allocator>::is_always_equal::value)
```
* allocator_traits[link /reference/memory/allocator_traits.md]


## 事後条件
- (5), (6) : `other`は無効値状態となる。


## 例
```cpp example
#include <cassert>
#include <memory>
#include <string>
#include <utility>

int main()
{
  std::indirect<int> a;                          // (1) デフォルト構築
  assert(*a == 0);

  std::indirect<int> b{42};                       // (7) 単一の引数から構築
  assert(*b == 42);

  std::indirect<std::string> c{std::in_place, 3, 'x'}; // (9) in_placeで直接構築
  assert(*c == "xxx");

  std::indirect<int> d = b;                       // (3) コピー構築（ディープコピー）
  assert(*d == 42);

  std::indirect<int> e = std::move(d);            // (5) ムーブ構築
  assert(*e == 42);
  assert(d.valueless_after_move());               // ムーブ後は無効値状態
}
```
* std::indirect[link ../indirect.md]
* std::in_place[link /reference/utility/in_place_t.md]

### 出力
```
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::indirect`](../indirect.md)


## 参照
- [P3019R14 `indirect` and `polymorphic`: Vocabulary Types for Composite Class Design](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3019r14.pdf)
