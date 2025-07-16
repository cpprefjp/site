# transform_sender
* execution[meta header]
* function template[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  template<class Domain, sender Sndr, queryable... Env>
    requires (sizeof...(Env) <= 1)
  constexpr sender decltype(auto) transform_sender(Domain dom, Sndr&& sndr, const Env&... env)
    noexcept(see below);
}
```
* sender[link sender.md]
* queryable[link ../queryable.md]

## 概要
[実行ドメイン](default_domain.md)に応じて[Sender](sender.md)を変換する。
Senderオブジェクトの構築時、Senderと[Receiver](receiver.md)間[接続(connect)](connect.md)時のカスタマイゼーションポイントとして機能する。

型変換ではSender型の変換が行われなくなる（恒等変換となる）まで、下記のカスタマイゼーションポイントを再帰的に呼び出す。

- 定義されていれば、`dom.transform_sender`メンバ関数に変換動作を委譲する。
- そうでなければ、デフォルト実行ドメイン[`transform_sender`](default_domain/transform_sender.md)に変換動作を委譲する。


## 戻り値
説明用の式`transformed-sndr`を次の通りとする。

- 適格であるならば、式`dom.transform_sender(`[`std::forward`](/reference/utility/forward.md)`<Sndr>(sndr), env...)`
- そうでなければ、[`default_domain()`](default_domain.md)`.`[`transform_sender`](default_domain/transform_sender.md)`(`[`std::forward`](/reference/utility/forward.md)`<Sndr>(sndr), env...)`

説明用の式`final-sndr`を次の通りとする。

- `sndr`と`transformed-sndr`の型がCV修飾を無視して同一ならば、`transformed-sndr`
- そうでなければ、式`transform_sender(dom, transformed-sndr, env...)`（再帰適用）

`final-sndr`を返す。


## 例外
`noexcept(final-sndr) == true`ならば、例外を投げない。
そうでなければ、Sender変換過程で送出される例外。


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
- [P2999R3 Sender Algorithm Customization](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2999r3.html)
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
