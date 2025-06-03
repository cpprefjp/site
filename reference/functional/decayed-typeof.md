# decayed-typeof
* functional[meta header]
* type-alias[meta id-type]
* std[meta namespace]
* cpp26[meta cpp]

```cpp
template<const auto& Tag>
using decayed-typeof = decltype(auto(Tag));  // exposition only
```

## 概要
`decayed-typeof`は、型`Tag`の[Decayed](/reference/type_traits/decay.md)結果型を取得する説明専用のエイリアステンプレートである。


## 備考
説明専用のエイリアステンプレート`decayed-typeof`は、[実行制御ライブラリ](/reference/execution/execution.md)の仕様定義のため導入された。


## バージョン
### 言語
- C++26


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
