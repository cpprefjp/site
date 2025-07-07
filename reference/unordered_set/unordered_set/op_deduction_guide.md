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
  unordered_set(InputIterator, InputIterator, typename see below::size_type = see below,
                Hash = Hash(), Pred = Pred(), Allocator = Allocator())
    -> unordered_set<typename iterator_traits<InputIterator>::value_type,
                     Hash, Pred, Allocator>;              // (1)

  template <class T, class Hash = hash<T>,
            class Pred = equal_to<T>, class Allocator = allocator<T>>
  unordered_set(initializer_list<T>, typename see below::size_type = see below,
          Hash = Hash(), Pred = Pred(), Allocator = Allocator())
    -> unordered_set<T, Hash, Pred, Allocator>;           // (2)

  template <class InputIterator,  class Allocator>
  unordered_set(InputIterator, InputIterator, typename see below::size_type, Allocator)
    -> unordered_set<typename iterator_traits<InputIterator>::value_type,
                     hash<typename iterator_traits<InputIterator>::value_type>,
                     equal_to<typename iterator_traits<InputIterator>::value_type>,
                     Allocator>;                          // (3)

  template <class InputIterator, class Hash, class Allocator>
  unordered_set(InputIterator, InputIterator, typename see below::size_type,
                Hash, Allocator)
    -> unordered_set<typename iterator_traits<InputIterator>::value_type, Hash,
                     equal_to<typename iterator_traits<InputIterator>::value_type>,
                     Allocator>;                          // (4)

  template <class T, class Allocator>
  unordered_set(initializer_list<T>, typename see below::size_type, Allocator)
    -> unordered_set<T, hash<T>, equal_to<T>, Allocator>; // (5)

  template <class T, class Hash, class Allocator>
  unordered_set(initializer_list<T>, typename see below::size_type, Hash, Allocator)
    -> unordered_set<T, Hash, equal_to<T>, Allocator>;    // (6)

  template <ranges::input_range R,
           class Hash = hash<ranges::range_value_t<R>>,
           class Pred = equal_to<ranges::range_value_t<R>>,
           class Allocator = allocator<ranges::range_value_t<R>>>
  unordered_set(from_range_t, R&&, typename see below::size_type = see below,
                Hash = Hash(), Pred = Pred(), Allocator = Allocator())
    -> unordered_set<ranges::range_value_t<R>, Hash, Pred, Allocator>; // (7) C++23から

  template <ranges::input_range R, class Allocator>
  unordered_set(from_range_t, R&&, typename see below::size_type, Allocator)
    -> unordered_set<ranges::range_value_t<R>, hash<ranges::range_value_t<R>>,
                     equal_to<ranges::range_value_t<R>>, Allocator>;   // (8) C++23から

  template <ranges::input_range R, class Allocator>
  unordered_set(from_range_t, R&&, Allocator)
    -> unordered_set<ranges::range_value_t<R>, hash<ranges::range_value_t<R>>,
                     equal_to<ranges::range_value_t<R>>, Allocator>;   // (9) C++23から

  template <ranges::input_range R, class Hash, class Allocator>
  unordered_set(from_range_t, R&&, typename see below::size_type, Hash, Allocator)
    -> unordered_set<ranges::range_value_t<R>, Hash,
                     equal_to<ranges::range_value_t<R>>, Allocator>;   // (10) C++23から
}
```
* see below[italic]
* hash[link /reference/functional/hash.md]
* equal_to[link /reference/functional/equal_to.md]
* allocator[link /reference/memory/allocator.md]
* initializer_list[link /reference/initializer_list/initializer_list.md]
* ranges::input_range[link /reference/ranges/input_range.md]
* ranges::range_value_t[link /reference/ranges/range_value_t.md]
* from_range_t[link /reference/ranges/from_range_t.md]

## 概要
`std::unordered_set`クラステンプレートの型推論補助。

- (1) : イテレータ範囲からの推論
- (2) : 初期化子リストからの推論
- (3) : イテレータ範囲とアロケータからの推論
- (4) : イテレータ範囲、ハッシュ関数、アロケータからの推論
- (5) : 初期化子リストとアロケータからの推論
- (6) : 初期化子リスト、ハッシュ関数、アロケータからの推論
- (7) : Rangeからの推論
- (8) : Rangeとアロケータからの推論
- (9) : Rangeとハッシュ関数からの推論
- (10) : Range、ハッシュ関数、アロケータからの推論


## 備考
- メンバ型`size_type`は自動的に推論される


## 例
```cpp example
#include <unordered_set>
#include <type_traits>
#include <cassert>

int main()
{
  // (2)
  // 初期化子リストから推論
  std::unordered_set us1 = {1, 2, 3};
  static_assert(std::is_same_v<decltype(us1), std::unordered_set<int>>);

  // パラメータ設定済みのsetからの推論
  std::unordered_set us2 = us1;
  static_assert(std::is_same_v<decltype(us2), std::unordered_set<int>>);

  // (1)
  // イテレータ範囲からの推論。
  // us3{us1.begin(), us1.end()} とすると、イテレータの初期化子リストと見なされてしまうので注意
  std::unordered_set us3(us1.begin(), us1.end());
  static_assert(std::is_same_v<decltype(us3), std::unordered_set<int>>);
  assert(us3.size() == 3);
}
```
* us1.begin()[link begin.md]
* us1.end()[link end.md]
* us3.size()[link size.md]

### 出力
```
```


## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc):
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [C++17 クラステンプレートのテンプレート引数推論](/lang/cpp17/type_deduction_for_class_templates.md)


## 参照
- [P0433R2 Toward a resolution of US7 and US14: Integrating template deduction for class templates into the standard library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0433r2.html)

