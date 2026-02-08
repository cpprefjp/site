# completion-domain
* [meta exposition-only]
* execution[meta header]
* function template[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
template<class Default = default_domain, class Sndr>
constexpr auto completion-domain(const Sndr& sndr) noexcept;
```
* default_domain[link default_domain.md]

## 概要
[Sender](sender.md)`sndr`の[完了Scheduler](get_completion_scheduler.md)から[実行ドメイン](default_domain.md)を取得する説明専用の関数テンプレート。


## 効果
説明用の型`COMPL-DOMAIN(T)`を式[`get_domain`](get_domain.md)`(`[`get_completion_scheduler`](get_completion_scheduler.md)`<T>(`[`get_env`](get_env.md)`(sndr)))`の型とする。

- 型`COMPL-DOMAIN(`[`set_value_t`](set_value.md)`)`、`COMPL-DOMAIN(`[`set_error_t`](set_error.md)`)`、`COMPL-DOMAIN(`[`set_stopped_t`](set_stopped.md)`)`の全てが不適格の場合、`completion-domain<Default>`は`Default`型のデフォルト構築されたprvalueとなる。
- そうではなく、上記のうち不適格となる型を除いた型が[共通型](/reference/type_traits/common_type.md)を共有するならば、`completion-domain<Default>`はその共通型のデフォルト構築されたprvalueとなる。
- そうでなければ、`completion-domain<Default>`は不適格となる。


## 例外
投げない


## バージョン
### 言語
- C++26


## 関連項目
- [`get-domain-early`](get-domain-early.md)
- [`get-domain-late`](get-domain-late.md)


## 参照
- [P2999R3 Sender Algorithm Customization](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2999r3.html)
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
