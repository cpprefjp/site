# 推論補助
* flat_set[meta header]
* std[meta namespace]
* flat_multiset[meta class]
* cpp23[meta cpp]

```cpp
namespace std {
  // 説明用の型
  template <class InputIterator>
  using iter_val_t = typename iterator_traits<InputIterator>::value_type;
  template<class Allocator, class T>
  using alloc_rebind = typename allocator_traits<Allocator>::template rebind_alloc<T>;

  template<class KeyContainer, class Compare = less<typename KeyContainer::value_type>>
  flat_multiset(KeyContainer, Compare = Compare())
    -> flat_multiset<typename KeyContainer::value_type, Compare, KeyContainer>;         // (1)

  template<class KeyContainer, class Allocator>
  flat_multiset(KeyContainer, Allocator)
    -> flat_multiset<typename KeyContainer::value_type,
                less<typename KeyContainer::value_type>, KeyContainer>;                 // (2)

  template<class KeyContainer, class Compare, class Allocator>
  flat_multiset(KeyContainer, Compare, Allocator)
    -> flat_multiset<typename KeyContainer::value_type, Compare, KeyContainer>;         // (3)

  template<class KeyContainer, class Compare = less<typename KeyContainer::value_type>>
  flat_multiset(sorted_equivalent_t, KeyContainer, Compare = Compare())
    -> flat_multiset<typename KeyContainer::value_type, Compare, KeyContainer>;         // (4)

  template<class KeyContainer, class Allocator>
  flat_multiset(sorted_equivalent_t, KeyContainer, Allocator)
    -> flat_multiset<typename KeyContainer::value_type,
                less<typename KeyContainer::value_type>, KeyContainer>;                 // (5)

  template<class KeyContainer, class Compare, class Allocator>
  flat_multiset(sorted_equivalent_t, KeyContainer, Compare, Allocator)
    -> flat_multiset<typename KeyContainer::value_type, Compare, KeyContainer>;         // (6)

  template<class InputIterator, class Compare = less<iter_val_t<InputIterator>>>
  flat_multiset(InputIterator, InputIterator, Compare = Compare())
    -> flat_multiset<iter_val_t<InputIterator>, Compare>;                               // (7)

  template<class InputIterator, class Compare = less<iter_val_t<InputIterator>>>
  flat_multiset(sorted_equivalent_t, InputIterator, InputIterator, Compare = Compare())
    -> flat_multiset<iter_val_t<InputIterator>, Compare>;                               // (8)

  template<ranges::input_range R, class Compare = less<ranges::range_value_t<R>>,
           class Allocator = allocator<ranges::range_value_t<R>>>
  flat_multiset(from_range_t, R&&, Compare = Compare(), Allocator = Allocator())
    -> flat_multiset<ranges::range_value_t<R>, Compare,
                vector<ranges::range_value_t<R>,
                alloc_rebind<Allocator, ranges::range_value_t<R>>>>;                    // (9)

  template<ranges::input_range R, class Allocator>
  flat_multiset(from_range_t, R&&, Allocator)
    -> flat_multiset<ranges::range_value_t<R>, less<ranges::range_value_t<R>>,
                vector<ranges::range_value_t<R>,
                alloc_rebind<Allocator, ranges::range_value_t<R>>>>;                    // (10)

  template<class Key, class Compare = less<Key>>
  flat_multiset(initializer_list<Key>, Compare = Compare())
    -> flat_multiset<Key, Compare>;                                                     // (11)

  template<class Key, class Compare = less<Key>>
  flat_multiset(sorted_equivalent_t, initializer_list<Key>, Compare = Compare())
    -> flat_multiset<Key, Compare>;                                                     // (12)
```
* vector[link /reference/vector/vector.md]
* from_range_t[link ../../ranges/from_range_t.md]
* sorted_equivalent_t[link ../sorted_equivalent_t.md]
* iterator_traits[link /reference/iterator/iterator_traits.md]
* less[link /reference/functional/less.md]
* allocator[link /reference/memory/allocator.md]
* initializer_list[link /reference/initializer_list/initializer_list.md]
* ranges::input_range[link /reference/ranges/input_range.md]
* ranges::range_value_t[link /reference/ranges/range_value_t.md]
* allocator_traits[link /reference/memory/allocator_traits.md]


## 概要
`std::flat_multiset`クラステンプレートの型推論補助。

- (1) : キーのコンテナ、比較関数からの推論
- (2) : キーのコンテナ、アロケータからの推論
- (3) : キーのコンテナ、比較関数、アロケータからの推論
- (4) : キーのコンテナ、比較関数からの推論
- (5) : キーのコンテナ、アロケータからの推論
- (6) : キーのコンテナ、比較関数、アロケータからの推論
- (7) : イテレータ範囲、比較関数からの推論
- (8) : イテレータ範囲、比較関数からの推論
- (9) : Range、比較関数、アロケータからの推論
- (10) : Range、アロケータからの推論
- (11) : 初期化子リスト、比較関数からの推論
- (12) : 初期化子リスト、比較関数からの推論


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
