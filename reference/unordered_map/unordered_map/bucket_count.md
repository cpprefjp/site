#bucket_count (C++11)
* unordered_map[meta header]
* std[meta namespace]

```cpp
size_type bucket_count() const noexcept;
```

##概要
コンテナの現在のバケット数を返す。


##戻り値
コンテナの現在のバケット数


##例外
投げない。


##計算量
定数。


##例
```cpp
#include <iostream>
#include <string>
#include <unordered_map>

int main()
{
  const std::unordered_map<std::string, int> um = {
    {"1st", 1},
    {"2nd", 2},
    {"3rd", 3},
    {"4th", 4},
    {"5th", 5}
  };

  std::cout << "bucket count is " << um.bucket_count() << std::endl;
}
```
* iostream[link /reference/iostream.md]
* unordered_map[link /reference/unordered_map.md]

###出力例
```
bucket count is 11
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): -
- [Clang, C++0x mode](/implementation.md#clang): 3.1
- [GCC](/implementation.md#gcc): -
- [GCC, C++0x mode](/implementation.md#gcc): 4.4.7
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): ?

##参照

| 名前                                         | 説明 |
|----------------------------------------------|----------------------|
| [`max_bucket_count`](./max_bucket_count.md)  | 最大バケット数の取得 |
| [`bucket_size`](./bucket_size.md)            | インデックス（添え字）で指定したバケット内の要素数を取得 |
| [`bucket`](./bucket.md)                      | キーで指定したバケットのインデックス（添え字）を取得 |
| [`begin(size_type)`](./begin-size_type.md)   | インデックス（添え字）で指定したバケット内の先頭要素を指すイテレータを取得 |
| [`end(size_type)`](./end-size_type.md)       | インデックス（添え字）で指定したバケット内の最終要素の次を指すイテレータを取得 |
| [`cbegin(size_type)`](./cbegin-size_type.md) | インデックス（添え字）で指定したバケット内の先頭要素を指す読み取り専用イテレータを取得 |
| [`cend(size_type)`](./cend-size_type.md)     | インデックス（添え字）で指定したバケット内の最終要素の次を指す読み取り専用イテレータを取得 |

