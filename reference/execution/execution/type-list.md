# type-list
* execution[meta header]
* class template[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
template<class... Ts>
struct type-list;  // exposition only
```

## 備考
`type-list`は、実行制御ライブラリの仕様定義で用いられる説明専用のクラステンプレートである。


## バージョン
### 言語
- C++26


## 関連項目
- [`execution::sends_stopped`](sends_stopped.md)
- [`execution::transform_completion_signatures`](transform_completion_signatures.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
