# uses_allocator_construction_args
* memory[meta header]
* function template[meta id-type]
* std[meta namespace]
* cpp20[meta cpp]

```cpp
template<class T, class Alloc, class... Args>
  auto uses_allocator_construction_args(const Alloc& alloc, Args&&... args) -> see below;       // (1)

template<class T, class Alloc, class Tuple1, class Tuple2>
  auto uses_allocator_construction_args(const Alloc& alloc, piecewise_construct_t,
                                        Tuple1&& x, Tuple2&& y) -> see below;                   // (2)

template<class T, class Alloc>
  auto uses_allocator_construction_args(const Alloc& alloc) -> see below;                       // (3)

template<class T, class Alloc, class U, class V>
  auto uses_allocator_construction_args(const Alloc& alloc, U&& u, V&& v) -> see below;         // (4)

template<class T, class Alloc, class U, class V>
  auto uses_allocator_construction_args(const Alloc& alloc, const pair<U, V>& pr) -> see below; // (5)

template<class T, class Alloc, class U, class V>
  auto uses_allocator_construction_args(const Alloc& alloc, pair<U, V>&& pr) -> see below;      // (6)
```
* see below[italic]

## 概要
`Alloc` 型のア�ケータオブジェクト `alloc` を使用した `T` 型オブジェクトの uses-allocator 構築のために必要なコンストラクタ引数を、[`tuple`](../tuple/tuple.md) 型にして返す。
また、`T` が [`pair`](../utility/pair.md) だった場合は、それぞれの要素に対して uses-allocator 構築するために必要なコンストラクタ引数を、[`tuple`](../tuple/tuple.md) 型にして返す。

構築対象の型 `T` は関数引数からは推論できないため、明示的に指定する必要がある。


## テンプレートパラメータ制約
- (1) : `T` が [`pair`](../utility/pair.md) の特殊化**ではない**場合のみオーバー�ード解決に参加する
- (2)～(6) : `T` が [`pair`](../utility/pair.md) の特殊化**である**場合のみオーバー�ード解決に参加する


## 戻り値
- (1) : 以下のいずれかと同�
	- もし [`uses_allocator_v`](uses_allocator.md)`<T, Alloc>` が `false` で、かつ、[`is_constructible_v`](../type_traits/is_constructible.md)`<T, Args...>` が `true` の場合、

		```cpp
forward_as_tuple(std::forward<Args>(args)...)
```
* forward_as_tuple[link ../tuple/forward_as_tuple.md]
* forward[link ../utility/forward.md]

	- 上記以外で、もし [`uses_allocator_v`](uses_allocator.md)`<T, Alloc>` が `true` で、かつ、[`is_constructible_v`](../type_traits/is_constructible.md)`<T,` [`allocator_arg_t`](allocator_arg_t.md)`, Alloc, Args...>` が `true` の場合、

		```cpp
tuple<allocator_arg_t, const Alloc&, Args&&...>(
  allocator_arg, alloc, std::forward<Args>(args)...)
```
* tuple[link ../tuple/tuple/op_constructor.md]
* allocator_arg_t[link allocator_arg_t.md]
* allocator_arg[link allocator_arg_t.md]
* forward[link ../utility/forward.md]

	- 上記以外で、もし [`uses_allocator_v`](uses_allocator.md)`<T, Alloc>` が `true` で、かつ、[`is_constructible_v`](../type_traits/is_constructible.md)`<T, Args..., Alloc>` が `true` の場合、

		```cpp
forward_as_tuple(std::forward<Args>(args)..., alloc)
```
* forward_as_tuple[link ../tuple/forward_as_tuple.md]
* forward[link ../utility/forward.md]

	- 上記以外の場合、不適格となる。

- (2) : `T` を [`pair`](../utility/pair.md)`<T1, T2>` とすると、以下と同�

	```cpp
make_tuple(
	piecewise_construct,
	apply([&alloc](auto&&... args1) {
			return uses_allocator_construction_args<T1>(
			alloc, std::forward<decltype(args1)>(args1)...);
		  }, std::forward<Tuple1>(x)),
	apply([&alloc](auto&&... args2) {
			return uses_allocator_construction_args<T2>(
			alloc, std::forward<decltype(args2)>(args2)...);
		  }, std::forward<Tuple2>(y)))
```
* piecewise_construct[link ../utility/piecewise_construct_t.md]
* forward[link ../utility/forward.md]
* uses_allocator_construction_args[color ff0000]
* apply[link ../tuple/apply.md]
* make_tuple[link ../tuple/make_tuple.md]

- (3) : 以下と同�

	```cpp
uses_allocator_construction_args<T>(alloc, piecewise_construct,
                                    tuple<>{}, tuple<>{})
```
* piecewise_construct[link ../utility/piecewise_construct_t.md]
* tuple[link ../tuple/tuple/op_constructor.md]
* uses_allocator_construction_args[color ff0000]

- (4) : 以下と同�

	```cpp
uses_allocator_construction_args<T>(alloc, piecewise_construct,
                                    forward_as_tuple(std::forward<U>(u)),
                                    forward_as_tuple(std::forward<V>(v)))
```
* piecewise_construct[link ../utility/piecewise_construct_t.md]
* forward_as_tuple[link ../tuple/forward_as_tuple.md]
* forward[link ../utility/forward.md]
* uses_allocator_construction_args[color ff0000]

