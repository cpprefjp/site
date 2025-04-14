# queryable
* execution[meta header]
* concept[meta id-type]
* std[meta namespace]
* cpp26[meta cpp]

```cpp
template<class T>
concept queryable = destructible<T>;
```
* destructible[link /reference/concepts/destructible.md]

## 概要
`queryable`は、型`T`がクエリ可能オブジェクトの制約を満たすことを表す説明専用のコンセプトである。


## モデル
説明用の`env`を`Env`型のオブジェクトとする。
呼び出し可能オブジェクト`q`と部分式パック`args`に対して、`requires { q(env, args...) }`が`true`であれば、`q(env, args...)`が`q`に課されるセマンティック要件を満たす場合に、`Env`は`queryable`のモデルである。


## バージョン
### 言語
- C++26


## 関連項目
- [`execution::prop`](execution/prop.md)
- [`execution::env`](execution/env.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
