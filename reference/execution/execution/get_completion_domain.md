# get_completion_domain
* execution[meta header]
* cpo[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  template<class CPO = void>
  struct get_completion_domain_t { unspecified };

  template<class CPO = void>
  inline constexpr get_completion_domain_t<CPO> get_completion_domain{};
}
```
* unspecified[italic]

## 概要
`get_completion_domain<completion-tag>`は、[Sender](sender.md)の[属性](get_env.md)から指定完了タグに関連付けられた完了ドメインを取得する[クエリオブジェクト](../queryable.md)である。

コア定数式[`forwarding_query`](../forwarding_query.md)`(get_completion_domain<completion-tag>)`は`true`値を返す。


## 効果
式`attrs`とパック`envs`に対して、完了タグ`completion-tag`が[`set_value_t`](set_value.md)／[`set_error_t`](set_error.md)／ [`set_stopped_t`](set_stopped.md)のいずれでもなければ、呼び出し式`get_completion_domain<completion-tag>(attrs, envs...)`は不適格となる。
そうでなければ、型`D`を下記の通りとして、呼び出し式は[`MANDATE-NOTHROW`](MANDATE-NOTHROW.md)`(D())`と等価である。

- 式が適格ならば[`TRY-QUERY`](../queryable.md)`(attrs, get_completion_domain<completion-tag>, envs...)`の型。
- そうではなく、`completion-tag`が`void`のとき、式`get_completion_domain<set_value_t>(attrs, envs...)`の型。
- そうではなく、下記の式が適格ならばその型。

    ```cpp
    TRY-QUERY(get_completion_scheduler<completion-tag>(attrs, envs...),
              get_completion_domain<set_value_t>, envs...)
    ```
    * TRY-QUERY[link ../queryable.md]
    * get_completion_scheduler[link get_completion_scheduler.md]
    * set_value_t[link set_value.md]

- そうではなく、[`scheduler`](scheduler.md)`<decltype((attrs))>`が`true`かつ`envs`が空のパックではないとき、[`default_domain`](default_domain.md)
- そうでなければ、呼び出し式`get_completion_domain<completion-tag>(attrs, envs...)`は不適格となる。


## 例外
投げない


## カスタマイゼーションポイント
[クエリ可能オブジェクト](../queryable.md)`q`を`attrs`としたとき、式[`AS-CONST`](AS-CONST.md)`(q).query(get_completion_domain<completion-tag>, envs...)`が適格ならば呼び出される。
そうでなければ、`q`を[`get_completion_scheduler`](get_completion_scheduler.md)で取得される[完了Scheduler](scheduler.md)として、同様に式が適格ならば呼び出す。

型`Tag`、式`sndr`、パック`envs`に対して、`CS`を[`completion_signatures_of_t`](completion_signatures_of_t.md)`<`[`decay_t`](/reference/type_traits/decay.md)`<decltype((sndr))>, decltype((envs))...>`とする。`get_completion_domain<Tag>(`[`get_env`](get_env.md)`(sndr), envs...)`と`CS`が両者とも適格、かつ`CS().`[`count-of`](completion_signatures.md)`(Tag()) == 0`が`true`のとき、プログラムは不適格となる。

`completion-fn`を完了関数、`completion-tag`を完了関数に関連付けられた完了タグ、`args`と`envs`を部分式のパック、式`sndr`を[`sender`](sender.md)`<decltype((sndr))>`が`true`かつ`get_completion_domain<completion-tag>(`[`get_env`](get_env.md)`(sndr), envs...)`となる式、`D`をドメインタグとする。`sndr`と[Receiver](receiver.md)`rcvr`を接続して作成された非同期操作が完了関数`completion-fn(rcvr, args...)`を評価するとき、その評価が実行ドメインタグ`D`に関連付けられた実行リソースの実行エージェント上で行われない場合、動作は未定義となる。


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`execution::default_domain`](default_domain.md)
- [`execution::get_domain`](get_domain.md)


## 参照
- [P3826R5 Fix Sender Algorithm Customization](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3826r5.html)
