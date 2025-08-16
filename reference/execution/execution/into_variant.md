# into_variant
* execution[meta header]
* cpo[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  struct into_variant_t { unspecified };
  inline constexpr into_variant_t into_variant{};
}
```
* unspecified[italic]

## 概要
`into_variant`は、複数の[値完了シグネチャ](set_value.md)を持つ入力[Sender](sender.md)から複数[`tuple`](/reference/tuple/tuple.md)型からなる[`variant`](/reference/variant/variant.md)型の[値完了シグネチャへと変換](value_types_of_t.md)するSenderアダプタである。

`into_variant`は[パイプ可能Senderアダプタオブジェクト](sender_adaptor_closure.md)であり、パイプライン記法をサポートする。


## 効果
説明用の式`sndr`に対して`decltype((sndr))`が[`sender`](sender.md)を満たさないとき、呼び出し式`into_variant(sndr)`は不適格となる。

そうでなければ、呼び出し式`into_variant(sndr)`は`sndr`が1回だけ評価されることを除いて、下記と等価。

```cpp
transform_sender(get-domain-early(sndr), make-sender(into_variant, {}, sndr))
```
* transform_sender[link transform_sender.md]
* get-domain-early[link get-domain-early.md]
* make-sender[link make-sender.md]


### Senderアルゴリズムタグ `into_variant`
Senderアルゴリズム動作説明用のクラステンプレート[`impls-for`](impls-for.md)に対して、下記の特殊化が定義される。

```cpp
namespace std::execution {
  template<>
  struct impls-for<into_variant_t> : default-impls {
    static constexpr auto get-state = see below;
    static constexpr auto complete = see below;

    template<class Sndr, class... Env>
    static consteval void check-types() {
      auto cs = get_completion_signatures<child-type<Sndr>, FWD-ENV-T(Env)...>();
      decay-copyable-result-datums(cs);
    }
  };
}
```
* impls-for[link impls-for.md]
* default-impls[link impls-for.md]
* get_completion_signatures[link get_completion_signatures.md]
* child-type[link child-type.md]
* FWD-ENV-T[link ../forwarding_query.md]
* decay-copyable-result-datums[link decay-copyable-result-datums.md]

`impls-for<into_variant_t>::get-state`メンバは、下記ラムダ式と等価な関数呼び出し可能なオブジェクトで初期化される。

- 子[Sender](sender.md)の[値完了シグネチャを集約](value_types_of_t.md)した[`variant`](/reference/variant/variant.md)`<`[`tuple`](/reference/tuple/tuple.md)`<...>, ...>`型を[`type_identity`](/reference/type_traits/type_identity.md)クラステンプレートのパラメータに格納して返す。

```cpp
[]<class Sndr, class Rcvr>(Sndr&& sndr, Rcvr& rcvr) noexcept
  -> type_identity<value_types_of_t<child-type<Sndr>, FWD-ENV-T(env_of_t<Rcvr>)>> {
  return {};
}
```
* type_identity[link /reference/type_traits/type_identity.md]
* value_types_of_t[link value_types_of_t.md]
* child-type[link child-type.md]
* FWD-ENV-T[link ../forwarding_query.md]
* env_of_t[link env_of_t.md]

`impls-for<into_variant_t>::complete`メンバは、下記ラムダ式と等価な関数呼び出し可能なオブジェクトで初期化される。

- `State`として渡される前述`get-state`メンバ戻り値型([`type_identity`](/reference/type_traits/type_identity.md))から、`into_varinat`の送信値となる[`variant`](/reference/variant/variant.md)`<`[`tuple`](/reference/tuple/tuple.md)`<...>, ...>`型情報を取り出す。
- [値完了](set_value.md)の場合、引数パック`args...`から送信値を構築して接続先[Receiver](receiver.md)の[値完了関数](set_value.md)を呼び出す。
- [エラー完了](set_error.md)または[停止完了](set_stopped.md)の場合、接続先[Receiver](receiver.md)の同種完了関数に全引数を転送する。

```cpp
[]<class State, class Rcvr, class Tag, class... Args>(
    auto, State, Rcvr& rcvr, Tag, Args&&... args) noexcept -> void {
  if constexpr (same_as<Tag, set_value_t>) {
    using variant_type = typename State::type;
    TRY-SET-VALUE(rcvr, variant_type(decayed-tuple<Args...>{std::forward<Args>(args)...}));
  } else {
    Tag()(std::move(rcvr), std::forward<Args>(args)...);
  }
}
```
* set_value_t[link set_value.md]
* TRY-SET-VALUE[link set_value.md]
* decayed-tuple[link decayed-tuple.md]
* std::move[link /reference/utility/move.md]


## カスタマイゼーションポイント
Senderアルゴリズム構築時および[Receiver](receiver.md)接続時に、関連付けられた実行ドメインに対して[`execution::transform_sender`](transform_sender.md)経由でSender変換が行われる。
[デフォルト実行ドメイン](default_domain.md)では無変換。


## 例
```cpp example
#include <string>
#include <tuple>
#include <print>
#include <variant>
#include <execution>
namespace ex = std::execution;

