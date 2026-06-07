# receiver-of
* execution[meta header]
* concept[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  template<class Rcvr, class Completions>
  concept receiver-of =
    receiver<Rcvr> && has-completions<Rcvr, Completions>;
}
```
* receiver<Rcvr>[link receiver.md]

## 概要
`receiver-of`は、[Receiver型](receiver.md)`Rcvr`が[完了シグネチャ集合](completion_signatures.md)`Completions`に適合することを表す説明専用のコンセプトである。


## 要件
説明専用コンセプト`valid-completion-for`, `has-completions`を以下のように定義する。

```cpp
template<class Signature, class Rcvr>
concept valid-completion-for =
  requires (Signature* sig) {
    []<class Tag, class... Args>(Tag(*)(Args...))
      requires callable<Tag, remove_cvref_t<Rcvr>, Args...>
    {}(sig);
  };

template<class Rcvr, class Completions>
concept has-completions =
  requires (Completions* completions) {
    []<valid-completion-for<Rcvr>...Sigs>(completion_signatures<Sigs...>*)
    {}(completions);
  };
```
* callable[link /reference/functional/callable.md]
* completion_signatures[link completion_signatures.md]


## バージョン
### 言語
- C++26


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
- [P4159R0 Make `sender_in` and `receiver_of` exposition-only](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p4159r0.html)
