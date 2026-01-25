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
  };
}
```

## 概要
契約違反をどのように評価するかを表す列挙型。

これの他に、処理系定義のものを定めてもよい。

### 列挙子

| 列挙子 | 値 | 説明 |
|--------|-----|------|
| `ignore` | 1 | 述語を評価しない |
| `observe` | 2 | 述語を評価し、違反時にハンドラを呼ぶが、実行を継続する |
| `enforce` | 3 | 述語を評価し、違反時にハンドラを呼び、その後プログラムを終了する |
| `quick_enforce` | 4 | 述語を評価し、違反時にハンドラを呼ばずにプログラムを終了する |

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ?
- [GCC](/implementation.md#gcc): ?
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): ?

## 関連項目
- [契約プログラミング](/lang/cpp26/contracts.md)

## 参照
- [P2900R14 Contracts for C++](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2900r14.pdf)
