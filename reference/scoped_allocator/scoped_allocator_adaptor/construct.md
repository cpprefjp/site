# construct
* scoped_allocator[meta header]
* std[meta namespace]
* scoped_allocator_adaptor[meta class]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
template <class T, class... Args>
void construct(T* p, Args&&... args);                         // (1)

template <class T1, class T2, class... Args1, class... Args2>
void construct(pair<T1, T2>* p, piecewise_construct_t,
               tuple<Args1...> x, tuple<Args2...> y);         // (2) C++17 まで

template <class T1, class T2>
void construct(pair<T1, T2>* p);                              // (3) C++17 まで

template <class T1, class T2, class U, class V>
void construct(pair<T1, T2>* p, U&& x, V&& y);                // (4) C++17 まで

template <class T1, class T2, class U, class V>
void construct(pair<T1, T2>* p, const pair<U, V>& x);         // (5) C++17 まで

template <class T1, class T2, class U, class V>
void construct(pair<T1, T2>* p, pair<U, V>&& x);              // (6) C++17 まで
```
* pair[link /reference/utility/pair.md]
* tuple[link /reference/tuple/tuple.md]
* piecewise_construct_t[link /reference/utility/piecewise_construct_t.md]

## 概要
`p` で指定された領域に、[`inner_allocator`](inner_allocator.md)`()` と指定された引数で [uses-allocator 構築](/reference/memory/uses_allocator.md)を行う。  
また、`*p` が [`pair`](/reference/utility/pair.md) だった場合は、それぞれの要素に対して [`inner_allocator`](inner_allocator.md)`()` と指定された引数で [uses-allocator 構築](/reference/memory/uses_allocator.md)を行う。


## 効果
説明を簡略化するために、以下の説明用関数を使用する。

- `OUTERMOST(x)` は、`x` が [`outer_allocator()`](outer_allocator.md) メンバ関数を持っている場合は `OUTERMOST(x.`[`outer_allocator()`](outer_allocator.md)`)` を、持っていない場合は `x` を返す。
- `CONSTRUCT(...)` は、[`allocator_traits`](/reference/memory/allocator_traits.md)`<decltype(OUTERMOST(*this))>::`[`construct`](/reference/memory/allocator_traits/construct.md)`(OUTERMOST(*this), p, ...)` とする。

- (1) :
	- C++17 まで : 以下のいずれかの動作を行う。
		- [`uses_allocator`](/reference/memory/uses_allocator.md)`<T, inner_allocator_type>::value == false` かつ [`is_constructible`](/reference/type_traits/is_constructible.md)`<T, Args...>::value == true` の場合  
			`CONSTRUCT(`[`forward`](/reference/utility/forward.md)`<Args>(args)...)` を呼び出す。
		- [`uses_allocator`](/reference/memory/uses_allocator.md)`<T, inner_allocator_type>::value == true` かつ [`is_constructible`](/reference/type_traits/is_constructible.md)`<T,` [`allocator_arg_t`](/reference/memory/allocator_arg_t.md)`, inner_allocator_type, Args...>::value == true` の場合  
			`CONSTRUCT(`[`allocator_arg`](/reference/memory/allocator_arg_t.md)`,` [`inner_allocator`](inner_allocator.md)`(),` [`forward`](/reference/utility/forward.md)`<Args>(args)...)` を呼び出す。
		- [`uses_allocator`](/reference/memory/uses_allocator.md)`<T, inner_allocator_type>::value == true` かつ [`is_constructible`](/reference/type_traits/is_constructible.md)`<T, Args..., inner_allocator_type>::value == true` の場合  
			`CONSTRUCT(`[`forward`](/reference/utility/forward.md)`<Args>(args)...,` [`inner_allocator`](inner_allocator.md)`())`を呼び出す。
		- それ以外の場合、プログラムは不適格となる。
		- この関数は `T` が [`pair`](/reference/utility/pair.md) の特殊化でない場合に限りオーバーロード解決に参加する。
	- C++20 から : 以下と等価の動作を行う。

		```cpp
