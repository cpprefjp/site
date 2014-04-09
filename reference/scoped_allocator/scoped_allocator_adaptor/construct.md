#construct (C++11)
```cpp
template <class T, class... Args>
void construct(T* p, Args&&... args);                         // (1)

template <class T1, class T2, class... Args1, class... Args2>
void construct(pair<T1, T2>* p, piecewise_construct_t,
               tuple<Args1...> x, tuple<Args2...> y);         // (2)

template <class T1, class T2>
void construct(pair<T1, T2>* p);                              // (3)

template <class T1, class T2, class U, class V>
void construct(pair<T1, T2>* p, U&& x, V&& y);                // (4)

template <class T1, class T2, class U, class V>
void construct(pair<T1, T2>* p, const pair<U, V>& x);         // (5)

template <class T1, class T2, class U, class V>
void construct(pair<T1, T2>* p, pair<U, V>&& x);              // (6)
```
* pair[link /reference/utility/pair.md]
* tuple[link /reference/tuple/tuple.md]
* piecewise_construct_t[link /reference/utility/piecewise_construct.md]

##概要
引数を元にインスタンスを構築する。

- (1) : 型`T`のコンストラクタ引数`args...`を元に、型`T`のオブジェクトを生成する。以下のいずれかの形式のコンストラクタを呼び出す：
	- `T(Args&&... args)`
	- `T(allocator_arg_t, Allocator alloc, Args&&... args)`
	- `T(Args&&... args, Allocator alloc)`
- (2) : [`pair`](/reference/utility/pair.md)型の各要素型のコンストラクタ引数を元に、[`pair`](/reference/utility/pair.md)型のオブジェクトを生成する。以下のいずれかの形式のコンストラクタを呼び出す：
	- `pair<T1, T2>(piecewise_construct_t, tuple<Args1...> x, tuple<Args2...> y)`
	- `pair<T1, T2>(piecewise_construct_t, tuple<allocator_arg_t, Allocator, Args1...> xprime, tuple<allocator_arg_t, Allocator, Args2...> yprime)`
	- `pair<T1, T2>(piecewise_construct_t, tuple<Args1..., Allocator> xprime, tuple<Args2..., Allocator> yprime)`


##効果
この関数において、以下の名称定義を行う。

- `OUTERMOST(x)`関数は、アロケータオブジェクト`x`が`outer_allocator()`メンバ関数を持っている場合、その関数によって返されるアロケータを返す。そうでない場合は、`x`を返す。
- [`allocator_traits`](/reference/memory/allocator_traits.md)`<decltype(OUTERMOST(x))>`を`OUTERMOST_ALLOC_TRAITS(x)`とする。

- (1) : 
	- [`uses_allocator`](/reference/memory/uses_allocator.md)`<T, inner_allocator_type>::value == false`かつ[`is_constructible`](/reference/type_traits/is_constructible.md)`<T, Args...>::value == true`の場合、`OUTERMOST_ALLOC_TRAITS(*this)::`[`construct`](/reference/memory/allocator_traits/construct.md)`(OUTERMOST(*this), p,` [`std::forward`](/reference/utility/forward.md)`<Args>(args)...)`を呼び出す。
	- [`uses_allocator`](/reference/memory/uses_allocator.md)`<T, inner_allocator_type>::value == true`かつ[`is_constructible`](/reference/type_traits/is_constructible.md)`<T,` [`allocator_arg_t`](/reference/memory/allocator_arg_t.md)`, inner_allocator_type, Args...>::value == true`の場合、`OUTERMOST_ALLOC_TRAITS(*this)::`[`construct`](/reference/memory/allocator_traits/construct.md)`(OUTERMOST(*this), p,` [`allocator_arg`](/reference/memory/allocator_arg_t.md)`, inner_allocator(),` [`std::forward`](/reference/utility/forward.md)`<Args>(args)...)`を呼び出す。
	- [`uses_allocator`](/reference/memory/uses_allocator.md)`<T, inner_allocator_type>::value == true`かつ[`is_constructible`](/reference/type_traits/is_constructible.md)`<T, Args..., inner_allocator_type>::value == true`の場合、`OUTERMOST_ALLOC_TRAITS(*this)::`[`construct`](/reference/memory/allocator_traits/construct.md)`(OUTERMOST(*this), p,` [`std::forward`](/reference/utility/forward.md)`<Args>(args)..., inner_allocator())`を呼び出す。
	- それ以外の場合、プログラムは不適格となる。

- (2) :

`T1`を構築するための説明用の変数`xprime`を、`Args1...`を以下のように元に定義する。

	- [`uses_allocator`](/reference/memory/uses_allocator.md)`<T1, inner_allocator_type>::value == false`かつ[`is_constructible`](/reference/type_traits/is_constructible.md)`<T1, Args1...>::value == true`の場合、`x`を`xprime`とする。

	- [`uses_allocator`](/reference/memory/uses_allocator)`<T1, inner_allocator_type>::value == true`かつ[`is_constructible`](/reference/memory/is_constructible.md)`<T1,` [`allocator_arg_t`](/reference/memory/allocator_arg_t.md)`, inner_allocator_type, Args1...>::value == true`の場合、[`tuple_cat`](/reference/tuple/tuple/tuple_cat.md)`(`[`tuple`](/reference/tuple/tuple.md)`<`[`allocator_arg_t`](/reference/memory/allocator_arg_t.md)`, inner_allocator_type&>(`[`allocator_arg`](/reference/memory/allocator_arg_t.md)`, inner_allocator_type()), x)`を`xprime`とする。

	- [`uses_allocator`](/reference/memory/uses_allocator)`<T1, inner_allocator_type>::value == true`かつ[`is_constructible`](/reference/memory/is_constructible.md)`<T1, Args1..., inner_allocator_type>::value == true`の場合[`tuple_cat`](/reference/tuple/tuple/tuple_cat.md)`(x,` [`tuple`](/reference/tuple/tuple.md)`<inner_allocator_type&>(inner_allocator_type()))`を`xprime`とする。

	- それ以外の場合、プログラムは不適格となる。

同様の定義を`T2`型に対しても行い、`Args2...`から`yprime`を定義する。

ここで定義した`xprime`と`yprime`を使用し、以下の呼び出しを行う：

`OUTERMOST_ALLOC_TRAITS(*this)::`[`construct`](/reference/memory/allocator_traits/construct.md)`(OUTERMOST(*this), p,` [`piecewise_construct`](/reference/utility/piecewise_construct.md)`, xprime, yprime)`

- (3) :
- (4) :
- (5) :
- (6) :

##例
```cpp
```

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [Clang, C++11 mode](/implementation#clang.md): ??
- [GCC, C++11 mode](/implementation#gcc.md): ??
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??
