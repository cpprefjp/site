#end(size_type) (C++11)
* unordered_set[meta header]

```cpp
local_iterator end(size_type n);
const_local_iterator end(size_type n) const;
```

##概要
インデックス（添え字）で指定したバケット内の最後の要素の次を指すイテレータを取得する。

`unordered_multiset` は非順序連想コンテナであるため「最後」に特に意味はないが、[`begin(size_type)`](./begin-size_type.md) で得られたイテレータを `end(size_type)` まで `operator++()` でイテレートすることで当該バケットの要素を漏れなくダブりなく走査することができる。


##要件
パラメータ `n` は `[0, `[`bucket_count`](./bucket_count.md)`())` の範囲でなければならない。


##戻り値
インデックス（添え字） `n` で指定したバケット内の最後の要素の次を指すイテレータ


##計算量
定数


##備考
`const` 版ではない `begin` が返す `local_iterator` も読み取り専用イテレータである。

（が、`local_iterator` と `const_local_iterator` が同じ型とは限らないと思われる）


##例
```cpp
#include <iostream>
#include <string>
#include <unordered_set>
#include <algorithm>
#include <iterator>

int main()
{
  std::unordered_multiset<std::string> um{ "A", "B", "C", "D", "E", "A", "B", "C", "D", "E", };

  decltype(um)::size_type c = um.bucket_count();
  std::cout << "bucket_count() = " << c << std::endl;

  for (decltype(um)::size_type b = 0; b < c; ++b) {
    decltype(um)::size_type s = um.bucket_size(b);
    std::cout << "bucket = " << b << ", bucket_size = " << s << ", keys = { ";
    std::copy(um.begin(b), um.end(b), std::ostream_iterator<std::string>(std::cout, ", "));
    std::cout << "}" << std::endl;
  }
}
```
* iostream[link /reference/iostream.md]
* string[link /reference/string.md]
* unordered_set[link /reference/unordered_set.md]
* algorithm[link /reference/algorithm.md]
* iterator[link /reference/iterator.md]
* unordered_multiset[link ../unordered_multiset.md]
* bucket_count[link ./bucket_count.md]
* bucket_size[link ./bucket_size.md]
* copy[link /reference/algorithm/copy.md]
* begin[link ./begin-size_type.md]
* ostream_iterator[link /reference/iterator/ostream_iterator.md]

###出力
```
bucket_count() = 11
bucket = 0, bucket_size = 0, keys = { }
bucket = 1, bucket_size = 0, keys = { }
bucket = 2, bucket_size = 0, keys = { }
bucket = 3, bucket_size = 0, keys = { }
bucket = 4, bucket_size = 0, keys = { }
bucket = 5, bucket_size = 6, keys = { A, A, C, C, D, D, }
bucket = 6, bucket_size = 2, keys = { E, E, }
bucket = 7, bucket_size = 2, keys = { B, B, }
bucket = 8, bucket_size = 0, keys = { }
bucket = 9, bucket_size = 0, keys = { }
bucket = 10, bucket_size = 0, keys = { }
```

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

| | |
|----------------------------------------------|--------------------------------|
| [`begin`](./begin.md)                        | 先頭要素を指すイテレータの取得 |
| [`end`](./end.md)                            | 最終要素の次を指すイテレータの取得 |
| [`cbegin`](./cbegin.md)                      | 先頭要素を指す読み取り専用イテレータの取得 |
| [`cend`](./cend.md)                          | 最終要素の次を指す読み取り専用イテレータの取得 |
| [`begin(size_type)`](./begin-size_type.md)   | インデックス（添え字）で指定したバケット内の先頭要素を指すイテレータを取得 |
| [`cbegin(size_type)`](./cbegin-size_type.md) | インデックス（添え字）で指定したバケット内の先頭要素を指す読み取り専用イテレータを取得 |
| [`cend(size_type)`](./cend-size_type.md)     | インデックス（添え字）で指定したバケット内の最終要素の次を指す読み取り専用イテレータを取得 |

