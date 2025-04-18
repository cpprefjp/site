# operation_state
* execution[meta header]
* concept[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  template<class O>
  concept operation_state =
    derived_from<typename O::operation_state_concept, operation_state_t> &&
    is_object_v<O> &&
    requires (O& o) {
      { start(o) } noexcept;
    };

  struct operation_state_t {};  // タグ型
}
```
* derived_from[link /reference/concepts/derived_from.md]
* is_object_v[link /reference/type_traits/is_object.md]
* start[link start.md.nolink]

## 概要
`operation_state`は、型`O`がOperation State型の要件を満たすことを表すコンセプトである。

下記をみたすクラス型はOperation Stateとみなせる。

- `operation_state_t`をメンバ型`O::operation_state_concept`として定義するクラス型
- `O`型の左辺値`o`に対して[`execution::start`](start.md.nolink)`(o)`が有効な式かつ例外送出されないこと

非同期操作の生存期間中に`operation_state`オブジェクトが破棄されると、未定義の動作を引き起こす。


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
* ex::operation_state[color ff0000]
* ex::receiver_t[link receiver.md]
* ex::sender[link sender.md]
* ex::just[link just.md.nolink]
* ex::connect[link connect.md]
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
- [`execution::connect`](connect.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
