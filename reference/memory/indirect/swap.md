# swap
* memory[meta header]
* std[meta namespace]
* indirect[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr void swap(indirect& other) noexcept(see below);
```

## 概要
`*this`と`other`の状態を交換する。所有オブジェクトまたは無効値状態を交換する。


## 事前条件
[`allocator_traits`](/reference/memory/allocator_traits.md)`<Allocator>::propagate_on_container_swap::value`が`true`の場合、`Allocator`はCpp17Swappable要件を満たすこと。そうでない場合、`get_allocator() == other.get_allocator()`が`true`であること。


## 効果
`*this`と`other`の状態（所有オブジェクトまたは無効値状態）を交換する。`propagate_on_container_swap::value`が`true`の場合はアロケータも交換する。所有オブジェクトに対して直接`swap`を呼ぶわけではない。


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

int main()
{
  std::indirect<int> a{1};
  std::indirect<int> b{2};
  a.swap(b);
  assert(*a == 2 && *b == 1);
}
```
* std::indirect[color ff0000]

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
