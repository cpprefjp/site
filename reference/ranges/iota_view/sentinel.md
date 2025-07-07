# sentinel
* ranges[meta header]
* std::ranges[meta namespace]
* iota_view[meta class]
* class template[meta id-type]
* cpp20[meta cpp]

## 概要

[`iota_view`](../iota_view.md)が有限長かつ[`common_range`](../common_range.md)ではない場合の番兵型。

[`iota_view`](../iota_view.md)の終端要素型の値を1つ記憶していて、比較演算は内部の値同士の比較となる。

このクラスの名前は規定されておらず、振る舞いのみが規定されている。

このクラスの型を取得したい場合、[`sentinel_t`](../iterator_t.md)を使用できる。

なお、[`iota_view`](../iota_view.md)の番兵型は、無限長のときは[`unreachable_sentinel_t`](/reference/iterator/unreachable_sentinel_t.md)、有限長で[`common_range`](../common_range.md)のときは[`iterator`](iterator.md)である。

## 実装例

```cpp
namespace std::ranges {
  template<weakly_incrementable W, semiregular Bound>
    requires weakly-equality-comparable-with<W, Bound>
  struct iota_view<W, Bound>::sentinel {
  private:
    Bound bound_ = Bound();
  public:
    sentinel() = default;
    constexpr explicit sentinel(Bound bound): bound_{bound} {
    }

    friend constexpr bool operator==(const iterator& x, const sentinel& y) {
      return x.value_ == y.bound_;
    }

    friend constexpr iter_difference_t<W> operator-(const iterator& x, const sentinel& y) requires sized_sentinel_for<Bound, W> {
      return x.value_ - y.bound_;
    }

    friend constexpr iter_difference_t<W> operator-(const sentinel& x, const iterator& y) requires sized_sentinel_for<Bound, W> {
      return -(y - x);
    }
  };
}
```
* iterator[link iterator.md]
* iota_view[link ../iota_view.md]
* weakly_incrementable[link /reference/iterator/weakly_incrementable.md]
* sized_sentinel_for[link /reference/iterator/sized_sentinel_for.md]
* semiregular[link /reference/concepts/semiregular.md]
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
