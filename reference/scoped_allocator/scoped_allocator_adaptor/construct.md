# construct
* scoped_allocator[meta header]
* std[meta namespace]
* scoped_allocator_adaptor[meta class]
* function[meta id-type]
* cpp11[meta cpp]

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
* piecewise_construct_t[link /reference/utility/piecewise_construct_t.md]

## 概要
引数を元にインスタンスを構築する。

- (1) : 型`T`のコンストラクタ引数`args...`を元に、型`T`のオブジェクトを生成する。以下のいずれかの形式のコンストラクタを呼び出す：
	- `T(Args&&... args)`
	- `T(allocator_arg_t, Allocator alloc, Args&&... args)`
	- `T(Args&&... args, Allocator alloc)`
- (2) : [`pair`](/reference/utility/pair.md)型の各要素型のコンストラクタ引数を元に、[`pair`](/reference/utility/pair.md)型のオブジェクトを生成する。以下のいずれかの形式のコンストラクタを呼び出す：
	- `pair<T1, T2>(piecewise_construct_t, tuple<Args1...> x, tuple<Args2...> y)`
	- `pair<T1, T2>(piecewise_construct_t, tuple<allocator_arg_t, Allocator, Args1...> xprime, tuple<allocator_arg_t, Allocator, Args2...> yprime)`
	- `pair<T1, T2>(piecewise_construct_t, tuple<Args1..., Allocator> xprime, tuple<Args2..., Allocator> yprime)`
- (3) : [`pair`](/reference/utility/pair.md)型の各要素をデフォルト構築する。以下の形式のコンストラクタを呼び出す：
	- `pair<T1, T2>(piecewise_construct_t, tuple<>, tuple<>)`
- (4) : [`pair`](/reference/utility/pair.md)型の各要素のコンストラクタ引数を一つずつとって構築する。以下の形式のコンストラクタを呼び出す：
	- `pair<T1, T2>(piecewise_construct_t, tuple<U>&&, tuple<V>&&)`
- (5) : [`pair`](/reference/utility/pair.md)型の各要素のコンストラクタ引数をそれぞれひとつずつ、まとめて[`pair`](/reference/utility/pair.md)としてとって構築する。以下の形式のコンストラクタを呼び出す：
	- `pair<T1, T2>(piecewise_construct_t, const tuple<U>&, const tuple<V>&)`
- (6) : [`pair`](/reference/utility/pair.md)型の各要素のコンストラクタ引数をそれぞれひとつずつ、まとめて[`pair`](/reference/utility/pair.md)としてとって構築する。以下の形式のコンストラクタを呼び出す：
	- `pair<T1, T2>(piecewise_construct_t, tuple<U>&&, tuple<V>&&)`


## 効果
この関数において、以下の名称定義を行う。

- `OUTERMOST(x)`関数は、アロケータオブジェクト`x`が`outer_allocator()`メンバ関数を持っている場合、その関数によって返されるアロケータを返す。そうでない場合は、`x`を返す。
- [`allocator_traits`](/reference/memory/allocator_traits.md)`<decltype(OUTERMOST(x))>`を`OUTERMOST_ALLOC_TRAITS(x)`とする。

- (1) : 
	- [`uses_allocator`](/reference/memory/uses_allocator.md)`<T, inner_allocator_type>::value == false`かつ[`is_constructible`](/reference/type_traits/is_constructible.md)`<T, Args...>::value == true`の場合、`OUTERMOST_ALLOC_TRAITS(*this)::`[`construct`](/reference/memory/allocator_traits/construct.md)`(OUTERMOST(*this), p,` [`std::forward`](/reference/utility/forward.md)`<Args>(args)...)`を呼び出す。
	- [`uses_allocator`](/reference/memory/uses_allocator.md)`<T, inner_allocator_type>::value == true`かつ[`is_constructible`](/reference/type_traits/is_constructible.md)`<T,` [`allocator_arg_t`](/reference/memory/allocator_arg_t.md)`, inner_allocator_type, Args...>::value == true`の場合、`OUTERMOST_ALLOC_TRAITS(*this)::`[`construct`](/reference/memory/allocator_traits/construct.md)`(OUTERMOST(*this), p,` [`allocator_arg`](/reference/memory/allocator_arg_t.md)`, inner_allocator(),` [`std::forward`](/reference/utility/forward.md)`<Args>(args)...)`を呼び出す。
	- [`uses_allocator`](/reference/memory/uses_allocator.md)`<T, inner_allocator_type>::value == true`かつ[`is_constructible`](/reference/type_traits/is_constructible.md)`<T, Args..., inner_allocator_type>::value == true`の場合、`OUTERMOST_ALLOC_TRAITS(*this)::`[`construct`](/reference/memory/allocator_traits/construct.md)`(OUTERMOST(*this), p,` [`std::forward`](/reference/utility/forward.md)`<Args>(args)..., inner_allocator())`を呼び出す。
	- それ以外の場合、プログラムは不適格となる。

