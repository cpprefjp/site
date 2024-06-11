# subrange_kind
* ranges[meta header]
* std::range[meta namespace]
* enum[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  enum class subrange_kind : bool { unsized, sized };
}
```

## 概要
[`subrange`](subrange.md)の種類を表す列挙型。`sized`のとき、部分Rangeは[`sized_range`](sized_range.md)である。

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]

## 参照
- [N4861 24 Ranges library](https://timsong-cpp.github.io/cppwp/n4861/ranges)
- [C++20 ranges](https://techbookfest.org/product/5134506308665344)
