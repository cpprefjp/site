# コンストラクタ
* execution[meta header]
* std::execution[meta namespace]
* task::promise_type[meta class]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
template<class... Args>
promise_type(const Args&... args);
```

## 概要
タスクコルーチンの[Promise型](/lang/cpp20/coroutines.md)コンストラクタ。
プログラマが本コンストラクタを直接利用することは想定されていない。


## 適格要件
（もしあれば）最初の[`allocator_arg_t`](/reference/memory/allocator_arg_t.md)型パラメータが最後のパラメータでないこと。


## 効果
`Args`が[`allocator_arg_t`](/reference/memory/allocator_arg_t.md)型の要素を含むとき、`alloc`を`args`の次の要素で初期化する。
そうでなければ、`alloc`を[`allocator_type`](../../task.md)`()`で初期化する。


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`operator new`](op_new.md)


## 参照
- [P3552R3 Add a Coroutine Task Type](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3552r3.html)
