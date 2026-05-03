# let_value
* execution[meta header]
* cpo[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  struct let_value_t { unspecified };
  inline constexpr let_value_t let_value{};
}
```
* unspecified[italic]

## 概要
`let_value`は、新しいSenderを返す関数呼び出し可能なオブジェクトに引き渡すことで、入力[Sender](sender.md)の[値完了](set_value.md)結果から入れ子の非同期操作へと変換するSenderアダプタである。

`let_value`は[パイプ可能Senderアダプタオブジェクト](sender_adaptor_closure.md)であり、パイプライン記法をサポートする。

本ページにてSenderアルゴリズム`let_value`／[`let_error`](let_error.md)／[`let_stopped`](let_stopped.md)の動作仕様を包括的に説明するため、以降のセクションにおいては`let-cpo`, `set-cpo`をそれぞれ下記の通りとする。また`let-tag`を`let_value`／`let_error`／`let_stopped`それぞれに対して一意な空のクラスとする。

| `let-cpo` | `set-cpo` |
|----|----|
| `let_value` | [`set_value`](set_value.md) |
| [`let_error`](let_error.md) | [`set_error`](set_error.md) |
| [`let_stopped`](let_stopped.md) | [`set_stopped`](set_stopped.md) |


## 効果
説明用の式`sndr`と`f`に対して、`decltype((sndr))`が[`sender`](sender.md)を満たさない、もしくは`decltype((f))`が[`movable-value`](../movable-value.md)を満たさないとき、呼び出し式`let-cpo(sndr, f)`は不適格となる。

そうでなければ、呼び出し式`let-cpo(sndr, f)`は`sndr`が1回だけ評価されることを除いて、下記と等価。

```cpp
transform_sender(get-domain-early(sndr), make-sender(let-cpo, f, sndr))
```
* transform_sender[link transform_sender.md]
* get-domain-early[link get-domain-early.md]
* make-sender[link make-sender.md]

説明用のクラステンプレート`let-data`を下記の通り定義する。

```cpp
template<class Sndr, class Fn>
struct let-data {
  Sndr sndr; // exposition only
  Fn fn;     // exposition only
};
```

式`let-cpo.transform_sender(s, es...)`は、`s`が1回だけ評価されることを除いて、下記と等価。

```cpp
make-sender(let-tag{}, let-data{s.template get<2>(), s.template get<1>()})
```
* make-sender[link make-sender.md]
* let-tag[italic]

### Senderアルゴリズムタグ `let-tag`
Senderアルゴリズム動作説明用のクラステンプレート[`impls-for`](impls-for.md)に対して、下記の特殊化が定義される。

```cpp
namespace std::execution {
  template<>
  struct impls-for<let-tag> : default-impls {
    static constexpr auto get-state = see below;
    static constexpr auto start = see below;

