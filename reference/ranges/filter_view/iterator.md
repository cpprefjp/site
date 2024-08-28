# iterator
* ranges[meta header]
* std::ranges[meta namespace]
* filter_view[meta class]
* class template[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std::ranges {
  template<input_range V, indirect_unary_predicate<iterator_t<V>> Pred>
    requires view<V> && is_object_v<Pred>
  class filter_view<V, Pred>::iterator { …… };
}
```
* filter_view[link ../filter_view.md]

## 概要

[`filter_view`](../filter_view.md)のイテレータ。

このクラスの名前は規定されておらず、振る舞いのみが規定されている。

このクラスの型を取得したい場合、[`iterator_t`](../iterator_t.md)を使用できる。

このイテレータを通じて値を書き換える場合、その結果が述語の条件を満たさない場合は未定義動作となる。

## メンバ変数

| 名前                                                               | 説明                       | 対応バージョン |
|--------------------------------------------------------------------|----------------------------|----------------|
| [`iterator_t`](../iterator_t.md)`<V> current_ = iterator_t<V>();`  | 元のイテレータ(説明専用)   | C++20          |
| [`filter_view`](../filter_view.md)`* parent_ = nullptr;`           | 参照先のRange(説明専用)    | C++20          |

## メンバ関数

| 名前                                           | 説明                           | 対応バージョン |
|------------------------------------------------|--------------------------------|----------------|
| [`(constructor)`](iterator/op_constructor.md)  | コンストラクタ                 | C++20          |
| [`base`](iterator/base.md)                     | 元のイテレータを取得する       | C++20          |
| [`operator*`](iterator/op_deref.md)            | 間接参照演算子                 | C++20          |
| [`operator->`](iterator/op_arrow.md)           | メンバアクセス演算子           | C++20          |
| [`operator++`](iterator/op_increment.md)       | イテレータをインクリメントする | C++20          |
| [`operator--`](iterator/op_decrement.md)       | イテレータをデクリメントする   | C++20          |

## メンバ型

| 名前                                                 | 説明                                                     | 対応バージョン |
|------------------------------------------------------|----------------------------------------------------------|----------------|
| [`iterator_concept`](iterator/iterator_concept.md.nolink)   | イテレータコンセプト                                     | C++20          |
| [`iterator_category`](iterator/iterator_category.md.nolink) | イテレータカテゴリ                                       | C++20          |
| `value_type`                                         | [`range_value_t<V>`](../range_value_t.md)                | C++20          |
| `difference_type`                                    | [`range_difference_t<V>`](../range_difference_t.md)      | C++20          |

## 非メンバ（*Hidden friends*）関数

| 名前                                     | 説明                   | 対応バージョン |
|------------------------------------------|------------------------|----------------|
| [`iter_move`](iterator/iter_move.md.nolink)     | イテレータの要素の移動 | C++20          |
| [`iter_swap`](iterator/iter_swap.md.nolink)     | イテレータの要素の交換 | C++20          |

### 比較演算子

| 名前                                 | 説明                            | 対応バージョン |
|--------------------------------------|---------------------------------|----------------|
| [`operator==`](iterator/op_equal.md) | 等値比較                        | C++20          |
| `operator!=`                         | 非等値比較 (`==`により使用可能) | C++20          |

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]

## 参照
- [N4861 24.7.4 Filter view](https://timsong-cpp.github.io/cppwp/n4861/range.filter)
- [N4950 26.7.8 Filter view](https://timsong-cpp.github.io/cppwp/n4950/range.filter)
