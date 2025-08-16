# read_env
* execution[meta header]
* cpo[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  inline constexpr unspecified read_env{};
}
```
* unspecified[italic]

## 概要
`read_env`は、非同期動作の[開始(start)](start.md)時に接続先[Receiver](receiver.md)の[環境](../queryable.md)に対して[クエリオブジェクト](../queryable.md)で問い合わせ、読み取った値を[値完了関数](set_value.md)で送信するSenderファクトリである。

クエリオブジェクトによるReceiver環境への問い合わせは`read_env`[Sender](sender.md)構築時やReceiver[接続(connect)](connect.md)ではなく、非同期動作が開始されるタイミングまで遅延される。
[`let_value`](let_value.md)Senderアダプタと組み合わせたり、[Sender Awaitableなコルーチン](with_awaitable_senders.md)での`co_await`式によって、[Scheduler](get_scheduler.md)や[停止トークン](../get_stop_token.md)を読み取ることができる。


## 効果
[クエリオブジェクト](../queryable.md)`q`に対して、呼び出し式`read_env(q)`は式[`make-sender`](make-sender.md)`(read_env, q)`と等価。


### Senderアルゴリズムタグ
Senderアルゴリズム動作説明用のクラステンプレート[`impls-for`](impls-for.md)に対して、下記の特殊化が定義される。

```cpp
namespace std::execution {
  template<>
  struct impls-for<decayed-typeof<read_env>> : default-impls {
    static constexpr auto start =
      [](auto query, auto& rcvr) noexcept -> void {
        TRY-SET-VALUE(rcvr, query(get_env(rcvr)));
      };

    template<class Sndr, class Env>
    static consteval void check-types();
  };
}
```
* decayed-typeof[link /reference/functional/decayed-typeof.md]
* impls-for[link impls-for.md]
* default-impls[link impls-for.md]
* TRY-SET-VALUE[link set_value.md]
* get_env[link get_env.md]

型`Q`を[`decay_t`](/reference/type_traits/decay.md)`<`[`data-type`](data-type.md)`<Sndr>>`とする。
`Env`型の左辺値`env`に対して式`Q()(env)`が不適格もしくは`void`型をもつとき、メンバ関数`check-types`は[`exception`](/reference/exception/exception.md)から派生した未規定の型を例外として送出する。


## 備考
`read_env`の[Senderアルゴリズムタグ型](tag_of_t.md)は未規定とされる。


## 例
```cpp example
#include <print>
#include <execution>
namespace ex = std::execution;

int main()
{
  ex::sender auto sndr = ex::read_env(ex::get_scheduler)
    | ex::let_value([](auto sch) -> ex::sender auto {
        // sch := sync_wait内部のScheduler
        return ex::starts_on(sch, ex::just(42));
      });
  auto [val] = std::this_thread::sync_wait(sndr).value();
  std::println("{}", val);
}
```
* ex::read_env[color ff0000]
* ex::sender[link sender.md]
* ex::get_scheduler[link get_scheduler.md]
* ex::let_value[link let_value.md]
* ex::starts_on[link starts_on.md]
* ex::just[link just.md]
* std::this_thread::sync_wait[link ../this_thread/sync_wait.md]
* value()[link /reference/optional/optional/value.md]

### 出力
```
42
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
- [`execution::get_env`](get_env.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
- [P3557R3 High-Quality Sender Diagnostics with Constexpr Exceptions](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3557r3.html)
