# operator new
* generator[meta header]
* function template[meta id-type]
* std[meta namespace]
* generator::promise_type[meta class]
* cpp23[meta cpp]

```cpp
void* operator new(size_t size)
  requires same_as<Allocator, void> || default_initializable<Allocator>; // (1)

template<class Alloc, class... Args>
  requires same_as<Allocator, void> || convertible_to<const Alloc&, Allocator>
void* operator new(size_t size, allocator_arg_t, const Alloc& alloc, const Args&...); // (2)

template<class This, class Alloc, class... Args>
  requires same_as<Allocator, void> || convertible_to<const Alloc&, Allocator>
void* operator new(size_t size, const This&, allocator_arg_t, const Alloc& alloc, const Args&...); 
```
* default_initializable[link /reference/concepts/default_initializable.md]
* convertible_to[link /reference/concepts/convertible_to.md]
* allocator_arg_t[link /reference/memory/allocator_arg_t.md]


## 概要
[`generator::promise_type`クラス](../promise_type.md)のnew演算子オーバーロード。

ここで動作説明用の型をいくつか導入する。`A`型を下記の通りとする。

- [`generator`](../../generator.md)クラステンプレートのテンプレートパラメータ`Allocator`が`void`でなければ、`Allocator`。
- テンプレートパラメータ`Alloc`を持つオーバーロードでは、`Alloc`。
- そうでなければ[`allocator<void>`](/reference/memory/allocator.md)。

`U`型をサイズおよびアライメントが[`__STDCPP_DEFAULT_NEW_ALIGNMENT__`](/lang/cpp17/predefined_macros.md)に等しい未規定の型としたとき、`B`型を[`allocator_traits`](/reference/memory/allocator_traits.md)`<A>::template rebind_alloc<U>`とする。


## 適格要件
[`allocator_traits`](/reference/memory/allocator_traits.md)`<B>::pointer`はポインタ型。


## 効果
`B`型のアロケータ`b`を、オーバーロード(1)では`A()`により、オーバーロード(2)(3)では`A(alloc)`により初期化する。

アロケータ`b`を用いて、サイズ`size`の[コルーチン・ステート](/lang/cpp20/coroutines.md)と、後ほど[`operator delete`](op_delete.md)による`b`を用いたメモリブロック解放で必要とされる追加状態を合わせたストレージに必要となる、`U`型の最小配列ストレージを確保する。


## 戻り値
確保されたストレージへのポインタ。


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`operator delete`](op_delete.md)
