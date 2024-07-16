# iterator
* ranges[meta header]
* std::ranges[meta namespace]
* repeat_view[meta class]
* class template[meta id-type]
* cpp23[meta cpp]

## 概要

[`repeat_view`](../repeat_view.md)のイテレータ。

このクラスの名前は規定されておらず、振る舞いのみが規定されている。

このクラスの型を取得したい場合、[`iterator_t`](../iterator_t.md)を使用できる。


## 実装例

```cpp
namespace std::ranges {
  template<move_constructible T, semiregular Bound = unreachable_sentinel_t>
    requires (is_object_v<T> && same_as<T, remove_cv_t<T>> &&
              (is-integer-like<Bound> || same_as<Bound, unreachable_sentinel_t>))
  class repeat_view<T, Bound>::iterator {
  private:
    using index_type = conditional_t<same_as<Bound, unreachable_sentinel_t>, ptrdiff_t, Bound>;
    const T* value_ = nullptr;
    index_type current_ = index_type();

    constexpr explicit iterator(const T* value, index_type b = index_type())
      : value_{value}
      , current_{b}
    {
    }

  public:
    using iterator_concept = random_access_iterator_tag;
    using iterator_category = random_access_iterator_tag;
    using value_type = T;
    using difference_type = conditional_t<is-signed-integer-like<index_type>,
        index_type,
        iota_diff_t(index_type)>;

    iterator() = default;

    constexpr const T& operator*() const noexcept {
      return *value_;
    }

    constexpr iterator& operator++() {
      ++current_;
      return *this;
    }
    constexpr iterator operator++(int) {
      auto tmp = *this;
      ++*this;
      return tmp;
    }

    constexpr iterator& operator--() {
      --current_;
      return *this;
    }
    constexpr iterator operator--(int) {
      auto tmp = *this;
      --*this;
      return tmp;
    }

    constexpr iterator& operator+=(difference_type n) {
      current_ += n;
      return *this;
    }
    constexpr iterator& operator-=(difference_type n) {
      current_ -= n;
      return *this;
    }
    constexpr const T& operator[](difference_type n) const noexcept {
      return *(*this + n);
    }

    friend constexpr bool operator==(const iterator& x, const iterator& y) {
      return x.current_ == y.current_;
    }
    friend constexpr auto operator<=>(const iterator& x, const iterator& y) {
      return x.current_ <=> y.current_;
    }

    friend constexpr iterator operator+(iterator i, difference_type n) {
      i += n;
      return i;
    }
    friend constexpr iterator operator+(difference_type n, iterator i) {
      i += n;
      return i;
    }

    friend constexpr iterator operator-(iterator i, difference_type n) {
      i -= n;
      return i;
    }
    friend constexpr difference_type operator-(const iterator& x, const iterator& y) {
      return static_cast<difference_type>(x.current_) - static_cast<difference_type>(y.current_);
    }
  };
}
```
* move_constructible[link /reference/concepts/move_constructible.md]
* semiregular[link /reference/concepts/semiregular.md]
* unreachable_sentinel_t[link /reference/iterator/unreachable_sentinel_t.md]
* is_object_v[link /reference/type_traits/is_object.md]
* same_as[link /reference/concepts/same_as.md]
* remove_cv_t[link /reference/type_traits/remove_cv.md]
* is-integer-like[link /reference/iterator/is_integer_like.md]
* repeat_view[link ../repeat_view.md]
* conditional_t[link /reference/type_traits/conditional.md]
* ptrdiff_t[link /reference/cstddef/ptrdiff_t.md]
* random_access_iterator_tag[link /reference/iterator/iterator_tag.md]
* is-signed-integer-like[link /reference/iterator/is_integer_like.md]
* iota_diff_t[link /reference/ranges/iota_view/iota_diff_t.md]

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ?
- [GCC](/implementation.md#gcc): ?
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): ?

## 参照
- [N4950 26 Ranges library](https://timsong-cpp.github.io/cppwp/n4950/ranges)
