# cend(size_type)
* unordered_map[meta header]
* std[meta namespace]
* unordered_map[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
const_local_iterator cend(size_type n) const;
```

## 概要
インデックス（添え�）で指定したバケット内の最後の要素の次を指す�み取り専用イテレータを取得する。

`unordered_map` は非順序連想コンテナであるため「最後」に特に意味はないが、[`cbegin(size_type)`](cbegin-size_type.md) で得られたイテレータを `cend(size_type)` まで `operator++()` でイテレートすることで当該バケットの要素を漏れなくダブりなく走査することができる。


## 要件
パラメータ `n` は `[0,` [`bucket_count`](bucket_count.md)`())` の範囲でなければならない。


## 戻り値
インデックス（添え�） `n` で指定したバケット内の最後の要素の次を指すイテレータ


## 計算量
定数


## 例
```cpp example
#include <iostream>
#include <unordered_map>
#include <algorithm>

int main()
{
  std::unordered_map<char, int> um = {
    {'A', 1},
    {'B', 2},
    {'C', 3},
    {'D', 4},
    {'E', 5}
  };

  decltype(um)::size_type c = um.bucket_count();
  std::cout << "bucket_count() = " << c << std::endl;

  for (decltype(um)::size_type b = 0; b < c; ++b) {
    decltype(um)::size_type s = um.bucket_size(b);
    std::cout << "bucket = " << b << ", bucket_size = " << s << ", keys = { ";
    std::for_each(um.cbegin(b), um.cend(b), [](decltype(um)::const_reference x) {
      std::cout << x.first << ", ";
    });
    std::cout << "}" << std::endl;
  }
}
```
* cend[color ff0000]
* cbegin[link cbegin-size_type.md]
* um.bucket_count()[link bucket_count.md]
* um.bucket_size[link bucket_size.md]

### 出力例
```
bucket_count() = 11
bucket = 0, bucket_size = 1, keys = { B, }
bucket = 1, bucket_size = 1, keys = { C, }
bucket = 2, bucket_size = 1, keys = { D, }
bucket = 3, bucket_size = 1, keys = { E, }
bucket = 4, bucket_size = 0, keys = { }
bucket = 5, bucket_size = 0, keys = { }
bucket = 6, bucket_size = 0, keys = { }
bucket = 7, bucket_size = 0, keys = { }
bucket = 8, bucket_size = 0, keys = { }
bucket = 9, bucket_size = 0, keys = { }
bucket = 10, bucket_size = 1, keys = { A, }
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

| 名前                                         | 説明 |
|----------------------------------------------|--------------------------------|
| [`begin`](begin.md)                        | 先�要素を指すイテレータの取得 |
| [`end`](end.md)                            | 最終要素の次を指すイテレータの取得 |
| [`cbegin`](cbegin.md)                      | 先�要素を指す�み取り専用イテレータの取得 |
| [`cend`](cend.md)                          | 最終要素の次を指す�み取り専用イテレータの取得 |
| [`begin(size_type)`](begin-size_type.md)   | インデックス（添え�）で指定したバケット内の先�要素を指すイテレータを取得 |
| [`end(size_type)`](end-size_type.md)       | インデックス（添え�）で指定したバケット内の最終要素の次を指すイテレータを取得 |
| [`cbegin(size_type)`](cbegin-size_type.md) | インデックス（添え�）で指定したバケット内の先�要素を指す�み取り専用イテレータを取得 |

