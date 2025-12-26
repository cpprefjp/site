# detection_mode
* contracts[meta header]
* std::contracts[meta namespace]
* enum[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::contracts {
  enum class detection_mode : unspecified {
    predicate_false = 1,
    evaluation_exception = 2
  };
}
```

## 概要
契約違反がどのような仕組みでその違反が認識されたかを表す列挙型。

### 各列挙子の意味
| 列挙子 | 値 | 意味 |
|--------|-----|------|
| predicate_false | 1 | 契約の述語が評価され、falseを返す、もしくは評価をするとfalseを返す |
| evaluation_exception | 2 | 評価中に例外が投げられ、キャッチされずに逸脱した |

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ?
- [GCC](/implementation.md#gcc): ?
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): ?

## 関連項目
- [契約に基づくプログラミング](/lang/future/contract-based_programming.md)
- [契約プログラミング](/lang/cpp26/contracts.md)

## 参照
- [P2900R14 Contracts for C++](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2900r14.pdf)