- (5) : 以下と同�

	```cpp
uses_allocator_construction_args<T>(alloc, piecewise_construct,
                                    forward_as_tuple(pr.first),
                                    forward_as_tuple(pr.second))
```
* piecewise_construct[link ../utility/piecewise_construct_t.md]
* forward_as_tuple[link ../tuple/forward_as_tuple.md]
* uses_allocator_construction_args[color ff0000]

- (6) : 以下と同�

	```cpp
uses_allocator_construction_args<T>(alloc, piecewise_construct,
                                    forward_as_tuple(std::move(pr).first),
                                    forward_as_tuple(std::move(pr).second))
```
* piecewise_construct[link ../utility/piecewise_construct_t.md]
* forward_as_tuple[link ../tuple/forward_as_tuple.md]
* move[link ../utility/move.md]
* uses_allocator_construction_args[color ff0000]


## 備考
- 本関数は、uses-allocator 構築をサポートするために C++20 で導入された。  
	本関数を用いることで、uses-allocator 構築、特に [`pair`](../utility/pair.md) に対する特殊な uses-allocator 構築を容易にサポートすることが可能となる。  
	ただし、実際には構築まで実施する [`make_obj_using_allocator`](make_obj_using_allocator.md) や [`uninitialized_construct_using_allocator`](uninitialized_construct_using_allocator.md) が�在するため、これらの関数を直接呼び出す機会はあまり多くはないだろう。
- 上記 (1) を見ればわかる通り、uses-allocator 構築は、その名前に反して必ずしもア�ケータオブジェクトを使うとは限らないので注意。  
	（[`uses_allocator_v`](uses_allocator.md)`<T, Alloc>` が `false` の場合、ア�ケータオブジェクト `alloc` は無視される）
- 上記 (2)～(6) を見ればわかる通り、`T` が [`pair`](../utility/pair.md) の場合には再帰的に `uses_allocator_construction_args` を呼び出しているため、ネストした [`pair`](../utility/pair.md) に対しても�しく uses-allocator 構築をサポートできる。


## 例
```cpp example
#include <iostream>
#include <utility>
#include <memory>

// 偽ア�ケータ
struct MyAlloc {};

// ア�ケータを使用しない偽コンテナ
struct MyContainer0 {
  MyContainer0(int) noexcept {}
};

// 偽ア�ケータを使用する偽コンテナ（allocator_arg_t 使用）
struct MyContainer1 {
  using allocator_type = MyAlloc;
  MyContainer1(std::allocator_arg_t, const MyAlloc&, int) noexcept {}
};

// 偽ア�ケータを使用する偽コンテナ（最後の引数）
struct MyContainer2 {
  using allocator_type = MyAlloc;
  MyContainer2(int, const MyAlloc&) noexcept {}
};

// 偽ア�ケータ用挿入演算�
std::ostream& operator<<(std::ostream& os, const MyAlloc&)
{
  return os << "MyAlloc";
}

// allocator_arg 用挿入演算�
std::ostream& operator<<(std::ostream& os, const std::allocator_arg_t&)
{
  return os << "allocator_arg_t";
}

// piecewise_construct 用挿入演算�
std::ostream& operator<<(std::ostream& os, const std::piecewise_construct_t&)
{
  return os << "piecewise_construct_t";
}

// tuple 用挿入演算�
template <typename... Ts>
std::ostream& operator<<(std::ostream& os, const std::tuple<Ts...>& t)
{
  os << "tuple(";
  std::apply([&os](const auto&... args) {
    ((os << args << ", "), ...);
  }, t);
  return os << ')';
}

int main()
{
  auto a0 = std::uses_allocator_construction_args<MyContainer0>(MyAlloc{}, 0);
  std::cout << a0 << '\n';
  auto a1 = std::uses_allocator_construction_args<MyContainer1>(MyAlloc{}, 1);
  std::cout << a1 << '\n';
  auto a2 = std::uses_allocator_construction_args<MyContainer2>(MyAlloc{}, 2);
  std::cout << a2 << '\n';
  auto a3 = std::uses_allocator_construction_args<std::pair<MyContainer1, MyContainer2>>(MyAlloc{}, 3, 4);
  std::cout << a3 << '\n';
}
```
* uses_allocator_construction_args[color ff0000]
* std::allocator_arg_t[link allocator_arg_t.md]
* std::ostream[link ../ostream/basic_ostream.md]
* std::piecewise_construct_t[link ../utility/piecewise_construct_t.md]
* std::tuple[link ../tuple/tuple.md]
* std::apply[link ../tuple/apply.md]

### 出力
```
tuple(0, )
tuple(allocator_arg_t, MyAlloc, 1, )
tuple(2, MyAlloc, )
tuple(piecewise_construct_t, tuple(allocator_arg_t, MyAlloc, 3, ), tuple(4, MyAlloc, ), )
```


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??（9.0.0 の時点で未実装）
- [GCC](/implementation.md#gcc): 9.1.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`make_obj_using_allocator`](make_obj_using_allocator.md)
- [`uninitialized_construct_using_allocator`](uninitialized_construct_using_allocator.md)
- [`uses_allocator`](uses_allocator.md)
- [`scoped_allocator_adaptor`](../scoped_allocator/scoped_allocator_adaptor.md)
- [`polymorphic_allocator`](../memory_resource/polymorphic_allocator.md)
- [`pair`](../utility/pair.md)


## 参照
- [P0591R4 Utility functions to implement uses-allocator construction](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0591r4.pdf)
