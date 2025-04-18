# apply_sender
* execution[meta header]
* function template[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  template<class Domain, class Tag, sender Sndr, class... Args>
  constexpr decltype(auto) apply_sender(Domain dom, Tag, Sndr&& sndr, Args&&... args)
    noexcept(see below);
}
```
* sender[link sender.md]
* see below[italic]

## 概要
[実行ドメイン](default_domain.md)に応じてSenderアルゴリズムを適用する。
Senderアルゴリズム動作のカスタマイゼーションポイントとして機能する。

- 定義されていれば、`dom.apply_sender`メンバ関数に適用動作を委譲する。
- そうでなければ、デフォルト実行ドメイン[`apply_sender`](default_domain/apply_sender.md)に適用動作を委譲する。


## テンプレートパラメータ制約
説明用の式`e`を次の通りとしたとき、式`e`が適格であること。

- 適格ならば、式`dom.apply_sender(Tag(),` [`std::forward`](/reference/utility/forward.md)`<Sndr>(sndr),` [`std::forward`](/reference/utility/forward.md)`<Args>(args)...)`
- そうでなければ、[`default_domain()`](default_domain.md)`.`[`apply_sender`](default_domain/apply_sender.md)`(Tag(),` [`std::forward`](/reference/utility/forward.md)`<Sndr>(sndr),` [`std::forward`](/reference/utility/forward.md)`<Args>(args)...)`


## 戻り値
`e`を返す。


## 例外
`noexcept(e) == true`ならば、例外を投げない。
そうでなければ、式`e`から送出される例外。


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`default_domain::apply_sender`](default_domain/apply_sender.md)


## 参照
- [P2999R3 Sender Algorithm Customization](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2999r3.html)
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
