# sender
* execution[meta header]
* concept[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  template <class Sndr>
  concept sender;

  struct sender_t {};  // タグ型
}
```

## 概要
`sender`は、型`Sndr`がSender型の要件を満たすことを表すコンセプトである。

次のいずれかのクラス型はSenderとみなせる。

- `sender_t`をメンバ型`Sndr::sender_concept`として定義するクラス型
- [コルーチンのAwaitable型](/lang/cpp20/coroutines.md)クラス型


## 要件
説明専用コンセプト`is-sender`, `enable-sender`、説明用クラステンプレート`env-promise`を以下のように定義する。

```cpp
template<class Sndr>
concept is-sender =
  derived_from<typename Sndr::sender_concept, sender_t>;

template<class Sndr>
concept enable-sender =
  is-sender<Sndr> ||
  is-awaitable<Sndr, env-promise<env<>>>;

template<class Env>
struct env-promise : with-await-transform<env-promise<Env>> {
  unspecified get_return_object() noexcept;
  unspecified initial_suspend() noexcept;
  unspecified final_suspend() noexcept;
  void unhandled_exception() noexcept;
  void return_void() noexcept;
  coroutine_handle<> unhandled_stopped() noexcept;

  const Env& get_env() const noexcept;
};
```
* is-awaitable[link ../is-awaitable.md]
* env<>[link env.md.nolink]
* derived_from[link /reference/concepts/derived_from.md]
* coroutine_handle<>[link /reference/coroutine/coroutine_handle.md]
* unspecified[italic]

`sender`コンセプトは、以下のように定義される。

```cpp
template<class Sndr>
concept sender =
  bool(enable-sender<remove_cvref_t<Sndr>>) &&
  requires (const remove_cvref_t<Sndr>& sndr) {
    { get_env(sndr) } -> queryable;
  } &&
  move_constructible<remove_cvref_t<Sndr>> &&
  constructible_from<remove_cvref_t<Sndr>, Sndr>;
```
* get_env[link get_env.md.nolink]
* queryable[link queryable.md.nolink]
* move_constructible[link /reference/concepts/move_constructible.md]
* constructible_from[link /reference/concepts/constructible_from.md]


## 備考
`sender`コンセプトの制約式に現れる第1項`bool(enable-sender<...>)`は[原子制約(atomic contraint)](/lang/cpp20/concepts.md)を構成する。
これによりオーバーロード解決時の優先順比較において`enable-sender`コンセプトの`||`を単純なOR条件とみなせ、コンパイル時の複雑な包摂関係計算コストを抑制できる。


## 例
```cpp example
#include <execution>
namespace ex = std::execution;

int main()
{
  // 値42を送信するSender
  ex::sender auto sndr = ex::just(42);
}
```
* ex::sender[color ff0000]
* ex::just[link just.md.nolink]

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
- [`execution::sender_in`](sender_in.md)
- [`execution::sender_to`](sender_to.md)
- [コルーチン](/lang/cpp20/coroutines.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
