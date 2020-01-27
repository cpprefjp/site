# construct
* memory_resource[meta header]
* function[meta id-type]
* std::pmr[meta namespace]
* polymorphic_allocator[meta class]
* cpp17[meta cpp]

```cpp
template <class T, class... Args>
void construct(T* p, Args&&... args);                   //(1)

template <class T1, class T2, class... Args1, class... Args2>
void construct(pair<T1, T2>* p, piecewise_construct_t,
               tuple<Args1...> x, tuple<Args2...> y);   //(2) C++17 まで

template <class T1, class T2>
void construct(pair<T1, T2>* p);                        //(3) C++17 まで

template <class T1, class T2, class U, class V>
void construct(pair<T1, T2>* p, U&& x, V&& y);          //(4) C++17 まで

template <class T1, class T2, class U, class V>
void construct(pair<T1, T2>* p, const pair<U, V>& pr);  //(5) C++17 まで

template <class T1, class T2, class U, class V>
void construct(pair<T1, T2>* p, pair<U, V>&& pr);       //(6) C++17 まで
```
* pair[link /reference/utility/pair.md]
* tuple[link /reference/tuple/tuple.md]
* piecewise_construct_t[link /reference/utility/piecewise_construct_t.md]

## 概要
`p` で指定された領域に、`*this` と指定された引数で [uses-allocator 構築](/reference/memory/uses_allocator.md)を行う。  
また、`*p` が [`pair`](/reference/utility/pair.md) だった場合は、それぞれの要素に対して `*this` と指定された引数で [uses-allocator 構築](/reference/memory/uses_allocator.md)を行う。


## 適格要件

- (1) : `*this` と `args...` をコンストラクタ引数とした [uses-allocator 構築](/reference/memory/uses_allocator.md)が可能であること。  
ア�ケータを受け取るコンストラクタを持たない型については、（`args..` が適切ならば）この要件を常に満たしている。  
C++17までは、この関数は `T` が [`pair`](/reference/utility/pair.md) の特殊化でない場合に限りオーバー�ード解決に参加する。


## 引数

- 全て : `p` -- `T` もしくは [`pair`](/reference/utility/pair.md)`<T1, T2>` のオブジェクトを構築するメモリ領域へのポインタ

- (1) : `args` -- `T` のコンストラクタに渡す引数列

- (2) :
    - `x` -- `T1` のコンストラクタに渡す引数を持つ [`tuple`](/reference/tuple/tuple.md) オブジェクト
    - `y` -- `T2` のコンストラクタに渡す引数を持つ [`tuple`](/reference/tuple/tuple.md) オブジェクト

- (4) :
    - `x` -- `T1` のコンストラクタに渡す引数
    - `y` -- `T2` のコンストラクタに渡す引数

- (5) : `pr` -- `T1, T2` のコンストラクタにそれぞれコピーして渡す引数 `U, V` のオブジェクトを持つ [`pair`](/reference/utility/pair.md)`<U, V>`オブジェクト

- (6) : `pr` -- `T1, T2` のコンストラクタにそれぞれ [`forward`](/reference/utility/forward.md) して渡す引数 `U, V` のオブジェクトを持つ [`pair`](/reference/utility/pair.md)`<U, V>` オブジェクト


## 効果

