# 推論補助
* flat_map[meta header]
* std[meta namespace]
* flat_map[meta class]
* cpp23[meta cpp]

```cpp
namespace std {
  // 説明用の型
  template <class InputIterator>
  using iter_key_t = remove_const_t<typename iterator_traits<InputIterator>::value_type::first_type>;
  template <class InputIterator>
  using iter_val_t = typename iterator_traits<InputIterator>::value_type::second_type;
  template<ranges::input_range Range>
  using range_key_t = remove_const_t<typename ranges::range_value_t<Range>::first_type>;
  template<ranges::input_range Range>
  using range_val_t = typename ranges::range_value_t<Range>::second_type;
  template<class Allocator, class T>
  using alloc_rebind = typename allocator_traits<Allocator>::template rebind_alloc<T>;

  template<class KeyContainer, class MappedContainer,
           class Compare = less<typename KeyContainer::value_type>>
  flat_map(KeyContainer, MappedContainer, Compare = Compare())
    -> flat_map<typename KeyContainer::value_type, typename MappedContainer::value_type,
                Compare, KeyContainer, MappedContainer>;                                 // (1)

  template<class KeyContainer, class MappedContainer, class Allocator>
  flat_map(KeyContainer, MappedContainer, Allocator)
    -> flat_map<typename KeyContainer::value_type, typename MappedContainer::value_type,
                less<typename KeyContainer::value_type>, KeyContainer, MappedContainer>; // (2)

  template<class KeyContainer, class MappedContainer, class Compare, class Allocator>
  flat_map(KeyContainer, MappedContainer, Compare, Allocator)
    -> flat_map<typename KeyContainer::value_type, typename MappedContainer::value_type,
                Compare, KeyContainer, MappedContainer>;                                 // (3)

  template<class KeyContainer, class MappedContainer,
           class Compare = less<typename KeyContainer::value_type>>
  flat_map(sorted_unique_t, KeyContainer, MappedContainer, Compare = Compare())
    -> flat_map<typename KeyContainer::value_type, typename MappedContainer::value_type,
                Compare, KeyContainer, MappedContainer>;                                 // (4)

  template<class KeyContainer, class MappedContainer, class Allocator>
  flat_map(sorted_unique_t, KeyContainer, MappedContainer, Allocator)
    -> flat_map<typename KeyContainer::value_type, typename MappedContainer::value_type,
                less<typename KeyContainer::value_type>, KeyContainer, MappedContainer>; // (5)

  template<class KeyContainer, class MappedContainer, class Compare, class Allocator>
  flat_map(sorted_unique_t, KeyContainer, MappedContainer, Compare, Allocator)
    -> flat_map<typename KeyContainer::value_type, typename MappedContainer::value_type,
                Compare, KeyContainer, MappedContainer>;                                 // (6)

  template<class InputIterator, class Compare = less<iter_key_t<InputIterator>>>
  flat_map(InputIterator, InputIterator, Compare = Compare())
    -> flat_map<iter_key_t<InputIterator>, iter_val_t<InputIterator>, Compare>;          // (7)

  template<class InputIterator, class Compare = less<iter_key_t<InputIterator>>>
  flat_map(sorted_unique_t, InputIterator, InputIterator, Compare = Compare())
    -> flat_map<iter_key_t<InputIterator>, iter_val_t<InputIterator>, Compare>;          // (8)

  template<ranges::input_range R, class Compare = less<range_key_t<R>>,
           class Allocator = allocator<byte>>
  flat_map(from_range_t, R&&, Compare = Compare(), Allocator = Allocator())
    -> flat_map<range_key_t<R>, range_val_t<R>, Compare,
                vector<range_key_t<R>, alloc_rebind<Allocator, range_key_t<R>>>,
                vector<range_val_t<R>, alloc_rebind<Allocator, range_val_t<R>>>>;        // (9)

  template<ranges::input_range R, class Allocator>
  flat_map(from_range_t, R&&, Allocator)
    -> flat_map<range_key_t<R>, range_val_t<R>, less<range_key_t<R>>,
                vector<range_key_t<R>, alloc_rebind<Allocator, range_key_t<R>>>,
                vector<range_val_t<R>, alloc_rebind<Allocator, range_val_t<R>>>>;        // (10)

  template<class Key, class T, class Compare = less<Key>>
  flat_map(initializer_list<pair<Key, T>>, Compare = Compare())
    -> flat_map<Key, T, Compare>;                                                        // (11)

  template<class Key, class T, class Compare = less<Key>>
  flat_map(sorted_unique_t, initializer_list<pair<Key, T>>, Compare = Compare())
    -> flat_map<Key, T, Compare>;                                                        // (12)
```
* vector[link /reference/vector/vector.md]
* from_range_t[link ../../ranges/from_range_t.md]
* sorted_unique_t[link ../sorted_unique_t.md]
* remove_const_t[link /reference/type_traits/remove_const.md]
* pair[link /reference/utility/pair.md]
* iterator_traits[link /reference/iterator/iterator_traits.md]
* less[link /reference/functional/less.md]
* allocator[link /reference/memory/allocator.md]
* initializer_list[link /reference/initializer_list/initializer_list.md]
* ranges::input_range[link /reference/ranges/input_range.md]
* allocator_traits[link /reference/memory/allocator_traits.md]
* byte[link /reference/cstddef/byte.md]


## 概要
`std::flat_map`クラステンプレートの型推論補助。

- (1) : キーのコンテナ、値のコンテナ、比較関数からの推論
- (2) : キーのコンテナ、値のコンテナ、アロケータからの推論
- (3) : キーのコンテナ、値のコンテナ、比較関数、アロケータからの推論
- (4) : キーのコンテナ、値のコンテナ、比較関数からの推論
- (5) : キーのコンテナ、値のコンテナ、アロケータからの推論
- (6) : キーのコンテナ、値のコンテナ、比較関数、アロケータからの推論
- (7) : イテレータ範囲、比較関数からの推論
- (8) : イテレータ範囲、比較関数からの推論
- (9) : Range、比較関数、アロケータからの推論
- (10) : Range、アロケータからの推論
- (11) : 初期化子リスト、比較関数からの推論
- (12) : 初期化子リスト、比較関数からの推論


## 備考
- C++23時点において、`flat_map`の推論補助は使いにくい。これはイテレータ範囲や組でのキーの型が`const Key`となっているためだ。この使いにくさは、将来の言語拡張で改良される可能性がある。
    ```cpp
    flat_map m = {{1, 1}, {2, 2}, {3, 3}}; // コンパイルエラー！ 初期化子リストからconst Keyを導出できない
    flat_map m2 = initializer_list<pair<const int, int>>({{1, 1}, {2, 2}, {3, 3}}); // OK
    ```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [LWG Issue 3025. Map-like container deduction guides should use `pair<Key, T>`, not `pair<const Key, T>`](https://wg21.cmeerw.net/lwg/issue3025)