apply(
  [p, this](auto&&... newargs) {
    CONSTRUCT(forward<decltype(newargs)>(newargs)...);
  },
  uses_allocator_construction_args<T>(inner_allocator(), forward<Args>(args)...)
);
```
* apply[link /reference/tuple/apply.md]
* forward[link /reference/utility/forward.md]
* uses_allocator_construction_args[link /reference/memory/uses_allocator_construction_args.md]
* inner_allocator[link inner_allocator.md]

- (2) : 以下と等価の動作を行う。  
	`CONSTRUCT(`[`piecewise_construct`](/reference/utility/piecewise_construct_t.md)`,` [`move`](/reference/utility/move.md)`(xprime),` [`move`](/reference/utility/move.md)`(yprime))`  
	ここで、`xprime` は以下のルールに従って `x` から構築された [`tuple`](/reference/tuple/tuple.md) とする。（`yprime` も `y` から同様に構築されるものとする）

	- [`uses_allocator`](/reference/memory/uses_allocator.md)`<T1, inner_allocator_type>::value == false` かつ [`is_constructible`](/reference/type_traits/is_constructible.md)`<T1, Args1...>::value == true` の場合  
		`x` を `xprime` とする。
	- [`uses_allocator`](/reference/memory/uses_allocator.md)`<T1, inner_allocator_type>::value == true` かつ [`is_constructible`](/reference/type_traits/is_constructible.md)`<T1,` [`allocator_arg_t`](/reference/memory/allocator_arg_t.md)`, inner_allocator_type, Args1...>::value == true` の場合  
		[`tuple_cat`](/reference/tuple/tuple_cat.md)`(`[`tuple`](/reference/tuple/tuple.md)`<`[`allocator_arg_t`](/reference/memory/allocator_arg_t.md)`, inner_allocator_type&>(`[`allocator_arg`](/reference/memory/allocator_arg_t.md)`, inner_allocator_type()), x)` を `xprime` とする。
	- [`uses_allocator`](/reference/memory/uses_allocator.md)`<T1, inner_allocator_type>::value == true` かつ [`is_constructible`](/reference/type_traits/is_constructible.md)`<T1, Args1..., inner_allocator_type>::value == true` の場合  
		[`tuple_cat`](/reference/tuple/tuple_cat.md)`(x,` [`tuple`](/reference/tuple/tuple.md)`<inner_allocator_type&>(inner_allocator_type()))` を `xprime` とする。
	- それ以外の場合、プログラムは不適格となる。

- (3) : 以下と等価の動作を行う。  
	`construct(p,` [`piecewise_construct`](/reference/utility/piecewise_construct_t.md)`,` [`tuple`](/reference/tuple/tuple.md)`<>(),` [`tuple`](/reference/tuple/tuple.md)`<>())`

- (4) : 以下と等価の動作を行う。  
	`construct(p,` [`piecewise_construct`](/reference/utility/piecewise_construct_t.md)`,` [`forward_as_tuple`](/reference/tuple/forward_as_tuple.md)`(`[`forward`](/reference/utility/forward.md)`<U>(x)),` [`forward_as_tuple`](/reference/tuple/forward_as_tuple.md)`(`[`forward`](/reference/utility/forward.md)`<V>(y)))`

- (5) : 以下と等価の動作を行う。  
	`construct(p,` [`piecewise_construct`](/reference/utility/piecewise_construct_t.md)`,` [`forward_as_tuple`](/reference/tuple/forward_as_tuple.md)`(x.first),` [`forward_as_tuple`](/reference/tuple/forward_as_tuple.md)`(x.second))`

- (6) : 以下と等価の動作を行う。  
	`construct(p,` [`piecewise_construct`](/reference/utility/piecewise_construct_t.md)`,` [`forward_as_tuple`](/reference/tuple/forward_as_tuple.md)`(`[`forward`](/reference/utility/forward.md)`(x.first)),` [`forward_as_tuple`](/reference/tuple/forward_as_tuple.md)`(`[`forward`](/reference/utility/forward.md)`(x.second)))`


## 備考
- C++20 における変更は、一見新規導入されたユーティリティ関数（[`uses_allocator_construction_args`](/reference/memory/uses_allocator_construction_args.md)）を使用して定義を簡略化しただけのように思えるが、実はこの変更によりネストした [`pair`](/reference/utility/pair.md)  に対しても [uses-allocator 構築](/reference/memory/uses_allocator.md)がサポートされるように改善されている。



## 例
```cpp example
#include <cassert>
#include <vector>
#include <string>
#include <scoped_allocator>

template <class T>
using alloc_t = std::allocator<T>;

