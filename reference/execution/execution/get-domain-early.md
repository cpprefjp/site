# get-domain-early
* execution[meta header]
* function template[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
template<class Sndr>
constexpr auto get-domain-early(const Sndr& sndr) noexcept;
```

## 概要
[Sender](sender.md)アルゴリズム構築時のカスタマイゼーションポイントとして、[実行ドメイン](default_domain.md)を取得する説明専用の関数テンプレート。

下記の優先順で実行ドメインを検索し、最初に適格となる型を採用する。

- Senderの[属性](../queryable.md)の実行ドメイン
- Senderの[完了Scheduler](get_completion_scheduler.md)の実行ドメイン
- [デフォルト実行ドメイン](default_domain.md)


## 効果
説明用の型`Domain`を下記リストのうち最初に適格となる式の型と定義したとき、`return Doamin();`と等価。

- [`get_domain`](get_domain.md)`(`[`get_env`](get_env.md)`(sndr))`
- [`completion-domain`](completion-domain.md)`(sndr)`
- [`default_domain()`](default_domain.md)


## 例外
投げない


## バージョン
### 言語
- C++26


## 関連項目
- [`this_thread::sync_wait`](../this_thread/sync_wait.md)
- [`this_thread::sync_wait_with_variant`](../this_thread/sync_wait_with_variant.md)


## 参照
- [P2999R3 Sender Algorithm Customization](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2999r3.html)
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
