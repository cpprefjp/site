# incrementable_traits
* iterator[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {

  // プライマリテンプレート
  template<class>
  struct incrementable_traits {};

  // ポインタ型についての特殊化
  template<class T>
    requires is_object_v<T>
  struct incrementable_traits<T*> {
    using difference_type = ptrdiff_t;
  };

  // constを外すための特殊化
  template<class I>
  struct incrementable_traits<const I>
    : incrementable_traits<I> { };

  // difference_typeを定義している型についての特殊化
  template<class T>
    requires requires { typename T::difference_type; }
  struct incrementable_traits<T> {
    using difference_type = typename T::difference_type;
  };

  // difference_typeを定義していないが、差分を取ることができる型についての特殊化
  template<class T>
    requires (!requires { typename T::difference_type; } &&
              requires(const T& a, const T& b) { { a - b } -> integral; })
  struct incrementable_traits<T> {
    using difference_type = make_signed_t<decltype(declval<T>() - declval<T>())>;
  };
}
```
* is_object_v[link /reference/type_traits/is_object.md]
* integral[link /reference/concepts/integral.md]
* make_signed_t[link /reference/type_traits/make_signed.md]
* declval[link /reference/utility/declval.md]

## 概要

任意のイテレータ型からそのイテレータ間の差分（距離）を表す型（`difference_type`）を取得する、あるいは[`iter_difference_t`](iter_difference_t.md)で取得できるようにするためにアダプトする。

## 効果

上記定義のいずれかの形式、あるいはそれ以外の明示的特殊化を通して得られるイテレータの差分型を、メンバ型`::difference_type`として定義する。

## 特殊化

このクラスは任意のプログラム定義型について特殊化することが許可されている。

また、標準ライブラリ内のいくつかのクラスに対して予め特殊化が用意されている。

- [`projected`](projected.md)
- [`common_iterator`](common_iterator.md)
- [`counted_iterator`](counted_iterator.md)

## 備考

イテレータの差分型を求める場合はこのクラスの代わりに[`iter_difference_t`](iter_difference_t.md)を使用することを推奨する（より汎用的であるため）。その場合、このクラスは自作のイテレータ型を`iter_difference_t`にアダプトするために使用できる。

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


struct have_difference : sample_iterator {
  using difference_type = unsigned short;
};

struct can_difference : sample_iterator {
  friend auto operator-(const can_difference& lhs, const can_difference& rhs) -> char {
    return lhs.index - rhs.index;
  }
};

int main() {
  using vec_iterator = std::vector<int>::iterator;
  using pointer = double*;

  static_assert(std::same_as<std::incrementable_traits<pointer>::difference_type         , std::ptrdiff_t>);
  static_assert(std::same_as<std::incrementable_traits<const pointer>::difference_type   , std::ptrdiff_t>);
  static_assert(std::same_as<std::incrementable_traits<vec_iterator>::difference_type    , std::ptrdiff_t>);
  static_assert(std::same_as<std::incrementable_traits<std::vector<int>>::difference_type, std::ptrdiff_t>);
  static_assert(std::same_as<std::incrementable_traits<have_difference>::difference_type , unsigned short>);
  static_assert(std::same_as<std::incrementable_traits<can_difference>::difference_type  , signed char>); // この結果は処理系によって異なる可能性がある
}
```
* std::incrementable_traits[color ff0000]

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

- [`iter_difference_t`](iter_difference_t.md)

## 参照

- [P0896R4 The One Ranges Proposal (was Merging the Ranges TS)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)
