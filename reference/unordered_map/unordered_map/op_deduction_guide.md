# 推論補助
* unordered_map[meta header]
* std[meta namespace]
* unordered_map[meta class]
* cpp17[meta cpp]

```cpp
namespace std {
  // 説明用の型
  template <class InputIterator>
  using iter_key_t = remove_const_t<typename iterator_traits<InputIterator>::value_type::first_type>;
  template <class InputIterator>
  using iter_val_t = typename iterator_traits<InputIterator>::value_type::second_type;
  template <class InputIterator>
  using iter_to_alloc_t = pair<add_const_t<typename iterator_traits<InputIterator>::value_type::first_type>,
                               typename iterator_traits<InputIterator>::value_type::second_type>;

  template <class InputIterator,
            class Hash = hash<iter_key_t<InputIterator>>,
            class Pred = equal_to<iter_key_t<InputIterator>>,
            class Allocator = allocator<iter_to_alloc_t<InputIterator>>>
  unordered_map(InputIterator, InputIterator, typename see below::size_type = see below,
                Hash = Hash(), Pred = Pred(), Allocator = Allocator())
    -> unordered_map<iter_key_t<InputIterator>,
                     iter_value_t<InputIterator>,
                     Hash, Pred, Allocator>;         // (1)

  template <class Key, class T,
            class Hash = hash<Key>,
            class Pred = equal_to<Key>,
            class Allocator = allocator<pair<const Key, T>>>
  unordered_map(initializer_list<pair<const Key, T>>,
                typename see below::size_type = see below,
                Hash = Hash(), Pred = Pred(), Allocator = Allocator())
    -> unordered_map<Key, T, Hash, Pred, Allocator>; // (2)

  template <class InputIterator, class Allocator>
  unordered_map(InputIterator, InputIterator, typename see below::size_type, Allocator)
    -> unordered_map<
           iter_key_t<InputIterator>,
           iter_val_t<InputIterator>,
           hash<iter_key_t<InputIterator>>,
           equal_to<iter_key_t<InputIterator>>,
           Allocator>;                               // (3)

  template <class InputIterator, class Allocator>
  unordered_map(InputIterator, InputIterator, Allocator)
    -> unordered_map<
           iter_key_t<InputIterator>,
           iter_val_t<InputIterator>,
           hash<iter_key_t<InputIterator>>,
           equal_to<iter_key_t<InputIterator>>,
           Allocator>;                               // (4)

  template <class InputIterator, class Hash, class Allocator>
  unordered_map(InputIterator, InputIterator, typename see below::size_type, Hash, Allocator)
    -> unordered_map<
           iter_key_t<InputIterator>,
           iter_val_t<InputIterator>,
           Hash,
           equal_to<iter_key_t<InputIterator>>,
           Allocator>;                               // (5)

  template <class Key, class T, typename Allocator>
  unordered_map(initializer_list<pair<const Key, T>>, typename see below::size_type, Allocator)
    -> unordered_map<Key, T, hash<Key>,
                     equal_to<Key>, Allocator>;      // (6)

  template <class Key, class T, typename Allocator>
  unordered_map(initializer_list<pair<const Key, T>>, Allocator)
    -> unordered_map<Key, T, hash<Key>,
                     equal_to<Key>, Allocator>;      // (7)

  template <class Key, class T, class Hash, class Allocator>
  unordered_map(initializer_list<pair<const Key, T>>, typename see below::size_type, Hash, Allocator)
    -> unordered_map<Key, T, Hash,
                     equal_to<Key>, Allocator>;      // (8)
}
```
* remove_const_t[link /reference/type_traits/remove_const.md]
* add_const_t[link /reference/type_traits/add_const.md]
* pair[link /reference/utility/pair.md]
* iterator_traits[link /reference/iterator/iterator_traits.md]
* hash[link /reference/functional/hash.md]
* equal_to[link /reference/functional/equal_to.md]
* allocator[link /reference/memory/allocator.md]
* initializer_list[link /reference/initializer_list.md]

## 概要
`std::unordered_map`クラステンプレートの型推論補助。

- (1) : イテレータ範囲からの推論
- (2) : 初期化子リストからの推論
- (3) : イテレータ範囲とバケット数、アロケータからの推論
- (4) : イテレータ範囲とアロケータからの推論
- (5) : イテレータ範囲とバケット数、ハッシュ関数、アロケータからの推論
- (6) : 初期化子リストとバケット数、アロケータからの推論
- (7) : 初期化子リストとアロケータからの推論
- (8) : 初期化子リストとバケット数、ハッシュ関数、アロケータからの推論


## 備考
- メンバ型`size_type`は自動的に推論される
- C++17時点において、`unordered_map`の推論補助は使いにくい。これはイテレータ範囲や組でのキーの型が`const Key`となっているためだ。この使いにくさは、将来の言語拡張で改良される可能性がある。
    ```cpp
    // コンパイルエラー！ 初期化子リストからconst Keyを導出できない
    unordered_map m = {{"foo", 2}, {"bar", 3}, {"baz", 4}};

    // OK
    unordered_map m2 = initializer_list<pair<char const *, int>>({{"foo", 2}, {"bar", 3}, {"baz", 4}});
    ```


## バージョン
### 言語
- C++17

### 処理系
- [Clang, C++17 mode](/implementation.md#clang):
- [GCC, C++17 mode](/implementation.md#gcc):
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [C++17 クラステンプレートのテンプレート引数推論](/lang/cpp17/type_deduction_for_class_templates.md)


## 参照
- [P0433R2 Toward a resolution of US7 and US14: Integrating template deduction for class templates into the standard library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0433r2.html)

