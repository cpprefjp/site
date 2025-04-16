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
`queryable`は、型`T`がクエリ可能オブジェクト(queryable object)の制約を満たすことを表す説明専用のコンセプトである。


### クエリ可能オブジェクト
クエリ可能オブジェクトは、クエリオブジェクト(query object)をキーとして対応する値を保持する、読み取り専用のKey/Valueデータ構造とみなせる。

- [`execution::env<>{}`](execution/env.md) : 空(empty)のクエリ可能オブジェクト
- [`execution::prop(q, v)`](execution/prop.md) : キー`q`と対応値`v`を保持する最小のクエリ可能オブジェクト
- [`execution::env{...}`](execution/env.md) : 複数のKey/Valueを保持するクエリ可能オブジェクト
- `queryable`コンセプトを満たすユーザ定義クラスのオブジェクト

実行制御ライブラリでは、下記のオブジェクトがクエリ可能オブジェクトとされる。

- [Sender](execution/sender.md)に関連付けられた属性(attributes)オブジェクト
- [Receiver](execution/receiver.md)に関連付けられた環境(environment)オブジェクト
- [Scheduler](execution/scheduler.md)オブジェクト自身


## モデル
説明用の`env`を`Env`型のオブジェクトとする。
呼び出し可能オブジェクト`q`と部分式パック`args`に対して、`requires { q(env, args...) }`が`true`であれば、`q(env, args...)`が`q`に課されるセマンティック要件を満たす場合に、`Env`は`queryable`のモデルである。


## 備考
[Sender](execution/sender.md)に関連付けられたクエリ可能オブジェクトは、C++ライブラリ仕様では「属性(attributes)」と呼ばれる。


## バージョン
### 言語
- C++26


## 関連項目
- [`execution::prop`](execution/prop.md)
- [`execution::env`](execution/env.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