- (1) :
	- C++17 まで : 以下のいずれかの動作を行う。
		- [`uses_allocator_v`](/reference/memory/uses_allocator.md)`<T, polymorphic_allocator> == false` かつ [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<T, Args...> == true` の場合  
			`::new(static_cast<void*>(p)) T(`[`forward`](/reference/utility/forward.md)`<Args>(args)...)` を呼び出す。
		- [`uses_allocator_v`](/reference/memory/uses_allocator.md)`<T, polymorphic_allocator> == true` かつ [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<T,` [`allocator_arg_t`](/reference/memory/allocator_arg_t.md)`, polymorphic_allocator, Args...> == true` の場合  
			`::new(static_cast<void*>(p)) T(`[`allocator_arg`](/reference/memory/allocator_arg_t.md)`, *this,` [`forward`](/reference/utility/forward.md)`<Args>(args)...)` を呼び出す。
		- [`uses_allocator_v`](/reference/memory/uses_allocator.md)`<T, polymorphic_allocator> == true` かつ [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<T, Args..., polymorphic_allocator> == true` の場合  
			`::new(static_cast<void*>(p)) T(`[`forward`](/reference/utility/forward.md)`<Args>(args)..., *this)`
		- それ以外の場合、プ�グラムは不適格となる。
	- C++20 から : 以下と�価の動作を行う。

		```cpp
uninitialized_construct_using_allocator(p, *this, forward<Args>(args)...)
```
* uninitialized_construct_using_allocator[link /reference/memory/uninitialized_construct_using_allocator.md]
* forward[link /reference/utility/forward.md]

- (2) : 以下と�価
	```cpp
::new(static_cast<void*>(p)) pair<T1, T2>(piecewise_construct, xprime, yprime)
```
* pair[link /reference/utility/pair.md]
* piecewise_construct[link /reference/utility/piecewise_construct_t.md]

	ここで、`xprime` は以下のルールに従って `x` から構築される [`tuple`](/reference/tuple/tuple.md) とする。（`yprime` も `y` から同様に構築されるものとする）

	- [`uses_allocator_v`](/reference/memory/uses_allocator.md)`<T1, polymorphic_allocator> == false` かつ [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<T1, Args1...> == true` の場合  
		`x` を `xprime` とする。
	- [`uses_allocator_v`](/reference/memory/uses_allocator.md)`<T1, polymorphic_allocator> == true` かつ [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<T1,` [`allocator_arg_t`](/reference/memory/allocator_arg_t.md)`, polymorphic_allocator, Args1...> == true` の場合  
		[`tuple_cat`](/reference/tuple/tuple_cat.md)`(`[`make_tuple`](/reference/tuple/make_tuple.md)`(`[`allocator_arg`](/reference/memory/allocator_arg_t.md)`, *this),` [`move`](/reference/utility/move.md)`(x))` を `xprime` とする。
	- [`uses_allocator_v`](/reference/memory/uses_allocator.md)`<T1, polymorphic_allocator> == true` かつ [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<T1, Args1..., polymorphic_allocator> == true` の場合  
		[`tuple_cat`](/reference/tuple/tuple_cat.md)`(`[`move`](/reference/utility/move.md)`(x),` [`make_tuple`](/reference/tuple/make_tuple.md)`(*this))` を `xprime` とする。
	- それ以外の場合、プ�グラムは不適格となる。

- (3) : 以下と�価、すなわち(2)に移�
	```cpp
construct(p, piecewise_construct, tuple<>(), tuple<>());
```
* piecewise_construct[link /reference/utility/piecewise_construct_t.md]
* tuple[link /reference/tuple/tuple.md]

- (4) : 以下と�価、すなわち(2)に移�
	```cpp
construct(p, piecewise_construct,
          forward_as_tuple(forward<U>(x)),
          forward_as_tuple(forward<V>(y)));
```
* piecewise_construct[link /reference/utility/piecewise_construct_t.md]
* forward_as_tuple[link /reference/tuple/forward_as_tuple.md]
* forward[link /reference/utility/forward.md]

- (5) : 以下と�価、すなわち(2)に移�
	```cpp
construct(p, piecewise_construct,
          forward_as_tuple(pr.first),
          forward_as_tuple(pr.second));
```
* piecewise_construct[link /reference/utility/piecewise_construct_t.md]
* forward_as_tuple[link /reference/tuple/forward_as_tuple.md]

- (6) : 以下と�価、すなわち(2)に移�
	```cpp
construct(p, piecewise_construct,
          forward_as_tuple(forward<U>(pr.first)),
          forward_as_tuple(forward<V>(pr.second)));
```
* piecewise_construct[link /reference/utility/piecewise_construct_t.md]
* forward_as_tuple[link /reference/tuple/forward_as_tuple.md]
* forward[link /reference/utility/forward.md]

## 例外

- (1) : `T`のコンストラクタが例外を投げないならば、この関数も例外を投げない。

## 備考
- C++20 における変更は、一見新規導入されたユーティリティ関数（[`uninitialized_construct_using_allocator`](/reference/memory/uninitialized_construct_using_allocator.md)）を使用して定義を簡略化しただけのように思えるが、実はこの変更によりネストした [`pair`](/reference/utility/pair.md)  に対しても [uses-allocator 構築](/reference/memory/uses_allocator.md)がサポートされるように改善されている。

## (1)の例
```cpp example
#include <iostream>
#include <memory_resource>

int main()
{
  std::pmr::polymorphic_allocator<int> alloc{};

  //メモリの確保
  int* array = alloc.allocate(4);

  //要素を構築
  for (int i = 0; i < 4; ++i) {
    alloc.construct(array + i, i);
  }

  for (int i = 0; i < 4; ++i) {
    std::cout << array[i] << std::endl;
  }

  //要素を破棄
  for (int i = 0; i < 4; ++i) {
    alloc.destroy(array + i);
  }

  //メモリの解放
  alloc.deallocate(array, 4);
}
```
* construct[color ff0000]
* allocate[link allocate.md]
* deallocate[link deallocate.md]
* destroy[link destroy.md]

### 出力
```
0
1
2
3
```

## `pair`関連のオーバー�ードの例
```cpp example
#include <iostream>
#include <memory_resource>
#include <string>
#include <tuple>
#include <utility>

int main()
{
  //intとpolymorphic_allocatorを用いるstringのpair
  using pair = std::pair<int, std::pmr::string>;

  //memory_resourceとしてmonotonic_buffer_resourceを使用
  auto mr = std::pmr::monotonic_buffer_resource{};
  std::pmr::polymorphic_allocator<pair> alloc{&mr};

  std::cout << std::boolalpha;
  std::cout << "(2)" << std::endl;

  //(2)
  {
    pair* p = alloc.allocate(1);

    alloc.construct(p, std::piecewise_construct
        , std::make_tuple(128)         //intを128で初期化
        , std::make_tuple("string", 3) //string("string", 3)で初期化（最初の3文�を保持する）
    );

    std::cout << p->first << std::endl;
    std::cout << p->second << std::endl;
    //ア�ケータが伝搬している
    std::cout << (p->second.get_allocator() == alloc) << std::endl;
  }

  std::cout << "\n(3)" << std::endl;

  //(3)
  {
    pair* p = alloc.allocate(1);

    alloc.construct(p);  //両要素をデフォルト構築

    std::cout << p->first << std::endl;
    std::cout << p->second << std::endl;
    //ア�ケータが伝搬している
    std::cout << (p->second.get_allocator() == alloc) << std::endl;
  }

  std::cout << "\n(4)" << std::endl;

  //(4)
  {
    pair* p = alloc.allocate(1);

    alloc.construct(p, 128, "string");  //両要素をこれらの値からムーブ構築

    std::cout << p->first << std::endl;
    std::cout << p->second << std::endl;
    //ア�ケータが伝搬している
    std::cout << (p->second.get_allocator() == alloc) << std::endl;
  }

  std::cout << "\n(5)" << std::endl;

  //(5)
  {
    pair* p = alloc.allocate(1);

    const auto v = std::make_pair(128, "copy");
    alloc.construct(p, v);  //両要素を変換可能なpairからコピー構築

    std::cout << p->first << std::endl;
    std::cout << p->second << std::endl;
    //ア�ケータが伝搬している
    std::cout << (p->second.get_allocator() == alloc) << std::endl;
  }

  std::cout << "\n(6)" << std::endl;

  //(6)
  {
    pair* p = alloc.allocate(1);

    alloc.construct(p, std::make_pair(128, "move"));  //両要素を変換可能なpairからムーブ構築

    std::cout << p->first << std::endl;
    std::cout << p->second << std::endl;
    //ア�ケータが伝搬している
    std::cout << (p->second.get_allocator() == alloc) << std::endl;
  }
}
```
* construct[color ff0000]
* allocate[link allocate.md]
* std::pmr::monotonic_buffer_resource[link /reference/memory_resource/monotonic_buffer_resource.md]
* std::pmr::string[link /reference/string/basic_string.md]
* std::piecewise_construct[link /reference/utility/piecewise_construct_t.md]
* std::make_tuple[link /reference/tuple/make_tuple.md]

### 出力
```
(2)
128
str
true

(3)
0

true

(4)
128
string
true

(5)
128
copy
true

(6)
128
move
true
```

## ネストした `pair` の例
```cpp example
#include <iostream>
#include <string>
#include <utility>
#include <memory_resource>

int main()
{
  using pair = std::pair<std::pair<int, std::pmr::string>, std::pmr::string>;

  auto mr = std::pmr::monotonic_buffer_resource{};
  std::pmr::polymorphic_allocator<pair> alloc{&mr};

  std::cout << std::boolalpha;

  pair* p = alloc.allocate(1);

  alloc.construct(p);

  std::cout << (p->first.second.get_allocator() == alloc) << '\n';
  std::cout << (p->second.get_allocator() == alloc) << '\n';

  alloc.destroy(p);

  alloc.deallocate(p, 1);
}
```
* construct[color ff0000]
* allocate[link allocate.md]
* deallocate[link deallocate.md]
* destroy[link destroy.md]
* std::pmr::monotonic_buffer_resource[link /reference/memory_resource/monotonic_buffer_resource.md]
* std::pmr::string[link /reference/string/basic_string.md]
* std::piecewise_construct[link /reference/utility/piecewise_construct_t.md]
* std::make_tuple[link /reference/tuple/make_tuple.md]

### C++17 における出力
```
false
true
```

### C++20 における出力
```
true
true
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 9.1
- [Visual C++](/implementation.md#visual_cpp): 2017 update 6
    - 2017, 2019共に(1)以外のオーバー�ードを提供していないが、[`pair`](/reference/utility/pair.md) の各要素に対する [uses-allocator 構築](/reference/memory/uses_allocator.md)をサポートしている。（ただし、C++20 モードでもネストした [`pair`](/reference/utility/pair.md) はサポートされていない）

## 関連項目
- [`construct`](/reference/memory/allocator_traits/construct.md)
- [`uses_allocator`](/reference/memory/uses_allocator.md)

## 参照
- [P0220R1 Adopt Library Fundamentals V1 TS Components for C++17 (R1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0220r1.html)
- [P0337r0 | Delete operator= for polymorphic_allocator](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0337r0.html)
- [Working Draft, C++ Extensions for Library Fundamentals, Version 2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/n4562.html#memory.resource.synop)
- [LWG Issue 2969. `polymorphic_allocator::construct()` shouldn't pass resource()](https://wg21.cmeerw.net/lwg/issue2969)
- [LWG Issue 2975. Missing case for pair construction in scoped and polymorphic allocators](https://wg21.cmeerw.net/lwg/issue2975)
