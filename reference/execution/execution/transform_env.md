# transform_env
* execution[meta header]
* function template[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  template<class Domain, sender Sndr, queryable Env>
  constexpr queryable decltype(auto) transform_env(Domain dom, Sndr&& sndr, Env&& env) noexcept;
}
```
* sender[link sender.md]
* queryable[link ../queryable.md]

## 概要
[実行ドメイン](default_domain.md)に応じて[環境](../queryable.md)を変換する。
ユーザ定義実行ドメインにおいて、再帰的Sender変換における補助的なカスタマイゼーションポイントとして機能する。

- 定義されていれば、`dom.transform_env`メンバ関数に変換動作を委譲する。
- そうでなければ、デフォルト実行ドメイン[`transform_env`](default_domain/transform_env.md)に変換動作を委譲する。


## 適格要件
後述する式`e`に対して、`noexcept(e) == true`


## 戻り値
説明用の式`e`を次の通りとし、`e`を返す。

- 適格ならば、式`dom.transform_env(`[`std::forward`](/reference/utility/forward.md)`<Sndr>(sndr),` [`std::forward`](/reference/utility/forward.md)`<Env>(env))`
- そうでなければ、[`default_domain()`](default_domain.md)`.`[`transform_env`](default_domain/transform_env.md)`(`[`std::forward`](/reference/utility/forward.md)`<Sndr>(sndr),` [`std::forward`](/reference/utility/forward.md)`<Env>(env))`


## 例外
投げない。


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`default_domain::transform_env`](default_domain/transform_env.md)


## 参照
- [P2999R3 Sender Algorithm Customization](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2999r3.html)
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
