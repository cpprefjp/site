# 代入演算子
* memory[meta header]
* std[meta namespace]
* indirect[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr indirect& operator=(const indirect& other);              // (1)
constexpr indirect& operator=(indirect&& other) noexcept(see below); // (2)
template <class U = T>
constexpr indirect& operator=(U&& u);                              // (3)
```

## 概要
- (1) : コピー代入。`other`が所有するオブジェクトをディープコピーする。
- (2) : ムーブ代入。`other`から所有権を移す。
- (3) : 所有するオブジェクトに値`u`を代入する。


## テンプレートパラメータ制約
- (3) : [`remove_cvref_t`](/reference/type_traits/remove_cvref.md)`<U>`が`indirect`でなく、[`is_constructible_v`](/reference/type_traits/is_constructible.md)`<T, U>`と[`is_assignable_v`](/reference/type_traits/is_assignable.md)`<T&, U>`がともに`true`であること。


## 適格要件
- (1) : [`is_copy_assignable_v`](/reference/type_traits/is_copy_assignable.md)`<T>`と[`is_copy_constructible_v`](/reference/type_traits/is_copy_constructible.md)`<T>`がともに`true`であること。
- (2) : [`is_copy_constructible_v`](/reference/type_traits/is_copy_constructible.md)`<T>`が`true`であること。


## 効果
- (1) : `other`が無効値状態であれば`*this`も無効値状態にする。そうでなければ、アロケータの伝播規則に従い、`other`が所有するオブジェクトのコピーを`*this`がもつようにする。
- (2) : `other`が無効値状態であれば`*this`も無効値状態にする。そうでなければ、所有権を移すかムーブ構築する。`other`は無効値状態となる。
- (3) : `*this`が無効値状態であれば`u`から`T`を構築して所有する。そうでなければ`**this = std::forward<U>(u)`と等価。


## 戻り値
`*this`への参照。


## 例外
- (1) : 強い例外安全性を保証する。例外が送出された場合、[`this->valueless_after_move()`](valueless_after_move.md)の結果は変化しない。
- (2) : 以下と等価な`noexcept`指定を持つ：
```cpp
noexcept(allocator_traits<Allocator>::propagate_on_container_move_assignment::value ||
         allocator_traits<Allocator>::is_always_equal::value)
```
* allocator_traits[link /reference/memory/allocator_traits.md]


## 例
```cpp example
#include <cassert>
#include <memory>
#include <utility>

int main()
{
  std::indirect<int> a{1};
  std::indirect<int> b{2};

  a = b;                  // (1) コピー代入（ディープコピー）
  assert(*a == 2);
  *a = 3;
  assert(*b == 2);        // bは影響を受けない

  a = 10;                 // (3) 値の代入
  assert(*a == 10);

  a = std::move(b);       // (2) ムーブ代入
  assert(*a == 2);
  assert(b.valueless_after_move());
}
```
* std::indirect[color ff0000]
* std::move[link /reference/utility/move.md]
* valueless_after_move[link valueless_after_move.md]

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
