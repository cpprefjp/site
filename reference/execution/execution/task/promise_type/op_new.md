# operator new
* execution[meta header]
* std::execution[meta namespace]
* task::promise_type[meta class]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
template<class... Args>
void* operator new(size_t size, const Args&... args);
```

## 概要
[`task::promise_type`](../promise_type.md)クラスのnew演算子オーバーロード。

[`allocator_arg_t`](/reference/memory/allocator_arg_t.md)型のパラメータがなければ、`alloc`を[`allocator_type`](../../task.md)`()`で初期化する。そうでなければ、`arg_next`を最初の`allocator_arg_t`パラメータに続くパラメータとし、`alloc`を`allocator_type(arg_next)`とする。

`U`型をサイズおよびアライメントが[`__STDCPP_DEFAULT_NEW_ALIGNMENT__`](/lang/cpp17/predefined_macros.md)である未規定の型としたとき、説明用の`PAlloc`を[`allocator_traits`](/reference/memory/allocator_traits.md)`<PAlloc>::template rebind_alloc<U>`とする。


## 適格要件
- （もしあれば）最初の[`allocator_arg_t`](/reference/memory/allocator_arg_t.md)型パラメータが最後のパラメータではない。
- [`allocator_arg_t`](/reference/memory/allocator_arg_t.md)型のパラメータが存在するとき、[`allocator_type`](../../task.md)`(arg_next)`が妥当な式である。
- [`allocator_traits`](/reference/memory/allocator_traits.md)`<PAlloc>::pointer`がポインタ型である。


## 効果
`PAlloc`型のアロケータ`palloc`を`alloc`で初期化する。
サイズ`size`のコルーチンステートに十分なストレージとなる`U`の最小配列ストレージ、および[`operator delete`](op_delete.md)が後で`palloc`と等しいアロケータでこのメモリブロックを解放するのに必要となる未規定の追加ストレージの確保に`palloc`を用いる。


## 戻り値
確保したストレージへのポインタ


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`(constructor)`](op_constructor.md)
- [`operator delete`](op_delete.md)


## 参照
- [P3552R3 Add a Coroutine Task Type](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3552r3.html)
