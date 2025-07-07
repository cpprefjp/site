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

下記をみたすクラス型はSenderとみなせる。

- 下記いずれかを満たす
    - `sender_t`をメンバ型`Sndr::sender_concept`として定義する
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
* get_env[link get_env.md]
* queryable[link ../queryable.md]
* constructible_from[link /reference/concepts/constructible_from.md]


## 備考
`sender`コンセプトの制約式に現れる第1項`bool(enable-sender<...>)`は[原子制約(atomic constraint)](/lang/cpp20/concepts.md)を構成する。
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
