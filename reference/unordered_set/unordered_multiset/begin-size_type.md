# begin(size_type)
* unordered_set[meta header]
* std[meta namespace]
* unordered_multiset[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
local_iterator begin(size_type n);
const_local_iterator begin(size_type n) const;
```

## 概要
インデックス（添え�）で指定したバケット内の先�の要素を指すイテレータを取得する。

`unordered_multiset` は非順序連想コンテナであるため「先�」に特に意味はないが、`begin(size_type)` で得られたイテレータを [`end(size_type)`](end-size_type.md) まで `operator++()` でイテレートすることで当該バケットの要素を漏れなくダブりなく走査することができる。


## 要件
パラメータ `n` は `[0,` [`bucket_count`](bucket_count.md)`())` の範囲でなければならない。


## 戻り値
インデックス（添え�） `n` で指定したバケット内の先�の要素を指すイテレータ


## 計算量
定数


## 備考
`const` 版ではない `begin` が返す `local_iterator` も�み取り専用イテレータである。

（が、`local_iterator` と `const_local_iterator` が同じ型とは限らないと思われる）


## 例
```cpp example
#include <iostream>
#include <string>
#include <unordered_set>
#include <algorithm>
#include <iterator>

int main()
{
  std::unordered_multiset<std::string> ums{ "A", "B", "C", "D", "E", "A", "B", "C", "D", "E", };

  decltype(ums)::size_type c = ums.bucket_count();
  std::cout << "bucket_count() = " << c << std::endl;

  for (decltype(ums)::size_type b = 0; b < c; ++b) {
    decltype(ums)::size_type s = ums.bucket_size(b);
    std::cout << "bucket = " << b << ", bucket_size = " << s << ", keys = { ";
    std::copy(ums.begin(b), ums.end(b), std::ostream_iterator<std::string>(std::cout, ", "));
    std::cout << "}" << std::endl;
  }
}
```
* begin[color ff0000]
* ums.bucket_count()[link bucket_count.md]
* ums.bucket_size[link bucket_size.md]
* end[link end-size_type.md]

### 出力
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

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): -
- [Clang](/implementation.md#clang): 3.1
- [GCC](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): ?

## 関連項目

| 名前 | 説明 |
|----------------------------------------------|------------------------------------|
| [`begin`](begin.md)                        | 先�要素を指すイテレータの取得     |
| [`end`](end.md)                            | 最終要素の次を指すイテレータの取得 |
| [`cbegin`](cbegin.md)                      | 先�要素を指す�み取り専用イテレータの取得 |
| [`cend`](cend.md)                          | 最終要素の次を指す�み取り専用イテレータの取得 |
| [`end(size_type)`](end-size_type.md)       | インデックス（添え�）で指定したバケット内の最終要素の次を指すイテレータを取得 |
| [`cbegin(size_type)`](cbegin-size_type.md) | インデックス（添え�）で指定したバケット内の先�要素を指す�み取り専用イテレータを取得 |
| [`cend(size_type)`](cend-size_type.md)     | インデックス（添え�）で指定したバケット内の最終要素の次を指す�み取り専用イテレータを取得 |

