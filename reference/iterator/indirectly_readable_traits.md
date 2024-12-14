# indirectly_readable_traits
* iterator[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {

  // 素の型を取得しvalue_typeという名前に変換する、説明専用type-traits
  template<class>
  struct cond-value-type { };

  template<class T>
    requires is_object_v<T>
  struct cond-value-type<T> {
    using value_type = remove_cv_t<T>;
  };


  // プライマリテンプレート
  template<class>
  struct indirectly_readable_traits { };

  // ポインタ型についての特殊化
  template<class T>
  struct indirectly_readable_traits<T*>
    : cond-value-type<T> { };

  // 配列型についての特殊化
  template<class I>
    requires is_array_v<I>
  struct indirectly_readable_traits<I> {
    using value_type = remove_cv_t<remove_extent_t<I>>;
  };

  // constを外すための特殊化
  template<class I>
  struct indirectly_readable_traits<const I>
    : indirectly_readable_traits<I> { };

  template<class T>
  concept has-member-value-type = requires { typename T::value_type; };     // 説明専用

  template<class T>
  concept has-member-element-type = requires { typename T::element_type; }; // 説明専用

  // value_typeを定義している型についての特殊化
  template<has-member-value-type T>
  struct indirectly_readable_traits<T>
    : cond-value-type<typename T::value_type> { };

  // element_typeを定義している型についての特殊化
  template<has-member-element-type T>
  struct indirectly_readable_traits<T>
    : cond-value-type<typename T::element_type> { };
  
  // value_typeとelement_typeを両方定義している型についての特殊化
  template<has-member-value-type T>
    requires has-member-element-type<T> &&
             same_as<remove_cv_t<typename T::element_type>, 
                     remove_cv_t<typename T::value_type>>
  struct indirectly_readable_traits<T>
    : cond-value-type<typename T::value_type> { };
}
```
* is_object_v[link /reference/type_traits/is_object.md]
* remove_cv_t[link /reference/type_traits/remove_cv.md]
* is_array_v[link /reference/type_traits/is_array.md]
* remove_extent_t[link /reference/type_traits/remove_extent.md]

## 概要

任意のイテレータ型からそのイテレータの要素型（`value_type`）を取得する、あるいは[`iter_value_t`](iter_value_t.md)で取得できるようにするためにアダプトする。

## 効果

上記定義のいずれかの形式、あるいはそれ以外の明示的特殊化を通して得られるイテレータの要素型を、メンバ型`::value_type`として定義する。

## 特殊化

このクラスは任意のプログラム定義型について特殊化することが許可されている。

## 備考

イテレータの要素型を求める場合はこのクラスの代わりに[`iter_value_t`](iter_value_t.md)を使用することを推奨する（より汎用的であるため）。その場合、このクラスは自作のイテレータ型を`iter_value_t`にアダプトするために使用できる。

## 例
```cpp example
#include <iterator>
#include <vector>

struct sample_iterator {
  int n[3] = {1, 2, 3};
  int index = 0;
  
  int& operator*() { return n[index]; }

  friend auto operator++(sample_iterator& self) -> sample_iterator& {
    if (self.index < 3) ++self.index;
    return self;
  }
  
  friend bool operator==(const sample_iterator& rhs, std::default_sentinel_t) {
    return 3 < rhs.index;
  }
};


struct have_value : sample_iterator {
  using value_type = int;
};

struct have_element : sample_iterator {
  using element_type = int;
};

int main() {
  using vec_iterator = std::vector<int>::iterator;
  using pointer = double*;

  static_assert(std::same_as<std::indirectly_readable_traits<pointer>::value_type         , double>);
  static_assert(std::same_as<std::indirectly_readable_traits<short[3]>::value_type        , short>);
  static_assert(std::same_as<std::indirectly_readable_traits<const pointer>::value_type   , double>);
  static_assert(std::same_as<std::indirectly_readable_traits<vec_iterator>::value_type    , int>);
  static_assert(std::same_as<std::indirectly_readable_traits<std::vector<int>>::value_type, int>);
  static_assert(std::same_as<std::indirectly_readable_traits<have_value>::value_type      , int>);
  static_assert(std::same_as<std::indirectly_readable_traits<have_element>::value_type    , int>);
}
```
* std::indirectly_readable_traits[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 10.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 6 [mark verified]

## 関連項目

- [`iter_value_t`](iter_value_t.md)

## 参照

- [P0896R4 The One Ranges Proposal (was Merging the Ranges TS)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)
- [LWG Issue 3446. `indirectly_readable_traits` ambiguity for types with both `value_type` and `element_type`](https://cplusplus.github.io/LWG/issue3446)
