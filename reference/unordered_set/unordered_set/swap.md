#swap (C++11)
* unordered_set[meta header]

```cpp
void swap(unordered_set& v);
```

##概要
コンテナの内容を交換する。


##要件
コンテナの `key_equal` と `hasher` のオブジェクト（それぞれ [`key_eq`](./key_eq.md)`()` と [`hash_function`](./hash_function.md)`()` が返すオブジェクト）は、交換可能（swappable）でなければならない。


##効果
当該コンテナと引数で渡されたコンテナの内容を交換する。

（計算量が示すように）個々の要素それぞれに対するコピー、ムーブ、交換は行われない。

また、コンテナの `key_equal` と `hasher` のオブジェクト（それぞれ [`key_eq`](./key_eq.md)`()` と [`hash_function`](./hash_function.md)`()` が返すオブジェクト）も非メンバ関数 [`swap`](/reference/utility/swap.md) を非修飾で（つまり `std::` を付けずに）呼び出すことで交換される。（したがって、[`swap`](/reference/utility/swap.md) の呼び出しには ADL が働く。）

もし、`std::`[`allocator_traits`](/reference/memory/allocator_traits.md)`<allocator_type>::propagate_on_container_swap::value` が `true` であれば、アロケータオブジェクト（[`get_allocator`](./get_allocator.md)`()` が返すオブジェクト）も非メンバ関数 [`swap`](/reference/utility/swap.md) を非修飾で呼び出すことで交換される。そうでなければアロケータオブジェクトは交換されず、その場合、当該コンテナと引数 `v` がそれぞれ [`get_allocator`](./get_allocator.md)`()` で返すオブジェクトが等価でない（`operator==` が `true` を返さない）場合、振る舞いは未定義（undefined）である。


##戻り値
なし


##例外
コンテナの `key_equal` と　`hasher` のオブジェクト（それぞれ [`key_eq`](./key_eq.md)`()` と [`hash_function`](./hash_function.md)`()` が返すオブジェクト）の [`swap`](/reference/utility/swap.md)`()` が例外を投げなければ、例外を投げない。


##計算量
定数


##備考
交換されたコンテナの要素を指す参照、ポインタ、および、イテレータはいずれも無効とはならずに、元の要素を指し続ける（つまり、それらの指すコンテナは入れ替わる）。なお、[`end`](./end.md)`()` は要素を指さないため、無効になるかもしれない。


##例
```cpp
#include <iostream>
#include <unordered_set>
#include <iterator>
#include <algorithm>

template <class C>
void print(const char* label, const C& c, std::ostream& os = std::cout)
{
  os << label << " : ";
  std::copy(c.cbegin(), c.cend(), std::ostream_iterator<typename C::value_type>(os, " "));
  os << '\n';
}

int main()
{
  std::unordered_set<int> us1{ 1, 3, 5, 7, 9, };
  std::unordered_set<int> us2{ 0, 2, 4, 6, 8, };

  print("us1 before", us1);
  print("us2 before", us2);
  std::cout << std::endl;

  us1.swap(us2);

  print("us1 after", us1);
  print("us2 after", us2);
}
```
* iostream[link /reference/iostream.md]
* unordered_set[link /reference/unordered_set.md]
* iterator[link /reference/iterator.md]
* algorithm[link /reference/algorithm.md]
* ostream[link /reference/ostream.md]
* copy[link /reference/algorithm/copy.md]
* cbegin[link ./cbegin.md]
* cend[link ./cend.md]
* ostream_iterator[link /reference/iterator/ostream_iterator.md]
* swap[color ff0000]

###出力
```
us1 before : 9 7 5 3 1 
us2 before : 8 6 4 2 0 

us1 after : 8 6 4 2 0 
us2 after : 9 7 5 3 1 
```

注：[`unordered_set`](/reference/unordered_set/unordered_set.md) は非順序連想コンテナであるため、出力順序は無意味であることに注意


##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): -
- [Clang, C++0x mode](/implementation.md#clang): 3.1
- [GCC](/implementation.md#gcc): -
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.2
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): ?

##参照

|                                     |                                                        |
|-------------------------------------|--------------------------------------------------------|
| [`swap`](./swap_free.md)            | 内容の交換（非メンバ関数）                             |
| [`emplace`](./emplace.md)           | コンテナ内への要素の直接構築                           |
| [`emplace_hint`](./emplace_hint.md) | 挿入位置のヒントを使用したコンテナ内への要素の直接構築 |
| [`insert`](./insert.md)             | 要素の追加                                             |
| [`erase`](./erase.md)               | 要素の削除                                             |
| [`clear`](./clear.md)               | 全要素の削除                                           |

