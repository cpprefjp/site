# sized-random-access-range
* ranges[meta header]
* concept[meta id-type]
* std::ranges[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::ranges {
  template<class R>
  concept sized-random-access-range =
    random_access_range<R> && sized_range<R>;
}
```
* random_access_range[link random_access_range.md]
* sized_range[link sized_range.md]

## 概要
`sized-random-access-range`は、範囲`R`が[`random_access_range`](random_access_range.md)かつ[`sized_range`](sized_range.md)であることを表す説明専用のコンセプトである。

このコンセプトは、並列Rangeアルゴリズムのテンプレートパラメータ制約として使用される。並列アルゴリズムでは、範囲のサイズが既知であり、かつランダムアクセスが可能である必要がある。

## バージョン
### 言語
- C++26

## 参照
- [P3179R9 C++ parallel range algorithms](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3179r9.html)