struct FizzBuzzSender {
  using sender_concept = ex::sender_t;

  // FizzBuzzSenderは2種類の値完了シグネチャを持つ
  using completion_signatures = ex::completion_signatures<
    ex::set_value_t(int),
    ex::set_value_t(std::string)
  >;

  // Operation State型
  template <typename Rcvr>
  struct State {
    using operation_state_concept = ex::operation_state_t;

    State(Rcvr rcvr, int val)
      : rcvr_{std::move(rcvr)}, val_{val} {}

    void start() noexcept {
      using namespace std::string_literals;
      if (val_ % 15 == 0) {
        ex::set_value(std::move(rcvr_), "FizzBuzz"s);
      } else if (val_ % 3 == 0) {
        ex::set_value(std::move(rcvr_), "Fizz"s);
      } else if (val_ % 5 == 0) {
        ex::set_value(std::move(rcvr_), "Buzz"s);
      } else {
        ex::set_value(std::move(rcvr_), val_);
      }
    }

    Rcvr rcvr_;
    int val_;
  };

  template <typename Rcvr>
  auto connect(Rcvr rcvr) noexcept {
    return State{std::move(rcvr), val_};
  }

  int val_;
};

template<typename... Ts>
struct overload : Ts... { using Ts::operator()...; };

int main()
{
  int val = 15;
#if 0
  // 関数呼び出し
  ex::sender auto snd0 = FizzBuzzSender{val};
  ex::sender auto sndr = ex::into_variant(snd0);
#else
  // パイプライン記法
  ex::sender auto sndr = FizzBuzzSender{val} | ex::into_variant();
#endif
  auto [result] = std::this_thread::sync_wait(sndr).value();

  // result := variant<tuple<int>, tuple<string>>型
  std::visit(overload{
    [](std::tuple<int> n) {
      std::println("(int) {}", get<0>(n));
    },
    [](std::tuple<std::string> s) {
      std::println("(str) {}", get<0>(s));
    }
  }, result);
}
```
* ex::into_variant[color ff0000]
* ex::sender_t[link sender.md]
* ex::sender[link sender.md]
* ex::completion_signatures[link completion_signatures.md]
* ex::set_value_t[link set_value.md]
* ex::set_value[link set_value.md]
* ex::operation_state_t[link operation_state.md]
* std::this_thread::sync_wait[link ../this_thread/sync_wait.md]
* value()[link /reference/optional/optional/value.md]
* std::move[link /reference/utility/move.md]
* std::visit[link /reference/variant/visit.md]
* get<0>[link /reference/tuple/tuple/get.md]

### 出力
```
(str) FizzBuzz
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
- [`execution::when_all_with_variant`](when_all_with_variant.md)
- [`this_thread::sync_wait_with_variant`](../this_thread/sync_wait_with_variant.md)


## 参照
- [P2999R3 Sender Algorithm Customization](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2999r3.html)
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
- [P3557R3 High-Quality Sender Diagnostics with Constexpr Exceptions](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3557r3.html)
- [LWG 4203. Constraints on `get-state` functions are incorrect](https://cplusplus.github.io/LWG/issue4203)
