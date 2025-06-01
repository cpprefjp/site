# schedule_from
* execution[meta header]
* cpo[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  struct schedule_from_t { unspecified };
  inline constexpr schedule_from_t schedule_from{};
}
```
* unspecified[italic]

## 概要
`schedule_from`は、[Sender](sender.md)の完了に依存する作業を[Scheduler](scheduler.md)に関連付けられた実行リソースにスケジュールするSenderアダプタである。

`schedule_from`はユーザコードで利用されるものではなく、[`continues_on`](continues_on.md)Senderアルゴリズムの実装において利用される。


## 効果
説明用の式`sch`と`sndr`に対して、`decltype((sch))`が[`scheduler`](scheduler.md)を満たさない、もしくは`decltype((sndr))`が[`sender`](sender.md)を満たさないとき、呼び出し式`schedule_from(sch, sndr)`は不適格となる。

そうでなければ、呼び出し式`schedule_from(sch, sndr)`は`sch`が1回だけ評価されることを除いて、下記と等価。

```cpp
transform_sender(
  query-or-default(get_domain, sch, default_domain()),
  make-sender(schedule_from, sch, sndr))
```
* transform_sender[link transform_sender.md]
* query-or-default[link query-or-default.md.nolink]
* get_domain[link get_domain.md]
* default_domain()[link default_domain.md]
* make-sender[link make-sender.md]


### Senderアルゴリズムタグ `schedule_from`
Senderアルゴリズム動作説明用のクラステンプレート[`impls-for`](impls-for.md)に対して、下記の特殊化が定義される。

```cpp
namespace std::execution {
  template<>
  struct impls-for<schedule_from_t> : default-impls {
    static constexpr auto get-attrs = see below;
    static constexpr auto get-state = see below;
    static constexpr auto complete = see below;
  };
}
```
* impls-for[link impls-for.md]
* default-impls[link impls-for.md]
* see below[italic]

`impls-for<schedule_from_t>::get-attrs`メンバは、下記ラムダ式と等価な関数呼び出し可能なオブジェクトで初期化される。

```cpp
[](const auto& data, const auto& child) noexcept -> decltype(auto) {
  return JOIN-ENV(SCHED-ATTRS(data), FWD-ENV(get_env(child)));
}
```
* JOIN-ENV[link ../queryable.md]
* SCHED-ATTRS[link scheduler.md]
* FWD-ENV[link ../forwarding_query.md]
* get_env[link get_env.md]

`impls-for<schedule_from_t>::get-state`メンバは、下記ラムダ式と等価な関数呼び出し可能なオブジェクトで初期化される。

```cpp
[]<class Sndr, class Rcvr>(Sndr&& sndr, Rcvr& rcvr) noexcept(see below)
    requires sender_in<child-type<Sndr>, env_of_t<Rcvr>> {

  auto& [_, sch, child] = sndr;

  using sched_t = decltype(auto(sch));
  using variant_t = see below;
  using receiver_t = see below;
  using operation_t = connect_result_t<schedule_result_t<sched_t>, receiver_t>;
  constexpr bool nothrow = noexcept(connect(schedule(sch), receiver_t{nullptr}));

  struct state-type {
    Rcvr& rcvr;                 // exposition only
    variant_t async-result;     // exposition only
    operation_t op-state;       // exposition only

    explicit state-type(sched_t sch, Rcvr& rcvr) noexcept(nothrow)
      : rcvr(rcvr), op-state(connect(schedule(sch), receiver_t{this})) {}
  };

  return state-type{sch, rcvr};
}
```
* sender_in[link sender_in.md]
* child-type[link child-type.md]
* env_of_t[link env_of_t.md]
* connect_result_t[link connect_result_t.md]
* schedule_result_t[link schedule_result_t.md]
* connect[link connect.md]
* schedule[link schedule.md]
* see below[italic]

- ローカルクラス`state-type`のオブジェクトは[構造化束縛](/lang/cpp17/structured_bindings.md)における初期化子として利用できる。
- 説明用のパック`Sigs`を[`completion_signatures_of_t`](completion_signatures_of_t.md)`<`[`child-type`](child-type.md)`<Sndr>,` [`env_of_t`](env_of_t.md)`<Rcvr>>`による[`completion_signatures`](completion_signatures.md)特殊化のテンプレートパラメータと定義する。説明用のエイリアステンプレート`as-tuple<Tag(Args...)>`を[`decayed-tuple`](decayed-tuple.md)`<Args...>`と定義する。型`variant_t`は下記定義において重複削除した型となる。

    ```cpp
    variant<monostate, as-tuple<Sigs>...>
    ```
    * variant[link /reference/variant/variant.md]
    * monostate[link /reference/variant/monostate.md]

- `receiver_t`は説明専用クラス`receiver-type`のエイリアスとする。

`impls-for<schedule_from_t>::complete`メンバは、下記ラムダ式と等価な関数呼び出し可能なオブジェクトで初期化される。

```cpp
[]<class Tag, class... Args>(auto, auto& state, auto& rcvr, Tag, Args&&... args) noexcept
    -> void {
  using result_t = decayed-tuple<Tag, Args...>;
  constexpr bool nothrow = is_nothrow_constructible_v<result_t, Tag, Args...>;

  try {
    state.async-result.template emplace<result_t>(Tag(), std::forward<Args>(args)...);
  } catch (...) {
    if constexpr (!nothrow) {
      set_error(std::move(rcvr), current_exception());
      return;
    }
  }
  start(state.op-state);
};
```
* decayed-tuple[link decayed-tuple.md]
* set_error[link set_error.md]
* start[link start.md]
* is_nothrow_constructible_v[link /reference/type_traits/is_nothrow_constructible.md]
* template emplace[link /reference/variant/variant/emplace.md]
* current_exception()[link /reference/exception/current_exception.md]
* std::move[link /reference/utility/move.md]


## 説明専用エンティティ
説明専用のクラス`receiver-type`を下記の通り定義する。

```cpp
namespace std::execution {
  struct receiver-type {
    using receiver_concept = receiver_t;
    state-type* state;  // exposition only

