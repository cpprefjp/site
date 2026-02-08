# different-from
* [meta exposition-only]
* ranges[meta header]
* concept[meta id-type]
* cpp20[meta cpp]

```cpp
template<class T, class U>
  concept different-from = // 説明専用コンセプト
    !same_as<remove_cvref_t<T>, remove_cvref_t<U>>;
```

## 概要
`different-from`は、型`T`、`U`について`const`/`volatile`修飾を無視して、同じ型でないことを表す説明専用コンセプトである。


## 備考
N4885 までは`not-same-as`という名称だったが、実際には[`same_as`](/reference/concepts/same_as.md)の否定とは等価ではない（本説明専用コンセプトが`const`/`volatile`修飾を無視していることによる）ため、N4892（C++23 のドラフトの1つ）からは`different-from`という現行の名称に変更された。


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
