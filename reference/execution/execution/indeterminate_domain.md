# indeterminate_domain
* execution[meta header]
* class template[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  template<class... Domains>
  struct indeterminate_domain {
    indeterminate_domain() = default;
    constexpr indeterminate_domain(auto&&) noexcept {}
  };
}
```

## 概要
未確定な[完了ドメイン](get_completion_domain.md)を表す。


### 説明専用の式`COMMON-DOMAIN`
部分式のパック`domains...`としたとき、説明専用の式`COMMON-DOMAIN(domains...)`を、適格であるとき[`common_type_t`](/reference/type_traits/common_type.md)`<decltype(auto(domains))...>()`と等価な式とする。そうでなければ、`Ds`を`decltype(auto(domains))...`から重複する型を除外したパックとして、`indeterminate_domain<Ds...>()`と等価な式とする。

### 説明専用の式`COMPL-DOMAIN`
型`Tag`、部分式`sndr`、パック`envs...`としたとき、説明専用の式`COMPL-DOMAIN(Tag, sndr, envs...)`を、式が適格もしくは`envs`が空のパックのとき[`get_completion_domain`](get_completion_domain.md)`<Tag>(`[`get_env`](get_env.md)`(sndr), envs...)`と等価な式とする。そうでなければ、`indeterminate_domain()`と等価な式とする。


## 適格要件
`Domains...`の各型`D`について、式`D().transform_sender(Tag(),` [`std::forward`](/reference/utility/forward.md)`<Sndr>(sndr), env)`が不適格、もしくは[`default_domain()`](default_domain.md)`.`[`transform_sender`](default_domain/transform_sender.md)`(Tag(),` [`std::forward`](/reference/utility/forward.md)`<Sndr>(sndr), env)`と同じ[decayed](/reference/type_traits/decay.md)型を持つこと。


## メンバ関数
| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|-------|
| [`transform_sender`](indeterminate_domain/transform_sender.md) | Sender変換 | C++26 |


## 備考
型`Ds`のパックに対して、[`common_type_t`](/reference/type_traits/common_type.md)`<indeterminate_domain<Domains...>, indeterminate_domain<Ds...>>`は、`Domains...`と`Ds...`の各型を重複なく含むパック`Us`を持つ`indeterminate_domain<Us...>`となる。型`D`が`indeterminate_domain`の特殊化でないとき、[`common_type_t`](/reference/type_traits/common_type.md)`<indeterminate_domain<Domains...>, D>`は`Domains`が空のパックなら`D`、そうでなければ[`common_type_t`](/reference/type_traits/common_type.md)`<indeterminate_domain<Domains...>, indeterminate_domain<D>>`となる。


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`execution::get_completion_domain`](get_completion_domain.md)


## 参照
- [P3826R5 Fix Sender Algorithm Customization](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3826r5.html)
