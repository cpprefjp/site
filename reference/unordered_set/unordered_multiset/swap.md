# swap
* unordered_set[meta header]
* std[meta namespace]
* unordered_multiset[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
void swap(unordered_multiset& v);
void swap(unordered_multiset& x)
  noexcept(allocator_traits<Allocator>::is_always_equal::value
            && noexcept(swap(declval<Hash&>(),declval<Hash&>()))
            && noexcept(swap(declval<Pred&>(),declval<Pred&>()))); // C++17
```

## 概要
コンテナの内容を交換する。


## 要件
コンテナの `key_equal` と `hasher` のオブジェクト（それぞれ [`key_eq`](key_eq.md)`()` と [`hash_function`](hash_function.md)`()` が返すオブジェクト）は、交換可能（swappable）でなければならない。


## 効果
当該コンテナと引数で渡されたコンテナの内容を交換する。

（計算量が示すように）個々の要素それぞれに対するコピー、ムーブ、交換は行われない。

また、コンテナの `key_equal` と `hasher` のオブジェクト（それぞれ [`key_eq`](key_eq.md)`()` と [`hash_function`](hash_function.md)`()` が返すオブジェクト）も非メンバ関数 [`swap`](/reference/utility/swap.md) を非修飾で（つまり `std::` を付けずに）呼び出すことで交換される。（したがって、[`swap`](/reference/utility/swap.md) の呼び出しには ADL が働く。）

もし、`std::`[`allocator_traits`](/reference/memory/allocator_traits.md)`<allocator_type>::propagate_on_container_swap::value` が `true` であれば、ア�ケータオブジェクト（[`get_allocator`](get_allocator.md)`()` が返すオブジェクト）も非メンバ関数 [`swap`](/reference/utility/swap.md) を非修飾で呼び出すことで交換される。そうでなければア�ケータオブジェクトは交換されず、その場合、当該コンテナと引数 `v` がそれぞれ [`get_allocator`](get_allocator.md)`()` で返すオブジェクトが�価でない（`operator==` が `true` を返さない）場合、振る舞いは未定義（undefined）である。


## 戻り値
なし


## 例外
コンテナの `key_equal` と　`hasher` のオブジェクト（それぞれ [`key_eq`](key_eq.md)`()` と [`hash_function`](hash_function.md)`()` が返すオブジェクト）の [`swap`](/reference/utility/swap.md)`()` が例外を投げなければ、例外を投げない。


## 計算量
定数


## 備考
交換されたコンテナの要素を指す参照、ポインタ、および、イテレータはいずれも無効とはならずに、元の要素を指し続ける（つまり、それらの指すコンテナは入れ替わる）。なお、[`end`](end.md)`()` は要素を指さないため、無効になるかもしれない。


## 例
```cpp example
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
  std::unordered_multiset<int> ums1{ 1, 3, 5, 7, 9, 1, 3, 5, 7, 9, };
  std::unordered_multiset<int> ums2{ 0, 2, 4, 6, 8, 0, 2, 4, 6, 8, };

  print("ums1 before", ums1);
  print("ums2 before", ums2);
  std::cout << std::endl;

  ums1.swap(ums2);

  print("ums1 after", ums1);
  print("ums2 after", ums2);
}
```
* swap[color ff0000]
* std::ostream[link /reference/ostream/basic_ostream.md]

### 出力
```
ums1 before : 9 9 7 7 5 5 1 1 3 3
ums2 before : 8 8 6 6 4 4 0 0 2 2

ums1 after : 8 8 6 6 4 4 0 0 2 2
ums2 after : 9 9 7 7 5 5 1 1 3 3
```

注：[`unordered_multiset`](/reference/unordered_set/unordered_multiset.md) は非順序連想コンテナであるため、出力順序は無意味であることに注意


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): -
- [Clang](/implementation.md#clang): 3.1
- [GCC](/implementation.md#gcc): 4.7.2
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): ?

## 関連項目

| 名前                                | 説明                                                   |
|-------------------------------------|--------------------------------------------------------|
| [`swap`](swap_free.md)            | 内容の交換（非メンバ関数）                             |
| [`emplace`](emplace.md)           | コンテナ内への要素の直接構築                           |
| [`emplace_hint`](emplace_hint.md) | 挿入位置のヒントを使用したコンテナ内への要素の直接構築 |
| [`insert`](insert.md)             | 要素の追加                                             |
| [`erase`](erase.md)               | 要素の削除                                             |
| [`clear`](clear.md)               | 全要素の削除                                           |


## 参照
- [N4258 Cleaning-up noexcept in the Library, Rev 3](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4258.pdf)
    - `noexcept` 追加の経緯となる提案文書
