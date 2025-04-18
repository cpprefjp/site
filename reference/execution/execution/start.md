# start
* execution[meta header]
* cpo[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  struct start_t;
  inline constexpr start_t start{};
}
```

## 概要
`start`は、[Operation State](operation_state.md)を開始するカスタマイゼーションポイントオブジェクトである。


## 効果
式`start(op)`は、`op`が右辺値の場合は不適格となる。
そうでなければ、`op.start()`と等価。

`op.start()`が[Operation State](operation_state.md)に関連付けさられた非同期操作を開始しない場合、式`start(op)`は未定義動作となる。


## カスタマイゼーションポイント
[Operation State](operation_state.md)`op`に対して式`op.start()`が呼び出される。
このとき`noexcept(op.start()) == true`であること。


## 例
```cpp
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
  // int値を受信して表示するReceiver
  ValueReceiver rcvr;
 
  // SenderとReceiverを接続
  ex::operation_state auto op = ex::connect(sndr, rcvr);
  // Operation Stateを開始
  ex::start(op);
}
```
* ex::start[color ff0000]
* ex::receiver_t[link receiver.md]
* ex::sender[link sender.md]
* ex::just[link just.md.nolink]
* ex::operation_state[link operation_state.md]
* ex::connect[link connect.md]

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
- [`execution::operation_state`](operation_state.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
