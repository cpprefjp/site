# operator->
* ranges[meta header]
* std::ranges[meta namespace]
* filter_view::iterator[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr iterator_t<V> operator->() const requires has-arrow<iterator_t<V>> && copyable<iterator_t<V>>;
```
* copyable[link /reference/concepts/copyable.md]

## 概要

イテレータを通じてオブジェクトにアクセスする。

## テンプレートパラメータ制約

元のイテレータがコピー可能であり、アロー演算子を持つこと。

## 効果

`return current_;` と等しい

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
