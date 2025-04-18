# connect_result_t
* execution[meta header]
* std::execution[meta namespace]
* type-alias[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  template<class Sndr, class Rcvr>
  using connect_result_t =
    decltype(connect(declval<Sndr>(), declval<Rcvr>()));
}
```
* connect[link connect.md]

## 概要
[Sender型](sender.md)`Sndr`と[Receiver型](receiver.md)`Rcvr`を[接続(connect)](connect.md)した結果の[Operation State型](operation_state.md)を取得する。


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
