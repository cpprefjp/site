# call-result-t
* functional[meta header]
* type-alias[meta id-type]
* std[meta namespace]
* cpp26[meta cpp]

```cpp
template<class Fn, class... Args>
using call-result-t = decltype(declval<Fn>()(declval<Args>()...));  // exposition only
```

## 概要
`call-result-t`は、`Fn`型オブジェクトを引数型リスト`Args...`で関数呼び出したときの戻り値型を取得する説明専用のエイリアステンプレートである。


## 備考
説明専用のエイリアステンプレート`call-result-t`は、[実行制御ライブラリ](/reference/execution/execution.md)の仕様定義のため導入された。


## バージョン
### 言語
- C++26


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
