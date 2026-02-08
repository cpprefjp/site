# run-loop-opstate
* [meta exposition-only]
* execution[meta header]
* std::execution[meta namespace]
* run_loop[meta class]
* class template[meta id-type]
* cpp26[meta cpp]

```cpp
template<class Rcvr>
struct run-loop-opstate;
```

## 概要
`run-loop-opstate`は、[`run_loop`](../run_loop.md)動作説明で利用される説明専用のクラスである。


## クラス仕様
説明専用の基底クラス`run-loop-opstate-base`を下記の通り定義する。
`run-loop-opstate<Rcvr>`は、`run-loop-opstate-base`から曖昧さなくprivate継承したクラスである。

```cpp
struct run-loop-opstate-base {  // exposition only
  virtual void execute() = 0;   // exposition only
  run_loop* loop;               // exposition only
  run-loop-opstate-base* next;  // exposition only
};
```
* run_loop[link ../run_loop.md]

説明用の`o`を`run-loop-opstate<Rcvr>`型の非const左辺値、`REC(o)`を`o`を返す[接続(connect)](../connect.md)呼び出しへ渡した式`rcvr`で初期化された`Rcvr`型の非const左辺値参照とする。

- `REC(o)`が参照するオブジェクトは、`o`が参照するオブジェクトの生存期間(lifetime)で有効である。
- 型`run-loop-opstate<Rcvr>`は`run-loop-opstate-base::execute()`をオーバーライドし、式`o.execute()`は下記と等価 :

    ```cpp
    if (get_stop_token(REC(o)).stop_requested()) {
      set_stopped(std::move(REC(o)));
    } else {
      set_value(std::move(REC(o)));
    }
    ```
    * get_stop_token[link ../../get_stop_token.md]
    * set_stopped[link ../set_stopped.md]
    * set_value[link ../set_value.md]
    * std::move[link /reference/utility/move.md]

- 式`start(o)`は下記と等価 :

    ```cpp
    try {
      o.loop->push-back(addressof(o));
    } catch(...) {
      set_error(std::move(REC(o)), current_exception());
    }
    ```
    * push-back[link run.md]
    * set_error[link ../set_error.md]
    * std::move[link /reference/utility/move.md]
    * current_exception()[link /reference/exception/current_exception.md]


## バージョン
### 言語
- C++26


## 関連項目
- [`run`](run.md)
- [`execution::connect`](../connect.md)
- [`execution::start`](../start.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