    template<class Sndr, class... Env>
    static consteval void check-types();
  };
}
```
* impls-for[link impls-for.md]
* default-impls[link impls-for.md]
* let-tag[italic]

`impls-for<let-tag>::get-state`メンバは、下記ラムダ式と等価な関数呼び出し可能なオブジェクトで初期化される。

```cpp
[]<class Sndr, class Rcvr>(Sndr&& sndr, Rcvr& rcvr) requires see below {
  auto& [_, data] = sndr;
  auto& [child, fn] = data;
  using child_t = decltype(std::forward_like<Sndr>(child));
  using fn_t = decay_t<decltype(fn)>;
  using args_variant_t = see below;
  using ops_variant_t = see below;
  using state_t = let-state<decayed-typeof<set-cpo>, child_t, fn_t, Rcvr,
                            args_variant_t, ops_variant_t>;
  return state_t(std::forward_like<Sndr>(child), std::forward_like<Sndr>(fn), rcvr);
}
```
* decayed-typeof[link /reference/functional/decayed-typeof.md]
* set-cpo[italic]

- 説明用のパック`Sigs`を[`completion_signatures_of_t`](completion_signatures_of_t.md)`<`[`child-type`](child-type.md)`<Sndr>,` [`FWD-ENV-T`](../forwarding_query.md)`(`[`env_of_t`](env_of_t.md)`<Rcvr>)>`による[`completion_signatures`](completion_signatures.md)特殊化のテンプレートパラメータとし、パック`LetSigs`を`Sigs`に含まれる型のうち戻り値型が[`decayed-typeof`](/reference/functional/decayed-typeof.md)`<set-cpo>`に等しいものと定義する。説明用のエイリアステンプレート`as-tuple<Tag(Args...)>`を[`decayed-tuple`](decayed-tuple.md)`<Args...>`と定義する。型`args_variant_t`は下記定義において重複削除した型となる。

    ```cpp
    variant<monostate, as-tuple<LetSigs>...>
    ```
    * variant[link /reference/variant/variant.md]
    * monostate[link /reference/variant/monostate.md]

- 説明用の型`Tag`とパック`Args`に対して、説明用のエイリアステンプレート`as-sndr2<Tag(Args...)>`を[`call-result-t`](/reference/functional/call-result-t.md)`<Fn,` [`decay_t`](/reference/type_traits/decay.md)`<Args>&...>`と定義する。型`ops_variant_t`は下記定義において重複削除した型となる。

    ```cpp
    variant<monostate,
            connect_result_t<child_t, let-state::receiver,
            connect_result_t<as-sndr2<LetSigs>, receiver2<Rcvr, env_t>>...>
    ```
    * variant[link /reference/variant/variant.md]
    * monostate[link /reference/variant/monostate.md]
    * connect_result_t[link connect_result_t.md]

- 型`args_variant_t`および`ops2_variant_t`が適格なときに限って、上記ラムダ式のrequires節が満たされる。

`impls-for<let-tag>::start`メンバは、下記ラムダ式と等価な関数呼び出し可能なオブジェクトで初期化される。

```cpp
[]<class State, class Rcvr>(State& state, Rcvr&) noexcept {
  start(get<typename State::op_t>(state.ops));
}
```

メンバ関数`impls-for<let-tag>::check-types`の効果は下記の通り。

```cpp
using LetFn = remove_cvref_t<data-type<Sndr>>;
auto cs = get_completion_signatures<child-type<Sndr>, FWD-ENV-T(Env)...>();
auto fn = []<class... Ts>(decayed-typeof<set-cpo>(*)(Ts...)) {
  if constexpr (!is-valid-let-sender) // see below
    throw unspecified-exception();
};
cs.for-each(overload-set(fn, [](auto){}));
```
* data-type[link data-type.md]
* get_completion_signatures[link get_completion_signatures.md]
* child-type[link child-type.md]
* FWD-ENV-T[link ../forwarding_query.md]
* decayed-typeof[link /reference/functional/decayed-typeof.md]
* unspecified-exception[link unspecified-exception.md]
* for-each[link completion_signatures.md]
* overload-set[link overload-set.md]
* set-cpo[italic]

説明用の式`sndr`と`env`に対して、型`Sndr`を`decltype((sndr))`とする。[`sender-for`](sender-for.md)`<Sndr,` [`decayed-typeof`](/reference/functional/decayed-typeof.md)`<let-cpo>> == false`のとき、式`let-cpo.transform_env(sndr, env)`は不適格となる。

そうでなければ、式`let-cpo.transform_env(sndr, env)`は下記と等価。

```cpp
auto& [_, _, child] = sndr;
return JOIN-ENV(let-env(child), FWD-ENV(env));
```
* JOIN-ENV[link ../queryable.md]
* FWD-ENV[link ../forwarding_query.md]


## 説明専用エンティティ
### 式`let-env`
説明用の式`sndr`を用いて、`let-env(sndr)`を下記リストのうち最初に適格となる式と定義する。

- [`SCHED-ENV`](schedule.md)`(`[`get_completion_scheduler`](get_completion_scheduler.md)`<`[`decayed-typeof`](/reference/functional/decayed-typeof.md)`<set-cpo>>(`[`get_env`](get_env.md)`(sndr)))`
- [`MAKE-ENV`](../queryable.md)`(`[`get_domain`](get_domain.md)`,` [`get_domain`](get_domain.md)`(`[`get_env`](get_env.md)`(sndr)))`
- `(void(sndr),` [`env<>{}`](env.md)`)`

### 変数`is-valid-let-sender`
説明用の変数`is-valid-let-sender`は下記を全て満たす時に限って`true`となる。

- `(`[`constructible_from`](/reference/concepts/constructible_from.md)`<decay_t<Ts>, Ts> &&...)`
- [`invocable`](/reference/concepts/invocable.md)`<LetFn, decay_t<Ts>&...>`
- [`sender`](sender.md)`<`[`invoke_result_t`](/reference/type_traits/invoke_result.md)`<LetFn, decay_t<Ts>&...>>`
- パック`env-t`を`decltype(let-cpo.transform_env(declval<Sndr>(), declval<Env>()))`としたとき、`sizeof...(Env) == 0 ||` [`sender_in`](sender_in.md)`<`[`invoke_result_t`](/reference/type_traits/invoke_result.md)`<LetFn, decay_t<Ts>&...>, env-t...>`

### クラステンプレート`let-state`
```cpp
template<class Cpo, class Sndr, class Fn, class Rcvr, class ArgsVariant,
         class OpsVariant>
  struct let-state {
    using env_t = decltype(let-env(declval<Sndr>())); // exposition only
    Fn fn;                                            // exposition only
    env_t env;                                        // exposition only
    ArgsVariant args;                                 // exposition only
    OpsVariant ops;                                   // exposition only

    template<class Tag, class... Ts>
    constexpr void impl(Rcvr& rcvr, Tag tag, Ts&&... ts) noexcept
    {                                                 // exposition only
      using args_t = decayed-tuple<Ts...>;
      using receiver_type = receiver2<Rcvr, env_t>;
      using sender_type = apply_result_t<Fn, args_t&>;
      if constexpr (is_same_v<Tag, Cpo>) {
        try {
          auto& tuple = args.template emplace<args_t>(std::forward<Ts>(ts)...);
          ops.template emplace<monostate>();
          auto&& sndr = apply(std::move(fn), tuple);
          using op_t = connect_result_t<sender_type, receiver_type>;
          auto mkop2 = [&] {
            return connect(std::forward<sender_type>(sndr),
                           receiver_type{rcvr, env});
          };
          auto& op = ops.template emplace<op_t>(emplace-from{mkop2});
          start(op);
        } catch (...) {
          constexpr bool nothrow =
            is_nothrow_constructible_v<args_t, Ts...> &&
            is_nothrow_applicable_v<Fn, args_t&> &&
            noexcept(
              connect(
                declval<sender_type>(),
                receiver_type{rcvr, env}));
        if constexpr (!nothrow) {
          set_error(std::move(rcvr), current_exception());
        }
      }
    } else {
      tag(std::move(rcvr), std::forward<Ts>(ts)...);
    }
  }

  struct receiver {   // exposition only
    let-state& state; // exposition only
    Rcvr& rcvr;       // exposition only

    using receiver_concept = receiver_t;

    template<class... Args>
    constexpr void set_value(Args&&... args) noexcept {
      state.impl(rcvr, execution::set_value, std::forward<Args>(args)...);
    }
    template<class... Args>
    constexpr void set_error(Args&&... args) noexcept {
      state.impl(rcvr, execution::set_error, std::forward<Args>(args)...);
    }
    template<class... Args>
    constexpr void set_stopped(Args&&... args) noexcept {
      state.impl(rcvr, execution::set_stopped, std::forward<Args>(args)...);
    }

    constexpr env_of_t<const Rcvr&> get_env() const noexcept {
      return execution::get_env(rcvr);
    }
  };

  using op_t = connect_result_t<Sndr, receiver>;      // exposition only
  constexpr let-state(Sndr&& sndr, Fn fn, Rcvr& rcvr) // exposition only
    : fn(std::move(fn)), env(let-env(sndr)),
      ops(in_place_type<op_t>, std::forward<Sndr>(sndr),
          receiver{*this, rcvr})
  {}
};
```
* connect_result_t[link connect_result_t.md]
* connect[link connect.md]
* start[link start.md]
* receiver_t[link receiver.md]
* execution::set_value[link set_value.md]
* execution::set_error[link set_error.md]
* execution::set_stopped[link set_stopped.md]
* execution::get_env[link get_env.md]
* apply_result_t[link /reference/type_traits/apply_result.md]
* is_same_v[link /reference/type_traits/is_same.md]
* current_exception()[link /reference/exception/current_exception.md]
* is_nothrow_constructible_v[link /reference/type_traits/is_nothrow_constructible.md]
* is_nothrow_applicable_v[link /reference/type_traits/is_nothrow_applicable.md]
* in_place_type[link /reference/utility/in_place_type_t.md]

### クラステンプレート`receiver2`
```cpp
namespace std::execution {
  template<class Rcvr, class Env>
  struct receiver2 {
    using receiver_concept = receiver_t;

