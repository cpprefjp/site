# receiver_of
* execution[meta header]
* concept[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  template<class Rcvr, class Completions>
  concept receiver_of;
}
```

## 概要
`receiver_of`は、[Receiver型](receiver.md)`Rcvr`が[完了シグネチャ集合](completion_signatures.md)`Completions`に適合することを表すコンセプトである。


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
* callable[link /reference/functional/callable.md.nolink]
* completion_signatures[link completion_signatures.md]

`receiver_of`コンセプトは、以下のように定義される。

```cpp
template<class Rcvr, class Completions>
concept receiver_of =
  receiver<Rcvr> && has-completions<Rcvr, Completions>;
```
* receiver<Rcvr>[link receiver.md]


## 例
```cpp example
#include <execution>
namespace ex = std::execution;

struct MyReceiver {
  using receiver_concept = ex::receiver_t;

  void set_value(int, int) && noexcept;
  void set_error(int) && noexcept;
};

int main()
{
  // 完了操作ex::set_value(int, int)に対応
  static_assert(ex::receiver_of<MyReceiver,
    ex::completion_signatures<ex::set_value_t(int, int)>>);

  // 完了操作ex::set_value(int)には非対応
  static_assert(not ex::receiver_of<MyReceiver,
    ex::completion_signatures<ex::set_value_t(int)>>);

  // 完了操作ex::set_error(int)に対応
  static_assert(ex::receiver_of<MyReceiver,
    ex::completion_signatures<ex::set_error_t(int)>>);

  // 完了操作ex::set_stopped()には非対応
  static_assert(not ex::receiver_of<MyReceiver,
    ex::completion_signatures<ex::set_stopped_t()>>);
}
```
* ex::receiver_of[color ff0000]
* ex::receiver_t[link receiver.md]
* ex::completion_signatures[link completion_signatures.md]
* ex::set_value_t[link set_value.md]
* ex::set_error_t[link set_error.md]
* ex::set_stopped_t[link set_stopped.md]

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
- [`execution::receiver`](receiver.md)
- [`execution::set_value_t`](set_value.md)
- [`execution::set_error_t`](set_error.md)
- [`execution::set_stopped_t`](set_stopped.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
