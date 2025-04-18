# apply_sender
* execution[meta header]
* function template[meta id-type]
* std::execution[meta namespace]
* default_domain[meta class]
* cpp26[meta cpp]

```cpp
template<class Tag, sender Sndr, class... Args>
constexpr decltype(auto) apply_sender(Tag, Sndr&& sndr, Args&&... args)
  noexcept(see below);
```
* sender[link ../sender.md]
* see below[italic]

## 概要
Senderアルゴリズム適用のデフォルト動作。
[`execution​::apply_sender`](../apply_sender.md.nolink)に対するスタマイゼーションポイントとして機能する。

[Senderのタグ型](../tag_of_t.md.nolink)`Tag`に対して、`apply_sender`メンバ関数を呼び出す。


## テンプレートパラメータ制約
説明用の式`e`を`Tag().apply_sender(`[`std::forward`](/reference/utility/forward.md)`<Sndr>(sndr), `[`std::forward`](/reference/utility/forward.md)`<Args>(args)...)`としたとき、が適格であること。


## 戻り値
`e`を返す。


## 例外
`noexcept(e)`が`true`であれば、例外を投げない。
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
- [`execution​::apply_sender`](../apply_sender.md.nolink)


## 参照
- [P2999R3 Sender Algorithm Customization](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2999r3.html)
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
