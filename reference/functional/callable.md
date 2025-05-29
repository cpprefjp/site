# callable
* functional[meta header]
* concept[meta id-type]
* std[meta namespace]
* cpp26[meta cpp]

```cpp
template<class Fn, class... Args>
concept callable =  // exposition only
  requires (Fn&& fn, Args&&... args) {
    std::forward<Fn>(fn)(std::forward<Args>(args)...);
  };
```

## 概要
`callable`は、関数呼び出し式`fn(args...)`が適格であることを表す説明専用のコンセプトである。


## 備考
説明専用のコンセプト`callable`は、実行制御ライブラリの仕様定義のため導入された。


## バージョン
### 言語
- C++26


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