- (2) : `T1`を構築するための説明用の変数`xprime`を、`Args1...`を以下のように元に定義する。

	- [`uses_allocator`](/reference/memory/uses_allocator.md)`<T1, inner_allocator_type>::value == false`かつ[`is_constructible`](/reference/type_traits/is_constructible.md)`<T1, Args1...>::value == true`の場合、`x`を`xprime`とする。
	- [`uses_allocator`](/reference/memory/uses_allocator.md)`<T1, inner_allocator_type>::value == true`かつ[`is_constructible`](/reference/type_traits/is_constructible.md)`<T1,` [`allocator_arg_t`](/reference/memory/allocator_arg_t.md)`, inner_allocator_type, Args1...>::value == true`の場合、[`tuple_cat`](/reference/tuple/tuple_cat.md)`(`[`tuple`](/reference/tuple/tuple.md)`<`[`allocator_arg_t`](/reference/memory/allocator_arg_t.md)`, inner_allocator_type&>(`[`allocator_arg`](/reference/memory/allocator_arg_t.md)`, inner_allocator_type()), x)`を`xprime`とする。
	- [`uses_allocator`](/reference/memory/uses_allocator.md)`<T1, inner_allocator_type>::value == true`かつ[`is_constructible`](/reference/type_traits/is_constructible.md)`<T1, Args1..., inner_allocator_type>::value == true`の場合[`tuple_cat`](/reference/tuple/tuple_cat.md)`(x,` [`tuple`](/reference/tuple/tuple.md)`<inner_allocator_type&>(inner_allocator_type()))`を`xprime`とする。
	- それ以外の場合、プログラムは不適格となる。

	同様の定義を`T2`型に対しても行い、`Args2...`から`yprime`を定義する。

	ここで定義した`xprime`と`yprime`を使用し、以下の呼び出しを行う：

	`OUTERMOST_ALLOC_TRAITS(*this)::`[`construct`](/reference/memory/allocator_traits/construct.md)`(OUTERMOST(*this), p,` [`piecewise_construct`](/reference/utility/piecewise_construct_t.md)`, xprime, yprime)`

- (3) : 以下と同等の動作を行う。 `construct(p,` [`piecewise_construct`](/reference/utility/piecewise_construct_t.md)`,` [`tuple`](/reference/tuple/tuple.md)`<>(),` [`tuple`](/reference/tuple/tuple.md)`<>())`

- (4) : 以下と同等の動作を行う。 `construct(p,` [`piecewise_construct`](/reference/utility/piecewise_construct_t.md)`,` [`forward_as_tuple`](/reference/tuple/forward_as_tuple.md)`(`[`std::forward`](/reference/utility/forward.md)`<U>(x)),` [`forward_as_tuple`](/reference/tuple/forward_as_tuple.md)`(`[`std::forward`](/reference/utility/forward.md)`<V>(y)))`

- (5) : 以下と同等の動作を行う。 `construct(p,` [`piecewise_construct`](/reference/utility/piecewise_construct_t.md)`,` [`forward_as_tuple`](/reference/tuple/forward_as_tuple.md)`(x.first),` [`forward_as_tuple`](/reference/tuple/forward_as_tuple.md)`(x.second))`
- (6) : 以下と同等の動作を行う。 `construct(p,` [`piecewise_construct`](/reference/utility/piecewise_construct_t.md)`,` [`forward_as_tuple`](/reference/tuple/forward_as_tuple.md)`(`[`std::forward`](/reference/utility/forward.md)`(x.first)),` [`forward_as_tuple`](/reference/tuple/forward_as_tuple.md)`(`[`std::forward`](/reference/utility/forward.md)`(x.second)))`

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

  // (1) 以下のコンストラクタを呼び出し、アロケータオブジェクトを伝搬させる
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
  // アロケータオブジェクトを伝搬させる。
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
* std::allocator[link /reference/memory/allocator.md]
* std::basic_string[link /reference/string/basic_string.md]
* std::char_traits[link /reference/string/char_traits.md]
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
- [Clang, C++11 mode](/implementation.md#clang): 3.3 (`forward_as_tuple()`まで含めた完全な実装)
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.3
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
