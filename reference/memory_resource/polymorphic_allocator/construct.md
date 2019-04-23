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
void construct(pair<T1,T2>* p, piecewise_construct_t,
               tuple<Args1...> x, tuple<Args2...> y);   //(2)

template <class T1, class T2>
void construct(pair<T1,T2>* p);                         //(3)

template <class T1, class T2, class U, class V>
void construct(pair<T1,T2>* p, U&& x, V&& y);           //(4)

template <class T1, class T2, class U, class V>
void construct(pair<T1,T2>* p, const pair<U, V>& pr);   //(5)

template <class T1, class T2, class U, class V>
void construct(pair<T1,T2>* p, pair<U, V>&& pr);        //(6)
```

## 概要
指定された`p`のメモリ領域に`T`のオブジェクトを構築する。

- (1) : 「アロケータを使用する構築」により`p`のメモリ領域に`args...`をコンストラクタ引数として、`T`のオブジェクトを構築する

- (2) : `p`のメモリ領域に`std::pair<T1, T2>`のオブジェクトを、`x, y`内の要素を`T1, T2`それぞれのコンストラクタ引数として、`T1, T2`それぞれが「アロケータを使用する構築」により構築されるように、直接構築（[`piecewise construct`](/reference/utility/pair/op_constructor.md)）する

- (3) : `p`のメモリ領域に`std::pair<T1, T2>`のオブジェクトを、`T1, T2`それぞれが引数無しの「アロケータを使用する構築」により構築されるように、直接構築（[`piecewise construct`](/reference/utility/pair/op_constructor.md)）する

- (4) : `p`のメモリ領域に`std::pair<T1, T2>`のオブジェクトを、`T1, T2`のコンストラクタ引数としてそれぞれ`x, y`を[`forward`](/reference/utility/forward.md)して「アロケータを使用する構築」により構築されるように、直接構築（[`piecewise construct`](/reference/utility/pair/op_constructor.md)）する

- (5) : `p`のメモリ領域に`std::pair<T1, T2>`のオブジェクトを、`T1, T2`のコンストラクタ引数としてそれぞれ`pr.first, pr.second`をコピーして「アロケータを使用する構築」により構築されるように、直接構築（[`piecewise construct`](/reference/utility/pair/op_constructor.md)）する

- (6) : `p`のメモリ領域に`std::pair<T1, T2>`のオブジェクトを、`T1, T2`のコンストラクタ引数としてそれぞれ`pr.first, pr.second`を[`forward`](/reference/utility/forward.md)して「アロケータを使用する構築」により構築されるように、直接構築（[`piecewise construct`](/reference/utility/pair/op_constructor.md)）する


### アロケータを使用する構築（Uses-allocator construction）
アロケータを使用する構築とは、型`T`のオブジェクト`obj`を構築する際に引数とアロケータを`T`のコンストラクタに適切に引き渡すための仕組みである。

アロケータのオブジェクトを`alloc`、型を`Alloc`とし、引数列を`v1, v2, ..., vN`、その型を`V1, V2, ..., VN`とすると

- `T`がアロケータを利用しない場合（[`std::uses_allocator_v`](/reference/memory/uses_allocator.md)`<T, Alloc> == false`かつ、[`std::is_constructible_v`](/reference/type_traits/is_constructible.md)`<T, V1, V2, ..., VN> == true`ならば）  
`obj(v1, v2, ..., vN);`の形でコンストラクタを呼び出す。

- `T`がアロケータを利用し、アロケータをコンストラクタ引数の先頭で受け取る場合（[`std::uses_allocator_v`](/reference/memory/uses_allocator.md)`<T, Alloc> == true`かつ、[`std::is_constructible_v`](/reference/type_traits/is_constructible.md)`<T, ` [`allocator_­arg_­t`](/reference/memory/allocator_arg_t.md)`, Alloc, V1, V2, ..., VN> == true`ならば）  
`obj(allocator_­arg, alloc, v1, v2, ..., vN);`の形でコンストラクタを呼び出す。

- `T`がアロケータを利用し、アロケータをコンストラクタ引数の末尾で受け取る場合（[`std::uses_allocator_v`](/reference/memory/uses_allocator.md)`<T, Alloc> == true`かつ、[`std::is_constructible_v`](/reference/type_traits/is_constructible.md)`<T, V1, V2, ..., VN, Alloc> == true`ならば）  
`obj(v1, v2, ..., vN, alloc);`の形でコンストラクタを呼び出す。

- それ以外の場合、要求された構築はill-formedである。


すなわち、構築したい型がアロケータを利用するならば引数とアロケータを適切な順序でコンストラクタに与えて呼び出し、利用しないならば通常のコンストラクタ呼び出しを行う仕組みである。

例えば、`std::vector<std::string>`のようにコンテナも要素型もアロケータを利用する場合に要素（`std::string`）とコンテナ（`std::vector`）でアロケータを共有させることを考える。この場合にコンテナに要素を追加するとき、コンテナ（`std::vector`）に設定されているアロケータを要素（`std::string`）のコンストラクタに引き渡す必要がある。

標準ライブラリ内でアロケータを利用するほとんどの型は、コンストラクタ引数列の末尾でアロケータオブジェクトを受け取る（上記`std::string`や`std::vector`等のコンテナ）。  
しかし、一部の型ではコンストラクタ引数列の末尾で受け取るようにすると他のコンストラクタとあいまいになってしまうため、`std::allocator_­arg`と合わせてコンストラクタ引数列の先頭で受け取るようにしている。そのような型には`std::tuple`や`std::promise`、`std::packaged_task`がある。

これらのアロケータを利用する型及び多くのアロケータを必要としない型を構築する際、ユーザーから見た区別や追加の操作をする必要がないようにするために（あくまでライブラリ内部で解決するために）「アロケータを使用する構築」という仕組みが導入されている。  
そしてこれにより`polymorphic_allocator`は、コンテナ等で利用されたときに必要ならばその内部要素型まで自然に伝搬する。ユーザーは意識してコンテナからアロケータを取得し要素型のコンストラクタに引き渡すようなコードを一切書く必要がなくなる。

本関数の`std::pair`関連のオーバーロードは、`std::pair`が「アロケータを使用する構築」に対応したコンストラクタを持たないことから用意されている（コンストラクタの数が多くなるという理由で削除された経緯があるとのこと）。

## 要件

- (1) : [`resource()`](resource.md)により取得した`memory_resource`と`args...`をコンストラクタ引数とした「アロケータを使用する構築」が可能であること。  
アロケータを受け取るコンストラクタを持たない型については、（`args..`が適切ならば）この要件を常に満たしている。

## 引数

- 全て : `p` -- `T`もしくは`std::pair<T1, T2>`のオブジェクトを構築するメモリ領域へのポインタ

- (1) : `args` -- `T`のコンストラクタに渡す引数列

- (2) :  
    - `x` -- `T1`のコンストラクタに渡す引数を持つ`std::tuple`オブジェクト 
    - `y` -- `T2`のコンストラクタに渡す引数を持つ`std::tuple`オブジェクト

- (4) :  
    - `x` -- `T1`のコンストラクタに渡す引数
    - `y` -- `T2`のコンストラクタに渡す引数

- (5) : `pr` -- `T1, T2`のコンストラクタにそれぞれコピーして渡す引数`U, V`のオブジェクトを持つ`std::pair<U, V>`オブジェクト

- (6) : `pr` -- `T1, T2`のコンストラクタにそれぞれ[`forward`](/reference/utility/forward.md)して渡す引数`U, V`のオブジェクトを持つ`std::pair<U, V>`オブジェクト

## 効果

- (1) : `T`のコンストラクタによって（「アロケータを使用する構築」によって）以下のいずれかと等価  
    - アロケータを受け取らない場合 :  `p = new(p) T(std::forward<Args>(args)...)`  
    - アロケータを引数の先頭で受け取る場合 :  `p = new(p) T(allocator_­arg, this->resource(), std::forward<Args>(args)...)`  
    - アロケータを引数の末尾で受け取る場合 :  `p = new(p) T(std::forward<Args>(args)..., this->resource())`

- (2) : 以下と等価  
        `p = new(p) std::pair<T1, T2>(piecewise_construct_t, xprime, yprime)`  
        `xprime`は`T1`について（「アロケータを使用する構築」によって）以下のように定義する（`yprime`は`T2`について同様に定義する）  
    - `T1`のコンストラクタがアロケータを受け取らない場合、`xprime`は`x`  
    - `T1`のコンストラクタがアロケータを引数の先頭で受け取る場合、`xprime`は[`std::tuple_cat`](/reference/tuple/tuple_cat.md)`(`[`std::make_tuple`](/reference/tuple/make_tuple.md)`(allocator_­arg, this->resource()), x)`  
    - `T1`のコンストラクタがアロケータを引数の末尾で受け取る場合、`xprime`は[`std::tuple_cat`](/reference/tuple/tuple_cat.md)`(x, ` [`std::make_tuple`](/reference/tuple/make_tuple.md)`(this->resource()))`

- (3) : `this->construct(p, std::piecewise_construct, std::tuple<>(), std::tuple<>());`と等価、すなわち(2)に移譲

- (4) : 以下と等価、すなわち(2)に移譲
```cpp
this->construct(p, std::piecewise_construct,
                std::forward_as_tuple(std::forward<U>(x)),
                std::forward_as_tuple(std::forward<V>(y)));
```

- (5) : 以下と等価、すなわち(2)に移譲
```cpp
this->construct(p, std::piecewise_construct,
                std::forward_as_tuple(pr.first),
                std::forward_as_tuple(pr.second));
```

- (6) : 以下と等価、すなわち(2)に移譲
```cpp
this->construct(p, std::piecewise_construct,
                std::forward_as_tuple(std::forward<U>(pr.first)),
                std::forward_as_tuple(std::forward<V>(pr.second)));
```

## 例外

- (1) : `T`のコンストラクタが例外を投げないならば、この関数も例外を投げない。

## 例
```cpp example
#include <iostream>
#include <vector>
#include <string>

```
* std::allocator[link /reference/memory/allocator.md]
* std::basic_string[link /reference/string/basic_string.md]
* std::char_traits[link /reference/string/char_traits.md]

### 出力
```
equal
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 9.1
- [Visual C++](/implementation.md#visual_cpp): 2017 update 6

## 関連項目
- [`construct`](/reference/memory/allocator_traits/construct.md)
- [`uses_allocator`](/reference/memory/uses_allocator.md)