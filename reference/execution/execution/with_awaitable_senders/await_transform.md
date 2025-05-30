# await_transform
* execution[meta header]
* function template[meta id-type]
* std::execution[meta namespace]
* with_awaitable_senders[meta class]
* cpp26[meta cpp]

```cpp
template<class Value>
call-result-t<as_awaitable_t, Value, Promise&>
  await_transform(Value&& value);
```
* call-result-t[link /reference/functional/call-result-t.md]
* as_awaitable_t[link ../as_awaitable.md.nolink]

## 概要
コルーチンの[`co_await`演算子](/lang/cpp20/coroutines.md)にアダプトし、[`as_awaitable`](../as_awaitable.md.nolink)で変換したAwaitableオブジェクトを返す。


## 効果
下記と等価。

```cpp
return as_awaitable(std::forward<Value>(value), static_cast<Promise&>(*this));
```
* as_awaitable[link ../as_awaitable.md.nolink]


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`execution::as_awaitable`](../as_awaitable.md.nolink)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
