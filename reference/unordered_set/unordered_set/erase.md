#erase (C++11)
```cpp
iterator erase(const_iterator position);                   // (1)

size_type erase(const key_type& k);                        // (2)

iterator erase(const_iterator first, const_iterator last); // (3)
```

##概要
指定された要素を削除する


##要件
- `position` は、有効で、かつ、間接参照可能な（dereferenceable、つまり [`cend`](./cend.md)`()` ではない）当該コンテナを指す読み取り専用イテレータでなければならない。
- `first` と `last` は `[first, last)` が当該コンテナの有効な範囲である読み取り専用イテレータでなければならない。  
	なお、規格書では `first` は間接参照可能である必要があることになっているが、他の種類のコンテナの要件と照らし合わせると、間接参照可能である必要はない（つまり、`first` と `last` が共に [`cend`](./cend.md)`()` でも良い）ものと思われる。


##効果
- (1)	`position` で指定された要素を削除する。
- (2)	`k` と等価なキーの要素を削除する。
- (3)	`[first, last)` の範囲にある要素を全て削除する。


##戻り値
- (1)	「削除前に、削除された要素の次だった位置」を指すイテレータ。`erase()` を呼び出しても削除された要素以外を指す全てのイテレータは無効にならないため、`std::`[`next`](/reference/iterator/next.md)`(position)` と同じ位置を指す `iterator` である。  
	なお、`position` は `const_iterator` なのに対して、戻り値は `iterator` であるため注意が必要だが、非順序連想コンテナの場合いずれにせよどちらも読み取り専用イテレータである。
- (2)	削除した要素数。つまり、`k` と等価なキーの要素があれば 1、無ければ 0。
- (3)	 「削除前に、削除された要素の範囲の次だった位置」を指すイテレータ。`erase()` を呼び出しても削除された要素以外を指す全てのイテレータは無効にならないため、`last` と同じ位置を指す `iterator` である。  
	なお、`first` 及び `last` は `const_iterator` なのに対して、戻り値は `iterator` であるため注意が必要だが、非順序連想コンテナの場合いずれにせよどちらも読み取り専用イテレータである。  
	また、要件に示したように `first` が間接参照可能である必要がなかった場合にも、他の種類のコンテナの戻り値と照らし合わせると、`last` と同じ位置を指す `iterator` を返すのが適切であるものと思われる。


##例外
- (1)	投げない。
- (2)	コンテナの `key_equal` と `hasher` のオブジェクト（それぞれ `key_eq()` と `hash_function()` が返すオブジェクト）が例外を投げなければ、例外を投げない。
- (3)	投げない。


##計算量
- (1)	平均的なケースでは定数（O(`1`)）だが、最悪のケースではコンテナの要素数に比例（O([`size`](./size.md)`()`)）
- (2)	平均的なケースでは削除された要素数に比例（O([`count`](./count.md)`(k)`)）だが、最悪のケースではコンテナの要素数に比例（O([`size`](./size.md)`()`)）
- (3)	平均的なケースでは指定された範囲の要素数に比例（O(`std::`[`distance`](/reference/iterator/distance.md)`(first, last)`)）だが、最悪のケースではコンテナの要素数に比例（O([`size`](./size.md)`()`)）


##備考
削除された要素を指すイテレータ、および、参照のみ無効になる。なお、規格書に明確な記載は無いが、削除された要素を指すポインタも無効になる。


##例
```cpp
#include <iostream>
#include <unordered_set>
#include <iterator>
#include <algorithm>
#include <string>

template <class C>
void print(const char* label, const C& c, std::ostream& os = std::cout)
{
  os << label << " : ";
  std::copy(c.cbegin(), c.cend(), std::ostream_iterator<typename C::value_type>(os, " "));
  os << '\n';
}

int main()
{
  // 指定した位置にある要素を削除（(1)の形式）
  {
    std::unordered_set<int> us{ 1, 3, 5, 7, 9, };
    print("(1) erase(const_iterator) before", us);

    auto it1 = std::next(us.cbegin(), 3);
    std::cout << "argument: " << *it1 << '\n';
    auto it2 = us.erase(it1);
    std::cout << "return value: " << *it2 << '\n';
    print("after", us);
    std::cout << std::endl;
  }

  // 指定したキーと等価な要素を削除（(2)の形式）
  {
    std::unordered_set<int> us{ 1, 3, 5, 7, 9, };
    print("(2) erase(const value_type&) before", us);

    auto count1 = us.erase(5);
    auto count2 = us.erase(8);
    std::cout << "argument: 5, 8" << '\n';
    std::cout << "return value: " << count1 << ", " << count2 << '\n';
    print("after", us);
    std::cout << std::endl;
  }

  // 指定した位置にある要素を削除（(3)の形式）
  {
    std::unordered_set<int> us{ 1, 3, 5, 7, 9, };
    print("(3) erase(const_iterator, const_iterator) before", us);

    auto it1 = std::next(us.cbegin());
    auto it2 = std::next(it1, 2);
    std::cout << "arguments: " << *it1 << ", " << *it2 << '\n';
    auto it3 = us.erase(it1, it2);
    std::cout << "return value: " << *it3 << '\n';
    print("after", us);
    std::cout << std::endl;
  }
}
```
* iostream[link /reference/iostream.md]
* unordered_set[link /reference/unordered_set.md]
* iterator[link /reference/iterator.md]
* algorithm[link /reference/algorithm.md]
* string[link /reference/string.md]
* ostream[link /reference/ostream/basic_ostream.md]
* copy[link /reference/algorithm/copy.md]
* begin[link ./begin.md]
* end[link ./end.md]
* ostream_iterator[link /reference/iterator/ostream_iterator.md]
* next[link /reference/iterator/next.md]
* cbegin[link ./cbegin.md]
* erase[color ff0000]

###出力
```
(1) erase(const_iterator) before : 9 7 5 3 1
argument: 3
return value: 1
after : 9 7 5 1

(2) erase(const value_type&) before : 9 7 5 3 1
argument: 5, 8
return value: 1, 0
after : 9 7 3 1

(3) erase(const_iterator, const_iterator) before : 9 7 5 3 1
arguments: 7, 3
return value: 3
after : 9 3 1
```

注：[`unordered_set`](/reference/unordered_set/unordered_set.md) は非順序連想コンテナであるため、出力順序は無意味であることに注意


##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): -
- [Clang, C++0x mode](/implementation.md#clang): 3.1
- [GCC](/implementation.md#gcc): -
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): ?

##参照

|                                     |                                                        |
|-------------------------------------|--------------------------------------------------------|
| [`emplace`](./emplace.md)           | コンテナ内への要素の直接構築                           |
| [`emplace_hint`](./emplace_hint.md) | 挿入位置のヒントを使用したコンテナ内への要素の直接構築 |
| [`insert`](./insert.md)             | 要素の追加                                             |
| [`clear`](./clear.md)               | 全要素の削除                                           |
| [`swap`](./swap.md)                 | 内容の交換                                             |

