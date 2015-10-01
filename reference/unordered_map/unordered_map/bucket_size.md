#bucket_size
* unordered_map[meta header]
* std[meta namespace]
* unordered_map[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
size_type bucket_size(size_type n) const;
```

##概要
インデックス（添え字）で指定したバケット内に格納されている要素の数を取得する。


##要件
パラメータ `n` は `[0, `[`bucket_count`](./bucket_count.md)`())` の範囲であること。


##戻り値
パラメータ `n`で指定した位置のバケット内に格納されている要素の数


##計算量
O(`bucket_size(n)`)


##例
```cpp
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
    // 各バケットのサイズを取得
    decltype(um)::size_type s = um.bucket_size(b);
    std::cout << "bucket = " << b << ", bucket_size = " << s << ", keys = { ";

    // 各バケットの要素を出力
    std::for_each(um.cbegin(b), um.cend(b), [](decltype(um)::const_reference x) {
      std::cout << x.first << ", ";
    });
    std::cout << "}" << std::endl;
  }
}
```
* iostream[link /reference/iostream.md]
* unordered_map[link /reference/unordered_map.md]
* algorithm[link /reference/algorithm.md]
* bucket_count[link ./bucket_count.md]
* for_each[link /reference/algorithm/for_each.md]
* cbegin[link ./cbegin-size_type.md]
* cend[link ./cend-size_type.md]

###出力
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

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): -
- [Clang, C++11 mode](/implementation.md#clang): 3.1
- [GCC](/implementation.md#gcc): -
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.2
- [ICC](/implementation.md#icc): ?
- [Visual C++:](/implementation.md#visual_cpp) ?

##参照

| 名前                                         | 説明 |
|----------------------------------------------|------------------|
| [`bucket_count`](./bucket_count.md)          | バケット数の取得 |
| [`max_bucket_count`](./max_bucket_count.md)  | 最大バケット数の取得 |
| [`bucket`](./bucket.md)                      | キーで指定したバケットのインデックス（添え字）を取得 |
| [`begin(size_type)`](./begin-size_type.md)   | インデックス（添え字）で指定したバケット内の先頭要素を指すイテレータを取得 |
| [`end(size_type)`](./end-size_type.md)       | インデックス（添え字）で指定したバケット内の最終要素の次を指すイテレータを取得 |
| [`cbegin(size_type)`](./cbegin-size_type.md) | インデックス（添え字）で指定したバケット内の先頭要素を指す読み取り専用イテレータを取得 |
| [`cend(size_type)`](./cend-size_type.md)     | インデックス（添え字）で指定したバケット内の最終要素の次を指す読み取り専用イテレータを取得 |

