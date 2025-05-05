# sync_wait
* execution[meta header]
* cpo[meta id-type]
* std::this_thread[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::this_thread {
  struct sync_wait_t { unspecified };
  inline constexpr sync_wait_t sync_wait{};
}
```
* unspecified[italic]

## 概要
`sync_wait`は、[Sender](../execution/sender.md)が完了するまで現在のスレッドをブロックし、非同期操作の結果を取得するSenderコンシューマである。

`sync_wait`は入力Senderが[値完了シグネチャ](../execution/set_value.md)を1個だけ持つことを要求する。
値完了シグネチャが複数存在する場合は[`sync_wait_with_variant`](sync_wait_with_variant.md)アルゴリズムを利用する。

入力Senderの値完了シグネチャが[`set_value_t`](../execution/set_value.md)`(Ts...)`のとき、`sync_wait`の結果型は[`optional`](/reference/optional/optional.md)`<`[`tuple`](/reference/tuple/tuple.md)`<Ts...>>`となる。


## 効果
説明用の`sndr`を`decltype((sndr))`が`Sndr`型となる式とする。

[`sender_in`](../execution/sender_in.md)`<Sndr,` [`sync-wait-env`](sync-wait-env.md)`> == false`のとき、呼び出し式`this_thread::sync_wait(sndr)`は不適格となる。

そうでなければ、呼び出し式`this_thread::sync_wait(sndr)`は`sndr`が1回だけ評価されることを除いて、下記と等価。

```cpp
apply_sender(get-domain-early(sndr), sync_wait, sndr)
```
* apply_sender[link ../execution/apply_sender.md]
* get-domain-early[link ../execution/get-domain-early.md]

- 型`sync-wait-result-type<Sndr>`が適格であること。
- 上記の`apply_sender`式を`e`としたとき、[`same_as`](/reference/concepts/same_as.md)`<decltype(e), sync-wait-result-type<Sndr>> == true`であること。


### 結果型
`sync_wait`の結果型となる、説明専用のエイリアステンプレート`sync-wait-result-type`を下記の通り定義する。

```cpp
namespace std::this_thread {
  template<execution::sender_in<sync-wait-env> Sndr>
  using sync-wait-result-type =
    optional<execution::value_types_of_t<Sndr, sync-wait-env,
             decayed-tuple, type_identity_t>>;
}
```
* execution::sender_in[link ../execution/sender_in.md]
* sync-wait-env[link sync-wait-env.md]
* execution::value_types_of_t[link ../execution/value_types_of_t.md]
* optional[link /reference/optional/optional.md]
* decayed-tuple[link ../execution/decayed-tuple.md]
* type_identity_t[link /reference/type_traits/type_identity.md]


### Senderアルゴリズムタグ `sync_wait`
説明用の`sndr`を`decltype((sndr))`が`Sndr`型となる式とする。

[`sender_to`](../execution/sender_to.md)`<Sndr,` [`sync-wait-receiver`](sync-wait-receiver.md)`<Sndr>> == false`のとき、式`sync_wait.apply_sender(sndr)`は不適格となる。

そうでなければ、式`sync_wait.apply_sender(sndr)`は下記と等価。

```cpp
sync-wait-state<Sndr> state;
auto op = connect(sndr, sync-wait-receiver<Sndr>{&state});
start(op);

state.loop.run();
if (state.error) {
  rethrow_exception(std::move(state.error));
}
return std::move(state.result);
```
* sync-wait-state[link sync-wait-receiver.md]
* connect[link ../execution/connect.md]
* sync-wait-receiver[link sync-wait-receiver.md]
* start[link ../execution/start.md]
* loop.run()[link ../execution/run_loop/run.md]
* rethrow_exception[link /reference/exception/rethrow_exception.md]
* std::move[link /reference/utility/move.md]


## カスタマイゼーションポイント
[Sender](../execution/sender.md)`sndr`に[関連付けられた実行ドメイン](../execution/get-domain-early.md)`dom`に対して、
[`execution::apply_sender`](../execution/apply_sender.md)経由で`dom.apply_sender(sync_wait, sndr)`が呼ばれる。

[デフォルト実行ドメイン](../execution/default_domain.md)では、`sync_wait.apply_sender(sndr)`が呼ばれる。

下記を満たさない場合、呼び出し式`this_thread::sync_wait(sndr)`の動作は未定義となる。

- 指定したSenderが完了するまで、前方進行保証委任(forward progress guarantee delegation)による現在のスレッドをブロックすること。
- 指定したSenderの非同期操作の結果が返る場合
    - [値完了](../execution/set_value.md)の場合、結果データは[`optional`](/reference/optional/optional.md)オブジェクト内の[`tuple`](/reference/tuple/tuple.md)で返されること。
    - [エラー完了](../execution/set_error.md)の場合、例外を送出すること。
    - [停止完了](../execution/set_stopped.md)の場合、無効値[`optional`](/reference/optional/optional.md)オブジェクトが返されること。


## 例
```cpp
#include <print>
#include <execution>
namespace ex = std::execution;

int main()
{
  // 値(100, 'X')を送信するSender
  ex::sender auto sndr = ex::just(100, 'X');
  // メインスレッド上で完了待機
  auto result = std::this_thread::sync_wait(sndr);
  // 結果型optional<tuple<int,char>>から値を取り出す
  auto [n, c] = result.value();
  std::println("result=({}, {})", n, c);
}
```
* std::this_thread::sync_wait[color ff0000]
* ex::sender[link ../execution/sender.md]
* ex::just[link ../execution/just.md]
* value()[link /reference/optional/optional/value.md]

### 出力
```
result=(100, X)
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
- [`execution::sender`](../execution/sender.md)
- [`this_thread::sync_wait_with_variant`](sync_wait_with_variant.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
