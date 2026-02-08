# has-arrow
* [meta exposition-only]
* ranges[meta header]
* concept[meta id-type]
* cpp20[meta cpp]

```cpp
template<class I>
  concept has-arrow = // 説明専用コンセプト
    input_iterator<I> && (is_pointer_v<I> || requires(I i) { i.operator->(); });
```
* is_pointer_v[link /reference/type_traits/is_pointer.md]

## 概要
`has-arrow`は、型`I`について[`std::input_iterator`](/reference/iterator/input_iterator.md)を満たす上で、アロー演算子が使用可能であることを表す説明専用コンセプトである。

C++20 のイテレータ定義であるコンセプトたちではアロー演算子を提供することを要求していないため、別途用意されていると考えられる。


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
