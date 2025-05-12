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
`let_value`は、新しいSenderを返す関数呼び出し可能なオブジェクトに引き渡すことで、入力[Sender](sender.md)の[値完了](set_value.md)結果から子入れ子の非同期操作へと変換するSenderアダプタである。

`let_value`はパイプライン記法をサポートする。


## 効果
説明用の式`sndr`と`f`に対して、`decltype((sndr))`が[`sender`](sender.md)を満たさない、もしくは[`movable-value`](../movable-value.md)を満たさないとき、呼び出し式`let_value(sndr, f)`は不適格となる。

そうでなければ、呼び出し式`let_value(sndr, f)`は`sndr`が1回だけ評価されることを除いて、下記と等価。

```cpp
transform_sender(get-domain-early(sndr), make-sender(let_value, f, sndr))
```
* transform_sender[link transform_sender.md]
* get-domain-early[link get-domain-early.md]
* make-sender[link make-sender.md]


### Senderアルゴリズムタグ `let_value`
Senderアルゴリズム動作説明用のクラステンプレート[`impls-for`](impls-for.md)に対して、下記の特殊化が定義される。

```cpp
namespace std::execution {
  template<>
  struct impls-for<decayed-typeof<let_value>> : default-impls {
    static constexpr auto get-state = see below;
    static constexpr auto complete = see below;
  };
}
```
* impls-for[link impls-for.md]
* default-impls[link impls-for.md]
* decayed-typeof[link decayed-typeof.md.nolink]
* see below[italic]

`impls-for<decayed-typeof<let_value>>::get-state`メンバは、下記ラムダ式と等価な関数呼び出し可能なオブジェクトで初期化される。

```cpp
[]<class Sndr, class Rcvr>(Sndr&& sndr, Rcvr& rcvr) requires see below {
  auto& [_, fn, child] = sndr;
  using fn_t = decay_t<decltype(fn)>;
  using env_t = decltype(let-env(child));
  using args_variant_t = see below;
  using ops2_variant_t = see below;

  struct state-type {
    fn_t fn;              // exposition only
    env_t env;            // exposition only
    args_variant_t args;  // exposition only
    ops2_variant_t ops2;  // exposition only
  };
  return state-type{std::forward_like<Sndr>(fn), let-env(child), {}, {}};
}
```
* decay_t[link /reference/type_traits/decay.md]
* see below[italic]

- 説明用のパック`Sigs`を[`completion_signatures_of_t`](completion_signatures_of_t.md)`<`[`child-type`](child-type.md)`<Sndr>,` [`env_of_t`](env_of_t.md)`<Rcvr>>`による[`completion_signatures`](completion_signatures.md)特殊化のテンプレートパラメータとし、パック`LetSigs`を`Sigs`に含まれる型のうち戻り値型が`decayed-typeof<`[`set_value`](set_value.md)`>`に等しいものと定義する。説明用のエイリアステンプレート`as-tuple<Tag(Args...)>`を[`decayed-tuple`](decayed-tuple.md)`<Args...>`と定義する。型`args_variant_t`は下記定義において重複削除した型となる。

    ```cpp
    variant<monostate, as-tuple<LetSigs>...>
    ```
    * variant[link /reference/variant/variant.md]
    * monostate[link /reference/variant/monostate.md]

- 説明用の型`Tag`とパック`Args`に対して、説明用のエイリアステンプレート`as-sndr2<Tag(Args...)>`を`call-result-t<Fn,` [`decay_t`](/reference/type_traits/decay.md)`<Arg>&...>`と定義する。型`ops2_variant_t`は下記定義において重複削除した型となる。

    ```cpp
    variant<monostate, connect_result_t<as-sndr2<LetSigs>, receiver2<Rcvr, Env>>...>
    ```
    * variant[link /reference/variant/variant.md]
    * monostate[link /reference/variant/monostate.md]
    * connect_result_t[link connect_result_t.md]

- 型`args_variant_t`および`ops2_variant_t`が適格なときに限って、上記ラムダ式のrequires節が満たされる。

`impls-for<decayed-typeof<let_value>>::complete`メンバは、下記ラムダ式と等価な関数呼び出し可能なオブジェクトで初期化される。

```cpp
[]<class Tag, class... Args>
  (auto, auto& state, auto& rcvr, Tag, Args&&... args) noexcept -> void {
    if constexpr (same_as<Tag, decayed-typeof<set_value>>) {
      TRY-EVAL(rcvr, let-bind(state, rcvr, std::forward<Args>(args)...));
    } else {
      Tag()(std::move(rcvr), std::forward<Args>(args)...);
    }
  }
```
* set_value[link set_value.md]
* decayed-typeof[link decayed-typeof.md.nolink]
* std::move[link /reference/utility/move.md]

