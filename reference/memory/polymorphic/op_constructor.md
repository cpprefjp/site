# コンストラクタ
* memory[meta header]
* std[meta namespace]
* polymorphic[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
explicit constexpr 
  polymorphic();                             // (1)

explicit constexpr
  polymorphic(allocator_arg_t,
              const Allocator& a);           // (2)

constexpr
  polymorphic(const polymorphic& other);     // (3)

constexpr
  polymorphic(allocator_arg_t,
              const Allocator& a,
              const polymorphic& other);     // (4)

constexpr
  polymorphic(polymorphic&& other) noexcept; // (5)

constexpr
  polymorphic(allocator_arg_t,
              const Allocator& a,
              polymorphic&& other) noexcept(see below); // (6)

template <class U = T>
explicit constexpr
  polymorphic(U&& u);                          // (7)

template <class U = T>
explicit constexpr
  polymorphic(allocator_arg_t,
              const Allocator& a,
              U&& u);                          // (8)

template <class U, class... Ts>
explicit constexpr
  polymorphic(in_place_type_t<U>,
              Ts&&... ts);                     // (9)

template <class U, class... Ts>
explicit constexpr
  polymorphic(allocator_arg_t,
              const Allocator& a,
              in_place_type_t<U>, Ts&&... ts); // (10)

template <class U, class I, class... Us>
explicit constexpr
  polymorphic(in_place_type_t<U>,
              initializer_list<I> ilist,
              Us&&... us);                    // (11)

template <class U, class I, class... Us>
explicit constexpr
  polymorphic(allocator_arg_t, const Allocator& a,
              in_place_type_t<U>,
              initializer_list<I> ilist, Us&&... us); // (12)
```
* allocator_arg_t[link /reference/memory/allocator_arg_t.md]
* in_place_type_t[link /reference/utility/in_place_type_t.md]
* initializer_list[link /reference/initializer_list/initializer_list.md]

## 概要
`polymorphic`オブジェクトを構築する。`allocator_arg_t`を第1引数に取るオーバーロードは、使用するアロケータ`a`を明示的に指定する。

- (1), (2) : デフォルトコンストラクタ。`T`をデフォルト構築して所有する。
- (3), (4) : コピーコンストラクタ。`other`が保持する派生型のオブジェクトをディープコピーして所有する。`other`が無効値状態の場合、構築されるオブジェクトも無効値状態となる。
- (5), (6) : ムーブコンストラクタ。`other`が保持するオブジェクトの所有権を移す。
- (7), (8) : 単一の引数`u`から、その型`U`（`T`から派生していてもよい）のオブジェクトを構築して所有する。
- (9), (10) : `in_place_type_t<U>`をマーカーとして、型`U`のオブジェクトを引数`ts...`から直接構築して所有する。
- (11), (12) : `in_place_type_t<U>`をマーカーとして、型`U`のオブジェクトを初期化子リストと引数`us...`から直接構築して所有する。


## テンプレートパラメータ制約
- (7), (8) : [`remove_cvref_t`](/reference/type_traits/remove_cvref.md)`<U>`を`UU`とするとき、`UU`が`polymorphic`でも`in_place_type_t`の特殊化でもなく、[`derived_from`](/reference/concepts/derived_from.md)`<UU, T>`、[`is_constructible_v`](/reference/type_traits/is_constructible.md)`<UU, U>`、[`is_copy_constructible_v`](/reference/type_traits/is_copy_constructible.md)`<UU>`がいずれも`true`であること。(7)はさらに[`is_default_constructible_v`](/reference/type_traits/is_default_constructible.md)`<Allocator>`が`true`であること。
- (9), (10) : [`is_same_v`](/reference/type_traits/is_same.md)`<`[`remove_cvref_t`](/reference/type_traits/remove_cvref.md)`<U>, U>`、[`derived_from`](/reference/concepts/derived_from.md)`<U, T>`、[`is_constructible_v`](/reference/type_traits/is_constructible.md)`<U, Ts...>`、[`is_copy_constructible_v`](/reference/type_traits/is_copy_constructible.md)`<U>`がいずれも`true`であること。(9)はさらに[`is_default_constructible_v`](/reference/type_traits/is_default_constructible.md)`<Allocator>`が`true`であること。
- (11), (12) : [`is_same_v`](/reference/type_traits/is_same.md)`<`[`remove_cvref_t`](/reference/type_traits/remove_cvref.md)`<U>, U>`、[`derived_from`](/reference/concepts/derived_from.md)`<U, T>`、[`is_constructible_v`](/reference/type_traits/is_constructible.md)`<U, initializer_list<I>&, Us...>`、[`is_copy_constructible_v`](/reference/type_traits/is_copy_constructible.md)`<U>`がいずれも`true`であること。(11)はさらに[`is_default_constructible_v`](/reference/type_traits/is_default_constructible.md)`<Allocator>`が`true`であること。


## 適格要件
- (1), (2) : [`is_default_constructible_v`](/reference/type_traits/is_default_constructible.md)`<T>`と[`is_copy_constructible_v`](/reference/type_traits/is_copy_constructible.md)`<T>`がともに`true`であること。


## 効果
所有するオブジェクトを、指定された型・引数とアロケータ`alloc`を用いて構築する。`allocator_arg_t`版は`alloc`を`a`で初期化する。


## 例外
- すべてのオーバーロード : [`allocator_traits`](/reference/memory/allocator_traits.md)`<Allocator>::allocate`または[`allocator_traits`](/reference/memory/allocator_traits.md)`<Allocator>::construct`が例外を送出した場合を除いて、例外を送出しない。
- (6) : 以下と等価な`noexcept`指定を持つ：

```cpp
noexcept(allocator_traits<Allocator>::is_always_equal::value)
```
* allocator_traits[link /reference/memory/allocator_traits.md]


## 例
```cpp example
#include <cassert>
#include <memory>

struct Base {
  virtual ~Base() = default;
  virtual int f() const { return 0; }
};
struct Derived : Base {
  int x = 42;
  Derived() = default;
  Derived(int x) : x(x) {}
  int f() const override { return x; }
};

int main()
{
  // (9) in_place_typeで派生型Derivedを直接構築
  std::polymorphic<Base> a{std::in_place_type<Derived>};
  assert(a->f() == 42);

  // (7) 派生型の値から構築
  std::polymorphic<Base> b{Derived{10}};
  assert(b->f() == 10);

  // (3) コピー構築（派生型Derivedのディープコピー）
  std::polymorphic<Base> c = a;
  assert(c->f() == 42);
}
```
* std::polymorphic[link ../polymorphic.md]
* std::in_place_type[link /reference/utility/in_place_type_t.md]

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
- [`std::polymorphic`](../polymorphic.md)


## 参照
- [P3019R14 `indirect` and `polymorphic`: Vocabulary Types for Composite Class Design](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3019r14.pdf)