    void set_value() && noexcept {
      visit(
        [this]<class Tuple>(Tuple& result) noexcept -> void {
          if constexpr (!same_as<monostate, Tuple>) {
            auto& [tag, ...args] = result;
            tag(std::move(state->rcvr), std::move(args)...);
          }
        },
        state->async-result);
    }

    template<class Error>
    void set_error(Error&& err) && noexcept {
      execution::set_error(std::move(state->rcvr), std::forward<Error>(err));
    }

    void set_stopped() && noexcept {
      execution::set_stopped(std::move(state->rcvr));
    }

    decltype(auto) get_env() const noexcept {
      return FWD-ENV(execution::get_env(state->rcvr));
    }
  };
}
```
* receiver_t[link receiver.md]
* execution::set_error[link set_error.md]
* execution::set_stopped[link set_stopped.md]
* execution::get_env[link get_env.md]
* FWD-ENV[link ../forwarding_query.md]
* visit[link /reference/variant/visit.md]
* monostate[link /reference/variant/monostate.md]
* std::move[link /reference/utility/move.md]


## カスタマイゼーションポイント
Senderアルゴリズム構築時および[Receiver](receiver.md)接続時に、関連付けられた実行ドメインに対して[`execution::transform_sender`](transform_sender.md)経由でSender変換が行われる。
[デフォルト実行ドメイン](../execution/default_domain.md)では無変換。

説明用の式`out_sndr`を`schedule_from(sndr, sch)`の戻り値[Sender](sender.md)とし、型`OutSndr`を`decltype((out_sndr))`とする。式`out_rcvr`を[`sender_in`](sender_in.md)`<OutSndr, Env> == true`となる[環境](../queryable.md)`Env`に関連付けられた[Receiver](receiver.md)とする。`out_sndr`と`out_rcvr`との[接続(connect)](connect.md)結果[Operation State](operation_state.md)への左辺値参照を`op`としたとき、

- 呼び出し[`start`](start.md)`(op)`は、現在の実行エージェント上で入力[Sender](sender.md)`sndr`を開始し、[Scheduler](scheduler.md)`sch`に関連付けられた実行リソースに属する実行エージェント上で`out_rcvr`の完了操作を実行すべき。
- `sch`上でのスケジューリングが失敗した場合、未規定の実行エージェント上で`out_rcvr`の[エラー完了](set_error.md)が行われるべき。


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`execution::schedule`](schedule.md)
- [`execution::continues_on`](continues_on.md)


## 参照
- [P2999R3 Sender Algorithm Customization](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2999r3.html)
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
