#swap(C++11)
```cpp
void swap(unordered_multimap& v);
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
#include <unordered_map>
#include <algorithm>
#include <string>
#include <utility>

template <class C>
void print(const char* label, const C& c, std::ostream& os = std::cout)
{
  os << label << " : ";
  std::for_each(c.cbegin(), c.cend(), [&os](const typename C::value_type& v) { os << '(' << v.first << ", " << v.second << "), "; });
  os << '\n';
}

int main()
{
  std::unordered_multimap<std::string, int> um1{ {"1st", 1}, {"3rd", 3}, {"5th", 5}, {"7th", 7}, {"9th", 9}, {"1st", 1}, {"3rd", 3}, {"5th", 5}, {"7th", 7}, {"9th", 9}, };
  std::unordered_multimap<std::string, int> um2{ {"0th", 0}, {"2nd", 2}, {"4th", 4}, {"6th", 6}, {"8th", 8}, {"0th", 0}, {"2nd", 2}, {"4th", 4}, {"6th", 6}, {"8th", 8}, };

  print("um1 before", um1);
  print("um2 before", um2);
  std::cout << std::endl;

  um1.swap(um2);

  print("um1 after", um1);
  print("um2 after", um2);
}
```
* iostream[link /reference/iostream.md]
* unordered_map[link /reference/unordered_map.md]
* iterator[link /reference/iterator.md]
* algorithm[link /reference/algorithm.md]
* string[link /reference/string.md]
* ostream[link /reference/ostream.md]
* for_each[link /reference/algorithm/for_each.md]
* cbegin[link ./cbegin.md]
* cend[link ./cend.md]
* unordered_multimap[link /reference/unordered_map/unordered_multimap.md]
* swap[color ff0000]

###出力
```
um1 before : (7th, 7), (7th, 7), (5th, 5), (5th, 5), (9th, 9), (9th, 9), (3rd, 3), (3rd, 3), (1st, 1), (1st, 1), 
um2 before : (8th, 8), (8th, 8), (6th, 6), (6th, 6), (4th, 4), (4th, 4), (2nd, 2), (2nd, 2), (0th, 0), (0th, 0), 

um1 after : (8th, 8), (8th, 8), (6th, 6), (6th, 6), (4th, 4), (4th, 4), (2nd, 2), (2nd, 2), (0th, 0), (0th, 0), 
um2 after : (7th, 7), (7th, 7), (5th, 5), (5th, 5), (9th, 9), (9th, 9), (3rd, 3), (3rd, 3), (1st, 1), (1st, 1), 
```

注：[`unordered_multimap`](/reference/unordered_map/unordered_multimap.md) は非順序連想コンテナであるため、出力順序は無意味であることに注意


##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): -
- [Clang, C++0x mode](/implementation#clang.md): 3.1
- [GCC](/implementation#gcc.md): -
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.2
- [ICC](/implementation#icc.md): ?
- [Visual C++](/implementation#visual_cpp.md): ?

##参照

|                                     |                                                        |
|-------------------------------------|--------------------------------------------------------|
| [`swap`](./swap_free.md)            | 内容の交換（非メンバ関数）                             |
| [`emplace`](./emplace.md)           | コンテナ内への要素の直接構築                           |
| [`emplace_hint`](./emplace_hint.md) | 挿入位置のヒントを使用したコンテナ内への要素の直接構築 |
| [`insert`](./insert.md)             | 要素の追加                                             |
| [`erase`](./erase.md)               | 要素の削除                                             |
| [`clear`](./clear.md)               | 全要素の削除                                           |

