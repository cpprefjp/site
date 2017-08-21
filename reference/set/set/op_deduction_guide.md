# 推論補助
* set[meta header]
* std[meta namespace]
* set[meta class]
* cpp17[meta cpp]

```cpp
namespace std {
  template <class InputIterator,
            class Compare = less<typename iterator_traits<InputIterator>::value_type>,
            class Allocator = allocator<typename iterator_traits<InputIterator>::value_type>>
  set(InputIterator, InputIterator,
      Compare = Compare(), Allocator = Allocator())
    -> set<typename iterator_traits<InputIterator>::value_type, Compare, Allocator>; // (1)

  template <class Key, class Compare = less<Key>, class Allocator = allocator<Key>>
  set(initializer_list<Key>, Compare = Compare(), Allocator = Allocator())
    -> set<Key, Compare, Allocator>;                                                 // (2)

  template <class InputIterator, class Allocator>
  set(InputIterator, InputIterator, Allocator)
    -> set<typename iterator_traits<InputIterator>::value_type,
           less<typename iterator_traits<InputIterator>::value_type>, Allocator>;    // (3)

  template <class Key, class Allocator>
  set(initializer_list<Key>, Allocator) -> set<Key, less<Key>, Allocator>;           // (4)
}
```
* less[link /reference/functional/less.md]
* iterator_traits[link /reference/iterator/iterator_traits.md]
* allocator[link /reference/memory/allocator.md]
* initializer_list[link /reference/initializer_list.md]

## 概要
`std::set`クラステンプレートの型推論補助。

- (1) : イテレータ範囲からの推論
- (2) : 初期化子リストと比較関数オブジェクトからの推論
- (3) : イテレータ範囲とアロケータからの推論
- (4) : 初期化子リストとアロケータからの推論


## 例
```cpp
#include <set>
#include <type_traits>
#include <cassert>

int main()
{
  // (2)
  // 初期化子リストから推論
  std::set s1 = {1, 2, 3};
  static_assert(std::is_same_v<decltype(s1), std::set<int>>);

  // パラメータ設定済みのsetからの推論
  std::set s2 = s1;
  static_assert(std::is_same_v<decltype(s2), std::set<int>>);

  // (1)
  // イテレータ範囲からの推論。
  // s3{s1.begin(), s1.end()} とすると、イテレータの初期化子リストと見なされてしまうので注意
  std::set s3(s1.begin(), s1.end());
  static_assert(std::is_same_v<decltype(s3), std::set<int>>);
  assert(s3.size() == 3);
}
```
* s1.begin()[link begin.md]
* s1.end()[link end.md]
* s3.size()[link size.md]

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