説明用の式`sndr`と`env`に対して、型`Sndr`を`decltype((sndr))`とする。[`sender-for`](sender-for.md)`<Sndr, decayed-typeof<let_value>> == false`のとき、式`let_value.transform_env(sndr, env)`は不適格となる。

そうでなければ、式`let_value.transform_env(sndr, env)`は[`JOIN-ENV`](JOIN-ENV.md.nolink)`(let-env(sndr),` [`FWD-ENV`](../forwarding_query.md)`(env))`と等価。


## 説明専用エンティティ
説明用の式`sndr`を用いて、`let-env(sndr)`を下記リストのうち最初に適格となる式と定義する。

- [`SCHED-ENV`](SCHED-ENV.md.nolink)`(`[`get_completion_scheduler`](get_completion_scheduler.md)`<decayed-typeof<`[`set_value`](set_value.md)`>>(`[`get_env`](get_env.md)`(sndr)))`
- [`MAKE-ENV`](MAKE-ENV.md.nolink)`(`[`get_domain`](get_domain.md)`,` [`get_domain`](get_domain.md)`(`[`get_env`](get_env.md)`(sndr)))`
- `(void(sndr),` [`env<>{}`](env.md)`)`

```cpp
namespace std::execution {
  template<class State, class Rcvr, class... Args>
  void let-bind(State& state, Rcvr& rcvr, Args&&... args);  // exposition only
}
```

説明専用の`let-bind`テンプレート関数の効果は下記と等価。

```cpp
using args_t = decayed-tuple<Args...>;
auto mkop2 = [&] {
  return connect(
    apply(std::move(state.fn),
          state.args.template emplace<args_t>(std::forward<Args>(args)...)),
    receiver2{rcvr, std::move(state.env)});
};
start(state.ops2.template emplace<decltype(mkop2())>(emplace-from{mkop2}));
```
* decayed-tuple[link decayed-tuple.md]
* connect[link connect.md]
* start[link start.md]
* emplace-from[link emplace-from.md]
* apply[link /reference/tuple/apply.md]
* template emplace[link /reference/variant/variant/emplace.md]
* std::move[link /reference/utility/move.md]

説明専用のテンプレートクラス`receiver2`を下記の通り定義する。

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
* see below[italic]

メンバ関数`receiver2::get_env`の呼び出しは、下記を満たすオブジェクト`e`を返す。

- 型`decltype(e)`が[`queryable`](../queryable.md)のモデルであり、かつ
- 与えられた[クエリオブジェクト](../queryable.md)`q`に対して、式`e.query(q)`は式`env.query(q)`が有効ならばその式と等価。そうでなければ、式`e.query(q)`は[`get_env`](get_env.md)`(rcvr).query(q)`と等価。


## カスタマイゼーションポイント
Senderアルゴリズム構築時および[Receiver](receiver.md)接続時に、関連付けられた実行ドメインに対して[`execution::transform_sender`](transform_sender.md)経由でSender変換が行われる。
[デフォルト実行ドメイン](../execution/default_domain.md)では無変換。


説明用の式`out_sndr`を`let_value(sndr, f)`の戻り値[Sender](sender.md)とし、式`rcvr`を式[`connect`](connect.md)`(out_sndr, rcvr)`が適格となる[Receiver](receiver.md)とする。式[`connect`](connect.md)`(out_sndr, rcvr)`は[開始(start)](start.md)時に下記を満たす非同期操作を生成しない場合、動作は未定義となる。

- 入力[Sender](sender.md)`sndr`の完了結果で[`set_value`](set_value.md)が呼ばれるとき、`f`を呼び出すこと。
- 非同期操作の完了は、`f`が返すSenderの完了に依存すること。
- `sndr`により送信された他完了操作を伝搬すること。


## 例
### 例1: 基本の使い方
```cpp example
#include <print>
#include <execution>
namespace ex = std::execution;

int main()
{
  { // 関数呼び出し
    ex::sender snd0 = ex::just(21);
    ex::sender snd1 = ex::let_value(
      snd0,
      [](int n) -> ex::sender auto {
        return ex::just(n * 2);
      });
    auto [val] = std::this_thread::sync_wait(snd1).value();
    std::println("{}", val);
  }

  { // パイプライン記法
    ex::sender sndr = ex::just(21)
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
      // エラー完了時は受信int値が例外として送出される
      if (!result) {
        // 停止完了時はstd::nulloptが返却される
        break;
      }
      // 値完了==空値のためアクセスすべきデータ無し
    } catch (int n) {
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
* ex::just_stopped[link just_stopped.md.nolink]
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
- [`execution::let_error`](let_error.md.nolink)
- [`execution::let_stopped`](let_stopped.md.nolink)


## 参照
- [P2999R3 Sender Algorithm Customization](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2999r3.html)
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
