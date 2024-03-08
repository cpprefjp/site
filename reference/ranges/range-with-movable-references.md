# range-with-movable-references
* ranges[meta header]
* concept[meta id-type]
* cpp23[meta cpp]

```cpp
template<class R>
  concept range-with-movable-references =                  // 説明専用コンセプト
    input_range<R> && move_constructible<range_reference_t<R>> &&
    move_constructible<range_rvalue_reference_t<R>>;
```

## 概要
`range-with-movable-references`は、型`R`が[`input_range`](input_range.md)であり、その要素の参照と右辺値参照がムーブ構築可能であることを表す説明専用コンセプトである。

## バージョン
### 言語
- C++23
