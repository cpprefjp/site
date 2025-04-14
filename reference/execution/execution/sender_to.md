# sender_to
* execution[meta header]
* concept[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  template<class Sndr, class Rcvr>
  concept sender_to =
    sender_in<Sndr, env_of_t<Rcvr>> &&
    receiver_of<Rcvr, completion_signatures_of_t<Sndr, env_of_t<Rcvr>>> &&
    requires (Sndr&& sndr, Rcvr&& rcvr) {
      connect(std::forward<Sndr>(sndr), std::forward<Rcvr>(rcvr));
    };
}
```
* sender_in[link sender_in.md]
* env_of_t[link env_of_t.md.nolink]
* receiver_of[link receiver_of.md]
* completion_signatures_of_t[link completion_signatures_of_t.md]
* connect[link connect.md.nolink]

## 概要
`sender_to`は、[Sender型](sender.md)`Sndr`が[Receiver型](receiver.md)`Rcvr`と接続可能であることを表すコンセプトである。


## 例
```cpp example
#include <print>
#include <execution>
namespace ex = std::execution;

struct ValueReceiver {
  using receiver_concept = ex::receiver_t;

  void set_value(int v) && noexcept
  {
    std::println("{}", v);
  }
};

int main()
{
  // 値42を送信するSender
  ex::sender auto sndr = ex::just(42);
  static_assert(ex::sender_to<decltype(sndr), ValueReceiver>);

  // int値を受信して表示するReceiver
  ValueReceiver rcvr;
 
  // SenderとReceiverを接続
  ex::operation_state auto op = ex::connect(sndr, rcvr);
  // Operation Stateを開始
  ex::start(op);
}
```
* ex::sender_to[color ff0000]
* ex::receiver_t[link receiver.md]
* ex::sender[link sender.md]
* ex::just[link just.md.nolink]
* ex::operation_state[link operation_state.md]
* ex::connect[link connect.md.nolink]
* ex::start[link start.md.nolink]

### 出力
```
42
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
- [`execution::receiver`](receiver.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
