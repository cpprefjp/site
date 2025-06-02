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


### クエリ可能オブジェクト(queryable object)
クエリ可能オブジェクトは、クエリオブジェクトをキーとして対応する値を保持する、読み取り専用のKey/Valueデータ構造とみなせる。

- [`execution::env<>{}`](execution/env.md) : 空のクエリ可能オブジェクト
- [`execution::prop(q, v)`](execution/prop.md) : キー`q`と対応値`v`を保持する最小のクエリ可能オブジェクト
- [`execution::env{...}`](execution/env.md) : 複数のKey/Valueを保持するクエリ可能オブジェクト
- `queryable`コンセプトを満たすユーザ定義クラスのオブジェクト

実行制御ライブラリでは、下記のオブジェクトがクエリ可能オブジェクトとされる。

- [Sender](execution/sender.md)に関連付けられた属性(attributes)オブジェクト（[`execution::get_env`](execution/get_env.md)で取得）
- [Receiver](execution/receiver.md)に関連付けられた環境(environment)オブジェクト（[`execution::get_env`](execution/get_env.md)で取得）
- [Scheduler](execution/scheduler.md)オブジェクト自身


### クエリオブジェクト(query object)
クエリオブジェクトは、クエリ可能オブジェクトに対する問い合わせ(query)を行うカスタマイゼーションポイントオブジェクトである。

説明用のクエリオブジェクト`q`、クエリ可能オブジェクト`env`、引数パック`args`としたとき

- 問い合わせ式`q(env, args...)`は、`void`型であってはならない。
- 問い合わせ式`q(env, args...)`は、クエリオブジェクトや引数を変更せず、等しさを保持(equality-preserving)する。
- 式`env.query(q, args...)`が適格であれば、問い合わせ式`q(env, args...)`と等価である。


## モデル
説明用の`env`を`Env`型のオブジェクトとする。
呼び出し可能オブジェクト`q`と部分式パック`args`に対して、`requires { q(env, args...) }`が`true`であれば、`q(env, args...)`が`q`に課されるセマンティック要件を満たす場合に、`Env`は`queryable`のモデルである。


## 説明専用エンティティ
### 式`MAKE-ENV`
説明用のクエリオブジェクト`q`と式`v`に対して、式`MAKE-ENV(q, v)`は`queryable`を満たす型の式`env`となり、下記を満たす。

- `env.query(q)`の結果が`v`と等しい。
- 明に規定されない限り、`env`が有効の間は`env.query(q)`のオブジェクトも有効である。

### 式`JOIN-ENV`
説明用のクエリ可能オブジェクト`env1`, `env2`、クエリオブジェクト`q`、パック式`as`に対して、式`JOIN-ENV(env1, env2)`は`queryable`を満たす型の式`env3`となり、式`env3.query(q, as...)`は下記と等価である。

- 適格であるならば、式`env1.query(q, as...)`
- そうではなく、適格であるならば、式`env2.query(q, as...)`
- そうでなければ、式`env3.query(q, as...)`は不適格


## 備考
[Sender](execution/sender.md)に関連付けられたクエリ可能オブジェクトは「属性(attributes)」と呼ばれるが、実行制御ライブラリの仕様記述では[Receiver](execution/receiver.md)の「環境(environment)」と合わせて`Env`型や識別子名`env`として包括的に言及される。


## バージョン
### 言語
- C++26


## 関連項目
- [`execution::prop`](execution/prop.md)
- [`execution::env`](execution/env.md)
- [`execution::get_env`](execution/get_env.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
