# 推論補助
* unordered_set[meta header]
* std[meta namespace]
* unordered_set[meta class]
* cpp17[meta cpp]

```cpp
namespace std {
  template <class InputIterator,
            class Hash = hash<typename iterator_traits<InputIterator>::value_type>,
            class Pred = equal_to<typename iterator_traits<InputIterator>::value_type>,
            class Allocator = allocator<typename iterator_traits<InputIterator>::value_type>>
  unordered_multiset(InputIterator, InputIterator, see below::size_type = see below,
                     Hash = Hash(), Pred = Pred(), Allocator = Allocator())
    -> unordered_multiset<typename iterator_traits<InputIterator>::value_type,
                          Hash, Pred, Allocator>;    // (1)

  template <class T, class Hash = hash<T>,
            class Pred = equal_to<T>, class Allocator = allocator<T>>
  unordered_multiset(initializer_list<T>, typename see below::size_type = see below,
                     Hash = Hash(), Pred = Pred(), Allocator = Allocator())
    -> unordered_multiset<T, Hash, Pred, Allocator>; // (2)

  template <class InputIterator,  class Allocator>
  unordered_multiset(InputIterator, InputIterator, typename see below::size_type, Allocator)
    -> unordered_multiset<typename iterator_traits<InputIterator>::value_type,
                          hash<typename iterator_traits<InputIterator>::value_type>,
                          equal_to<typename iterator_traits<InputIterator>::value_type>,
                          Allocator>;                // (3)

  template <class InputIterator,  class Hash, class Allocator>
  unordered_multiset(InputIterator, InputIterator, typename see below::size_type,
                     Hash, Allocator)
    -> unordered_multiset<
             typename iterator_traits<InputIterator>::value_type,
             Hash,
             equal_to<typename iterator_traits<InputIterator>::value_type>,
             Allocator>;                             // (4)

  template <class T, class Allocator>
  unordered_multiset(initializer_list<T>, typename see below::size_type, Allocator)
    -> unordered_multiset<T, hash<T>,
                          equal_to<T>, Allocator>;   // (5)

  template <class T, class Hash, class Allocator>
  unordered_multiset(initializer_list<T>, typename see below::size_type, Hash, Allocator)
    -> unordered_multiset<T, Hash,
                          equal_to<T>, Allocator>;   // (6)
}
```
* hash[link /reference/functional/hash.md]
* equal_to[link /reference/functional/equal_to.md]
* iterator_traits[link /reference/iterator/iterator_traits.md]
* allocator[link /reference/memory/allocator.md]
* initializer_list[link /reference/initializer_list.md]

## 概要
`std::unordered_multiset`クラステンプレートの型推論補助。

- (1) : イテレータ範囲からの推論
- (2) : 初期化子リスト、ハッシュ関数、比較関数オブジェクトからの推論
- (3) : イテレータ範囲とアロケータからの推論
- (4) : イテレータ範囲、ハッシュ関数、アロケータからの推論
- (5) : 初期化子リストとアロケータからの推論


## 備考
- メンバ型`size_type`は自動的に推論される


## 例
```cpp
#include <unordered_set>
#include <type_traits>
#include <cassert>

int main()
{
  // (2)
  // 初期化子リストから推論
  std::unordered_multiset ums1 = {1, 2, 3};
  static_assert(std::is_same_v<decltype(ums1), std::unordered_multiset<int>>);

  // パラメータ設定済みのsetからの推論
  std::unordered_multiset ums2 = ums1;
  static_assert(std::is_same_v<decltype(ums2), std::unordered_multiset<int>>);

  // (1)
  // イテレータ範囲からの推論。
  // ums3{ums1.begin(), ums1.end()} とすると、イテレータの初期化子リストと見なされてしまうので注意
  std::unordered_multiset ums3(ums1.begin(), ums1.end());
  static_assert(std::is_same_v<decltype(ums3), std::unordered_multiset<int>>);
  assert(ums3.size() == 3);
}
```
* ums1.begin()[link begin.md]
* ums1.end()[link end.md]
* ums3.size()[link size.md]

### 出力
```
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

