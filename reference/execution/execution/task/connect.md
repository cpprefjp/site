# connect
* execution[meta header]
* std::execution[meta namespace]
* task[meta class]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
template<receiver Rcvr>
state<Rcvr> connect(Rcvr&& recv) &&;
```
* receiver[link ../receiver.md]
* state[link state.md]

## 概要
[Receiver](../receiver.md)と接続する。


## 事前条件
[`bool`](/reference/coroutine/coroutine_handle/op_bool.md)`(handle) == true`


## 効果
以下と等価。

```cpp
return state<Rcvr>(exchange(handle, {}), std::forward<Rcvr>(recv));
```
* exchange[link /reference/utility/exchange.md]
* state[link state.md]


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`execution::connect`](../connect.md)


## 参照
- [P3552R3 Add a Coroutine Task Type](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3552r3.html)
- [LWG4341. Missing rvalue reference qualification for `task::connect()`](https://cplusplus.github.io/LWG/issue4341)
