# deferrence_type
* iterator[meta header]
* std[meta namespace]
* move_iterator[meta class]
* type-alias[meta id-type]
* cpp11[meta cpp]

```cpp
using difference_type = iterator_traits<Iterator>::difference_type; // (1) C++11
using difference_type = iter_difference_t<Iterator>;                // (1) C++20
```

## 概要
イテレータの差を表す型。


## バージョン
### 言語
- C++11

## 参照
- [P0896R4 The One Ranges Proposal (was Merging the Ranges TS)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)