    template<class... Args>
    void set_value(Args&&... args) && noexcept {
      execution::set_value(std::move(rcvr), std::forward<Args>(args)...);
    }

    template<class Error>
    void set_error(Error&& err) && noexcept {
      execution::set_error(std::move(rcvr), std::forward<Error>(err));
    }

    void set_stopped() && noexcept {
      execution::set_stopped(std::move(rcvr));
    }

    decltype(auto) get_env() const noexcept {
      return see below;
    }

    Rcvr& rcvr;  // exposition only
    Env env;     // exposition only
  };
}
```
* receiver_t[link receiver.md]
* execution::set_value[link set_value.md]
* execution::set_error[link set_error.md]
* execution::set_stopped[link set_stopped.md]
* std::move[link /reference/utility/move.md]

メンバ関数`receiver2::get_env`の呼び出しは、下記を満たすオブジェクト`e`を返す。

- 型`decltype(e)`が[`queryable`](../queryable.md)のモデルであり、かつ
- 与えられた[クエリオブジェクト](../queryable.md)`q`に対して、式`e.query(q)`は式`env.query(q)`が有効ならばその式と等価。そうではなく、`q`の型が[`forwarding-query`](../forwarding-query.md)を満たすならば式`e.query(q)`は[`get_env`](get_env.md)`(rcvr).query(q)`と等価。そうでなければ、式`e.query(q)`は不適格となる。


## カスタマイゼーションポイント
Senderアルゴリズム構築時および[Receiver](receiver.md)接続時に、関連付けられた実行ドメインに対して[`execution::transform_sender`](transform_sender.md)経由でSender変換が行われる。
[デフォルト実行ドメイン](default_domain.md)では無変換。

説明用の式`out_sndr`を`let-cpo(sndr, f)`の戻り値[Sender](sender.md)とし、式`rcvr`を式[`connect`](connect.md)`(out_sndr, rcvr)`が適格となる[Receiver](receiver.md)とする。式[`connect`](connect.md)`(out_sndr, rcvr)`は[開始(start)](start.md)時に下記を満たす非同期操作を生成しない場合、動作は未定義となる。

- 入力[Sender](sender.md)`sndr`の完了結果で`set-cpo`が呼ばれるとき、`f`を呼び出すこと。
- 非同期操作の完了は、`f`が返すSenderの完了に依存すること。
- `sndr`により送信された他の完了操作を伝搬すること。


## 例
### 例1: 基本の使い方
```cpp example
#include <print>
#include <execution>
namespace ex = std::execution;

