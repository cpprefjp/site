# get_completion_signatures
* execution[meta header]
* cpo[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  struct get_completion_signatures_t;
  inline constexpr get_completion_signatures_t get_completion_signatures{};
}
```

## 概要
`get_completion_signatures`は、[Sender](sender.md)の[完了シグネチャ集合](completion_signatures.md)を取得するカスタマイゼーションポイントオブジェクトである。


## 効果
説明用の`sndr`を`decltype((sndr))`が`Sndr`型となる式、`env`を`decltype((env))`が`Env`型となる式とする。
式`new_sndr`を[`transform_sender`](transform_sender.md)`(decltype(`[`get-domain-late`](get-domain-late.md)`(sndr, env)){}, sndr, env)`とし、型`NewSndr`を`decltype((new_sndr))`とする。

式`get_completion_signatures(sndr, env)`は、`void(sndr)`と`void(env)`が不定順で序列化(indeterminately sequenced)されることを除いて`(void(sndr), void(env), CS())`と等価である。

ここで、説明用の型`CS`は下記の通り定義される。

- 型が適格であるならば、`decltype(new_sndr.get_completion_signatures(env))`
- そうではなく、型が適格であるならば[`remove_cvref_t`](/reference/type_traits/remove_cvref.md)`<NewSndr>::completion_signatures`
- そうではなく、[`is-awaitable`](../is-awaitable.md)`<NewSndr,` [`env-promise`](env-promise.md)`<Env>> == true`ならば

    ```cpp
    completion_signatures<
      SET-VALUE-SIG(await-result-type<NewSndr, env-promise<Env>>),
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

- そうでなければ、`CS`は不適格となる。


## カスタマイゼーションポイント
- Sender`sndr`[変換後](transform_sender.md)の`new_sndr`に対して、`new_sndr.get_completion_signatures(env)`が返す型。
- 変換後Senderの型`NewSndr`に対して、メンバ型`completion_signatures`。


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
  auto sigs = ex::get_completion_signatures(sndr, ex::env<>{});
  static_assert(std::same_as<decltype(sigs),
    ex::completion_signatures<ex::set_value_t(int)>>);
}
```
* ex::get_completion_signatures[color ff0000]
* ex::sender[link sender.md]
* ex::just[link just.md]
* ex::completion_signatures[link completion_signatures.md]
* ex::env<>[link env.md]
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


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
