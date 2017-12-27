# max_bucket_count
* unordered_set[meta header]
* std[meta namespace]
* unordered_set[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
size_type max_bucket_count() const noexcept;
```

## 概要
コンテナで格納可能な最大のバケット数を返す。


## 戻り値
コンテナで格納可能な最大のバケット数


## 例外
投げない。


## 計算量
定数


## 例
```cpp example
#include <iostream>
#include <unordered_set>

int main()
{
  std::unordered_set<int> us{ 1, 3, 5, 7, 9, };

  std::cout << "max bucket count is " << us.max_bucket_count() << std::endl;
}
```
* max_bucket_count()[color ff0000]

### 出力例
```
max bucket count is 2305843009213693951
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): -
- [Clang, C++11 mode](/implementation.md#clang): 3.1
- [GCC](/implementation.md#gcc): -
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): ?

## 関連項目

| | |
|----------------------------------------------|------------------|
| [`bucket_count`](bucket_count.md)          | バケット数の取得 |
| [`bucket_size`](bucket_size.md)            | インデックス（添え字）で指定したバケット内の要素数を取得 |
| [`bucket`](bucket.md)                      | キーで指定したバケットのインデックス（添え字）を取得 |
| [`begin(size_type)`](begin-size_type.md)   | インデックス（添え字）で指定したバケット内の先頭要素を指すイテレータを取得 |
| [`end(size_type)`](end-size_type.md)       | インデックス（添え字）で指定したバケット内の最終要素の次を指すイテレータを取得 |
| [`cbegin(size_type)`](cbegin-size_type.md) | インデックス（添え字）で指定したバケット内の先頭要素を指す読み取り専用イテレータを取得 |
| [`cend(size_type)`](cend-size_type.md)     | インデックス（添え字）で指定したバケット内の最終要素の次を指す読み取り専用イテレータを取得 |

