#cbegin (C++11)
```cpp
const_iterator cbegin() const noexcept;
```

##概要
先頭の要素を指す読み取り専用イテレータを取得する。

`unordered_set` は非順序連想コンテナであるため「先頭」に特に意味はないが、`cbegin()` で得られたイテレータを [`cend`](./cend.md)`()` まで `operator++()` でイテレートすることで当該コンテナの要素を漏れなくダブりなく走査することができる。


##戻り値
先頭の要素を指す読み取り専用イテレータ


##例外
投げない。


##計算量
定数


##例
```cpp
#include <iostream>
#include <algorithm>
#include <iterator>
#include <unordered_set>

int main()
{
  std::unordered_set<int> us{ 1, 2, 3, };

  std::copy(us.cbegin(), us.cend(), std::ostream_iterator<int>(std::cout, ", "));
  std::cout << std::endl;
}
```
* iostream[link /reference/iostream.md]
* algorithm[link /reference/algorithm.md]
* iterator[link /reference/iterator.md]
* unordered_set[link /reference/unordered_set.md]
* copy[link /reference/algorithm/copy.md]
* cend[link ./cend.md]
* ostream_iterator[link /reference/iterator/ostream_iterator.md]
* cbegin[color ff0000]

###出力例
```
3, 2, 1, 
```

注：[`unordered_set`](/reference/unordered_set/unordered_set.md) は非順序連想コンテナであるため、出力順序は無意味であることに注意


##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): -
- [Clang, C++0x mode](/implementation.md#clang): 3.0, 3.1
- [GCC](/implementation.md#gcc): -
- [GCC, C++0x mode](/implementation.md#gcc): 4.4.7, 4.5.3, 4.6.3, 4.7.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): ?

##参照

| | |
|----------------------------------------------|--------------------------------|
| [`begin`](./begin.md)                        | 先頭要素を指すイテレータの取得 |
| [`end`](./end.md)                            | 最終要素の次を指すイテレータの取得 |
| [`cend`](./cend.md)                          | 最終要素の次を指す読み取り専用イテレータの取得 |
| [`begin(size_type)`](./begin-size_type.md)   | インデックス（添え字）で指定したバケット内の先頭要素を指すイテレータを取得 |
| [`end(size_type)`](./end-size_type.md)       | インデックス（添え字）で指定したバケット内の最終要素の次を指すイテレータを取得 |
| [`cbegin(size_type)`](./cbegin-size_type.md) | インデックス（添え字）で指定したバケット内の先頭要素を指す読み取り専用イテレータを取得 |
| [`cend(size_type)`](./cend-size_type.md)     | インデックス（添え字）で指定したバケット内の最終要素の次を指す読み取り専用イテレータを取得 |

