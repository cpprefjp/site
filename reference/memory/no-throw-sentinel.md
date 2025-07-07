# no-throw-sentinel
* memory[meta header]
* std[meta namespace]
* concept[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class S, class I>
  concept no-throw-sentinel = sentinel_for<S, I>;
}
```

## 概要
`no-throw-sentinel`は、以下の操作で例外を投げない、型`S`がイテレータ型`I`の番兵（*sentinel*）型であることを表す説明用コンセプトである。

- コピー構築
- ムーブ構築
- コピー代入
- ムーブ代入
- 比較


## 備考
- このコンセプトは[`sentinel_for`](/reference/iterator/sentinel_for.md)のいくつかの操作で例外を投げることを許可する
- このコンセプトは、[`std::vector`](/reference/vector/vector.md)`<bool>`のイテレータのような、プロキシオブジェクトを指すイテレータを除外する


## 参照
- [P0896R4 The One Ranges Proposal (was Merging the Ranges TS)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)
