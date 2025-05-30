# set_continuation
* execution[meta header]
* function template[meta id-type]
* std::execution[meta namespace]
* with_awaitable_senders[meta class]
* cpp26[meta cpp]

```cpp
template<class OtherPromise>
  requires (!same_as<OtherPromise, void>)
void set_continuation(coroutine_handle<OtherPromise> h) noexcept;
```
* coroutine_handle[link /reference/coroutine/coroutine_handle.md]

## 概要
継続処理のコルーチンハンドルを設定する。


## テンプレートパラメータ制約
`!`[`same_as`](/reference/concepts/same_as.md)`<OtherPromise, void>`


## 効果
下記と等価。

```cpp
continuation = h;
if constexpr ( requires(OtherPromise& other) { other.unhandled_stopped(); } ) {
  stopped-handler = [](void* p) noexcept -> coroutine_handle<> {
    return coroutine_handle<OtherPromise>::from_address(p)
      .promise().unhandled_stopped();
  };
} else {
  stopped-handler = &default-unhandled-stopped;
}
```
* coroutine_handle[link /reference/coroutine/coroutine_handle.md]
* from_address[link /reference/coroutine/coroutine_handle/from_address.md]
* promise()[link /reference/coroutine/coroutine_handle/promise.md]


## 例外
投げない


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
