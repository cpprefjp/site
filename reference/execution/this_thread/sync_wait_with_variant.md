# sync_wait_with_variant
* execution[meta header]
* cpo[meta id-type]
* std::this_thread[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::this_thread {
  struct sync_wait_with_variant_t { unspecified };
  inline constexpr sync_wait_with_variant_t sync_wait_with_variant{};
}
```
* unspecified[italic]

## 概要
`sync_wait_with_variant`は、入力[Sender](../execution/sender.md)が完了するまで現在のスレッドをブロックし、非同期操作の結果を取得するSenderコンシューマである。

`sync_wait_with_variant`は入力Senderが複数の[値完了シグネチャ](../execution/set_value.md)を持つケースに対応する。
値完了シグネチャが1個だけの場合は[`sync_wait`](sync_wait.md)アルゴリズムを利用する。


入力Senderの値完了シグネチャが[`set_value_t`](../execution/set_value.md)`(Ts0...)`, ..., [`set_value_t`](../execution/set_value.md)`(TsN...)`のとき、`sync_wait_with_variant`の結果型は[`optional`](/reference/optional/optional.md)`<`[`variant`](/reference/variant/variant.md)`<`[`tuple`](/reference/tuple/tuple.md)`<Ts0...>, ...,` [`tuple`](/reference/tuple/tuple.md)`<TsN...>>`となる。


## 効果
説明用の`sndr`を`decltype(`[`into_variant`](../execution/into_variant.md)`(sndr))`が`Sndr`型となる式とする。

[`sender_in`](../execution/sender_in.md)`<Sndr,` [`sync-wait-env`](sync-wait-env.md)`> == false`のとき、呼び出し式`this_thread::sync_wait_with_variant(sndr)`は不適格となる。

そうでなければ、呼び出し式`this_thread::sync_wait_with_variant(sndr)`は`sndr`が1回だけ評価されることを除いて、下記と等価。

```cpp
apply_sender(get-domain-early(sndr), sync_wait_with_variant, sndr)
```
* apply_sender[link ../execution/apply_sender.md]
* get-domain-early[link ../execution/get-domain-early.md]

- 型`sync-wait-with-variant-result-type<Sndr>`が適格であること。
- 上記の`apply_sender`式を`e`としたとき、[`same_as`](/reference/concepts/same_as.md)`<decltype(e), sync-wait-with-variant-result-type<Sndr>> == true`であること。


### 結果型
`sync_wait_with_variant`の結果型となる、説明専用のエイリアステンプレート`sync-wait-with-variant-result-type`を下記の通り定義する。

```cpp
namespace std::this_thread {
  template<execution::sender_in<sync-wait-env> Sndr>
  using sync-wait-with-variant-result-type =
    optional<execution::value_types_of_t<Sndr, sync-wait-env>>;
}
```
* execution::sender_in[link ../execution/sender_in.md]
* sync-wait-env[link sync-wait-env.md]
* execution::value_types_of_t[link ../execution/value_types_of_t.md]
* optional[link /reference/optional/optional.md]


### Senderアルゴリズムタグ `sync_wait_with_variant`
説明用の`sndr`を`decltype(`[`into_variant`](../execution/into_variant.md)`(sndr))`が`Sndr`型となる式とする。

[`callable`](/reference/functional/callable.md.nolink)`<`[`sync_wait_t`](sync_wait.md)`, Sndr> == false`のとき、式`sync_wait_with_variant.apply_sender(sndr)`は不適格となる。

そうでなければ、式`sync_wait_with_variant.apply_sender(sndr)`は下記と等価。

```cpp
using result_type = sync-wait-with-variant-result-type<Sndr>;
if (auto opt_value = sync_wait(into_variant(sndr))) {
  return result_type(std::move(get<0>(*opt_value)));
}
return result_type(nullopt);
```
* sync_wait[link sync_wait.md]
* into_variant[link ../execution/into_variant.md]
* std::move[link /reference/utility/move.md]
* get<0>[link /reference/tuple/tuple/get.md]
* nullopt[link /reference/optional/nullopt_t.md]


## カスタマイゼーションポイント
入力[Sender](../execution/sender.md)`sndr`に[関連付けられた実行ドメイン](../execution/get-domain-early.md)`dom`に対して、
[`execution::apply_sender`](../execution/apply_sender.md)経由で`dom.apply_sender(sync_wait_with_variant, sndr)`が呼ばれる。

[デフォルト実行ドメイン](../execution/default_domain.md)では、`sync_wait_with_variant.apply_sender(sndr)`が呼ばれる。

下記を満たさない場合、呼び出し式`this_thread::sync_wait_with_variant(sndr)`の動作は未定義となる。

- 指定したSenderが完了するまで、前方進行保証委任(forward progress guarantee delegation)による現在のスレッドをブロックすること。
- 指定したSenderの非同期操作の結果が返る場合
    - [値完了](../execution/set_value.md)の場合、結果データは[`optional`](/reference/optional/optional.md)オブジェクト内の[`tuple`](/reference/tuple/tuple.md)の[`variant`](/reference/variant/variant.md)で返されること。
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
  auto result = std::this_thread::sync_wait_with_variant(sndr);
  // 結果型optional<variant<tuple<int,char>>>からtupleを取り出す
  auto tup = get<0>(result.value());
  std::println("result={}", tup);
}
```
* std::this_thread::sync_wait_with_variant[color ff0000]
* ex::sender[link ../execution/sender.md]
* ex::just[link ../execution/just.md]
* get<0>[link /reference/variant/variant/get.md]
* value()[link /reference/optional/optional/value.md]

### 出力
```
result=(100, 'X')
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
- [`this_thread::sync_wait`](sync_wait.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
