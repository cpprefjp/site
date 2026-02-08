# get-domain-late
* [meta exposition-only]
* execution[meta header]
* function template[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
template<class Sndr, class Env>
constexpr auto get-domain-late(const Sndr& sndr, const Env& env) noexcept;
```

## 概要
[Sender](sender.md)と[Receiver](receiver.md)間[接続(connect)](connect.md)時のカスタマイゼーションポイントとして、[実行ドメイン](default_domain.md)を取得する説明専用の関数テンプレート。

下記の優先順で実行ドメインを検索し、最初に適格となる型を採用する。
（Senderアルゴリズム[`continues_on`](continues_on.md)のみ引数に指定した[Scheduler](scheduler.md)から取得。）

- Senderの[属性](../queryable.md)の実行ドメイン
- Senderの[完了Scheduler](get_completion_scheduler.md)の実行ドメイン
- Receiverの[環境](../queryable.md)の実行ドメイン
- Receiver環境の[Scheduler](scheduler.md)の実行ドメイン
- [デフォルト実行ドメイン](default_domain.md)


## 効果
説明用の型`Domain`を下記の通り定義したとき、`return Domain();`と等価。

- [`sender-for`](sender-for.md)`<Sndr,` [`continues_on_t`](continues_on.md)`> == true`のとき、次のラムダ式呼び出し結果の型とする。

    ```cpp
    [] {
      auto [_, sch, _] = sndr;
      return query-with-default(get_domain, sch, default_domain());
    }();
    ```
    * query-with-default[link query-with-default.md]
    * get_domain[link get_domain.md]
    * default_domain()[link default_domain.md]

- それ以外のとき、下記リストのうち最初に適格となる式の型、かつ`void`ではない型とする。
    - [`get_domain`](get_domain.md)`(`[`get_env`](get_env.md)`(sndr))`
    - [`completion-domain<void>`](completion-domain.md)`(sndr)`
    - [`get_domain`](get_domain.md)`(env)`
    - [`get_domain`](get_domain.md)`(`[`get_scheduler`](get_scheduler.md)`(env))`
    - [`default_domain()`](default_domain.md)


## 例外
投げない


## 備考
Senderアダプタ[`continues_on`](continues_on.md)は[`schedule_from`](schedule_from.md)と連携して、実行コンテキスト遷移制御のカスタマイゼーションポイントをSchedulerに提供する。


## バージョン
### 言語
- C++26


## 関連項目
- [`execution::connect`](connect.md)
- [`execution::continues_on`](continues_on.md)
- [`execution::get_completion_signatures`](get_completion_signatures.md)


## 参照
- [P2999R3 Sender Algorithm Customization](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2999r3.html)
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
