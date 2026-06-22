# 推論補助
* memory[meta header]
* std[meta namespace]
* indirect[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
template <class Value>
indirect(Value) -> indirect<Value>; // (1)

template <class Allocator, class Value>
indirect(allocator_arg_t, Allocator, Value)
  -> indirect<Value,
       typename allocator_traits<Allocator>::template rebind_alloc<Value>>; // (2)
```
* allocator_arg_t[link /reference/memory/allocator_arg_t.md]

## 概要
`std::indirect`クラステンプレートの型推論を補助する。

- (1) : 単一の値から`indirect`を構築する場合、その値の型を`T`として推論する。
- (2) : アロケータと値から構築する場合、値の型を`T`とし、アロケータを`Value`向けに`rebind`した型を`Allocator`として推論する。


## 例
```cpp example
#include <memory>
#include <type_traits>

int main()
{
  std::indirect a{42};
  static_assert(std::is_same_v<decltype(a), std::indirect<int>>);
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
