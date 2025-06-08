# transform_completion_signatures
* execution[meta header]
* std::execution[meta namespace]
* type-alias[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  template<
    valid-completion-signatures InputSignatures,
    valid-completion-signatures AdditionalSignatures = completion_signatures<>,
    template<class...> class SetValue = default-set-value,
    template<class> class SetError = default-set-error,
    valid-completion-signatures SetStopped = completion_signatures<set_stopped_t()>>
  using transform_completion_signatures = completion_signatures<see below>;
}
```
* valid-completion-signatures[link completion_signatures.md]
* completion_signatures[link completion_signatures.md]
* set_stopped_t()[link set_stopped.md]
* see below[italic]

## 概要
[完了シグネチャ集合](completion_signatures.md)から別の完了シグネチャ集合へ変換するエイリアステンプレート。

テンプレートパラメータとして完了シグネチャ集合と、各完了シグネチャに対して型変更を適用する複数のテンプレート引数をとり、[`completion_signatures`](completion_signatures.md)の新しい特殊化を生成する。

- `InputSignatures` : 変換元の入力完了シグネチャ集合
- `AdditionalSignatures` : 追加される完了シグネチャ集合（下記3種の変換適用後に追加される）
- `SetValue` : [値完了シグネチャ](set_value.md)集合に適用する型変換メタ操作
- `SetError` : [エラー完了シグネチャ](set_value.md)集合に適用する型変換メタ操作
- `SetStopped` : [停止完了シグネチャ](set_stopped.md)を置換する完了シグネチャ集合


### 詳細仕様
説明専用のエイリアステンプレート`default-set-value`, `default-set-error`を次の通り定義する。
```cpp
template<class... As>
using default-set-value =
  completion_signatures<set_value_t(As...)>;

template<class Err>
using default-set-error =
  completion_signatures<set_error_t(Err)>;
```
* completion_signatures[link completion_signatures.md]
* set_value_t[link set_value.md]
* set_error_t[link set_error.md]

説明用のパック型`As`に対して、エイリアステンプレート`SetValue<As...>`を不適格、もしくは[`valid-completion-signatures`](completion_signatures.md)`<SetValue<As...>>`を満たす型とする。
説明用の型`Err`に対して、エイリアステンプレート`SetError<Err>`を不適格、もしくは[`valid-completion-signatures`](completion_signatures.md)`<SetError<Error>>`を満たす型とする。

説明用のパック`Vs`を、[`gather-signatures`](gather-signatures.md)`<`[`set_value_t`](set_value.md)`, InputSignatures, SetValue,` [`type-list`](type-list.md)`>`で得られる`type-list`の型パラメータパックとする。

説明用のパック`Es`を、[`gather-signatures`](gather-signatures.md)`<`[`set_error_t`](set_error.md)`, InputSignatures,` [`type_identity_t`](/reference/type_traits/type_identity.md)`, error-list>`で得られる[`type-list`](type-list.md)の型パラメータパックとする。ここでエイリアステンプレート`error-list<Ts...>`は`type-list<SetError<Ts>...>`とする。

[`gather-signatures`](gather-signatures.md)`<`[`set_stopped_t`](set_stopped.md)`, InputSignatures, type-list, type-list>`が[`type-list<>`](type-list.md)となるならば、説明用のパック`Ss`を[`completion_signatures<>`](completion_signatures.md)とする。そうでなければ、`Ss`を`SetStopped`とする。

上記いずれかの型が不適格となる場合、下記は不適格となる。

```cpp
transform_completion_signatures<
  InputSignatures, AdditionalSignatures,
  SetValue, SetError, SetStopped>
```

そうでなければ、集合`AdditionalSignatures`, `Vs...`, `Es...`, `Ss`に含まれる[`completion_signatures`](completion_signatures.md)特殊化のテンプレート引数型の一意な集合を`Sig...`としたとき、`transform_completion_signatures`は[`completion_signatures`](completion_signatures.md)`<Sigs...>`のエイリアスとなる。


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`execution::completion_signatures`](completion_signatures.md)
- [`execution::transform_completion_signatures_of`](transform_completion_signatures_of.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