int main()
{
  { // 関数呼び出し
    ex::sender auto snd0 = ex::just(21);
    ex::sender auto snd1 = ex::let_value(
      snd0,
      [](int n) -> ex::sender auto {
        return ex::just(n * 2);
      });
    auto [val] = std::this_thread::sync_wait(snd1).value();
    std::println("{}", val);
  }

  { // パイプライン記法
    ex::sender auto sndr = ex::just(21)
      | ex::let_value(
          [](int n) -> ex::sender auto {
            return ex::just(n * 2);
          });
    auto [val] = std::this_thread::sync_wait(sndr).value();
    std::println("{}", val);
  }
}
```
* ex::let_value[color ff0000]
* ex::sender[link sender.md]
* ex::just[link just.md]
* std::this_thread::sync_wait[link ../this_thread/sync_wait.md]
* value()[link /reference/optional/optional/value.md]

#### 出力
```
42
42
```

### 例2: 複数の値完了シグネチャ
```cpp
#include <string>
#include <print>
#include <execution>
namespace ex = std::execution;


// MySenderは下記いずれかの完了操作を行う
//   値完了     set_value(int), set_value(string)
//   エラー完了 set_error(int)
struct MySender {
  using sender_concept = ex::sender_t;
  using completion_signatures = ex::completion_signatures<
    ex::set_value_t(int),
    ex::set_value_t(std::string),
    ex::set_error_t(int)
  >;

