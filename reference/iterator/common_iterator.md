# common_iterator
* iterator[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<input_or_output_iterator I, sentinel_for<I> S>
    requires (!same_as<I, S> && copyable<I>)
  class common_iterator {

  private:
    variant<I, S> v_; // 説明専用メンバ変数
  };


  // incrementable_traitsにアダプトする
  template<class I, class S>
  struct incrementable_traits<common_iterator<I, S>> {
    using difference_type = iter_difference_t<I>;
  };

  // iterator_traitsにアダプトする
  template<input_iterator I, class S>
  struct iterator_traits<common_iterator<I, S>> {
    using iterator_concept = /*see below*/;
    using iterator_category = /*see below*/;  // 定義されない場合がある
    using value_type = iter_value_t<I>;
    using difference_type = iter_difference_t<I>;
    using pointer = /*see below*/;
    using reference = iter_reference_t<I>;
  };
}
```
* input_or_output_iterator[link /reference/iterator/input_or_output_iterator.md]
* copyable[link /reference/concepts/copyable.md]
* variant[link /reference/variant/variant.md]
* incrementable_traits[link /reference/iterator/incrementable_traits.md]
* iter_reference_t[link /reference/iterator/iter_reference_t.md]

## 概要
`common_iterator`は、イテレータ型と番兵型が異なる範囲についてそれぞれをラップして、同じ範囲を表しながらイテレータ型と番兵型を共通化させるためのイテレータ/番兵アダプタである。

同じ範囲についてのイテレータ/番兵を保持して、等値比較演算子を適切に実装することで共通化を行う。

## メンバ関数

| 名前 | 説明 | 対応バージョン |
|------------------------------------------------------|-------------|-------|
| [`(constructor)`](common_iterator/op_constructor.md) | コンストラクタ | C++20 |
| [`operator=`](common_iterator/op_assign.md)          | 代入演算子 | C++20 |
| [`operator*`](common_iterator/op_deref.md)           | 間接参照演算子 | C++20 |
| [`operator->`](common_iterator/op_arrow.md)          | メンバアクセス演算子 | C++20 |
| [`operator++`](common_iterator/op_increment.md)      | イテレータをインクリメントする | C++20 |

## 非メンバ（*Hidden friends*）関数

| 名前 | 説明 | 対応バージョン |
|------------------------------------------------------|-------------|-------|
| [`operator==`](common_iterator/op_equal.md)         | 等値比較 | C++20 |
| `operator!=`     | 非等値比較 (`==`により使用可能) | C++20 |
| [`operator-`](common_iterator/op_minus.md)          | 2つの`common_iterator`の差を求める | C++20 |
| [`iter_move`](common_iterator/iter_move.md)     | イテレータの要素の移動 | C++20 |
| [`iter_swap`](common_iterator/iter_swap.md)     | イテレータの要素の交換 | C++20 |

## `iterator_traits`の型

| 名前 | 説明 | 対応バージョン |
|------------------------------------------------------|-------------|-------|
| `iterator_concept` | [`forward_iterator_tag`](/reference/iterator/iterator_tag.md) <br/> ただし、`I`が[`forward_iterator`](/reference/iterator/forward_iterator.md)のモデルではない場合は[`input_iterator_tag`](/reference/iterator/iterator_tag.md) | C++20 |
| `iterator_category` | [`forward_iterator_tag`](/reference/iterator/iterator_tag.md) <br/> ただし、[`iterator_traits`](/reference/iterator/iterator_traits.md)`<I>::iterator_category`が[`derived_from`](/reference/concepts/derived_from.md)`<forward_iterator_tag>`のモデルではない場合は`input_iterator_tag` | C++20 |
| `value_type` | [`iter_value_t`](/reference/iterator/iter_value_t.md)`<I>` | C++20 |
| `difference_type` | [`iter_difference_t`](/reference/iterator/iter_difference_t.md)`<I>` | C++20 |
| `pointer` | `void` <br/> ただし、[`operator->`](common_iterator/op_arrow.md)が利用可能である場合はその戻り値型 | C++20 |
| `reference` | [`iter_reference_t`](/reference/iterator/iter_reference_t.md)`<I>`  | C++20 |

- `iterator_category`は`iter_difference_t<I>`が組み込みの整数型の場合にのみ定義される（[*integer-class*](/reference/iterator/is_integer_like.md)型の場合には定義されない）

## 例

```cpp example
#include <iostream>
#include <iterator>
#include <ranges>

// イテレータによって範囲の要素を出力する
// イテレータ型と番兵型が同一であることを前提とするレガシーな実装
template<typename I>
void iter_output(I it, I end) {
  for (;it != end; ++it) {
    std::cout << *it << std::endl;
  }
}

int main() {
  auto seq = std::views::iota(1) | std::views::take(5);

  // 範囲seqはイテレータ型と番兵型が異なっているためそのままだとエラー
  //iter_output(std::ranges::begin(seq), std::ranges::end(seq));

  // common_iteratorを通すことでイテレータ型と番兵型を合わせる
  using CI = std::common_iterator<std::ranges::iterator_t<decltype(seq)>, std::ranges::sentinel_t<decltype(seq)>>;

  auto it = CI{std::ranges::begin(seq)};
  auto end = CI{std::ranges::end(seq)};

  iter_output(it, end);
}
```
* std::common_iterator[color ff0000]
* views::iota[link /reference/ranges/iota_view.md]
* views::take[link /reference/ranges/take_view.md]

### 出力

```
1
2
3
4
5
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 10.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 9 [mark verified]

## 関連項目

- [`common_range`](/reference/ranges/common_range.md)
- [`common_view`](/reference/ranges/common_view.md)

## 参照
- [P0896R4 The One Ranges Proposal (was Merging the Ranges TS)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)
- [Hidden Friends - yohhoyの日記](https://yohhoy.hatenadiary.jp/entry/20190531/p1)
- [LWG Issue 3749. `common_iterator` should handle integer-class difference types](https://cplusplus.github.io/LWG/issue3749)
