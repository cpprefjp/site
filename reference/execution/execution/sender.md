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

  template<class Sndr>
  inline constexpr bool enable_sender = see below;
}
```

## 概要
`sender`は、型`Sndr`がSender型の要件を満たすことを表すコンセプトである。

下記をみたすクラス型はSenderとみなせる。

- 下記いずれかを満たす
    - `sender_t`をメンバ型`Sndr::sender_concept`として定義する
    - `enable_sender`変数テンプレートを`true`で特殊化する
    - [コルーチンのAwaitable型](/lang/cpp20/coroutines.md)
- [`get_env`](get_env.md)で[属性](../queryable.md)を取得できる
- ムーブ可能


## 要件
説明専用コンセプト`is-sender`, `enable-sender`を以下のように定義する。

```cpp
template<class Sndr>
concept is-sender =
  derived_from<typename Sndr::sender_concept, sender_t>;

template<class Sndr>
concept enable-sender =
  is-sender<Sndr> ||
  is-awaitable<Sndr, env-promise<env<>>>;
```
* derived_from[link /reference/concepts/derived_from.md]
* is-awaitable[link ../is-awaitable.md]
* env-promise[link env-promise.md]
* env<>[link env.md]

`enable_sender`変数テンプレートを以下のように定義する。

```cpp
template<class Sndr>
inline constexpr bool enable_sender = enable-sender<Sndr>;
```

`sender`コンセプトは、以下のように定義される。

```cpp
template<class Sndr>
concept sender =
  enable_sender<remove_cvref_t<Sndr>>) &&
  requires (const remove_cvref_t<Sndr>& sndr) {
    { get_env(sndr) } -> queryable;
  } &&
  move_constructible<remove_cvref_t<Sndr>> &&
  constructible_from<remove_cvref_t<Sndr>, Sndr>;
```
* get_env[link get_env.md]
* queryable[link ../queryable.md]
* constructible_from[link /reference/concepts/constructible_from.md]


## 備考
プログラム定義型が`sender`コンセプトを満たす場合、ユーザは`enable_sender`変数テンプレートを`true`として特殊化してもよい。そのような特殊化は定数式で利用可能かつ`const bool`型をもつこと。


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
* ex::just[link just.md]

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
- [LWG 4202. enable-sender should be a variable template](https://cplusplus.github.io/LWG/issue4202)