// コンテナの要素(Inner)
using string = std::basic_string<
  char,
  std::char_traits<char>,
  alloc_t<char>
>;

// コンテナ(Outer)
template <class T>
using vector = std::vector<
  T,
  std::scoped_allocator_adaptor<alloc_t<T>, alloc_t<typename T::value_type>>
>;

template <class T>
using pair_of_vector = std::vector<
  T,
  std::scoped_allocator_adaptor<alloc_t<T>>
>;

// (1)
void construct_propagate_alloc()
{
  vector<string>::allocator_type alloc {
    alloc_t<string>(), // vector自体のアロケータオブジェクト
    alloc_t<char>()    // vectorの全ての要素に使用するアロケータオブジェクト
  };

  // 外側のアロケータを使用し、stringが1要素入るメモリを確保
  const std::size_t n = 1;
  string* p = alloc.allocate(n);

  // (1) 以下のコンストラクタを呼び出し、アロケータオブジェクトを伝播させる
  // basic_string(const char*, Allocator)
  alloc.construct(p, "hello");

  // オブジェクトを破棄
  alloc.destroy(p);

  // メモリを解放
  alloc.deallocate(p, n);
}

void construct_pair()
{
  pair_of_vector<std::pair<string, string>>::allocator_type alloc;

  const std::size_t n = 5;
  std::pair<string, string>* p = alloc.allocate(n);

  // (2)
  // pairの各要素に対して以下のコンストラクタを呼び出し、
  // アロケータオブジェクトを伝播させる。
  // basic_string(const char*, Allocator)
  std::pair<string, string>* pair_p = p;
  alloc.construct(p, std::piecewise_construct,
                  std::forward_as_tuple("hello"),
                  std::forward_as_tuple("world"));
  assert(pair_p->first == "hello");
  assert(pair_p->second == "world");

  // (3)
  // pairの要素をデフォルト構築する。
  pair_p = std::next(pair_p);
  alloc.construct(pair_p);
  assert(pair_p->first == "");
  assert(pair_p->second == "");

  // (4)
  // pairの各要素のコンストラクタ引数をひとつずつ受け取って構築
  pair_p = std::next(pair_p);
  alloc.construct(pair_p, "hello", "world");
  assert(pair_p->first == "hello");
  assert(pair_p->second == "world");

  // (5)
  // pairの各要素のコンストラクタ引数をひとつずつ、
  // まとめてpairとして受け取り、それぞれをtupleに分解して構築
  pair_p = std::next(pair_p);
  std::pair<const char*, const char*> fifth_args("hello", "world");
  alloc.construct(pair_p, fifth_args);

  // (6)
  // pairの各要素のコンストラクタ引数をひとつずつ、
  // まとめてpairとして受け取り、それぞれをtupleに分解して転送して構築
  pair_p = std::next(pair_p);
  alloc.construct(pair_p, std::make_pair("hello", "world"));

  for (std::size_t i = 0; i < n; ++i) {
    alloc.destroy(p + i);
  }

  alloc.deallocate(p, n);
}

int main()
{
  construct_propagate_alloc();
  construct_pair();
}
```
* construct[color ff0000]
* alloc.allocate[link allocate.md]
* alloc.destroy[link destroy.md]
* alloc.deallocate[link deallocate.md]
* std::piecewise_construct[link /reference/utility/piecewise_construct_t.md]
* std::forward_as_tuple[link /reference/tuple/forward_as_tuple.md]
* std::next[link /reference/iterator/next.md]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.3 (`forward_as_tuple()`まで含めた完全な実装) [mark verified]
- [GCC](/implementation.md#gcc): 4.7.3 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`uses_allocator_construction_args`](/reference/memory/uses_allocator_construction_args.md)
- [`make_obj_using_allocator`](/reference/memory/make_obj_using_allocator.md)
- [`uninitialized_construct_using_allocator`](/reference/memory/uninitialized_construct_using_allocator.md)
- [`uses_allocator`](/reference/memory/uses_allocator.md)
- [`polymorphic_allocator`](/reference/memory_resource/polymorphic_allocator.md)
- [`pair`](/reference/utility/pair.md)


## 参照
- [P0591R4 Utility functions to implement uses-allocator construction](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0591r4.pdf)
- [LWG Issue 2975. Missing case for pair construction in scoped and polymorphic allocators](https://wg21.cmeerw.net/lwg/issue2975)
