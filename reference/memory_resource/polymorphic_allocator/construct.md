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

- (1) : 「アロケータを使用する構築」により`p`のメモリ領域に`args...`をコンストラクタ引数として、`T`のオブジェクトを構築する

- (2) : `p`のメモリ領域に`std::pair<T1, T2>`のオブジェクトを、`T1, T2`それぞれが「アロケータを使用する構築」により構築されるように、`x, y`内の要素を`T1, T2`それぞれのコンストラクタ引数として直接構築（[`piecewise construct`](/reference/utility/pair/op_constructor.md)）する

- (3) : `p`のメモリ領域に`std::pair<T1, T2>`のオブジェクトを、`T1, T2`それぞれのデフォルトコンストラクタにより直接構築（[`piecewise construct`](/reference/utility/pair/op_constructor.md)）する

- (4) : `p`のメモリ領域に`std::pair<T1, T2>`のオブジェクトを、`T1, T2`のコンストラクタ引数としてそれぞれ`x, y`を[`forward`](/reference/utility/forward.md)して直接構築（[`piecewise construct`](/reference/utility/pair/op_constructor.md)）する

- (5) : `p`のメモリ領域に`std::pair<T1, T2>`のオブジェクトを、`T1, T2`のコンストラクタ引数としてそれぞれ`pr.first, pr.second`をコピーして直接構築（[`piecewise construct`](/reference/utility/pair/op_constructor.md)）する

- (6) : `p`のメモリ領域に`std::pair<T1, T2>`のオブジェクトを、`T1, T2`のコンストラクタ引数としてそれぞれ`pr.first, pr.second`を[`forward`](/reference/utility/forward.md)して直接構築（[`piecewise construct`](/reference/utility/pair/op_constructor.md)）する

## 要件

- (1) : [`resource()`](resource.md)により取得した`memory_resource`と`args...`をコンストラクタ引数とした「アロケータを使用する構築」が可能であること。  
アロケータを受け取るコンストラクタを持たない型については、この要件を常に満たしている。

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

- (1) : `T`のコンストラクタによって以下のいずれかのコンストラクタを呼び出して構築
- (2) : `T1, T2`それぞれ以下のいずれかのコンストラクタを呼び出して`std::pair<T1, T2>`を直接構築
- (3) : `this->construct(p, std::piecewise_construct, std::tuple<>(), std::tuple<>());`と等価
- (4) : 以下と等価
```cpp
this->construct(p, std::piecewise_construct,
                std::forward_as_tuple(std::forward<U>(x)),
                std::forward_as_tuple(std::forward<V>(y)));
```
- (5) : 以下と等価
```cpp
this->construct(p, std::piecewise_construct,
                std::forward_as_tuple(pr.first),
                std::forward_as_tuple(pr.second));
```
- (6) : 以下と等価
```cpp
this->construct(p, std::piecewise_construct,
                std::forward_as_tuple(std::forward<U>(pr.first)),
                std::forward_as_tuple(std::forward<V>(pr.second)));
```

## 例外

- (1) : `T`のコンストラクタが例外を投げないならば、この関数も例外を投げない。

## アロケータを使用する構築（Uses-allocator construction）

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