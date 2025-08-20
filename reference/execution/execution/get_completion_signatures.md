# get_completion_signatures
* execution[meta header]
* function template[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  template<class Sndr, class... Env>
  consteval auto get_completion_signatures() -> valid-completion-signatures auto;
}
```
* valid-completion-signatures[link completion_signatures.md]

## 概要
`get_completion_signatures`は、[Sender](sender.md)の[完了シグネチャ集合](completion_signatures.md)を取得する関数テンプレートである。

### 非依存Sender
[環境](../queryable.md)に依存することなく完了シグネチャ集合が決定するSenderは、非依存Sender(non-dependent sender)と呼ばれる。

型`Sndr`に対して[`sender`](sender.md)`<Sndr> == true`かつ[`dependent_sender`](dependent_sender.md)`<Sndr> == false`の場合、`Sndr`は非依存Senderである。


## テンプレートパラメータ制約
`sizeof...(Env) <= 1`


## 効果
説明用の式`except`を、[`move_constructible`](/reference/concepts/move_constructible.md)`<Except> &&` [`derived_from`](/reference/concepts/derived_from.md)`<Except,` [`exception`](/reference/exception/exception.md)`>`が`true`となる未規定なクラス`Except`の右辺値とする。`e`がコア定数式かつその型が[`valid-completion-signatures`](completion_signatures.md)を満たすならば、式`CHECKED-COMPLSIGS(e)`を`e`とする。そうでなければ下記の式となる。

```cpp
(e, throw except, completion_signatures())
```
* completion_signatures[link completion_signatures.md]

説明用の式`get-complsigs<Sndr, Env...>()`を、[`remove_reference_t`](/reference/type_traits/remove_reference.md)`<Sndr>::template get_completion_signatures<Sndr, Env...>()`と等価な式とする。

`sizeof...(Env) == 0`が`true`ならば、説明用の型`NewSndr`を`Sndr`とする。そうでなければ、下記の通り定義される式`s`を用いて`decltype(s)`とする。

```cpp
transform_sender(
  get-domain-late(declval<Sndr>(), declval<Env>()...),
  declval<Sndr>(),
  declval<Env>()...)
```
* transform_sender[link transform_sender.md]
* get-domain-late[link get-domain-late.md]

下記の通り定義される式`e`を用いて、`return e;`と等価。

- 式`get-complsigs<NewSndr, Env...>()`が適格であるならば、`CHECKED-COMPLSIGS(get-complsigs<NewSndr, Env...>())`
- そうではなく、式`get-complsigs<NewSndr>()`が適格であるならば、`CHECKED-COMPLSIGS(get-complsigs<NewSndr>())`
- そうではなく、[`is-awaitable`](../is-awaitable.md)`<NewSndr,` [`env-promise`](env-promise.md)`<Env>...> == true`ならば

    ```cpp
    completion_signatures<
      SET-VALUE-SIG(await-result-type<NewSndr, env-promise<Env>...>),
      set_error_t(exception_ptr),
      set_stopped_t()>
    ```
    * completion_signatures[link completion_signatures.md]
    * SET-VALUE-SIG[link set_value.md]
    * await-result-type[link connect.md]
    * env-promise[link env-promise.md]
    * set_error_t[link set_error.md]
    * exception_ptr[link /reference/exception/exception_ptr.md]
    * set_stopped_t[link set_stopped.md]

- そうではなく、`sizeof...(Env) == 0`ならば、`(throw dependent-sender-error(),` [`completion_signatures()`](completion_signatures.md)`)`
    - 型`dependent-sender-error`は、[`dependent_sender_error`](dependent_sender_error.md)もしくは`dependent_sender_error`から曖昧さなく公開派生された未規定の型とする。
- そうでなければ、`(throw except,` [`completion_signatures()`](completion_signatures.md)`)`

説明用の式`rcvr`を[`receiver`](receiver.md)のモデルである型`Rcvr`の右辺値、型`Sndr`を[`sender_in`](sender_in.md)`<Sndr,` [`env_of_t`](env_of_t.md)`<Rcvr>> == true`となる型とする。
`Sigs...`を[`completion_signatures_of_t`](completion_signatures_of_t.md)`<Sndr,` [`env_of_t`](env_of_t.md)`<Rcvr>>`による[`completion_signatures`](completion_signatures.md)特殊化のテンプレートパラメータと定義する。
`CSO`を完了関数とする。

Sender型`Sndr`、もしくは式`CSO(rcvr, args...)`を呼び出す[Operation State](operation_state.md)が潜在的に例外送出するならば、`Sigs...`の完了シグネチャ`Sig`は次の式が`true`となるべき。

```cpp
MATCHING-SIG(decayed-typeof<CSO>(decltype(args)...), Sig)
```
* MATCHING-SIG[italic]
* decayed-typeof[link /reference/functional/decayed-typeof.md]

説明用の関数型`F1`, `F2`をそれぞれ`R1(Args1...)`, `R2(Args2...)`としたとき、説明専用の式`MATCHING-SIG(F1, F2)`は、[`same_as`](/reference/concepts/same_as.md)`<R1(Args1&&...), R2(Args&&...)> == true`となる場合にかぎって`true`となる。


## 例
```cpp
#include <print>
#include <execution>
namespace ex = std::execution;

int main()
{
  // 値42を送信するSender
  ex::sender auto sndr = ex::just(42);

  // 値完了シグネチャ set_value_t(int)
  auto sigs = ex::get_completion_signatures<decltype(sndr)>();
  static_assert(std::same_as<decltype(sigs),
    ex::completion_signatures<ex::set_value_t(int)>>);
}
```
* ex::get_completion_signatures[color ff0000]
* ex::sender[link sender.md]
* ex::just[link just.md]
* ex::completion_signatures[link completion_signatures.md]
* ex::set_value_t[link set_value.md]

### 出力
```
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`execution::sender`](sender.md)
- [`execution::dependent_sender`](dependent_sender.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
- [P3557R3 High-Quality Sender Diagnostics with Constexpr Exceptions](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3557r3.html)
