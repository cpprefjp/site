# reference
* iterator[meta header]
* std[meta namespace]
* move_iterator[meta class]
* type-alias[meta id-type]
* cpp11[meta cpp]

```cpp
using difference_type = value_type&&;                      // (1) C++11
using difference_type = iter_rvalue_reference_t<Iterator>; // (1) C++20
```

## 概要
イテレータを間接参照する型。


## バージョン
### 言語
- C++11

## 参照
- [P0896R4 The One Ranges Proposal (was Merging the Ranges TS)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)
