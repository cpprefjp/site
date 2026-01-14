# operator delete
* execution[meta header]
* std::execution[meta namespace]
* task::promise_type[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
void operator delete(void* pointer, size_t size) noexcept;
```

## 概要
[`task::promise_type`](../promise_type.md)クラスのdelete演算子オーバーロード。


## 事前条件
`pointer`は同じ`size`の[`operator new`](op_new.md)演算子オーバーロードの呼び出しで返された値であること。


## 効果
メモリ確保で用いたものと同じアロケータを利用して、`pointer`が指すストレージを解放する。


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


## 関連項目
- [`operator new`](op_new.md)


## 参照
- [P3552R3 Add a Coroutine Task Type](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3552r3.html)
