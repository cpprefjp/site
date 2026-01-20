# then
* execution[meta header]
* cpo[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  struct then_t { unspecified };
  inline constexpr then_t then{};
}
```
* unspecified[italic]

## 概要
`then`は、入力[Sender](sender.md)の[値完了操作](set_value.md)の継続として関数呼び出しをアタッチするSenderアダプタである。

`then`は[パイプ可能Senderアダプタオブジェクト](sender_adaptor_closure.md)であり、パイプライン記法をサポートする。

本ページにてSenderアルゴリズム`then`／[`upon_error`](upon_error.md)／[`upon_stopped`](upon_stopped.md)の動作仕様を包括的に説明するため、以降のセクションにおいては`then-cpo`, `set-cpo`をそれぞれ下記の通りとする。

| `then-cpo` | `set-cpo` |
|----|----|
| `then` | [`set_value`](set_value.md) |
| [`upon_error`](upon_error.md) | [`set_error`](set_error.md) |
| [`upon_stopped`](upon_stopped.md) | [`set_stopped`](set_stopped.md) |


## 効果
説明用の式`sndr`と`f`に対して、`decltype((sndr))`が[`sender`](sender.md)を満たさない、もしくは`decltype((f))`が[`movable-value`](../movable-value.md)を満たさないとき、呼び出し式`then-cpo(sndr, f)`は不適格となる。

そうでなければ、呼び出し式`then-cpo(sndr, f)`は`sndr`が1回だけ評価されることを除いて、下記と等価。

```cpp
transform_sender(get-domain-early(sndr), make-sender(then-cpo, f, sndr))
```
* transform_sender[link transform_sender.md]
* get-domain-early[link get-domain-early.md]
* make-sender[link make-sender.md]


### Senderアルゴリズムタグ `then-cpo`
Senderアルゴリズム動作説明用のクラステンプレート[`impls-for`](impls-for.md)に対して、下記の特殊化が定義される。

```cpp
namespace std::execution {
  template<>
  struct impls-for<decayed-typeof<then-cpo>> : default-impls {
    static constexpr auto complete =
      []<class Tag, class... Args>
        (auto, auto& fn, auto& rcvr, Tag, Args&&... args) noexcept -> void {
          if constexpr (same_as<Tag, decayed-typeof<set-cpo>>) {
            TRY-SET-VALUE(rcvr,
                          invoke(std::move(fn), std::forward<Args>(args)...));
          } else {
            Tag()(std::move(rcvr), std::forward<Args>(args)...);
          }
        };

    template<class Sndr, class... Env>
    static consteval void check-types();
  };
}
```
* decayed-typeof[link /reference/functional/decayed-typeof.md]
* impls-for[link impls-for.md]
* default-impls[link impls-for.md]
* TRY-SET-VALUE[link set_value.md]
* invoke[link /reference/functional/invoke.md]
* std::move[link /reference/utility/move.md]
* then-cpo[italic]
* set-cpo[italic]

メンバ関数`impls-for<decayed-typeof<then-cpo>>::check-types`の効果は下記の通り。

```cpp
auto cs = get_completion_signatures<child-type<Sndr>, FWD-ENV-T(Env)...>();
auto fn = []<class... Ts>(decayed-typeof<set-cpo>(*)(Ts...)) {
  if constexpr (!invocable<remove_cvref_t<data-type<Sndr>>, Ts...>)
    throw unspecified-exception();
};
cs.for-each(overload-set{fn, [](auto){}});
```
* get_completion_signatures[link get_completion_signatures.md]
* child-type[link child-type.md]
* FWD-ENV-T[link ../forwarding_query.md]
* data-type[link data-type.md]
* for-each[link completion_signatures.md]
* overload-set[link overload-set.md]
* set-cpo[italic]

`unspecified-exception`は[`exception`](/reference/exception/exception.md)から派生した型となる。


## カスタマイゼーションポイント
Senderアルゴリズム構築時および[Receiver](receiver.md)接続時に、関連付けられた実行ドメインに対して[`execution::transform_sender`](transform_sender.md)経由でSender変換が行われる。
[デフォルト実行ドメイン](default_domain.md)では無変換。

戻り値の[Sender](sender.md)`out_sndr`が下記を満たさない場合、呼び出し式`then-cpo(sndr, f)`の動作は未定義となる。

- `then-cpo`に対する`sndr`の`set-cpo`結果データで`f`またはそのコピーを呼び出し、`out_sndr`の値完了として`f`の結果値を用いること。
- 上記以外の完了操作では変更なしに転送すること。


## 例
```cpp example
#include <print>
#include <string>
#include <execution>
namespace ex = std::execution;

int main()
{
  { // 関数呼び出し
    ex::sender auto snd0 = ex::just('C', 2);
    ex::sender auto snd1 = ex::then(snd0, [](char ch, int n) {
      return ch + std::string(n, '+');
    });
    auto [s] = std::this_thread::sync_wait(snd1).value();
    std::println("{}", s);
  }

  { // パイプライン記法
    ex::sender auto sndr = ex::just('C', 2);
      | ex::then([](char ch, int n) {
          return ch + std::string(n, '+');
        });
    auto [s] = std::this_thread::sync_wait(sndr).value();
    std::println("{}", s);
  }
}
```
* ex::then[color ff0000]
* ex::sender[link sender.md]
* ex::just[link just.md]
* std::this_thread::sync_wait[link ../this_thread/sync_wait.md]
* value()[link /reference/optional/optional/value.md]

### 出力
```
C++
C++
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
- [`execution::upon_error`](upon_error.md)
- [`execution::upon_stopped`](upon_stopped.md)


## 参照
- [P2999R3 Sender Algorithm Customization](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2999r3.html)
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
- [P3557R3 High-Quality Sender Diagnostics with Constexpr Exceptions](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3557r3.html)
- [LWG4369 `check-types` function for `upon_error` and `upon_stopped` is wrong](https://cplusplus.github.io/LWG/issue4369)
