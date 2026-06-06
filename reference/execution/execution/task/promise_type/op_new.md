# operator new
* execution[meta header]
* std::execution[meta namespace]
* task::promise_type[meta class]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
void* operator new(size_t size);  // (1)

template<class... Args>
void* operator new(size_t size, const Args&... args);  // (2)

template<class This, class Alloc, class... Args>
void* operator new(size_t size, const This&, allocator_arg_t, Alloc alloc, Args&&...);  // (3)
```

## 概要
[`task::promise_type`](../promise_type.md)クラスのnew演算子オーバーロード。

`U`型をサイズおよびアライメントが[`__STDCPP_DEFAULT_NEW_ALIGNMENT__`](/lang/cpp17/predefined_macros.md)である未規定の型としたとき、説明用の`PAlloc`を[`allocator_traits`](/reference/memory/allocator_traits.md)`<Alloc>::template rebind_alloc<U>`とする。


## 適格要件
[`allocator_traits`](/reference/memory/allocator_traits.md)`<PAlloc>::pointer`がポインタ型である。


## 効果
- (2), (3) :
    - `PAlloc`型のアロケータ`palloc`を`alloc`で初期化する。
    - サイズ`size`のコルーチンステートに十分なストレージとなる`U`の最小配列ストレージ、および[`operator delete`](op_delete.md)が後で`palloc`と等しいアロケータでこのメモリブロックを解放するのに必要となる未規定の追加ストレージの確保に`palloc`を用いる。


## 戻り値
- (1) : `operator new(size,` [`allocator_arg`](/reference/memory/allocator_arg_t.md)`, allocator_type())`
- (2), (3) : 確保したストレージへのポインタ


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`operator delete`](op_delete.md)


## 参照
- [P3552R3 Add a Coroutine Task Type](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3552r3.html)
- [P3980R1 Task's Allocator Use](https://open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3980r1.html)
