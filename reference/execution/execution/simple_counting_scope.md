# simple_counting_scope
* execution[meta header]
* class[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  class simple_counting_scope;
}
```

## 概要
`simple_counting_scope`は、カウント式の非同期スコープを表現する。


## クラス仕様
`simple_counting_scope`型と[`counting_scope`](counting_scope.md)型による非同期スコープは関連付けカウントを管理する。

クラス動作説明用のメンバ変数として下記を保持する。

- `count` : `size_t`型の関連付けカウント値
- `state` : `scope-state-type`列挙型（後述）の状態


### 状態遷移
説明専用の各種エンティティを下記の通り定義する。

- `Scope`型 : `simple_counting_scope`または`counting_scope`のいずれか
- `scope`オブジェクト : `Scope`型のオブジェクト
- `tkn`オブジェクト : `scope.get_token()`が返す`Scope::token`型のオブジェクト
- `jsndr` : `scope.join()`が返す[Sender](sender.md)
- `op` : `jsndr`を[Receiver](receiver.md)と接続して得られる[Operation State](operation_state.md)

```cpp
enum scope-state-type {  // exposition only
  unused,                // exposition only
  open,                  // exposition only
  closed,                // exposition only
  open-and-joining,      // exposition only
  closed-and-joining,    // exposition only
  unused-and-closed,     // exposition only
  joined,                // exposition only
};
```

`scope`はその生存期間中にさまざまな状態をとり、各状態で許可される操作とその結果を決定する：

- `unused` : 新しく構築されたオブジェクトは`unused`状態で開始する。
- `open` : `scope`が`unused`状態にあるとき`tkn.try_associate()`が呼び出されると、`scope`は`open`状態に遷移する。
- `open-and-joining` : `scope`が`unused`または`open`状態にあるとき[Operation State](operation_state.md)`op`が[開始(start)](start.md)されると、`scope`は`open-and-joining`状態に遷移する。
- `closed` : `scope`が`open`状態にあるとき`scope.close()`が呼び出されると、`scope`は`closed`状態に遷移する。
- `unused-and-closed` : `scope`が`unused`状態にあるとき`scope.close()`が呼び出されると、`scope`は`unused-and-closed`状態に遷移する。
- `closed-and-joining` : `scope`が`open-and-joining`状態にあるとき`scope.close()`が呼び出される、もしくは`scope`が`closed`または`unused-and-closed`状態にあるとき[Operation State](operation_state.md)`op`が[開始(start)](start.md)されると、`scope`は`closed-and-joining`状態に遷移する。
- `joined` : `scope`が`open-and-joining`または`closed-and-joining`状態にあるとき関連付けカウントがゼロに到達すると、`scope`は`joined`状態に遷移する。


### Senderアルゴリズムタグ `scope-join-t`
説明専用の[Senderアルゴリズムタグ型](tag_of_t.md)`scope-join-t`を定義する。

```cpp
struct scope-join-t {};  // exposition only
```

Senderアルゴリズム動作説明用のクラステンプレート[`impls-for`](impls-for.md)に対して、下記の特殊化が定義される。

```cpp
namespace std::execution {
  template<>
  struct impls-for<scope-join-t> : default-impls {
    template<class Scope, class Rcvr>
    struct state {                          // exposition only
      struct rcvr-t {                       // exposition only
        using receiver_concept = receiver_t;

        Rcvr& rcvr;                         // exposition only

        void set_value() && noexcept {
          execution::set_value(std::move(rcvr));
        }

        template<class E>
          void set_error(E&& e) && noexcept {
            execution::set_error(std::move(rcvr), std::forward<E>(e));
          }

        void set_stopped() && noexcept {
          execution::set_stopped(std::move(rcvr));
        }

        decltype(auto) get_env() const noexcept {
          return execution::get_env(rcvr);
        }
      };

      using sched-sender =                  // exposition only
        decltype(schedule(get_scheduler(get_env(declval<Rcvr&>()))));
      using op-t =                          // exposition only
        connect_result_t<sched-sender, rcvr-t>;

      Scope* scope;                         // exposition only
      Rcvr& receiver;                       // exposition only
      op-t op;                              // exposition only

      state(Scope* scope, Rcvr& rcvr)       // exposition only
        noexcept(nothrow-callable<connect_t, sched-sender, rcvr-t>)
        : scope(scope),
          receiver(rcvr),
          op(connect(schedule(get_scheduler(get_env(rcvr))), rcvr-t(rcvr))) {}

      void complete() noexcept {            // exposition only
        start(op);
      }

      void complete-inline() noexcept {     // exposition only
        set_value(std::move(receiver));
      }
    };

    static constexpr auto get-state =       // exposition only
      []<class Rcvr>(auto&& sender, Rcvr& receiver)
        noexcept(is_nothrow_constructible_v<state<Rcvr>, data-type<decltype(sender)>, Rcvr&>) {
        auto[_, self] = sender;
        return state(self, receiver);
      };

    static constexpr auto start =           // exposition only
      [](auto& s, auto&) noexcept {
        if (s.scope->start-join-sender(s))
          s.complete-inline();
      };
  };
}
```
* impls-for[link impls-for.md]
* default-impls[link impls-for.md]
* receiver_t[link receiver.md]
* execution::set_value[link set_value.md]
* execution::set_error[link set_error.md]
* execution::set_stopped[link set_stopped.md]
* execution::get_env[link get_env.md]
* schedule[link schedule.md]
* get_scheduler[link get_scheduler.md]
* connect_result_t[link connect_result_t.md]
* connect_t[link connect.md]
* connect[link connect.md]
* start[link start.md]
* data-type[link data-type.md]
* nothrow-callable[link /reference/functional/nothrow-callable.md]
* is_nothrow_constructible_v[link /reference/type_traits/is_nothrow_constructible.md]
* std::move[link /reference/utility/move.md]


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`(constructor)`](simple_counting_scope/op_constructor.md.nolink) | コンストラクタ | C++26 |
| [`(destructor)`](simple_counting_scope/op_destructor.md.nolink) | デストラクタ | C++26 |
| [`get_token`](simple_counting_scope/get_token.md.nolink) | 非同期スコープトークンを取得 | C++26 |
| [`close`](simple_counting_scope/close.md.nolink) | 非同期スコープを閉じる | C++26 |
| [`join`](simple_counting_scope/join.md.nolink) | 非同期スコープを合流する[Sender](sender.md)取得 | C++26 |

### 説明専用メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`try-associate`](simple_counting_scope/try-associate.md.nolink) | 関連付けを試行 | C++26 |
| [`disassociate`](simple_counting_scope/disassociate.md.nolink) | 関連付けを解除| C++26 |
| [`start-join-sender`](simple_counting_scope/start-join-sender.md.nolink) | 合流[Sender](sender.md)を開始 | C++26 |

## メンバ型

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`token`](simple_counting_scope/token.md.nolink) | 非同期スコープトークン型 | C++26 |

## 静的メンバ変数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `constexpr size_t max_associations = implementation-defined;` | 関連付けの最大数 | C++26 |


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`execution::counting_scope`](counting_scope.md)


## 参照
- [P3149R11 `async_scope` - Creating scopes for non-sequential concurrency](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3149r11.html)
