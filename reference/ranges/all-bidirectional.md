# all-bidirectional
* [meta exposition-only]
* ranges[meta header]
* concept[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::ranges {
  template<bool Const, class... Views>
  concept all-bidirectional = (bidirectional_range<maybe-const<Const, Views>> && ...);
}
```

## 概要

`all-bidirectional` は、複数のビューに対し、それらすべてが [`bidirectional_range`](bidirectional_range.md) であることを表す説明専用のコンセプトである。

## バージョン
### 言語
- C++26

## 参照
- [26.7.5 Range adaptor helpers](https://eel.is/c++draft/range.adaptor.helpers)
