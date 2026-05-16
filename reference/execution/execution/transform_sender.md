# transform_sender
* execution[meta header]
* function template[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  template<sender Sndr, queryable Env>
  constexpr decltype(auto) transform_sender(Sndr&& sndr, const Env& env)
    noexcept(see below);
}
```
* sender[link sender.md]
* queryable[link ../queryable.md]

## 概要
[実行ドメイン](default_domain.md)に応じて[Sender](sender.md)を変換する。
Senderと[Receiver](receiver.md)間[接続(connect)](connect.md)時のカスタマイゼーションポイントとして機能する。


## 戻り値
式`s`に対して、`start-domain`を`D()`とする。ここで`D`を適格であるならば式[`get_domain`](get_domain.md)`(env)`のdecay型、そうでなければ[`default_domain`](default_domain.md)とする。

また`completion-domain(s)`を`D()`とする。ここで`D`を適格であるならば式[`get_completion_domain<>`](get_completion_domain.md)`(`[`get_env`](get_env.md)`(s), env)`のdecay型、そうでなければ[`default_domain`](default_domain.md)とする。

説明用の式`transformed-sndr(dom, tag, s)`を次の通りとする。

- 適格であるならば、式`dom.transform_sender(tag, s, env)`
- そうでなければ、[`default_domain()`](default_domain.md)`.`[`transform_sender`](default_domain/transform_sender.md)`(tag, s, env)`

説明用の式`transform-recurse(dom, tag, s)`を次の通りとする。

- `transformed-sndr(dom, tag, s)`と`s`の型がCV修飾を無視して同一ならば、式`transformed-recurse(dom, tag, s)`
- そうではなく`tag`が[`start`](start.md)のとき、`s2`を`transformed-sndr(dom, tag, s)`、`dom2`を`start-domain`として式`transform-recurse(dom2, tag, s2)`
- そうでなければ、式`completion-domain(s2)`

説明用の式`tmp-sndr`を`transform-recurse(completion-domain(sndr),` [`set_value`](set_value.md)`, sndr)`、式`final-sndr`を`transform-recurse(start-domain,` [`start`](start.md)`, tmp-sndr)`とする。

`final-sndr`を返す。


## 例外
例外指定は`noexcept(final-sndr)`に等しい。


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`default_domain::transform_sender`](default_domain/transform_sender.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
- [P3826R5 Fix Sender Algorithm Customization](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3826r5.html)
