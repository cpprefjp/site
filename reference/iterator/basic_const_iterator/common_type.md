# common_type
* iterator[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std {
  // (1)
  template<class T, common_with<T> U>
    requires input_iterator<common_type_t<T, U>>
  struct common_type<basic_const_iterator<T>, U> {
    using type = basic_const_iterator<common_type_t<T, U>>;
  };

  // (2)
  template<class T, common_with<T> U>
    requires input_iterator<common_type_t<T, U>>
  struct common_type<U, basic_const_iterator<T>> {
    using type = basic_const_iterator<common_type_t<T, U>>;
  };

  // (3)
  template<class T, common_with<T> U>
    requires input_iterator<common_type_t<T, U>>
  struct common_type<basic_const_iterator<T>, basic_const_iterator<U>> {
    using type = basic_const_iterator<common_type_t<T, U>>;
  };
}
```
* common_type[link /reference/type_traits/common_type.md]

## 概要

`basic_const_iterator`のための[`common_type`](/reference/type_traits/common_type.md)特殊化。

- (1), (2) : `basic_const_iterator`とその他のイテレータ型の間の共通の型を取得する
- (3) : 異なるイテレータ型による`basic_const_iterator`特殊化の間の共通の型を取得する

## 例
```cpp example
#include <iterator>

int main() {
  using ct1 = std::common_type_t<int*, std::const_iterator<int*>>;

  static_assert(std::same_as<ct1, std::basic_const_iterator<int*>>);

  using ct2 = std::common_type_t<std::const_iterator<int*>, int*>;

  static_assert(std::same_as<ct1, ct2>);
  
  using ct3 = std::common_type_t<const int*, std::const_iterator<int*>>;

  static_assert(std::same_as<ct3, std::basic_const_iterator<const int*>>);

  using ct4 = std::common_type_t<std::basic_const_iterator<int*>, std::basic_const_iterator<const int*>>;

  static_assert(std::same_as<ct4, std::basic_const_iterator<const int*>>);
}
```

### 出力
```
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 13.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 6 [mark verified]

## 関連項目

- [`common_type`](/reference/type_traits/common_type.md)

## 参照

- [P2278R4 `cbegin` should always return a constant iterator](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2278r4.html)
