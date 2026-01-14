# return_void
* execution[meta header]
* std::execution[meta namespace]
* task::promise_type[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
// is_void_v<T> == true 時のみ存在
void return_void();
```

## 概要
タスクコルーチンにおける[co_return文](/lang/cpp20/coroutines.md)の動作を制御する。
プログラマが本関数を直接利用することは想定されていない。


## 効果
何もしない


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P3552R3 Add a Coroutine Task Type](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3552r3.html)
- [LWG4346. `task::promise_type::return_void/value` lack a specification](https://cplusplus.github.io/LWG/issue4346)
