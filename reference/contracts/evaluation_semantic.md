# evaluation_semantic
* contracts[meta header]
* std::contracts[meta namespace]
* enum[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::contracts {
  enum class evaluation_semantic : unspecified {
    ignore = 1,
    observe = 2,
    enforce = 3,
    quick_enforce = 4 // ,
    // assume = 5 <-- 将来追加予定
  }
}
```

## 概要
契約違反をどのように評価するかを表す列挙型。

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 未実装
- [GCC](/implementation.md#gcc): 未実装
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 未実装

## 関連項目
- [契約に基づくプログラミング](/lang/future/contract-based_programming.md)
- [契約プログラミング](/lang/cpp26/contracts.md)

## 参照
- [P0542R5 Support for contract based programming in C++](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0542r5.html)
