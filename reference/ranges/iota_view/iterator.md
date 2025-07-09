# iterator
* ranges[meta header]
* std::ranges[meta namespace]
* iota_view[meta class]
* class template[meta id-type]
* cpp20[meta cpp]

## 概要

[`iota_view`](../iota_view.md)のイテレータ。

[`iota_view`](../iota_view.md)の要素型の値を1つ記憶していて、イテレータに対するインクリメントなどの演算は、そのまま内部の値への演算となる。

このクラスの名前は規定されておらず、振る舞いのみが規定されている。

このクラスの型を取得したい場合、[`iterator_t`](../iterator_t.md)を使用できる。


## 実装例

```cpp
namespace std::ranges {

  inline namespace details {
    template<class I>
    concept decrementable =
      incrementable<I> && requires(I i) {
        { --i } -> same_as<I&>;
        { i-- } -> same_as<I>;
      };

    template<class I>
    concept advanceable =
      decrementable<I> && totally_ordered<I> &&
      requires(I i, const I j, const iota_diff_t<I> n) {
        { i += n } -> same_as<I&>;
        { i -= n } -> same_as<I&>;
        I(j + n);
        I(n + j);
        I(j - n);
        { j - j } -> convertible_to<iota_diff_t<I>>;
      };

    template<class W>
    constexpr auto get_iota_view_iterator_concept() {
      if constexpr (advanceable<W>) {
        return random_access_iterator_tag{};
      } else if constexpr (decrementable<W>) {
        return bidirectional_iterator_tag{};
      } else if constexpr (incrementable<W>) {
        return forward_iterator_tag{};
      } else {
        return input_iterator_tag{};
      }
    }
  }

  template<weakly_incrementable W, semiregular Bound>
    requires weakly-equality-comparable-with<W, Bound>
  struct iota_view<W, Bound>::iterator {
  private:
    W value_ = W();
  public:
    using iterator_concept = decltype(get_iota_view_iterator_concept());
    using iterator_category = input_iterator_tag;
    using value_type = W;
    using difference_type = iota_diff_t<W>;

    iterator() = default;
    constexpr explicit iterator(W value) : value_(value) {
    }

    constexpr W operator*() const noexcept(is_nothrow_copy_constructible_v<W>) {
      return value_;
    }

    constexpr iterator& operator++() {
      ++value_;
      return *this;
    }

    constexpr void operator++(int) {
      ++*this;
    }

    constexpr iterator operator++(int) requires incrementable<W> {
      auto tmp = *this;
      ++*this;
      return tmp;
    }

    constexpr iterator& operator--() requires decrementable<W> {
      --value_;
      return *this;
    }

    constexpr iterator operator--(int) requires decrementable<W> {
      auto tmp = *this;
      --*this;
      return tmp;
    }

    constexpr iterator& operator+=(difference_type n) requires advanceable<W> {
      if constexpr (is-integer-like<W> && !is-signed-integer-like<W>) {
        if (n >= difference_type(0))
          value_ += static_cast<W>(n);
        else
          value_ -= static_cast<W>(-n);
      } else {
        value_ += n;
      }
      return *this;
    }

    constexpr iterator& operator-=(difference_type n) requires advanceable<W> {
      if constexpr (is-integer-like<W> && !is-signed-integer-like<W>) {
        if (n >= difference_type(0))
          value_ -= static_cast<W>(n);
        else
          value_ += static_cast<W>(-n);
      } else {
        value_ -= n;
      }
      return *this;
    }

    constexpr W operator[](difference_type n) const requires advanceable<W> {
      return W(value_ + n);
    }

    friend constexpr bool operator==(const iterator& x, const iterator& y) requires equality_comparable<W> {
      return x.value_ == y.value_;
    }

    friend constexpr bool operator<(const iterator& x, const iterator& y) requires totally_ordered<W> {
      return x.value_ < y.value_;
    }

    friend constexpr bool operator>(const iterator& x, const iterator& y) requires totally_ordered<W> {
      return return y < x;
    }

    friend constexpr bool operator<=(const iterator& x, const iterator& y) requires totally_ordered<W> {
      return !(y < x);
    }

    friend constexpr bool operator>=(const iterator& x, const iterator& y) requires totally_ordered<W> {
      return !(x < y);
    }

    friend constexpr auto operator<=>(const iterator& x, const iterator& y) requires totally_ordered<W> && three_way_comparable<W> {
      return x.value_ <=> y.value_;
    }

    friend constexpr iterator operator+(iterator i, difference_type n) requires advanceable<W> {
      return i += n;
    }

    friend constexpr iterator operator+(difference_type n, iterator i) requires advanceable<W> {
      return i + n;
    }

    friend constexpr iterator operator-(iterator i, difference_type n) requires advanceable<W> {
      return i -= n;
    }

    friend constexpr difference_type operator-(const iterator& x, const iterator& y) requires advanceable<W> {
      using D = difference_type;
      if constexpr (is-integer-like<W>) {
        if constexpr (is-signed-integer-like<W>) {
          return D(D(x.value_) - D(y.value_));
        } else {
          return (y.value_ > x.value_)
            ? D(-D(y.value_ - x.value_))
            : D(x.value_ - y.value_);
        }
      } else {
        return x.value_ - y.value_;
      }
    }
  };
}
```
* iota_diff_t[link iota_diff_t.md]
* iota_view[link ../iota_view.md]
* is-integer-like[link /reference/iterator/is_integer_like.md]
* is-signed-integer-like[link /reference/iterator/is_integer_like.md]
* weakly_incrementable[link /reference/iterator/weakly_incrementable.md]
* incrementable[link /reference/iterator/incrementable.md]
* semiregular[link /reference/concepts/semiregular.md]
* totally_ordered[link /reference/concepts/totally_ordered.md]
* is_nothrow_copy_constructible_v[link /reference/type_traits/is_nothrow_copy_constructible.md]
* weakly-equality-comparable-with[link /reference/concepts/equality_comparable.md]

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]

## 参照
- [N4861 24 Ranges library](https://timsong-cpp.github.io/cppwp/n4861/ranges)
- [C++20 ranges](https://techbookfest.org/product/5134506308665344)
