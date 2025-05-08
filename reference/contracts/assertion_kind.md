# assertion_kind
* contracts[meta header]
* std::contracts[meta namespace]
* enum[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::contracts {
  enum class assertion_kind : unspecified {
    pre = 1,
    post = 2,
    assertion = 3
  }
}
```

## 概要
違反した可能性のある契約の種類を表す列挙型。

これの他に、処理系依存のものを定めてもよい。

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
