# is-awaitable
* execution[meta header]
* concept[meta id-type]
* std[meta namespace]
* cpp26[meta cpp]

```cpp
template<class C, class Promise>
concept is-awaitable;
```

## 概要
`is-awaitable`は、Promise型をもつ[コルーチンのco_await演算子](/lang/cpp20/coroutines.md)オペランドにおいて`C`型オブジェクトが妥当であることを表す説明専用コンセプトである。


## 要件
説明用の式`GET-AWAITER(c, p)`を、Promise型`p`をもつコルーチン内の`co_await`演算子オペランドに適用される一連変換後の左辺値とする。

- （有効ならば）Promise型の`await_transform`メンバ関数を適用
- （有効ならば）`co_await`演算子オーバーロードを適用

また、説明用のコンセプト`await-suspend-result`, `is-awaiter`を以下のように定義する。

```cpp
template<class T>
concept await-suspend-result = /*see below*/;

template<class A, class Promise>
concept is-awaiter =
  requires (A& a, coroutine_handle<Promise> h) {
    a.await_ready() ? 1 : 0;
    { a.await_suspend(h) } -> await-suspend-result;
    a.await_resume();
  };
```
* coroutine_handle[link /reference/coroutine/coroutine_handle.md]

下記いずれかのうち1つが`true`のとき、`await-suspend-result<T>`は`true`となる。

- `T`が`void`、もしくは
- `T`が`bool`、もしくは
- `T`が[`coroutine_handle`](/reference/coroutine/coroutine_handle.md)の特殊化

`is-awaitable`コンセプトは、以下のように定義される。

```cpp
template<class C, class Promise>
concept is-awaitable =
  requires (C (*fc)() noexcept, Promise& p) {
    { GET-AWAITER(fc(), p) } -> is-awaiter<Promise>;
  };
```
* GET-AWAITER[italic]


## バージョン
### 言語
- C++26


## 関連項目
- [コルーチン](/lang/cpp20/coroutines.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