  template <typename Rcvr>
  struct state {
    using operation_state_concept = ex::operation_state_t;

    state(Rcvr rcvr, int val)
      : rcvr_{std::move(rcvr)}, val_{val} {}

    void start() noexcept {
      using namespace std::string_literals;
      switch (val_) {
      case 1:
        ex::set_value(std::move(rcvr_), 100);
        break;
      case 2:
        ex::set_value(std::move(rcvr_), "C++"s);
        break;
      default:
        ex::set_error(std::move(rcvr_), val_);
        break;
      }
    }

    Rcvr rcvr_;
    int val_;
  };

  template <typename Rcvr>
  auto connect(Rcvr rcvr) noexcept {
    return state{std::move(rcvr), val_};
  }

  int val_;
};

template<typename... Ts>
struct overload : Ts... { using Ts::operator()...; };

int main()
{
  for (int val = 0; ; val++) {
    ex::sender auto snd0 = MySender{val};
    ex::sender auto sndr = ex::let_value(snd0,
      overload {
        [](int n) {
          std::println("(int) {}", n);
          // intを受信 -> 空値を送信
          return ex::just();
        },
        [](std::string s) {
          std::println("(str) {}", s);
          // stringを受信 -> 停止完了(キャンセル)送信
          return ex::just_stopped(); 
        }
      });
    // Senderチェインsndrは下記いずれかの完了操作を行う
    //   値完了     set_value()
    //   エラー完了 set_error(int)
    //   停止完了   set_stopped()

    try {
      auto result = std::this_thread::sync_wait_with_variant(sndr);
      // result := optional<variant<tuple<>>>型
      if (!result) {
        // 停止完了時はstd::nulloptが返却される
        break;
      }
      // 値完了==空値のためアクセスすべきデータ無し
    } catch (int n) {
      // エラー完了時は受信int値が例外として送出される
      std::println("catch {}", n);
    }
  }
}
```
* ex::let_value[color ff0000]
* ex::sender_t[link sender.md]
* ex::sender[link sender.md]
* ex::completion_signatures[link completion_signatures.md]
* ex::set_value_t[link set_value.md]
* ex::set_value[link set_value.md]
* ex::set_error_t[link set_error.md]
* ex::set_error[link set_error.md]
* ex::just[link just.md]
* ex::just_stopped[link just_stopped.md]
* ex::operation_state_t[link operation_state.md]
* std::this_thread::sync_wait_with_variant[link ../this_thread/sync_wait_with_variant.md]
* std::move[link /reference/utility/move.md]

#### 出力
```
catch 0
(int) 100
(str) C++
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`execution::let_error`](let_error.md)
- [`execution::let_stopped`](let_stopped.md)


## 参照
- [P2999R3 Sender Algorithm Customization](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2999r3.html)
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
- [P3396R1 std::execution wording fixes](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p3396r1.html)
- [P3433R1 Allocator Support for Operation States](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3433r1.pdf)
- [P3557R3 High-Quality Sender Diagnostics with Constexpr Exceptions](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3557r3.html)
- [LWG 4203. Constraints on `get-state` functions are incorrect](https://cplusplus.github.io/LWG/issue4203)
- [LWG 4204. specification of `as-sndr2(Sig)` in [exec.let] is incomplete](https://cplusplus.github.io/LWG/issue4204)
- [LWG 4205. `let_[*].transform_env` is specified in terms of the `let_*` sender itself instead of its child](https://cplusplus.github.io/LWG/issue4205)
- [P3373R4 Of Operation States and Their Lifetimes](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3373r4.pdf)
