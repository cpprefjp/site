# swap
* memory[meta header]
* std[meta namespace]
* polymorphic[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr void swap(polymorphic& other) noexcept(see below);
```

## 概要
`*this`と`other`の状態を交換する。所有オブジェクトまたは無効値状態を交換する。


## 事前条件
[`allocator_traits`](/reference/memory/allocator_traits.md)`<Allocator>::propagate_on_container_swap::value`が`true`の場合、`Allocator`は*Cpp17Swappable*要件を満たすこと。そうでない場合、`get_allocator() == other.get_allocator()`が`true`であること。


## 効果
`*this`と`other`の状態を交換する。`propagate_on_container_swap::value`が`true`の場合はアロケータも交換する。


## 例外
以下と等価な`noexcept`指定を持つ：

```cpp
noexcept(allocator_traits<Allocator>::propagate_on_container_swap::value ||
         allocator_traits<Allocator>::is_always_equal::value)
```
* allocator_traits[link /reference/memory/allocator_traits.md]


## 例
```cpp example
#include <cassert>
#include <memory>

struct Base { virtual ~Base() = default; virtual int f() const = 0; };
struct D1 : Base { int f() const override { return 1; } };
struct D2 : Base { int f() const override { return 2; } };

int main()
{
  std::polymorphic<Base> a{std::in_place_type<D1>};
  std::polymorphic<Base> b{std::in_place_type<D2>};
  a.swap(b);
  assert(a->f() == 2 && b->f() == 1);
}
```
* std::polymorphic[color ff0000]
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
