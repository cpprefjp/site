# 推論補助
* map[meta header]
* std[meta namespace]
* map[meta class]
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
            class Compare = less<iter_key_t<InputIterator>>,
            class Allocator = allocator<iter_to_alloc_t<InputIterator>>>
  map(InputIterator, InputIterator, Compare = Compare(), Allocator = Allocator())
    -> map<iter_key_t<InputIterator>, iter_val_t<InputIterator>, Compare, Allocator>; // (1)

  template <class Key,
            class T,
            class Compare = less<Key>,
            class Allocator = allocator<pair<const Key, T>>>
  map(initializer_list<pair<const Key, T>>, Compare = Compare(), Allocator = Allocator())
    -> map<Key, T, Compare, Allocator>;                                               // (2)

  template <class InputIterator, class Allocator>
  map(InputIterator, InputIterator, Allocator)
    -> map<iter_key_t<InputIterator>, iter_val_t<InputIterator>,
           less<iter_key_t<InputIterator>>, Allocator>;                               // (3)

  template <class Key, class T, class Allocator>
  map(initializer_list<pair<const Key, T>>, Allocator)
    -> map<Key, T, less<Key>, Allocator>;                                             // (4)
}
```
* remove_const_t[link /reference/type_traits/remove_const.md]
* add_const_t[link /reference/type_traits/add_const.md]
* pair[link /reference/utility/pair.md]
* iterator_traits[link /reference/iterator/iterator_traits.md]
* less[link /reference/functional/less.md]
* allocator[link /reference/memory/allocator.md]
* initializer_list[link /reference/initializer_list.md]

## 概要
`std::map`クラステンプレートの型推論補助。

- (1) : イテレータ範囲からの推論
- (2) : 初期化子リストからの推論
- (3) : イテレータ範囲とアロケータからの推論
- (4) : 初期化子リストとアロケータからの推論


## 備考
- C++17時点において、`map`の推論補助は使いにくい。これはイテレータ範囲や組でのキーの型が`const Key`となっているためだ。この使いにくさは、将来の言語拡張で改良される可能性がある。
    ```cpp
    map m = {{"foo", 2}, {"bar", 3}, {"baz", 4}}; // コンパイルエラー！ 初期化子リストからconst Keyを導出できない
    map m2 = initializer_list<pair<char const *, int>>({{"foo", 2}, {"bar", 3}, {"baz", 4}}); // OK
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

