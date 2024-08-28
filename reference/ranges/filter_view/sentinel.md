# sentinel
* ranges[meta header]
* std::ranges[meta namespace]
* filter_view[meta class]
* class template[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std::ranges {
  template<input_range V, indirect_unary_predicate<sentinel_t<V>> Pred>
    requires view<V> && is_object_v<Pred>
  class filter_view<V, Pred>::sentinel { …… };
}
```
* filter_view[link ../filter_view.md]

## 概要

[`filter_view`](../filter_view.md)が[`common_range`](../common_range.md)でない場合のみ使用される番兵。

このクラスの名前は規定されておらず、振る舞いのみが規定されている。

このクラスの型を取得したい場合、[`sentinel_t`](../sentinel_t.md)を使用できる。

## メンバ変数

| 名前                                                               | 説明                       | 対応バージョン |
|--------------------------------------------------------------------|----------------------------|----------------|
| [`sentinel_t`](../sentinel_t.md)`<V> end_ = sentinel_t<V>();`      | 元の番兵(説明専用)         | C++20          |

## メンバ関数

| 名前                                           | 説明                 | 対応バージョン |
|------------------------------------------------|----------------------|----------------|
| [`(constructor)`](sentinel/op_constructor.md)  | コンストラクタ       | C++20          |
| [`base`](sentinel/base.md)                     | 元の番兵を取得する   | C++20          |

## 非メンバ（*Hidden friends*）関数

### 比較演算子

| 名前                                 | 説明                            | 対応バージョン |
|--------------------------------------|---------------------------------|----------------|
| [`operator==`](sentinel/op_equal.md) | 等値比較                        | C++20          |
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
